export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  image: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Project 1",
    description: "Description of project 1",
    technologies: ["React", "TypeScript", "Node.js"],
    githubUrl: "https://github.com/...",
    liveUrl: "https://...",
    image: "/images/project1.png",
  },
  //TODO: Add projects
];
