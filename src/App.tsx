import "./App.css";
import { Experience } from "./components/Experience";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <Experience />
    </div>
  );
}

export default App;
