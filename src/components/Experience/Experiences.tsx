import "../../styles/experience.css";
import { VerticalTimeline } from "react-vertical-timeline-component";
import { ExperienceBox, Type } from "./ExperienceBox";
import { useContext } from "react";
import { DataContext } from "../../App";

export const Experiences = () => {
    const { timelineObjects } = useContext(DataContext);

    return (
        <section className="experience" id="experiences">
            <div className="experience-tree">
                <h1 className="experience-header">Experiences</h1>
                <VerticalTimeline
                    lineColor="#3b5249"
                    className="vertical-timeline"
                >
                    {timelineObjects.map((object, index) => {
                        return (
                            <ExperienceBox
                                key={index}
                                title={object.title}
                                description={object.description}
                                date={object.date}
                                type={object.type as Type}
                            />
                        );
                    })}
                </VerticalTimeline>
            </div>
        </section>
    );
};
