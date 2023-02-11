import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { ExperienceBox, Type } from "./ExperienceBox";

export const Experience = () => {
  return (
    <section className="experience" id="experience">
      <div className="experience-tree">
        <h1 className="experience-header">Experiences</h1>
        <VerticalTimeline lineColor="#3b5249">
          <ExperienceBox
            title={"Burak Bora High School / Istanbul"}
            description={"Four year's of High School education"}
            date={"2015 - 2019"}
            type={Type.education}
          />
          <ExperienceBox
            title={"IJDG / Germany"}
            description={
              "Ran a house full of volunteers. Sailed and camped in the wildlife. Learned how to live in nature."
            }
            date={"2016 - 2 weeks"}
            type={Type.volunteering}
          />
          <ExperienceBox
            title={"IJDG / Germany"}
            description={
              "Maintenance of the storage places, construction of a prefabricated house for a children's summer camp"
            }
            date={"2018 - 2 weeks"}
            type={Type.volunteering}
          />
          <ExperienceBox
            title={"AFS Exchange Student / Dominican Republic"}
            description={"Computer Science Engineering student"}
            date={"2019 - 2020"}
            type={Type.education}
          />
          <ExperienceBox
            title={"Gebze Technical University / Kocaeli"}
            description={"Computer Science Engineering student"}
            date={"2019 - present"}
            type={Type.education}
          />
        </VerticalTimeline>
      </div>
    </section>
  );
};
