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
          publishedAt
        }`
      )
      .then(data => setProjectData(data))
      .catch(console.error);

    return () => {
      clearTimeout();
    };
  }, [filter]);

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
      <div className="w-full h-screen absolute align-middle z-30">
        <motion.div
          className="w-full h-screen absolute bg-[#EABE7B]"
          initial={{ scaleY: 1.3, y: "100vh", opacity: 1 }}
          animate={{
            scaleY: 1.3,
            y: ["100vh", "0vh", "0vh", "100vh"],
            transition: {
              duration: 1.5,
              ease: [0.25, 0.25, 0.13, 1],
            },
          }}
          // onAnimationStart={() =>
          //   document.body.classList.add("overflow-hidden")
          // }
          // onAnimationComplete={() =>
          //   document.body.classList.remove("overflow-hidden")
          // }
        ></motion.div>
      </div>
    );
  }

  console.log(projectData);

  return (
    <div className="px-8 md:px-[60px] lg:px-[160px] relative overflow-hidden">
      {/* Scroll down arrow helpers */}
      <div className="absolute text-white top-[35%] right-[-60px] md:right-[-40px] hidden md:block">
        <div className="flex space-x-4 rotate-90">
          <div className="font-DmSans">Scroll down</div>
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
      <div>
        <motion.h1
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.2 } }}
          exit={{
            x: -300,
            opacity: 0,
            transition: { ease: [0.6, 0.01, -0.05, 0.95], duration: 0.7 },
          }}
          className="font-DMSerifDisplay text-[40px] md:text-[70px] lg:text-[92px] font-bold text-gold">
          My Work
        </motion.h1>
        <motion.p
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.4 } }}
          exit={{
            x: -300,
            opacity: 0,
            transition: { ease: [0.6, 0.01, -0.05, 0.95], duration: 1 },
          }}
          className="font-DmSans text-white">
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
            transition: { duration: 0.7 },
          }}
          className="mt-8">
          <button
            className="bg-[#191919] p-4 rounded-[30px] mr-1 text-white font-DMSerifDisplay mt-2 hover:bg-gold transition-all duration-300 hover:text-black-v1"
            value="All Projects"
            onClick={e => filterItem(e.target.value)}>
            All Projects
          </button>
          <button
            className="bg-[#191919] p-4 rounded-[30px] mr-1 text-white font-DMSerifDisplay mt-2 hover:bg-gold transition-all duration-300 hover:text-black-v1"
            value="Games"
            onClick={e => filterItem(e.target.value)}>
            Games
          </button>
          <button
            className="bg-[#191919] p-4 rounded-[30px] mr-1 text-white font-DMSerifDisplay mt-2 hover:bg-gold transition-all duration-300 hover:text-black-v1"
            value="Web / Mobile App"
            onClick={e => filterItem(e.target.value)}>
            Web / Mobile App
          </button>
          <button
            className="bg-[#191919] p-4 rounded-[30px] mr-1 text-white font-DMSerifDisplay mt-2 hover:bg-gold transition-all duration-300 hover:text-black-v1"
            value="3D Animation"
            onClick={e => filterItem(e.target.value)}>
            3D Animation
          </button>
          <button
            className="bg-[#191919] p-4 rounded-[30px] mr-1 text-white font-DMSerifDisplay mt-2 hover:bg-gold transition-all duration-300 hover:text-black-v1"
            value="VR"
            onClick={e => filterItem(e.target.value)}>
            VR Projects
          </button>
          <button
            className="bg-[#191919] p-4 rounded-[30px] mr-1 text-white font-DMSerifDisplay mt-2 hover:bg-gold transition-all duration-300 hover:text-black-v1"
            value="Photography"
            onClick={e => filterItem(e.target.value)}>
            Photography
          </button>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-6 md:mt-14 mb-14"
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
                              <h1 className="font-DMSerifDisplay text-white">Learn More!</h1>
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
      </div>
    </div>
  );
}
