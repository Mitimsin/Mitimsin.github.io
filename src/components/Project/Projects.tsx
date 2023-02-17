import "../../styles/projects.css";
import { useEffect, useState } from "react";
import { ProjectBox } from "./ProjectBox";

export enum Type {
  Desktop = "Desktop",
  Mobile = "Mobile",
  Web = "Web",
}
export const projectList = [
  {
    id: "portfolio",
    title: "My Portfolio",
    type: Type.Web,
    language: ["React", "JavaScript", "TypeScript", "CSS", "HTML"],
    category: "Website",
    link: "https://github.com/Mitimsin/mitimsin.github.io",
    description:
      "This portfolio is a place that holds every project that I have currently worked on. It also has information about my past experiences, the education I had, and concepts that I am familiar with. This website helps me organize everything I have to share. The design and functionalities are made and customized by me using the languages above.",
    fotoCount: 5,
  },
  {
    id: "hangman",
    title: "Hangman",
    type: Type.Mobile,
    language: ["Flutter"],
    category: "Game",
    link: "https://github.com/Mitimsin/Games/tree/main/hangman",
    description:
      "This game is a classic game made modern. You can both play it with a friend that's next to you or you can push yourself to find the words from 7 categories like 'sporst, animals, movies' with over 450 words in all categories combined.",
    fotoCount: 0,
  },
  {
    id: "kelebike",
    title: "Kelebike",
    type: Type.Mobile,
    language: ["Flutter", "Swift"],
    category: "Bike Renting Service",
    link: "https://github.com/Kelebike",
    description:
      "Kelebike app is a bike renting service that's designed for Gebze Technical University. It helps students and the staff rent the bikes with ease and improves communication between the user and the staff. The user can check the status, return date, and more info about the bike.",
    fotoCount: 0,
  },
  {
    id: "xox",
    title: "Tick-Tack-Toe Bot",
    type: Type.Desktop,
    language: ["Java"],
    category: "Game",
    link: "https://github.com/Mitimsin/Games/tree/main/xox",
    description:
      "This XOX game is like no other. Yes, you can still play with your friends and gets draws. But there is also a bot who is unbeaten in 4 countries. It is a simple game so give it a try and see if you can beat the champion",
    fotoCount: 5,
  },
  {
    id: "pong",
    title: "Pong",
    type: Type.Desktop,
    language: ["C++"],
    category: "Game",
    link: "https://github.com/Mitimsin/Games/tree/main/pong",
    description:
      "Simple but elegant. This is the pong that came from the 70s. It has versus mode so you can play with your friends and 2 different AI modes. Either you can try to get a high score or try to beat the AI. Both modes have 3 difficulties for all types of players. And there are also a few different custom balls to color up the classic game.",
    fotoCount: 4,
  },
];

const observer = new IntersectionObserver((entries) => {
  entries.forEach((el) => {
    if (el.isIntersecting) {
      el.target.classList.add("showen");
    } else {
      el.target.classList.remove("showen");
    }
  });
});

export const Projects = () => {
  const [activeTab, setActiveTab] = useState("Desktop");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const types = Object.keys(Type).filter(
    (k) => typeof Type[k as keyof typeof Type] === "string"
  );

  useEffect(() => {
    const projectFields = document.querySelectorAll(
      ".projects-tab-bar, .project-tab, .project-box"
    );
    projectFields.forEach((el) => observer.observe(el));
  });

  return (
    <section className="projects" id="projects">
      <h1 className="projects-header">Projects</h1>
      <div className="projects-tab-bar slideInLeft">
        {types.map((type, index) => {
          return (
            <button
              key={index}
              className={`project-tab-bar-piece ${
                type === activeTab ? "active" : ""
              }`}
              onClick={() => {
                handleTabClick(type);
              }}
            >
              {type}
            </button>
          );
        })}
      </div>

      <div className="project-tab slideInLeft">
        {projectList.map((project, index) => {
          if (project.type === activeTab) {
            return (
              <ProjectBox
                key={index}
                id={project.id}
                title={project.title}
                category={project.category}
              />
            );
          }
          return null;
        })}
      </div>
    </section>
  );
};
