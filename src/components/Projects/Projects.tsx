import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects, Project } from "../../data/projects";

const ProjectsSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  padding: 0 1rem;
`;

const FilterButton = styled(motion.button)<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  background: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.secondary}22;
  color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.text};
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}33;
  }
`;

const ProjectGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
`;

const CardSkeleton = styled(motion.div)`
  background: ${({ theme }) => theme.colors.secondary}15;
  border-radius: 12px;
  height: 450px;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

const NoResults = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.secondary};
  grid-column: 1 / -1;
`;

const Projects = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  const categories = [
    "All",
    ...new Set(projects.flatMap((project) => project.technologies)),
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) =>
          project.technologies.includes(activeFilter)
        )
      );
    }
  }, [activeFilter]);

  return (
    <ProjectsSection id="projects">
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Projects
      </SectionTitle>

      <FilterButtons>
        {categories.map((category) => (
          <FilterButton
            key={category}
            active={activeFilter === category}
            onClick={() => setActiveFilter(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </FilterButton>
        ))}
      </FilterButtons>

      <ProjectGrid
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <>
              {[1, 2, 3].map((n) => (
                <CardSkeleton
                  key={n}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              ))}
            </>
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <NoResults
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              No projects found for this category.
            </NoResults>
          )}
        </AnimatePresence>
      </ProjectGrid>
    </ProjectsSection>
  );
};

export default Projects;
