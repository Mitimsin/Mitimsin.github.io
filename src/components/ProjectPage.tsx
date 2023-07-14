import "../styles/project_page.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ProjectType } from "../App";
import { storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import Dots from "react-activity/dist/Dots";
import "react-activity/dist/Dots.css";

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
  type: ProjectType;
  language: string[];
  category: string;
  link: string;
  description: string;
  fotoCount: number;
}

export const ProjectPage = (props: props) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [projectCoverImage, setProjectCoverImage] = useState("");
  const [projectImages, setProjectImages] = useState<string[]>();

  useEffect(() => {
    const projectFields = document.querySelectorAll(
      ".project-page-image-frame, .project-page-info, .project-page-info-image"
    );
    projectFields.forEach((el) => observer.observe(el));
  });

  useEffect(() => {
    const fecthCoverImage = async () => {
      try {
        const fileRef = ref(storage, `${props.id}/cover.png`);
        const downloadURL = await getDownloadURL(fileRef);
        setProjectCoverImage(downloadURL);
      } catch (error) {
        console.error(error);
      }

      const tempUrls = [];

      for (let i = 1; i <= props.fotoCount; i++) {
        try {
          const fileRef = ref(
            storage,
            `${props.id}/foto${i.toString().padStart(2, "0")}.png`
          );
          const downloadURL = await getDownloadURL(fileRef);
          tempUrls.push(downloadURL);
        } catch (error) {
          console.error(error);
        }
      }

      setProjectImages(tempUrls);
    };

    fecthCoverImage();
  }, [props.fotoCount, props.id]);

  return (
    <div>
      {projectImages ? (
        <>
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
              <div className="project-page-image-frame enter-from-left">
                {projectImages.map((image, index) => (
                  <img
                    className={`project-page-image ${
                      index === imageIndex
                        ? "active"
                        : index === imageIndex - 1
                        ? "prev"
                        : index === imageIndex + 1
                        ? "next"
                        : index === 0
                        ? "prev"
                        : "next"
                    }`}
                    src={image}
                    alt=""
                    key={index}
                  />
                ))}
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
                  <img
                    src={projectCoverImage}
                    alt=""
                    style={{ width: "100%" }}
                  />
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
        </>
      ) : (
        <div className="project-page-loading-zone">
          <div className="project-page-loading-box">
            <p className="project-page-loading-text">Loading project details</p>
            <Dots color="#3b5249" size={25} />
          </div>
        </div>
      )}
    </div>
  );
};
