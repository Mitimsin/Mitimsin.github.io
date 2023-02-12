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

  useEffect(() => {
    /* === functions === */
    const handleScroll = () => {
      if (window.scrollY > 50 && !isScrolled) {
        setIsScrolled(true);
        menuButton?.classList.add("scrolled");
      } else if (window.scrollY <= 50 && isScrolled) {
        setIsScrolled(false);
        menuButton?.classList.remove("scrolled");
      }
    };

    const handleResize = () => setScreenWidth(window.innerWidth);

    /* === event listeners added  and removed === */
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isScrolled, menuButton?.classList, currentSection]);

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
            className={`page-link-buttons  ${
              screenWidth > 1023 ? "popIn" : isOpen ? "popIn" : "hidden"
            }`}
          >
            Home
          </a>
          <a
            href="#experience"
            className={`page-link-buttons speed-1 ${
              screenWidth > 1023 ? "popIn" : isOpen ? "popIn" : "hidden"
            }`}
          >
            Experience
          </a>
          <a
            href="#projects"
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
          menuButton?.classList.toggle("active");
        }}
      >
        {isOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
      </button>
    </nav>
  );
};
