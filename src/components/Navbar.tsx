import { useState, useEffect } from "react";
import { FaLinkedinIn, FaBars, FaTimes } from "react-icons/fa";
import { AiOutlineGithub } from "react-icons/ai";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuButton = document.querySelector(".nav-links");

  document.querySelectorAll(".nav-links").forEach((n) =>
    n.addEventListener("click", () => {
      setIsOpen(!isOpen);
    })
  );

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
        menuButton?.classList.add("scrolled");
      } else {
        setIsScrolled(false);
        menuButton?.classList.remove("scrolled");
      }
    };

    isOpen
      ? menuButton?.classList.add("active")
      : menuButton?.classList.remove("active");

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [isScrolled, isOpen, menuButton?.classList]);

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
          <a href="#home" className="page-link-buttons">
            Home
          </a>
          <a href="#experience" className="page-link-buttons">
            Experience
          </a>
          <a href="#projects" className="page-link-buttons">
            Projects
          </a>
        </div>
        <div className="social-links">
          <a
            href="https://www.linkedin.com/in/mert-g%C3%BCrer-45039b206/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link-buttons"
          >
            <FaLinkedinIn size={24} />
          </a>
          <a
            href="https://github.com/Mitimsin"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link-buttons"
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
