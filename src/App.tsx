import "./App.css";
import { Contact } from "./components/Contact";
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
      <div className="spacer"></div>
      <Skill />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
