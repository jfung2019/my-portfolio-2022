import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";
import { motion } from "framer-motion";
import BlockContent from "@sanity/block-content-to-react";

export default function Projects() {
  const [projectData, setProjectData] = useState(null);
  const [authorData, setAuthorData] = useState(null);
  const [filter, setFilter] = useState("All Projects");
  const [loading, setLoading] = useState(true);

  // Animate card on press filter
  const [animateCard, setAnimateCard] = useState([
    { y: 0, opacity: 1, transition: { delay: 0.6 } },
  ]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);

    sanityClient
      .fetch(
        `*[_type == "project" && "${filter}" in categories[]->title] | order(publishedAt desc)
        {
          "categories": categories[]->title,
          title,
          demoUrl,
          codeUrl,
          isFeatured,
          techUsed,
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
          publishedAt,
          "bio": author-> bioForProjectPage,
        }`
      )
      .then(data => setProjectData(data))
      .catch(console.error);

    return () => {
      clearTimeout();
    };
  }, [filter]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "author"]{
          bioForProjectPage,
        }`
      )
      .then(data => setAuthorData(data[0]))
      .catch(console.error);
  }, []);

  const filterItem = filter => {
    setFilter(`${filter}`);

    // Change animation properties on click
    setAnimateCard([{ y: 100, opacity: 0 }]);
    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);
    }, 500);
  };

  if (!projectData || loading === true) {
    return (
      <div className="w-full h-screen fixed align-middle z-30">
        <motion.div
          className="w-full h-screen absolute bg-[#EABE7B]"
          initial={{ scaleY: 1.3, y: "100vh", opacity: 1 }}
          animate={{
            scaleY: 1.3,
            y: ["100vh", "0vh", "0vh", "130vh"],
            transition: {
              duration: 1.5,
              ease: [0.25, 0.25, 0.25, 0.75],
            },
          }}>
          <h1 className="text-black-v1 absolute w-full h-full flex items-center justify-center top-[-80px] font-DMSerifDisplay text-[32px] lg:text-[40px] font-bold">
            Projects
          </h1>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="px-8 md:px-[60px] lg:px-[160px] relative overflow-hidden">
      <div>
        <motion.h1
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{
            x: -300,
            opacity: 0,
            transition: { ease: [0.6, 0.01, -0.05, 0.95], duration: 0.7 },
          }}
          className="font-DMSerifDisplay text-[40px] md:text-[70px] lg:text-[92px] font-bold text-gold">
          My Work
        </motion.h1>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{
            x: -300,
            opacity: 0,
            transition: { ease: [0.6, 0.01, -0.05, 0.95], duration: 0.7 },
          }}
          className="font-DmSans text-white">
          <BlockContent
            blocks={authorData.bioForProjectPage}
            projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
            dataset="production"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.3 } }}
          exit={{
            opacity: 0,
            transition: { duration: 0.7 },
          }}
          className="mt-8">
          <button
            className={`p-4 rounded-[30px] mr-1 ${
              filter === "All Projects"
                ? "bg-gold text-black-v1"
                : "bg-[#191919] text-white"
            } font-DMSerifDisplay mt-2 hover:bg-gold transition-all duration-500 hover:text-black-v1`}
            value="All Projects"
            onClick={e => filterItem(e.target.value)}>
            All Projects
          </button>
          <button
            className={`${
              filter === "Games"
                ? "bg-gold text-black-v1"
                : "bg-[#191919] text-white"
            } p-4 rounded-[30px] mr-1 font-DMSerifDisplay mt-2 hover:bg-gold transition-all duration-500 hover:text-black-v1`}
            value="Games"
            onClick={e => filterItem(e.target.value)}>
            Games
          </button>
          <button
            className={`${
              filter === "Web / Mobile App"
                ? "bg-gold text-black-v1"
                : "bg-[#191919] text-white"
            } p-4 rounded-[30px] mr-1 font-DMSerifDisplay mt-2 hover:bg-gold transition-all duration-500 hover:text-black-v1`}
            value="Web / Mobile App"
            onClick={e => filterItem(e.target.value)}>
            Web / Mobile App
          </button>
          <button
            className={`${
              filter === "3D Animation"
                ? "bg-gold text-black-v1"
                : "bg-[#191919] text-white"
            } p-4 rounded-[30px] mr-1 font-DMSerifDisplay mt-2 hover:bg-gold transition-all duration-500 hover:text-black-v1`}
            value="3D Animation"
            onClick={e => filterItem(e.target.value)}>
            3D Animation
          </button>
          <button
            className={`${
              filter === "VR"
                ? "bg-gold text-black-v1"
                : "bg-[#191919] text-white"
            } p-4 rounded-[30px] mr-1 font-DMSerifDisplay mt-2 hover:bg-gold transition-all duration-500 hover:text-black-v1`}
            value="VR"
            onClick={e => filterItem(e.target.value)}>
            VR Projects
          </button>
          <button
            className={`${
              filter === "Photography"
                ? "bg-gold text-black-v1"
                : "bg-[#191919] text-white"
            } p-4 rounded-[30px] mr-1 font-DMSerifDisplay mt-2 hover:bg-gold transition-all duration-500 hover:text-black-v1`}
            value="Photography"
            onClick={e => filterItem(e.target.value)}>
            Photography
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-6 md:mt-14 mb-14">
          {projectData &&
            projectData.map((project, index) => (
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                whileInView={animateCard}
                transition={{ duration: 0.5, delayChildren: 0.5 }}
                exit={{
                  opacity: 0,
                  x: "100vw",
                  transition: { ease: "easeInOut", duration: 0.8 },
                }}
                viewport={{ once: true }}
                key={index}
                className="px-2">
                <div>
                  <div className="bg-[#191919] px-4 md:px-8 py-4 rounded-[30px]">
                    <Link
                      to={/projects/ + project.slug.current}
                      key={project.slug.current}>
                      <div>
                        <h1 className="w-full truncate text-[30px] text-white hover:text-gold text-right mb-2 font-DMSerifDisplay py-4">
                          {project.title}
                        </h1>
                        <div className="rounded-[30px] w-full relative">
                          <div
                            className={`w-full h-full absolute flex-col top-0 rounded-[30px] bg-transparent opacity-0 hover:opacity-100 hover:bg-gold transition-all duration-500 flex justify-center items-center text-white font-bold text-DMSerifDisplay text-[24px]`}>
                            <h1 className="font-DMSerifDisplay text-[#202020]">
                              Tech Used
                            </h1>
                            <div className="flex flex-wrap justify-center space-x-2 pt-2 mb-4">
                              {project.techUsed !== null &&
                                project.techUsed.map((techUsed, index) => (
                                  <button
                                    className="bg-[#202020] rounded-[30px] px-2 py-1 mt-2 text-white font-DMSerifDisplay text-sm"
                                    key={index}>
                                    {techUsed}
                                  </button>
                                ))}
                            </div>
                            <h1 className="font-DMSerifDisplay text-white">
                              Learn More!
                            </h1>
                          </div>
                          <img
                            className="rounded-[30px]"
                            src={project.mainImage.asset.url}
                            alt={project.mainImage.alt}
                          />
                        </div>
                      </div>
                    </Link>

                    <div className="space-x-2 pt-2 mb-4">
                      {project.demoUrl === null && project.codeUrl === null ? (
                        <button className="bg-[#202020] rounded-[30px] py-1 px-4 mt-2 text-white font-DMSerifDisplay hover:bg-[#eabe7b] hover:text-black-v1">
                          <a
                            href={/projects/ + project.slug.current}
                            target="_blank"
                            rel="noreferrer">
                            Learn More
                          </a>
                        </button>
                      ) : null}
                      {project.demoUrl !== null ? (
                        <button className="bg-[#202020] rounded-[30px] py-1 px-4 mt-2 text-white font-DMSerifDisplay hover:bg-[#eabe7b] hover:text-black-v1">
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noreferrer">
                            Demo
                          </a>
                        </button>
                      ) : null}
                      {project.codeUrl !== null ? (
                        <button className="bg-[#202020] rounded-[30px] py-1 px-4 mt-2 text-white font-DMSerifDisplay hover:bg-[#eabe7b] hover:text-black-v1">
                          <a
                            href={project.codeUrl}
                            target="_blank"
                            rel="noreferrer">
                            Git Hub
                          </a>
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}
