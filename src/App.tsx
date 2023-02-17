import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Contact } from "./components/Contact";
import { Experiences } from "./components/Experience/Experiences";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar/Navbar";
import { Projects, projectList } from "./components/Project/Projects";
import { Skills } from "./components/Skill/Skills";
import { ProjectPage } from "./components/ProjectPage";
import { Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        {projectList.map((project, index) => {
          return (
            <Route
              path={`/${project.id}`}
              element={<ProjectPage key={index} project={project} />}
            />
          );
        })}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
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
