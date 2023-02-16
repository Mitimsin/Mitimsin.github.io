interface props {
  name: string;
}

export const ProjectBox = (props: props) => {
  return <div>{props.name}</div>;
};
