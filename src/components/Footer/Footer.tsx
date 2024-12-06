import styled from "styled-components";
import { motion } from "framer-motion";

const FooterContainer = styled.footer`
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme }) => theme.colors.secondary}22;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled(motion.a)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 1.5rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

// TODO: fill out
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <Content>
        <SocialLinks>
          <SocialLink
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fab fa-github"></i>
          </SocialLink>
          <SocialLink
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fab fa-linkedin"></i>
          </SocialLink>
          <SocialLink
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fab fa-twitter"></i>
          </SocialLink>
        </SocialLinks>
        <p>© {currentYear} Your Name. All rights reserved.</p>
      </Content>
    </FooterContainer>
  );
};

export default Footer;
