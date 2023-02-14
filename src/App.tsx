import "./App.css";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
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
      <Footer />
    </div>
  );
}

export default App;
