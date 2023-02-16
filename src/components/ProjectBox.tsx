import { Type } from "./Projects";

interface props {
  project: {
    id: string;
    title: string;
    type: Type;
    language: string[];
    category: string;
    link: string;
    description: string;
  };
}

export const ProjectBox = (props: props) => {
  const projectImage = `${process.env.PUBLIC_URL}/projects/${props.project.id}/cover.png`;

  return (
    <a
      role="button"
      href={`/${props.project.id}`}
      className="project-box slideInLeft"
      style={{
        backgroundImage: `url(${projectImage}`,
      }}
    >
      <span className="project-text">
        <h1>{props.project.title}</h1>
        <p>{props.project.category}</p>
      </span>
    </a>
  );
};
