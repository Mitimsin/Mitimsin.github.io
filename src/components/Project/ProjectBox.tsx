import { Link } from "react-router-dom";

interface props {
  id: string;
  title: string;
  category: string;
  url: string;
}

export const ProjectBox = (props: props) => {
  return (
    <Link
      to={`/${props.id}`}
      className="project-box slideInLeft"
      style={{
        backgroundImage: `url(${props.url}`,
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
