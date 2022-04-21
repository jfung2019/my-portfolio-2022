import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";
import { motion, AnimatePresence } from "framer-motion";
import arrow from "../assets/images/arrow.png";

export default function Projects() {
  const [projectData, setProjectData] = useState(null);
  const [filter, setFilter] = useState("All Projects");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);

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
          publishedAt
        }`
      )
      .then(data => setProjectData(data))
      .catch(console.error);

    return () => {
      clearTimeout();
    };
  }, [filter]);

  console.log(loading);

  const filterItem = filter => {
    setFilter(`${filter}`);
  };

  // animation properties
  const listItemContainerVariant = {
    show: {
      transition: { staggerChildren: 0.35 },
    },
  };

  const listItemVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      y: 0,
      transition: { ease: [0.6, 0.01, -0.05, 0.95], duration: 1 },
    },
    exit: {
      opacity: 0,
      y: -100,
      transition: { ease: "easeInOut", duration: 0.8 },
    },
  };

  if (!projectData || loading === true) {
    return (
      <motion.div
        className="w-full h-screen absolute bg-[#EABE7B]"
        initial={{ scaleY: 1, y: "100vh", opacity: 1 }}
        animate={{
          scaleY: 1,
          y: ["100vh", "0vh", "0vh", "100vh"],
          transition: {
            duration: 1.2,
            ease: [0.25, 0.25, 0.13, 1],
          },
        }}>
        {/* <img
    className="h-full mx-auto"
    src="https://cdn.dribbble.com/users/2367833/screenshots/16195486/media/f0c5bacd01dad236bb23fb726330fa23.gif"
    alt="loading gif"
  /> */}
      </motion.div>
    );
  }

  console.log(projectData);

  return (
    <main className="px-8 md:px-[60px] lg:px-[160px] relative overflow-hidden">
      {/* Scroll down arrow helpers */}
      <div className="absolute text-white top-[25%] md:top-[50%] right-[-60px] md:right-[-40px] hidden md:block">
            <div className="flex space-x-4 rotate-90">
              <div>Scroll down</div>
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: 30 }}
                transition={{
                  type: "Tween",
                  stiffness: 15,
                  duration: 1,
                  repeat: Infinity,
                }}>
                <img src={arrow} alt="arrow" />
              </motion.div>
            </div>
          </div>
      <section>
        <motion.h1
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{
            x: -300,
            opacity: 0,
            transition: { ease: [0.6, 0.01, -0.05, 0.95], duration: 0.7 },
          }}
          className="font-DMSerifDisplay text-[40px] md:text-[70px] lg:text-[92px] font-bold text-[#EABE7B]">
          My Work
        </motion.h1>
        <motion.p
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{
            x: -300,
            opacity: 0,
            transition: { ease: [0.6, 0.01, -0.05, 0.95], duration: 0.7 },
          }}
          className="font-DMSerifDisplay text-white mb-8">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium,
          architecto et distinctio ex sequi perferendis excepturi cumque
          repellat nostrum, exercitationem quas error quos eligendi deserunt
          quibusdam blanditiis asperiores, saepe nihil?
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -100,
            transition: {  duration: 0.7 },
          }}
          className="">
          <button
            className="bg-[#191919] p-4 rounded-[30px] mr-1 text-white font-DMSerifDisplay mt-2"
            value="All Projects"
            onClick={e => filterItem(e.target.value)}>
            All Projects
          </button>
          <button
            className="bg-[#191919] p-4 rounded-[30px] mr-1 text-white font-DMSerifDisplay mt-2"
            value="Games"
            onClick={e => filterItem(e.target.value)}>
            Games
          </button>
          <button
            className="bg-[#191919] p-4 rounded-[30px] mr-1 text-white font-DMSerifDisplay mt-2"
            value="Web / Mobile App"
            onClick={e => filterItem(e.target.value)}>
            Web / Mobile App
          </button>
          <button
            className="bg-[#191919] p-4 rounded-[30px] mr-1 text-white font-DMSerifDisplay mt-2"
            value="3D Animation"
            onClick={e => filterItem(e.target.value)}>
            3D Animation
          </button>
          <button
            className="bg-[#191919] p-4 rounded-[30px] mr-1 text-white font-DMSerifDisplay mt-2"
            value="VR"
            onClick={e => filterItem(e.target.value)}>
            VR Projects
          </button>
          <button
            className="bg-[#191919] p-4 rounded-[30px] mr-1 text-white font-DMSerifDisplay mt-2"
            value="Photography"
            onClick={e => filterItem(e.target.value)}>
            Photography
          </button>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-6 md:mt-8"
          variants={listItemContainerVariant}
          initial="hidden"
          animate="show"
          exit="exit">
          <AnimatePresence>
            {projectData &&
              projectData.map((project, index) => (
                <div key={index} className="px-2">
                  <motion.div variants={listItemVariant} layout>
                    <div className="bg-[#191919] px-6 py-4 rounded-[30px]">
                      <Link
                        to={/projects/ + project.slug.current}
                        key={project.slug.current}>
                        <div>
                          <h1 className="text-[30px]  text-white text-right mb-2 font-DMSerifDisplay py-4">
                            {project.title}
                          </h1>
                          {/* <div className="space-x-2 pt-2 mb-4 h-[100px]">
                            {project.techUsed !== null
                              ? project.techUsed.map((techUsed, index) => (
                                  <button
                                    className="bg-[#202020] rounded-[30px] py-1 px-4 mt-2 text-white font-DMSerifDisplay"
                                    key={index}>
                                    {techUsed}
                                  </button>
                                ))
                              : null}
                          </div> */}
                          <div>
                            <img
                              className="rounded-[30px]"
                              src={project.mainImage.asset.url}
                              alt={project.mainImage.alt}
                            />
                          </div>
                        </div>
                      </Link>

                      <div className="space-x-2 pt-2 mb-4">
                        {project.demoUrl !== null ? (
                          <button className="bg-[#202020] rounded-[30px] py-1 px-4 mt-2 text-white font-DMSerifDisplay hover:bg-[#eabe7b]">
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noreferrer">
                              Demo
                            </a>
                          </button>
                        ) : null}
                        {project.codeUrl !== null ? (
                          <button className="bg-[#202020] rounded-[30px] py-1 px-4 mt-2 text-white font-DMSerifDisplay hover:bg-[#eabe7b]">
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
                  </motion.div>
                </div>
              ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </main>
  );
}
