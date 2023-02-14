import "../styles/home.css";
import HomeFoto from "../assets/image/foto_1.jpg";
import { useEffect } from "react";

const oberserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("showen");
    } else {
      entry.target.classList.remove("showen");
    }
  });
});

export const Home = () => {
  useEffect(() => {
    const homeElement = document.querySelector(".home-box");
    if (homeElement) {
      oberserver.observe(homeElement);
    }
  });

  return (
    <section className="home" id="home">
      <div className="home-box">
        <div className="home-text">
          <h1 className="home-text-header">Hi! I'm Mert</h1>
          <span>
            Welcome to my portfolio. I am an eager 3rd-year computer science
            undergraduate. Dedicated, reliable, punctual, and driven to
            accomplish great things. Motivated for success. Hard-working,
            self-paced learner. Values pastimes and hobbies. A team player
            that's waiting for the next professional software development
            position with excitement.
          </span>
        </div>
        <div className="home-image-frame">
          <img src={HomeFoto} alt="" className="home-image" />
        </div>
      </div>
    </section>
  );
};
