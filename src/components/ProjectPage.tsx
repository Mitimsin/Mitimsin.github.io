import "../styles/project_page.css";
import { Link } from "react-router-dom";
import { Type } from "./Project/Projects";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const observer = new IntersectionObserver((entries) => {
  entries.forEach((el) => {
    if (el.isIntersecting) {
      el.target.classList.add("showen");
    } else {
      el.target.classList.remove("showen");
    }
  });
});

interface props {
  id: string;
  title: string;
  type: Type;
  language: string[];
  category: string;
  link: string;
  description: string;
  fotoCount: number;
}

export const ProjectPage = (props: props) => {
  const [imageIndex, setImageIndex] = useState(0);
  const projectImage = `${process.env.PUBLIC_URL}/projects/${props.id}/cover.png`;
  const imagePaths: string[] = [];

  for (let i = 1; i <= props.fotoCount; i++) {
    imagePaths.push(
      `${process.env.PUBLIC_URL}/projects/${props.id}/foto${i}.png`
    );
  }

  useEffect(() => {
    const projectFields = document.querySelectorAll(
      ".project-page-image-frame, .project-page-info, .project-page-info-image"
    );
    projectFields.forEach((el) => observer.observe(el));
  });

  return (
    <div>
      <Link to="/#skills" className="project-page-button left">
        Go Back
      </Link>
      <a
        href={props.link}
        target="_blank"
        rel="noopener noreferrer"
        className="project-page-button right"
      >
        GitHub
      </a>
      <div className="project-page">
        <h1 className="project-page-header">{props.title}</h1>
        <div className="project-page-content">
          <div
            className="project-page-image-frame enter-from-left"
            style={{ backgroundImage: `url(${imagePaths[imageIndex]})` }}
          >
            <p className="project-page-image-tracker">
              {imageIndex + 1} / {props.fotoCount}
            </p>
            <button
              className="project-page-image-button"
              onClick={() => {
                if (imageIndex === 0) {
                  setImageIndex(props.fotoCount - 1);
                } else {
                  setImageIndex(imageIndex - 1);
                }
              }}
            >
              <IoIosArrowBack size={40} />
            </button>
            <button
              className="project-page-image-button"
              onClick={() => {
                if (imageIndex === props.fotoCount - 1) {
                  setImageIndex(0);
                } else {
                  setImageIndex(imageIndex + 1);
                }
              }}
            >
              <IoIosArrowForward size={40} />
            </button>
          </div>
          <div className="project-page-info enter-from-left">
            <div className="project-page-info-image enter-from-left">
              <img src={projectImage} alt="" style={{ width: "100%" }} />
            </div>

            <div>
              <p>
                <strong>Category:</strong> {`${props.category}`}
              </p>
              <p>
                <strong>Platform:</strong> {`${props.type}`}
              </p>
              <p>
                <strong>
                  Language{props.language.length === 1 ? "" : "s"} used:
                </strong>{" "}
                {`${props.language.join(`, `)}`}
              </p>
              <p>
                <strong>Description:</strong> {`${props.description}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
