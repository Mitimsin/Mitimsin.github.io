interface props {
  logo: React.FC<{ size: number }>;
  size: number;
  url: string;
  screenWidth: number;
  isOpen: boolean;
  extraClass: string;
  handleOnClick: () => void;
}

export const NavbarSocialButton = (props: props) => {
  const Logo = props.logo;

  return (
    <a
      href={props.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`social-link-button ${props.extraClass} ${
        props.screenWidth > 1023 ? "popIn" : props.isOpen ? "popIn" : "hidden"
      }`}
      onClick={() => {
        props.handleOnClick();
      }}
    >
      <Logo size={props.size} />
    </a>
  );
};
