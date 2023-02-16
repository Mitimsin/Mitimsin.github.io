import "../styles/projects.css";
import { useEffect, useState } from "react";
import { ProjectBox } from "./ProjectBox";

export enum Type {
  Mobile = "Mobile",
  Desktop = "Desktop",
  Web = "Web",
}
const projectList = [
  {
    id: "portfolio",
    title: "My Portfolio",
    type: Type.Web,
    language: ["React", "JavaScript", "TypeScript", "CSS"],
    category: "Website",
    link: "https://github.com/Mitimsin/mitimsin.github.io",
    description: "",
  },
  {
    id: "hangman",
    title: "Hangman",
    type: Type.Mobile,
    language: ["Flutter"],
    category: "Game",
    link: "https://github.com/Mitimsin/Games/tree/main/hangman",
    description: "",
  },
  {
    id: "kelebike",
    title: "Kelebike",
    type: Type.Mobile,
    language: ["Flutter", "Swift"],
    category: "Bike Renting Service",
    link: "https://github.com/Kelebike",
    description: "",
  },
  {
    id: "xox",
    title: "Tick-Tack-Toe Bot",
    type: Type.Desktop,
    language: ["Java"],
    category: "Game",
    link: "https://github.com/Mitimsin/Games/tree/main/xox",
    description: "",
  },
  {
    id: "pong",
    title: "Pong",
    type: Type.Desktop,
    language: ["C++"],
    category: "Game",
    link: "https://github.com/Mitimsin/Games/tree/main/pong",
    description: "",
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
  const [activeTab, setActiveTab] = useState("Mobile");

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
            return <ProjectBox key={index} project={project} />;
          }
          return null;
        })}
      </div>
    </section>
  );
};
