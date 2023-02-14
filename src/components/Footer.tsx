import "../styles/footer.css";
import Logo from "../assets/image/logo.png";
import { useEffect, useState } from "react";
import { NavbarSocialButton } from "./NavbarSocialButton";
import { navbarSocialMembers } from "./Navbar";

export const Footer = () => {
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
        {navbarSocialMembers.map((member, index) => (
          <NavbarSocialButton
            key={index}
            logo={member.logo}
            size={member.size}
            url={member.link}
            screenWidth={0}
            isOpen={isOpen}
            extraClass={`speed-${index} footer-social-icons`}
            handleOnClick={() => {}}
          />
        ))}
      </div>
    </section>
  );
};
