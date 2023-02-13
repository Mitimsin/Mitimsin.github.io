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
  const navbarStyle = document.querySelector(".navbar");

  useEffect(() => {
    /* === functions === */
    const handleResize = () => setScreenWidth(window.innerWidth);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        menuButton?.classList.add("scrolled");
        navbarStyle?.classList.add("scrolled");
        setIsScrolled(true);
      } else if (window.scrollY <= 50) {
        menuButton?.classList.remove("scrolled");
        navbarStyle?.classList.remove("scrolled");
        setIsScrolled(false);
      }

      /* === check the page hash and update === */
      const homeElement = document.getElementById("home");
      const experienceElement = document.getElementById("experience");
      const skillElement = document.getElementById("skill");

      if (homeElement && experienceElement && skillElement) {
        const currentPosition = window.pageYOffset;

        const homePosition = homeElement.offsetTop;
        const experiencePosition = experienceElement.offsetTop;
        const skillPosition = skillElement.offsetTop;

        console.log(currentSection);

        if (
          currentPosition >= homePosition &&
          currentPosition < experiencePosition - 200
        ) {
          setCurrentSection("home");
        } else if (
          currentPosition >= experiencePosition - 200 &&
          currentPosition < skillPosition - 200
        ) {
          setCurrentSection("experience");
        } else if (currentPosition >= skillPosition - 200) {
          setCurrentSection("skill");
        }
      }
    };

    if (isOpen) {
      menuButton?.classList.add("active");
    } else {
      menuButton?.classList.remove("active");
    }

    /* === event listeners added  and removed === */
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [
    isScrolled,
    isOpen,
    currentSection,
    menuButton?.classList,
    navbarStyle?.classList,
  ]);

  return (
    <nav className="navbar">
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
            className={` ${
              currentSection === "home"
                ? "page-link-button-active"
                : "page-link-button"
            } ${screenWidth > 1023 ? "popIn" : isOpen ? "popIn" : "hidden"}`}
          >
            Home
          </a>
          <a
            href="#experience"
            className={` speed-1 ${
              currentSection === "experience"
                ? "page-link-button-active"
                : "page-link-button"
            } ${screenWidth > 1023 ? "popIn" : isOpen ? "popIn" : "hidden"}`}
          >
            Experience
          </a>
          <a
            href="#skill"
            className={` speed-2 ${
              currentSection === "skill"
                ? "page-link-button-active"
                : "page-link-button"
            } ${screenWidth > 1023 ? "popIn" : isOpen ? "popIn" : "hidden"}`}
          >
            Skills
          </a>
        </div>
        <div className="social-links">
          <a
            href="https://www.linkedin.com/in/mert-g%C3%BCrer-45039b206/"
            target="_blank"
            rel="noopener noreferrer"
            className={`social-link-button speed-3 ${
              screenWidth > 1023 ? "popIn" : isOpen ? "popIn" : "hidden"
            }`}
          >
            <FaLinkedinIn size={24} />
          </a>
          <a
            href="https://github.com/Mitimsin"
            target="_blank"
            rel="noopener noreferrer"
            className={`social-link-button speed-4 ${
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
