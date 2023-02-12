import "./App.css";
import { Experience } from "./components/Experience";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";
import { Skill } from "./components/Skill";

function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <Experience />
      <Skill />
      <div style={{ height: "200px" }}></div>
    </div>
  );
}

export default App;
