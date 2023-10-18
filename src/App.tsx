import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import Bounce from "react-activity/dist/Bounce";
import "react-activity/dist/Bounce.css";

import { Contact } from "./components/Contact";
import { Experiences } from "./components/Experience/Experiences";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar/Navbar";
import { Projects } from "./components/Project/Projects";
import { Skills } from "./components/Skill/Skills";
import { ProjectPage } from "./components/ProjectPage";
import { Link } from "react-router-dom";
import { collection, getDocs, query } from "firebase/firestore";
import { db, storage } from "./firebase";
import { getDownloadURL, ref } from "firebase/storage";

import foto from "./assets/image/foto_1.jpg";
import logo from "./assets/image/logo.png";

export const DataContext = React.createContext<{
  projects: ProjectTemplate[];
  timelineObjects: TimelineObjectTemplate[];
  skills: SkillsTemplate[];
  cvFile: string;
}>({ projects: [], timelineObjects: [], skills: [], cvFile: "" });

function App() {
  const [projects, setProjects] = useState<ProjectTemplate[]>();
  const [timelineObjects, setTimelineObjects] =
    useState<TimelineObjectTemplate[]>();
  const [skills, setSkills] = useState<SkillsTemplate[]>();
  const [cvFile, setCvFile] = useState<string>();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fecthProjects = async () => {
      const q = query(collection(db, "Projects"));
      const querySnapshot = await getDocs(q);

      const values = querySnapshot.docs.map(
        (doc) => doc.data() as ProjectTemplate
      );

      setProjects(values.sort((a, b) => a.id - b.id));
    };

    const fecthTimelineObjects = async () => {
      const q = query(collection(db, "TimelineObjects"));
      const querySnapshot = await getDocs(q);

      const values = querySnapshot.docs.map(
        (doc) => doc.data() as TimelineObjectTemplate
      );

      setTimelineObjects(values.sort((a, b) => a.id - b.id));
    };

    const fecthSkills = async () => {
      const q = query(collection(db, "Skills"));
      const querySnapshot = await getDocs(q);

      const values = querySnapshot.docs.map(
        (doc) => doc.data() as SkillsTemplate
      );

      setSkills(values);
    };

    const fetchCvFile = async () => {
      try {
        const cvFileRef = ref(storage, "Mert Gürer CV.pdf");
        const downloadURL = await getDownloadURL(cvFileRef);
        setCvFile(downloadURL);
      } catch (error) {
        console.error("Error fetching CV file: ", error);
      }
    };

    fecthTimelineObjects();
    fecthProjects();
    fecthSkills();
    fetchCvFile();
  }, []);

  return (
    <>
      {projects && timelineObjects && skills && cvFile && isReady ? (
        <DataContext.Provider
          value={{ projects, timelineObjects, skills, cvFile }}
        >
          <HashRouter basename="/">
            <Routes>
              <Route path="/" element={<Portfolio />} />
              {projects.map((project, index) => {
                return (
                  <Route
                    key={index}
                    path={`/${project.url}`}
                    element={
                      <ProjectPage
                        key={index}
                        id={project.id}
                        url={project.url}
                        title={project.title}
                        type={project.type}
                        language={project.language}
                        category={project.category}
                        githubLink={project.githubLink}
                        description={project.description}
                        fotoCount={project.fotoCount}
                      />
                    }
                  />
                );
              })}
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </HashRouter>
        </DataContext.Provider>
      ) : (
        <LoadingPage />
      )}
      <ImagePreloader
        imageUrl={foto}
        onImageLoad={() => {
          setTimeout(() => {
            setIsReady(true);
          }, 2000);
        }}
      />
    </>
  );
}

const Portfolio = () => {
  return (
    <div>
      <LoadingPage faint={true} />
      <Navbar />
      <Home />
      <Experiences />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

const ErrorPage = () => {
  return (
    <div className="error-div">
      <h1>PAGE NOT FOUND</h1>
      <Link to={"/"} className="error-button">
        Go Home
      </Link>
    </div>
  );
};

export const LoadingPage = ({ faint = false }) => {
  return (
    <div className={`loading-frame ${faint ? "faint" : ""}`}>
      <Bounce color="#fff" size={31} speed={0.77} />
      <div className="loading-logo-box">
        <img src={logo} alt="" className="loading-logo-icon" />
      </div>
    </div>
  );
};

interface ImagePreloaderProps {
  imageUrl: string;
  onImageLoad: () => void;
}

function ImagePreloader({ imageUrl, onImageLoad }: ImagePreloaderProps) {
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      onImageLoad();
    };
  }, [imageUrl, onImageLoad]);

  return null;
}

export default App;

export type ProjectType = "Mobile" | "Desktop" | "Web";

interface ProjectTemplate {
  id: number;
  title: string;
  type: ProjectType;
  language: string[];
  category: string;
  githubLink: string;
  description: string;
  fotoCount: number;
  url: string;
}

type TimelineObjectType = "education" | "work" | "volunteering";

interface TimelineObjectTemplate {
  id: number;
  title: string;
  description: string;
  date: string;
  type: TimelineObjectType;
}

interface SkillsTemplate {
  id: string;
  skills: string[];
}
