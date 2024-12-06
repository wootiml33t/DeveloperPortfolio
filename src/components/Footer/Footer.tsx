import styled from "styled-components";
import { motion } from "framer-motion";

const FooterContainer = styled.footer`
  margin: 0;
  padding: 2rem 0;
  background: ${({ theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme }) => theme.colors.secondary}22;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const SocialLink = styled(motion.a)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 1.5rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.9rem;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <Content>
        <SocialLinks>
          <SocialLink
            href="https://github.com/wootiml33t"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fab fa-github"></i>
          </SocialLink>
          <SocialLink
            href="https://www.linkedin.com/in/zachariah-l-b09371110/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fab fa-linkedin"></i>
          </SocialLink>
          {/* <SocialLink
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fab fa-twitter"></i>
          </SocialLink> */}
        </SocialLinks>
        <Copyright>
          © {currentYear} Zachariah Leonard. All rights reserved.
        </Copyright>
      </Content>
    </FooterContainer>
  );
};

export default Footer;
