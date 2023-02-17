import { VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import { IoMdSchool } from "react-icons/io";
import { MdWork, MdVolunteerActivism } from "react-icons/md";

interface props {
  title: string;
  description: string;
  date: string;
  type: Type;
}

export enum Type {
  education = "education",
  volunteering = "volunteering",
  work = "work",
}

const chooseType = (type: string) => {
  if (type === Type.education) {
    return <IoMdSchool />;
  } else if (type === Type.volunteering) {
    return <MdVolunteerActivism />;
  } else if (type === Type.work) {
    return <MdWork />;
  }
};

export const ExperienceBox = (props: props) => {
  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--education"
      date={props.date}
      icon={chooseType(props.type)}
      iconClassName={"experience-box-icon"}
      contentStyle={{ background: "#3b5249" }}
      contentArrowStyle={{ borderRight: "7px solid #3b5249" }}
    >
      <h3 className="experience-box-header">{props.title}</h3>
      <p>{props.description}</p>
    </VerticalTimelineElement>
  );
};
