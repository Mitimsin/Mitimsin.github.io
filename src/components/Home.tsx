import "../styles/home.css";
import HomeFoto from "../assets/image/foto_1.jpg";
import { useContext, useEffect } from "react";
import { DataContext } from "../App";

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
    const { info } = useContext(DataContext);

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
                    <p>{info.introduction}</p>
                </div>
                <div className="home-image-frame">
                    <img src={HomeFoto} alt="" className="home-image" />
                </div>
            </div>
        </section>
    );
};
