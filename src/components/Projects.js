import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";
import { AnimatePresence, motion } from "framer-motion";

export default function Projects() {
  const [projectData, setProjectData] = useState(null);
  const [filter, setFilter] = useState("All Projects");

  useEffect(() => {
    console.log("called!")
    sanityClient
      .fetch(
        `*[_type == "project" && "${filter}" in categories[]->title] | order(publishedAt desc){
          "categories": categories[]->title,
          title,
          slug,
          categories[]->{
            title
          },
          mainImage{
            asset->{
              _id,
              url
            },
            alt 
          },
          publishedAt
        }`
      )
      .then((data) => setProjectData(data))
      .catch(console.error);
  }, [filter]);

  const filterItem = (filter) => {
    setFilter(`${filter}`);
  };

  if (!projectData) {
    return (
      <div className="w-full h-max align-middle">
        <motion.div transition={{
          y: {
            duration: 1,
            yoyo: Infinity,  
            ease: "easeIn",
          }
        }}
        animate={{ y: ["0px", "-200px"] }}>
        <div className="flex h-screen">
          <div className="m-auto">
            <div className="h-10 w-10 rounded-full bg-blue-200 mx-auto"></div>
          </div>
        </div>
      </motion.div>
      </div>
    )
  }

  return (
    <main>
      <section>
        <h1>Projects page!</h1>
        <button
          className="bg-blue-200 p-4"
          value="All Projects"
          onClick={(e) => filterItem(e.target.value)}
        >
         All Projects
        </button>
        <button
          className="bg-blue-200 p-4"
          value="Games"
          onClick={(e) => filterItem(e.target.value)}
        >
          Games
        </button>
        <button
          className="bg-blue-200 p-4"
          value="Web / Mobile App"
          onClick={(e) => filterItem(e.target.value)}
        >
          Web / Mobile App
        </button>
        <button
          className="bg-blue-200 p-4"
          value="3D Animation"
          onClick={(e) => filterItem(e.target.value)}
        >
          3D Animation
        </button>
        <button
          className="bg-blue-200 p-4"
          value="VR"
          onClick={(e) => filterItem(e.target.value)}
        >
          VR Projects
        </button>
        <button
          className="bg-blue-200 p-4"
          value="Photography"
          onClick={(e) => filterItem(e.target.value)}
        >
          Photography
        </button>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectData &&
              projectData.map((project, index) => (
                <AnimatePresence>
                  <motion.div key={index} 
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1, duration: 0.5, ease: "easeInOut" }}
                  exit={{ x: "-100%", opacity: 0, duration: 0.5, ease: "easeInOut" }}>
                    <h1>{project.slug.current}</h1>
                    <Link
                      to={"/projects/" + project.slug.current}
                      key={project.slug.current}
                    >
                      <span>
                        <h1>{project.title}</h1>
                        <img
                          src={project.mainImage.asset.url}
                          alt={project.mainImage.alt}
                        />
                      </span>
                    </Link>
                  </motion.div>
                </AnimatePresence>
              ))}
          </div>
      </section>
    </main>
  );
}
