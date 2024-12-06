import styled from "styled-components";
import { motion } from "framer-motion";

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  margin-top: -80px;
  padding-top: 80px;
`;

const Content = styled.div`
  max-width: 800px;
  text-align: center;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 4rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 2rem;
`;

const Hero = () => {
  return (
    <HeroSection id="home">
      <Content>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hi, I'm [Zachariah]
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Fullstack React Developer
        </Subtitle>
      </Content>
    </HeroSection>
  );
};

export default Hero;
