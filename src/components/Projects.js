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

  return (
    <main>
      <section>
      <h1>Projects page!</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectData && projectData.map((project, index) => (
          <article>
            <Link to={"/projects/" + project.slug.current} key={project.slug.current}>
              <span key={index}>
                <span>
                  <h1>
                    {project.title}
                  </h1>
                </span>
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