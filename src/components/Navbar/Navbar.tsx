import "../../styles/navbar.css";
import { useState, useEffect, useContext } from "react";
import {
    FaLinkedinIn,
    FaGithub,
    FaTwitter,
    FaInstagram,
    FaBars,
    FaTimes,
} from "react-icons/fa";
import { NavbarPageButton } from "./NavbarPageButton";
import { NavbarSocialButton } from "./NavbarSocialButton";
import { Link } from "react-router-dom";
import { DataContext } from "../../App";
import { IconType } from "react-icons";

const navbarPageMembers = ["home", "experiences", "skills", "projects"];
export const SocialLinkLogos: SocialLinkLogosTemplate = {
    linkdin: {
        logo: FaLinkedinIn,
        size: 24,
    },
    github: {
        logo: FaGithub,
        size: 28,
    },
    twitter: {
        logo: FaTwitter,
        size: 24,
    },
    instagram: {
        logo: FaInstagram,
        size: 28,
    },
};

export const Navbar = () => {
    const { socialLinks } = useContext(DataContext);
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
                const secondName = document.getElementById(
                    navbarPageMembers[i + 1]
                );

                if (firstName && secondName) {
                    const firstZone = firstName.offsetTop - 100;
                    const secondZone = secondName.offsetTop - 100;

                    if (
                        currentPosition >= firstZone &&
                        currentPosition < secondZone
                    ) {
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
                <Link to="/">
                    <span style={{ fontSize: "1.5rem" }}>Mert Gürer</span>
                    <span style={{ margin: "0px 5px", fontSize: "1.25rem" }}>
                        {" "}
                        ·{" "}
                    </span>
                    <span style={{ opacity: "0.75", fontSize: "1rem" }}>
                        Software Engineer
                    </span>
                </Link>
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
                    {socialLinks
                        .filter((member) => member.enabled)
                        .sort((a, b) => a.index - b.index)
                        .map((member, index) => {
                            return (
                                <NavbarSocialButton
                                    key={index}
                                    index={index + navbarPageMembers.length}
                                    logo={SocialLinkLogos[member.id].logo}
                                    size={SocialLinkLogos[member.id].size}
                                    url={member.link}
                                    screenWidth={screenWidth}
                                    isOpen={isOpen}
                                    handleOnClick={() => {
                                        setIsOpen(false);
                                    }}
                                />
                            );
                        })}
                </div>
                <button
                    className="contact-button"
                    onClick={() => {
                        const targetSection =
                            document.getElementById("contact");
                        if (targetSection) {
                            const targetOffset =
                                targetSection.getBoundingClientRect().top;
                            const bodyRect =
                                document.body.getBoundingClientRect();
                            const targetPosition = targetOffset - bodyRect.top;
                            window.scroll({
                                top: targetPosition - 80,
                                behavior: "smooth",
                            });
                        }
                        setIsOpen(false);
                    }}
                >
                    Contact Me
                </button>
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

type SocialLinkLogosTemplate = {
    [key: string]: { logo: IconType; size: number };
};
