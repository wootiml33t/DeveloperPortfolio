import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "../../data/projects";

interface ProjectCardProps {
  project: Project;
}

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.secondary}15;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;
  height: 100%;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.secondary}11;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.secondary}11;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.secondary};
`;

const Content = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  flex: 1;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  background: ${({ theme }) => theme.colors.primary}22;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.875rem;
  font-weight: 500;
`;

const Links = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`;

const LinkButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;

  &.github {
    background: ${({ theme }) => theme.colors.secondary}22;
    color: ${({ theme }) => theme.colors.text};

    &:hover {
      background: ${({ theme }) => theme.colors.secondary}33;
    }
  }

  &.live {
    background: ${({ theme }) => theme.colors.primary};
    color: white;

    &:hover {
      background: ${({ theme }) => theme.colors.primary}DD;
    }
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <ImageContainer>
        <AnimatePresence mode="wait">
          {!imageLoaded && (
            <ImagePlaceholder
              as={motion.div}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Loading...
            </ImagePlaceholder>
          )}
        </AnimatePresence>
        <ProjectImage
          src={project.image}
          alt={project.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          style={{ opacity: imageLoaded ? 1 : 0 }}
        />
      </ImageContainer>

      <Content>
        <Title>{project.title}</Title>
        <Description>{project.description}</Description>

        <TechStack>
          {project.technologies.map((tech) => (
            <TechTag key={tech}>{tech}</TechTag>
          ))}
        </TechStack>

        <Links>
          <LinkButton
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="github"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </LinkButton>

          {project.liveUrl && (
            <LinkButton
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="live"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 15.889v-2.223s-3.78-.114-7 3.333c1.513-6.587 7-7.778 7-7.778v-2.221l5 4.425-5 4.464z" />
              </svg>
              Live Demo
            </LinkButton>
          )}
        </Links>
      </Content>
    </Card>
  );
};

export default ProjectCard;
