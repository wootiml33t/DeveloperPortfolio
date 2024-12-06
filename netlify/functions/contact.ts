import { Handler, HandlerEvent, HandlerResponse } from "@netlify/functions";
import nodemailer from "nodemailer";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

const OPTIONS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_RECIPIENT,
};

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

export const handler: Handler = async (
  event: HandlerEvent
): Promise<HandlerResponse> => {
  // Handle OPTIONS request for CORS
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: OPTIONS_HEADERS,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: false, message: "Method not allowed" }),
    };
  }

  try {
    const body: ContactForm = JSON.parse(event.body || "{}");
    const validation = validateInput(body);

    if (!validation.isValid) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          message: validation.error || "Invalid input",
        }),
      };
    }

    const { name, email, message } = body;
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
                margin: 0;
                padding: 0;
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
                padding: 20px;
                border-radius: 5px 5px 0 0;
                text-align: center;
              }
              .header h2 {
                margin: 0;
                font-size: 24px;
              }
              .content {
                padding: 30px;
                background-color: white;
                border-radius: 0 0 5px 5px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
              .field {
                margin-bottom: 20px;
                border-bottom: 1px solid #eee;
                padding-bottom: 15px;
              }
              .field:last-child {
                border-bottom: none;
                margin-bottom: 0;
              }
              .label {
                font-weight: bold;
                color: #666;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 5px;
              }
              .value {
                color: #333;
                font-size: 16px;
                line-height: 1.6;
              }
              .timestamp {
                font-size: 12px;
                color: #999;
                text-align: right;
                margin-top: 20px;
                font-style: italic;
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
                  <div class="label">Name</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">Email</div>
                  <div class="value">${email}</div>
                </div>
                <div class="field">
                  <div class="label">Message</div>
                  <div class="value">${sanitizedMessage}</div>
                </div>
                <div class="timestamp">
                  Submitted on ${new Date().toLocaleString()}
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(emailContent);

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        message: "Message sent successfully! Thank you for reaching out.",
      }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: false,
        message: "Failed to send message. Please try again later.",
      }),
    };
  }
};
