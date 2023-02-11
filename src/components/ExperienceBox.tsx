import { IoMdSchool } from "react-icons/io";
import { MdWork, MdVolunteerActivism } from "react-icons/md";

interface props {
  title: string;
  description: string;
  years: string;
  type: Type;
}

export enum Type {
  education = "education",
  volunteering = "volunteering",
  work = "work",
}

const chooseType = (type: string) => {
  if (type === Type.education) {
    return <IoMdSchool size={43} />;
  } else if (type === Type.volunteering) {
    return <MdVolunteerActivism size={43} />;
  } else if (type === Type.work) {
    return <MdWork size={43} />;
  }
};

export const ExperienceBox = (props: props) => {
  return (
    <div className="experience-field">
      <div className="experience-box">
        <h1 style={{ paddingBottom: "10px" }}>{props.title}</h1>
        <span>{props.description}</span>
      </div>
      <div className="experience-logo">{chooseType(props.type)}</div>

      <span style={{ flex: "1" }}>{props.years}</span>
    </div>
  );
};
