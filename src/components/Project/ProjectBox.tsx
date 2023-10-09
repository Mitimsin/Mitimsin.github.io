import { Link } from "react-router-dom";

interface props {
  url: string;
  title: string;
  category: string;
  imageUrl: string;
}

export const ProjectBox = (props: props) => {
  return (
    <Link
      to={`/${props.url}`}
      className="project-box slideInLeft"
      style={{
        backgroundImage: `url(${props.imageUrl}`,
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
