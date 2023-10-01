import { useEffect, useState } from "react";

interface props {
  index: number;
  logo: React.FC<{ size: number }>;
  size: number;
  url: string;
  screenWidth: number;
  isOpen: boolean;
  handleOnClick: () => void;
}

export const NavbarSocialButton = (props: props) => {
  const Logo = props.logo;
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
    <a
      href={props.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`social-link-button speed-${props.index} 
      ${
        props.screenWidth > 1023
          ? removeAnimation
            ? ""
            : "popInSocial"
          : props.isOpen
          ? removeAnimation
            ? ""
            : "popInSocial"
          : "hidden"
      } `}
      onClick={() => {
        props.handleOnClick();
      }}
    >
      <Logo size={props.size} />
    </a>
  );
};
