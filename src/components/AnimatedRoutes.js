import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import Contact from "./Contact";
import AboutMe from "./AboutMe";
import SinglePost from "./SinglePost";
import Post from "./Post";
import Projects from "./Projects";
import SingleProject from "./SingleProject";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimateSharedLayout type="crossfade">
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/About" element={<AboutMe />} />
          <Route path="/Post" element={<Post />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/post/:slug" element={<SinglePost />} />
          <Route path="projects/:slug" element={<SingleProject />} />
        </Routes>
      </AnimatePresence>
    </AnimateSharedLayout>
  );
}

export default AnimatedRoutes;
