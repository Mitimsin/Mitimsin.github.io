import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

  useEffect(() => {
    const fecthProjects = async () => {
      const q = query(collection(db, "Projects"));
      const querySnapshot = await getDocs(q);

      const values = querySnapshot.docs.map(
        (doc) => doc.data() as ProjectTemplate
      );

      setProjects(values);
    };

    const fecthTimelineObjects = async () => {
      const q = query(collection(db, "TimelineObjects"));
      const querySnapshot = await getDocs(q);

      const values = querySnapshot.docs.map(
        (doc) => doc.data() as TimelineObjectTemplate
      );

      setTimelineObjects(values);
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
      {projects && timelineObjects && skills && cvFile && (
        <DataContext.Provider
          value={{ projects, timelineObjects, skills, cvFile }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Portfolio />} />
              {projects.map((project, index) => {
                return (
                  <Route
                    key={index}
                    path={`/${project.id}`}
                    element={
                      <ProjectPage
                        key={index}
                        id={project.id}
                        title={project.title}
                        type={project.type}
                        language={project.language}
                        category={project.category}
                        link={project.link}
                        description={project.description}
                        fotoCount={project.fotoCount}
                      />
                    }
                  />
                );
              })}
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </BrowserRouter>
        </DataContext.Provider>
      )}
    </>
  );
}

const Portfolio = () => {
  return (
    <div>
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

export default App;

export type ProjectType = "Mobile" | "Desktop" | "Web";

interface ProjectTemplate {
  id: string;
  title: string;
  type: ProjectType;
  language: string[];
  category: string;
  link: string;
  description: string;
  fotoCount: number;
}

type TimelineObjectType = "education" | "work" | "volunteering";

interface TimelineObjectTemplate {
  title: string;
  description: string;
  date: string;
  type: TimelineObjectType;
}

interface SkillsTemplate {
  id: string;
  skills: string[];
}
