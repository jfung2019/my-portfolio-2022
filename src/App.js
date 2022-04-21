import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar";
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
  return (
    <div className="App bg-black">
      <Router>
        <NavBar />
        <AnimatedRoutes />
      </Router>
    </div>
  );
}

export default App;
