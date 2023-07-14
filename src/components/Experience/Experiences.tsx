import "../../styles/experience.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { ExperienceBox, Type } from "./ExperienceBox";
import { BiPlus } from "react-icons/bi";
import { useContext } from "react";
import { DataContext } from "../../App";

export const Experiences = () => {
  const { timelineObjects } = useContext(DataContext);

  return (
    <section className="experience" id="experiences">
      <div className="experience-tree">
        <h1 className="experience-header">Experiences</h1>
        <VerticalTimeline lineColor="#3b5249" className="vertical-timeline">
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
          <VerticalTimelineElement
            icon={<BiPlus />}
            iconStyle={{ background: "#3b5249" }}
            contentStyle={{ background: "#3b5249" }}
            contentArrowStyle={{ borderRight: "7px solid #3b5249" }}
          >
            <h1>And more on the way</h1>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </section>
  );
};
