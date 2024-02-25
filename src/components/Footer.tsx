import "../styles/footer.css";
import Logo from "../assets/image/logo.png";
import { useContext, useEffect, useState } from "react";
import { NavbarSocialButton } from "./Navbar/NavbarSocialButton";
import { DataContext } from "../App";
import { SocialLinkLogos } from "./Navbar/Navbar";

export const Footer = () => {
    const { socialLinks } = useContext(DataContext);
    let [isOpen, setIsOpen] = useState(false);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setIsOpen(true);
                entry.target.classList.add("showen");
            } else {
                setIsOpen(false);
                entry.target.classList.remove("showen");
            }
        });
    });

    useEffect(() => {
        const footerFields = document.querySelectorAll(
            ".footer-social-icons, .footer-logo"
        );
        footerFields.forEach((el) => observer.observe(el));
    });

    return (
        <section className="footer">
            <a href="#home">
                <img src={Logo} alt="" className="footer-logo" />
            </a>
            <div style={{ display: "flex" }}>
                {socialLinks
                    .filter((member) => member.enabled)
                    .sort((a, b) => a.index - b.index)
                    .map((member, index) => {
                        return (
                            <NavbarSocialButton
                                key={index}
                                index={index}
                                logo={SocialLinkLogos[member.id].logo}
                                size={SocialLinkLogos[member.id].size}
                                url={member.link}
                                screenWidth={0}
                                isOpen={isOpen}
                                handleOnClick={() => {}}
                            />
                        );
                    })}
            </div>
        </section>
    );
};
