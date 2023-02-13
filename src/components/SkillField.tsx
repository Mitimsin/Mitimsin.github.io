interface props {
  title: string;
  skills: string[];
}

export const SkillField = (props: props) => {
  return (
    <div className="skill-field">
      <h1>{props.title}</h1>
      <ul className="skill-list">
        {props.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
};
