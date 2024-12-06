import styled from "styled-components";
import { motion } from "framer-motion";

const ProjectsSection = styled.section`
  padding: 4rem 2rem;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProjectCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.secondary}15;
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Projects = () => {
  return (
    <ProjectsSection id="projects">
      <h2>Projects</h2>
      <ProjectGrid>
        {/* Add your project cards here */}
        <ProjectCard whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <h3>Project Name</h3>
          <p>Project description</p>
        </ProjectCard>
      </ProjectGrid>
    </ProjectsSection>
  );
};

export default Projects;
