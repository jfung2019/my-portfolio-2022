import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import SinglePost from "./components/SinglePost";
import Post from "./components/Post";
import Projects from "./components/Projects";
import SingleProject from "./components/SingleProject";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <Router>
      <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Contact" element={<Contact/>}/>
          <Route path="/Experience" element={<Experience/>}/>
          <Route path="/post" element={<Post/>}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/post/:slug" element={<SinglePost/>}/>
          <Route path="/projects/:slug" element={<SingleProject/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
