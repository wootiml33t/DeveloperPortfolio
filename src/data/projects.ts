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
    title: "Particle Playground",
    description: "A trivial demonstration of basic WebGL implementation.",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "WebGL",
      "React-Three",
      "Zustand",
    ],
    githubUrl: "https://github.com/wootiml33t/WebGLParticlePlayground",
    liveUrl: "https://webglparticleplayground.netlify.app",
    image: "/images/projects/particlePlayground.png",
  },
  {
    id: 2,
    title: "Pokemon Matching",
    description: "A matching tile game featuring images from PokeAPI.",
    technologies: ["React", "TypeScript", "Node.js", "Styled-Components"],
    githubUrl: "https://github.com/wootiml33t/PokemonMatchingGame",
    liveUrl: "https://pokemonmatchinggame.netlify.app/",
    image: "/images/projects/pokemonMatching.png",
  },
  {
    id: 3,
    title: "Character Creator",
    description:
      "An interface that allows the user to choose preset character features to generate an image from Replicate's Stable Diffusion system.",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Axios",
      "Styled-Components",
      "Prompt Engineering",
      "Replicate",
      "Stable Diffusion",
    ],
    githubUrl: "https://github.com/wootiml33t/CharacterCreatorStableDiffusione",
    liveUrl: "https://character-creator-omega.vercel.app/",
    image: "/images/projects/characterCreator.png",
  },
];
