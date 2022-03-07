import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";

export default function Projects() {
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    sanityClient.fetch(
      `*[_type == "project"]{
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
     }`)
    .then((data) => setProjectData(data))
    .catch((console.error));
  }, []);

  console.log(projectData)

  const filterItem = (filter) => {
    console.log(filter);
  };

  return (
    <main>
      <section>
      <h1>Projects page!</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectData && projectData.map((project, index) => (
          <article key={index}>
          <button  className="bg-blue-200 p-4" value={project.categories[0].title} onClick={e => filterItem(e.target.value)}>
            {project.categories[0].title}
          </button>

            <Link to={"/projects/" + project.slug.current} key={project.slug.current}>
              <span>
                <h1>
                  {project.title}
                </h1>
                <img src={project.mainImage.asset.url} alt={project.mainImage.alt} />
              </span>
            </Link>
          </article>
          ))}
        </div>
      </section>
    </main>
  )
}