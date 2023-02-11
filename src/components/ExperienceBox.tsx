import { VerticalTimelineElement } from "react-vertical-timeline-component";

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
      className=""
      date={props.date}
      iconStyle={{ background: "#3b5249" }}
      icon={chooseType(props.type)}
    >
      <h3 className="">{props.title}</h3>
      <p className="">{props.description}</p>
    </VerticalTimelineElement>
  );
};
