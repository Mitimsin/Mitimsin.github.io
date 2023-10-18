import { useEffect, useState } from "react";

interface props {
  index: number;
  name: string;
  hoverIndex: number;
  setHoverIndex: (state: number) => void;
  currentSection: string;
  screenWidth: number;
  isOpen: boolean;
  handleOnClick: () => void;
}

export const NavbarPageButton = (props: props) => {
  const [removeAnimation, setRemoveAnimation] = useState(false);

  useEffect(() => {
    const requiredTime = 700 + props.index * 100;

    if (!removeAnimation) {
      setTimeout(() => {
        setRemoveAnimation(true);
      }, requiredTime - 50);
    }
  }, [props.index, removeAnimation]);

  useEffect(() => {
    if (props.isOpen) {
      setRemoveAnimation(false);
    }
  }, [props.isOpen]);

  return (
    <button
      className={`page-link-button speed-${props.index} makeVisible 
        ${props.currentSection === props.name ? "active" : ""} 
        ${
          props.screenWidth > 1023
            ? removeAnimation
              ? ""
              : "popIn"
            : props.isOpen
            ? removeAnimation
              ? ""
              : "popIn"
            : "hidden"
        } 
        ${
          props.hoverIndex !== -1 && props.hoverIndex !== props.index
            ? "blur"
            : ""
        } `}
      onMouseEnter={() => props.setHoverIndex(props.index)}
      onMouseLeave={() => props.setHoverIndex(-1)}
      onClick={() => {
        const targetSection = document.getElementById(props.name);
        if (targetSection) {
          const targetOffset = targetSection.getBoundingClientRect().top;
          const bodyRect = document.body.getBoundingClientRect();
          const targetPosition = targetOffset - bodyRect.top;
          window.scroll({
            top: targetPosition - 80,
            behavior: "smooth",
          });
        }
        props.handleOnClick();
      }}
    >
      {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
    </button>
  );
};
