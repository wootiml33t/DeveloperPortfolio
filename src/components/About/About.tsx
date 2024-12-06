import styled from "styled-components";
import { motion } from "framer-motion";

const AboutSection = styled.section`
  min-height: 100vh;
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const Content = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const TextContent = styled(motion.div)`
  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }
`;

const SkillsContent = styled(motion.div)`
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
  }
`;

const SkillTag = styled(motion.div)`
  background: ${({ theme }) => theme.colors.primary}22;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-align: center;
`;

const About = () => {
  const skills = [
    "React",
    "JavaScript",
    "TypeScript",
    "CSS",
    "Python",
    "C#",
    "Node.js",
    "Parse",
    "Express",
    "Selenium",
    "Puppeteer",
    "Playwrite",
    "Swagger",
    "MongoDB",
    "SQL",
    "Git",
    "AWS",
    "Docker",
    "REST APIs",
    "GraphQL",
    "Testing",
    "QA",
  ];

  return (
    <AboutSection id="about">
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          About Me
        </Title>
        <Content>
          <TextContent
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p>
              I'm a fullstack developer with a passion for creating elegant,
              efficient, and user-friendly applications. With{" "}
              {`${new Date().getFullYear() - 2017}`} years of experience in web
              development, I specialize in building modern web applications
              using React.
            </p>
            <p>
              When I'm not coding, you can find me herding goats, feeding
              chickens, or hanging out with the rest of our petting zoo. I'm
              always eager to learn new technologies and tackle challenging
              problems.
            </p>
          </TextContent>
          <SkillsContent
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3>Skills</h3>
            <div className="skills-grid">
              {skills.map((skill) => (
                <SkillTag
                  key={skill}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill}
                </SkillTag>
              ))}
            </div>
          </SkillsContent>
        </Content>
      </Container>
    </AboutSection>
  );
};

export default About;
