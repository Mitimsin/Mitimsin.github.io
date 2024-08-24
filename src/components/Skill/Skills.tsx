import { useContext, useEffect } from "react";
import "../../styles/skill.css";

import { SkillField } from "./SkillField";
import { DataContext } from "../../App";

const observer = new IntersectionObserver((entries) => {
    entries.forEach((el) => {
        if (el.isIntersecting) {
            el.target.classList.add("showen");
        } else {
            el.target.classList.remove("showen");
        }
    });
});

export const Skills = () => {
    const { skills, cvFile } = useContext(DataContext);

    useEffect(() => {
        const skillFields = document.querySelectorAll(
            ".skill-field, .skill-cv"
        );
        skillFields.forEach((el) => observer.observe(el));
    });

    return (
        <section className="skill" id="skills">
            <div className="spacer wave"></div>
            <h1 className="skill-header">My Skills</h1>
            <div className="skill-fields">
                <SkillField
                    title="Technical Skills"
                    skills={
                        skills.find((obj) => obj.id === "technicalSkills")!
                            .skills
                    }
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <SkillField
                        title="Soft Skills"
                        skills={
                            skills.find((obj) => obj.id === "softSkills")!
                                .skills
                        }
                    />
                    <SkillField
                        title="Hobbies"
                        skills={
                            skills.find((obj) => obj.id === "hobbySkills")!
                                .skills
                        }
                    />
                </div>
            </div>
            <div className="skill-cv slideInRight">
                <p>For more information check out my resume from here</p>
                <a
                    href={cvFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="skill-cv-button-box"
                >
                    <button className="skill-cv-button">Download</button>
                </a>
            </div>
            <div className="spacer wave flip bottom"></div>
        </section>
    );
};
