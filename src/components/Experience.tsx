import "../styles/experience.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { ExperienceBox, Type } from "./ExperienceBox";
import { BiPlus } from "react-icons/bi";

const timelineObjects = [
  {
    title: "Burak Bora High School - Istanbul",
    description: "Four year's of High School education",
    date: "2015 - 2019",
    type: Type.education,
  },
  {
    title: "IJGD - Germany",
    description:
      "Ran a house full of volunteers. Sailed and camped in the wildlife. Learned how to live in nature.",
    date: "2016 - 2 Weeks",
    type: Type.volunteering,
  },
  {
    title: "IJGD - Germany",
    description:
      "Maintenance of the storage places, construction of a prefabricated house for a children's summer camp",
    date: "2018 - 2 Weeks",
    type: Type.volunteering,
  },
  {
    title: "AFS Exchange Student - Dominican Republic",
    description:
      "Exchange Student with AFS at Dominican Republic in web development with HTML and CSS for 1 year",
    date: "2019 - 2020",
    type: Type.education,
  },
  {
    title: "Gebze Technical University - Kocaeli",
    description: "Computer Science Engineering student",
    date: "2019 - Present",
    type: Type.education,
  },
];

export const Experience = () => {
  return (
    <section className="experience" id="experience">
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
                type={object.type}
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
