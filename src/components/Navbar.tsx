import "../styles/navbar.css";
import { useState, useEffect } from "react";
import { FaLinkedinIn, FaBars, FaTimes } from "react-icons/fa";
import { AiOutlineGithub } from "react-icons/ai";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [currentSection, setCurrentSection] = useState<string>("home");

  const menuButton = document.querySelector(".nav-links");

  document.querySelectorAll(".nav-links").forEach((n) =>
    n.addEventListener("click", () => {
      setIsOpen(!isOpen);
    })
  );

  useEffect(() => {
    /* === functions === */
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
        menuButton?.classList.add("scrolled");
      } else {
        setIsScrolled(false);
        menuButton?.classList.remove("scrolled");
      }
    };

    const handleResize = () => setScreenWidth(window.innerWidth);

    isOpen
      ? menuButton?.classList.add("active")
      : menuButton?.classList.remove("active");

    /* === check the page hash and update === */
    const homeElement = document.getElementById("home");
    const experienceElement = document.getElementById("experience");

    if (homeElement && experienceElement) {
      const currentPosition = window.pageYOffset;

      const homePosition = homeElement.offsetTop;
      const experiencePosition = experienceElement.offsetTop;

      if (
        currentPosition >= homePosition &&
        currentPosition < experiencePosition
      ) {
        setCurrentSection("home");
      } else if (currentPosition >= experiencePosition) {
        setCurrentSection("experience");
      }
    }

    /* === event listeners added  and removed === */
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isScrolled, isOpen, menuButton?.classList, currentSection]);

  return (
    <nav className={isScrolled ? "page-scrolled" : ""}>
      <div className="brand">
        <a href="/">
          <span style={{ fontSize: "1.5rem" }}>Mert Gürer</span>
          <span style={{ margin: "0px 5px", fontSize: "1.25rem" }}> · </span>
          <span style={{ opacity: "0.75", fontSize: "1rem" }}>
            Software Engineer
          </span>
        </a>
      </div>

      <div className="nav-links">
        <div className="page-links">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              const homeElement = document.getElementById("home");
              if (homeElement) {
                homeElement.scrollIntoView({
                  behavior: "smooth",
                });
              }
              setIsOpen(false);
              window.location.hash = "home";
            }}
            className={`page-link-buttons  ${
              screenWidth > 1023 ? "popIn" : isOpen ? "popIn" : "hidden"
            }`}
          >
            Home
          </a>
          <a
            href="#experience"
            onClick={(e) => {
              e.preventDefault();
              const experienceElement = document.getElementById("experience");
              if (experienceElement) {
                experienceElement.scrollIntoView({
                  behavior: "smooth",
                });
              }
              setIsOpen(false);
              window.location.hash = "experience";
            }}
            className={`page-link-buttons speed-1 ${
              screenWidth > 1023 ? "popIn" : isOpen ? "popIn" : "hidden"
            }`}
          >
            Experience
          </a>
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              const projectsElement = document.getElementById("projects");
              if (projectsElement) {
                projectsElement.scrollIntoView({
                  behavior: "smooth",
                });
              }
              setIsOpen(false);
              window.location.hash = "projects";
            }}
            className={`page-link-buttons speed-2 ${
              screenWidth > 1023 ? "popIn" : isOpen ? "popIn" : "hidden"
            }`}
          >
            Projects
          </a>
        </div>
        <div className="social-links">
          <a
            href="https://www.linkedin.com/in/mert-g%C3%BCrer-45039b206/"
            target="_blank"
            rel="noopener noreferrer"
            className={`social-link-buttons speed-3 ${
              screenWidth > 1023 ? "popIn" : isOpen ? "popIn" : "hidden"
            }`}
          >
            <FaLinkedinIn size={24} />
          </a>
          <a
            href="https://github.com/Mitimsin"
            target="_blank"
            rel="noopener noreferrer"
            className={`social-link-buttons speed-4 ${
              screenWidth > 1023 ? "popIn" : isOpen ? "popIn" : "hidden"
            }`}
          >
            <AiOutlineGithub size={28} />
          </a>
        </div>
        <a href="#contact" className="contact">
          Contact Me
        </a>
      </div>
      <button
        className="menu"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
      </button>
    </nav>
  );
};
