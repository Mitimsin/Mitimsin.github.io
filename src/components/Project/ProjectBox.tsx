import { Link } from "react-router-dom";

interface props {
  id: string;
  title: string;
  category: string;
}

export const ProjectBox = (props: props) => {
  const projectImage = `${process.env.PUBLIC_URL}/projects/${props.id}/cover.png`;

  return (
    <Link
      to={`/${props.id}`}
      className="project-box slideInLeft"
      style={{
        backgroundImage: `url(${projectImage}`,
      }}
    >
      <span className="project-text">
        <h1>{props.title}</h1>
        <p>{props.category}</p>
      </span>
    </Link>
  );
};
