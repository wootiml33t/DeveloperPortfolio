import { Router, RequestHandler } from "express";
import { transporter, mailOptions } from "../config/email.js";

const router = Router();

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

// Express specific types
type ContactRequestHandler = RequestHandler<
  {}, // params
  ApiResponse, // response
  ContactForm, // request body
  {} // query
>;

const validateInput = (
  data: ContactForm
): { isValid: boolean; error?: string } => {
  const { name, email, message } = data;

  if (!name || !email || !message) {
    return {
      isValid: false,
      error: "Please provide all required fields",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: "Please provide a valid email address",
    };
  }

  return { isValid: true };
};

// Rate limiting
const requestCounts = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 3600000; // 1 hour
const MAX_REQUESTS = 5;

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const requestData = requestCounts.get(ip);

  if (!requestData) {
    requestCounts.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (now - requestData.timestamp > RATE_LIMIT_WINDOW) {
    requestCounts.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (requestData.count >= MAX_REQUESTS) {
    return true;
  }

  requestData.count++;
  return false;
};

const handleContact: ContactRequestHandler = async (req, res) => {
  try {
    const clientIp = req.ip || req.socket.remoteAddress || "unknown";
    if (isRateLimited(clientIp)) {
      res.status(429).json({
        success: false,
        message: "Too many requests. Please try again later.",
      });
      return;
    }

    const { name, email, message } = req.body;

    const validation = validateInput({ name, email, message });
    if (!validation.isValid) {
      res.status(400).json({
        success: false,
        message: validation.error || "Invalid input",
      });
      return;
    }

    const sanitizedMessage = message.replace(/[<>]/g, "").trim();

    const emailContent = {
      ...mailOptions,
      subject: `Portfolio Contact Form: Message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9f9f9;
                border-radius: 5px;
              }
              .header {
                background-color: #4a90e2;
                color: white;
                padding: 10px 20px;
                border-radius: 5px 5px 0 0;
              }
              .content {
                padding: 20px;
                background-color: white;
                border-radius: 0 0 5px 5px;
              }
              .field {
                margin-bottom: 15px;
              }
              .label {
                font-weight: bold;
                color: #666;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Contact Form Submission</h2>
              </div>
              <div class="content">
                <div class="field">
                  <p class="label">Name:</p>
                  <p>${name}</p>
                </div>
                <div class="field">
                  <p class="label">Email:</p>
                  <p>${email}</p>
                </div>
                <div class="field">
                  <p class="label">Message:</p>
                  <p>${sanitizedMessage}</p>
                </div>
                <div class="field">
                  <p class="label">Timestamp:</p>
                  <p>${new Date().toLocaleString()}</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(emailContent);

    console.log(`Email sent successfully from ${email}`);

    res.status(200).json({
      success: true,
      message: "Message sent successfully! Thank you for reaching out.",
    });
    return;
  } catch (error) {
    console.error("Error sending email:", error);

    const isNodemailerError = error instanceof Error && "code" in error;
    const errorMessage = isNodemailerError
      ? "Failed to send email. Please try again later."
      : "An unexpected error occurred. Please try again.";

    res.status(500).json({
      success: false,
      message: errorMessage,
    });
    return;
  }
};

router.post("/api/contact", handleContact);

export default router;
