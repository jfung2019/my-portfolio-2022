import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";

export default function Projects() {
  const [projectData, setProjectData] = useState(null);
  const [filter, setFilter] = useState("All Projects");

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "project" && "${filter}" in categories[]->title]{
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
          }
        }`
      )
      .then((data) => setProjectData(data))
      .catch(console.error);
  }, [filter]);

  console.log(projectData);

  const filterItem = (filter) => {
    setFilter(`${filter}`);
    console.log(filter);
  };

  if (!projectData) return <di>Loading!</di>

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
          value="VR projects"
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
              <article key={index}>
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
              </article>
            ))}
        </div>
      </section>
    </main>
  );
}
