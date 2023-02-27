import "../../styles/projects.css";
import { useEffect, useState } from "react";
import { ProjectBox } from "./ProjectBox";
import projectList from "../../assets/ProjectObjects.json";

export enum Type {
  Mobile = "Mobile",
  Desktop = "Desktop",
  Web = "Web",
}

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
