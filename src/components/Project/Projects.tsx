import "../../styles/projects.css";
import { useContext, useEffect, useState } from "react";
import { ProjectBox } from "./ProjectBox";
import { DataContext } from "../../App";
import { storage } from "../../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const observer = new IntersectionObserver((entries) => {
    entries.forEach((el) => {
        if (el.isIntersecting) {
            el.target.classList.add("showen");
        } else {
            el.target.classList.remove("showen");
        }
    });
});

export const Projects = () => {
    const { projects } = useContext(DataContext);
    const [activeTab, setActiveTab] = useState("Web");
    const [imageUrls, setImageUrls] = useState<{ id: number; url: string }[]>();

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        const projectFields = document.querySelectorAll(
            ".projects-tab-bar, .project-tab, .project-box"
        );
        projectFields.forEach((el) => observer.observe(el));
    });

    useEffect(() => {
        const fecthCoverImage = async () => {
            const tempUrls = [];

            for (const p of projects) {
                try {
                    const fileRef = ref(storage, `${p.url}/cover.png`);
                    const downloadURL = await getDownloadURL(fileRef);
                    tempUrls.push({ id: p.id, url: downloadURL });
                } catch (error) {
                    console.error(error);
                }
            }
            setImageUrls(tempUrls);
        };

        fecthCoverImage();
    }, [projects]);

    const types = ["Web", "Mobile", "Desktop"];

    return (
        <section className="projects" id="projects">
            <h1 className="projects-header">Projects</h1>
            <div className="projects-tab-bar slideInLeft">
                {types.map((type, index) => {
                    return (
                        <button
                            key={index}
                            className={`project-tab-bar-piece ${
                                type === activeTab ? "active" : ""
                            }`}
                            onClick={() => {
                                handleTabClick(type);
                            }}
                        >
                            {type}
                        </button>
                    );
                })}
            </div>
            <div className="project-tab slideInLeft">
                {projects.map((project, index) => {
                    if (project.type === activeTab) {
                        return (
                            <ProjectBox
                                key={index}
                                url={project.url}
                                title={project.title}
                                category={project.category}
                                languages={project.language}
                                imageUrl={
                                    imageUrls?.find(
                                        (obj) => obj.id === project.id
                                    )!.url!
                                }
                            />
                        );
                    }
                    return null;
                })}
            </div>
        </section>
    );
};
