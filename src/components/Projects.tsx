import "../styles/projects.css";
import { useEffect, useState } from "react";
import { ProjectTab } from "./ProjectTab";
import { ProjectBox } from "./ProjectBox";

enum Type {
  Mobile = "Mobile",
  Desktop = "Desktop",
  Web = "Web",
}
const projectList = [
  {
    title: "My Portfolio",
    type: Type.Web,
    language: ["React", "JavaScript", "TypeScript", "CSS"],
    category: "Website",
    link: "https://github.com/Mitimsin/mitimsin.github.io",
  },
  {
    title: "Hangman",
    type: Type.Mobile,
    language: ["Flutter"],
    category: "Game",
    link: "https://github.com/Mitimsin/Games/tree/main/hangman",
  },
  {
    title: "Kelebike",
    type: Type.Mobile,
    language: ["Flutter", "Swift"],
    category: "Renting Service",
    link: "https://github.com/Kelebike",
  },
  {
    title: "Tick-Tack-Toe Bot",
    type: Type.Desktop,
    language: ["Java"],
    category: "Game",
    link: "https://github.com/Mitimsin/Games/tree/main/xox",
  },
  {
    title: "Pong",
    type: Type.Desktop,
    language: ["C++"],
    category: "Game",
    link: "https://github.com/Mitimsin/Games/tree/main/pong",
  },
];

export const Projects = () => {
  const [activeTab, setActiveTab] = useState("Mobile");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const types = Object.keys(Type).filter(
    (k) => typeof Type[k as keyof typeof Type] === "string"
  );

  return (
    <section className="projects" id="projects">
      <div className="projects-tab-bar">
        {types.map((type, index) => {
          return (
            <button
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

      <div className="projects-tab">
        {projectList.map((project, index) => {
          if (project.type === activeTab) {
            return <ProjectBox key={index} name={project.title} />;
          }
          return null;
        })}
      </div>
    </section>
  );
};
