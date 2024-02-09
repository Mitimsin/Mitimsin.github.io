import React from "react";
import { Link } from "react-router-dom";

interface props {
    url: string;
    title: string;
    category: string;
    languages: string[];
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
            <div className="project-text">
                <h1 className="project-box-header">{props.title}</h1>
                <p className="project-box-category">{props.category}</p>
                <div className="project-box-language-box">
                    {props.languages.map((language, index) => (
                        <React.Fragment key={index}>
                            <p className="project-box-language-text">
                                {language}
                            </p>
                            {index !== props.languages.length - 1 && (
                                <span> ● </span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
                <p className="project-box-moreinfo">
                    Click for more information
                </p>
            </div>
        </Link>
    );
};
