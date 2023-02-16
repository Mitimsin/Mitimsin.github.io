interface props {
  name: string;
  activeTab: string;
  handleTabclick: (name: string) => void;
}

export const ProjectTab = (props: props) => {
  console.log(`name: ${props.name} === acitveTab: ${props.activeTab}`);

  return (
    <button
      className={`project-tab-bar-piece ${
        props.name === props.activeTab ? "active" : ""
      }`}
      onClick={() => {
        props.handleTabclick(props.name);
      }}
    >
      {props.name}
    </button>
  );
};
