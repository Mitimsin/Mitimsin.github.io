import "../../styles/navbar.css";
import { useState, useEffect } from "react";
import {
  FaLinkedinIn,
  FaGithub,
  /*   FaTwitter,
  FaInstagram, */
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { NavbarPageButton } from "./NavbarPageButton";
import { NavbarSocialButton } from "./NavbarSocialButton";

/* ======= declare page nav buttons and social buttons ======= */
const navbarPageMembers = ["home", "experiences", "skills", "projects"];
export const navbarSocialMembers = [
  {
    logo: FaLinkedinIn,
    size: 24,
    link: "https://www.linkedin.com/in/mert-g%C3%BCrer-45039b206/",
  },
  {
    logo: FaGithub,
    size: 28,
    link: "https://github.com/mertgurer",
  },
  /*   {
    logo: FaTwitter,
    size: 24,
    link: "https://twitter.com/Mitimsin",
  }, */
  /*   {
    logo: FaInstagram,
    size: 28,
    link: "https://www.instagram.com/mertt_gurer/?hl=en",
  }, */
];
/* ======= declare page nav buttons and social buttons ======= */

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [currentSection, setCurrentSection] = useState<string>("home");
  const [hoverIndex, setHoverIndex] = useState(-1);

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
      const currentPosition = window.pageYOffset;

      for (let i = 0; i < navbarPageMembers.length; i++) {
        const firstName = document.getElementById(navbarPageMembers[i]);
        const secondName = document.getElementById(navbarPageMembers[i + 1]);

        if (firstName && secondName) {
          const firstZone = firstName.offsetTop - 100;
          const secondZone = secondName.offsetTop - 100;

          if (currentPosition >= firstZone && currentPosition < secondZone) {
            if (currentSection !== navbarPageMembers[i]) {
              setCurrentSection(navbarPageMembers[i]);
            }
          }
        } else if (firstName) {
          const firstZone = firstName.offsetTop - 100;

          if (currentPosition >= firstZone) {
            setCurrentSection(navbarPageMembers[i]);
          }
        }
      }
      /* === check the page hash and update === */
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
          {navbarPageMembers.map((member, index) => (
            <NavbarPageButton
              key={index}
              index={index}
              name={member}
              hoverIndex={hoverIndex}
              setHoverIndex={setHoverIndex}
              currentSection={currentSection}
              screenWidth={screenWidth}
              isOpen={isOpen}
              handleOnClick={() => {
                setIsOpen(false);
              }}
            />
          ))}
        </div>
        <div className="social-links">
          {navbarSocialMembers.map((member, index) => (
            <NavbarSocialButton
              key={index}
              index={index + navbarPageMembers.length}
              logo={member.logo}
              size={member.size}
              url={member.link}
              screenWidth={screenWidth}
              isOpen={isOpen}
              handleOnClick={() => {
                setIsOpen(false);
              }}
            />
          ))}
        </div>
        <a
          href="#contact"
          className="contact-button"
          onClick={() => setIsOpen(false)}
        >
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
