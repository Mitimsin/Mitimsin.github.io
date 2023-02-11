import { ExperienceBox, Type } from "./ExperienceBox";

export const Experience = () => {
  return (
    <section className="experience" id="experience">
      <h1 className="experience-header">My Experiences</h1>
      <div className="experience-tree">
        <ExperienceBox
          title={"Burak Bora High School / Istanbul"}
          description={"Four year's of High School education"}
          years={"2015 - 2019"}
          type={Type.education}
        />
        <ExperienceBox
          title={"IJDG / Germany"}
          description={
            "Ran a house full of volunteers. Sailed and camped in the wildlife. Learned how to live in nature."
          }
          years={"2016"}
          type={Type.volunteering}
        />
        <ExperienceBox
          title={"IJDG / Germany"}
          description={
            "Maintenance of the storage places, construction of a prefabricated house for a children's summer camp"
          }
          years={"2016"}
          type={Type.volunteering}
        />
        <ExperienceBox
          title={"AFS Exchange Student / Dominican Republic"}
          description={"Computer Science Engineering student"}
          years={"2019"}
          type={Type.education}
        />
        <ExperienceBox
          title={"Gebze Technical University / Kocaeli"}
          description={"Computer Science Engineering student"}
          years={"2019 - present"}
          type={Type.education}
        />
      </div>
    </section>
  );
};
