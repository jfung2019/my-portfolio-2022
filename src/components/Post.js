import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";
import { motion, AnimatePresence } from "framer-motion";
import arrow from "../assets/images/arrow.png";

export default function Post() {
  const [postData, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);

    sanityClient
      .fetch(
        `*[_type == "post" && "All Post" in categories[]->title] | order(publishedAt desc){
          "categories": categories[]->title,
          title,
          slug,
          categories[],
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
      .then(data => setPost(data))
      .catch(console.error);
  }, []);

  // animation properties
  const listItemContainerVariant = {
    show: {
      transition: { staggerChildren: 0.35 },
    },
  };

  const listItemVariant = {
    hidden: { opacity: 0, x: -500 },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { ease: [0.6, 0.01, -0.05, 0.95], duration: 1 },
    },
    exit: {
      opacity: 0,
      y: -100,
      x: 500,
      transition: { ease: "easeInOut", duration: 0.8 },
    },
  };

  console.log(postData);

  if (!postData || loading === true) {
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
          }}></motion.div>
      </div>
    );
  }

  return (
    <>
      <div className="px-8 md:px-[60px] lg:px-[160px] relative overflow-hidden">
        {/* Scroll down arrow helpers */}
        <div className="absolute text-white top-[10%] right-[-60px] md:right-[-40px] hidden md:block">
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
            animate={{ x: 0, opacity: 1 }}
            exit={{
              x: -300,
              opacity: 0,
              transition: { ease: [0.6, 0.01, -0.05, 0.95], duration: 0.7 },
            }}
            className="font-DMSerifDisplay text-[40px] md:text-[70px] lg:text-[92px] font-bold text-[#EABE7B]">
            My Blog Post
          </motion.h1>
          <motion.p
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{
              x: -300,
              opacity: 0,
              transition: { ease: [0.6, 0.01, -0.05, 0.95], duration: 0.7 },
            }}
            className="font-DmSans text-white">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Praesentium, architecto et distinctio ex sequi perferendis excepturi
            cumque repellat nostrum, exercitationem quas error quos eligendi
            deserunt quibusdam blanditiis asperiores, saepe nihil?
          </motion.p>

          <motion.div
            className="grid grid-cols-1 gap-6 md:gap-8 mt-6 md:mt-14 mb-14"
            variants={listItemContainerVariant}
            initial="hidden"
            animate="show"
            exit="exit">
            <AnimatePresence>
              {postData &&
                postData.map((post, index) => (
                  <div key={index} className="px-2">
                    <motion.div variants={listItemVariant} layout>
                      <div className="bg-[#191919] px-6 py-4 rounded-[30px]">
                        <div key={post.slug.current}>
                          <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/2">
                              <img
                                className="rounded-[30px] sm:w-[350px] sm:h-auto md:w-[600px] md:h-[400px]"
                                src={post.mainImage.asset.url}
                                alt={post.mainImage.alt}
                              />
                            </div>
                            <div className="flex flex-col w-full md:w-1/2">
                              <div className="my-auto">
                                <h1 className="text-[24px] text-white text-left font-DMSerifDisplay mb-4">Date: {post.publishedAt}</h1>
                                <h1 className="text-[32px] text-[#EABE7B] text-left font-DMSerifDisplay mb-4">
                                  {post.title}
                                </h1>
                                <h1 className="text-base text-white text-left mb-2 font-DmSans">
                                  lorem ipsum dolor sit amet, consectetur adip
                                  lorem ipsum dolor sit amet, consectetur adip
                                  lorem ipsum dolor sit amet, consectetur adip
                                  lorem ipsum dolor sit amet, consectetur adip
                                </h1>
                                <button className="text-[24px] border-b-4 border-[#EABE7B] w-[120px] text-left text-white font-DMSerifDisplay mt-8">
                                  <a href={/Post/ + post.slug.current}>
                                    Read More
                                  </a>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </>
  );
}
