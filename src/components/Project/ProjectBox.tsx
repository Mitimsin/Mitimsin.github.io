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
        <h1 className="project-box-header">{props.title}</h1>
        <p className="project-box-category">{props.category}</p>
        <p className="project-box-moreinfo">Click for more information</p>
      </span>
    </Link>
  );
};
