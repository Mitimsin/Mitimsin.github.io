interface props {
  name: string;
  currentSection: string;
  screenWidth: number;
  isOpen: boolean;
  extraClass: string;
  handleOnClick: () => void;
}

export const NavbarPageButton = (props: props) => {
  return (
    <a
      href={`#${props.name}`}
      className={` ${props.extraClass} ${
        props.currentSection === props.name
          ? "page-link-button-active"
          : "page-link-button"
      } ${
        props.screenWidth > 1023 ? "popIn" : props.isOpen ? "popIn" : "hidden"
      }`}
      onClick={() => {
        document
          .getElementById(props.name)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        props.handleOnClick();
      }}
    >
      {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
    </a>
  );
};
