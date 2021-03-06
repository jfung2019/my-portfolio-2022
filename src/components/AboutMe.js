import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import { motion } from "framer-motion";
import gear from "../assets/images/gear.png";
import arrow from "../assets/images/arrow.png";

export default function AboutMe() {
  const [authorData, setAuthorData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);

    sanityClient
      .fetch(
        `*[_type == "author"]{
              experience,
              techSkills
        }`
      )
      .then(data => setAuthorData(data[0]))
      .catch(console.error);

    return () => {
      clearTimeout();
    };
  }, []);

  // Animation
  const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

  const HeadingContainer = {
    initial: {
      y: 0,
    },
    animate: {
      y: 0,
      transition: {
        delayChildren: 0.05,
        staggerChildren: 0.05,
      },
    },
  };

  const HeaderOne = {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: { y: 0, opacity: 1, transition: { duration: 3, ...transition } },
    exit: {
      x: "100vw",
      opacity: 0,
      transition: { duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] },
    },
  };
  // End of animation

  if (!authorData.length < 0 || loading === true) {
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
            About Me
          </h1>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full py-0 bg-general-black">
        {/* Landing page of experience */}
        <div className="w-full px-8 md:px-[80px] lg:px-[160px] relative overflow-hidden">
          <div className="w-full h-screen flex flex-col lg:flex-row m-auto">
            <motion.div
              className="w-full lg:w-1/2 my-auto flex justify-start md:justify-start lg:justify-end "
              initial={{ scale: 0, opacity: 0, x: -500, y: 300 }}
              animate={{
                scale: 1,
                opacity: 1,
                x: 0,
                y: 0,
                transition: { ease: [0.6, 0.01, -0.05, 0.95], duration: 1 },
              }}
              exit={{
                y: -400,
                opacity: 0,
                transition: { ease: [0.25, 0.25, 0.13, 1], duration: 0.8 },
              }}>
              <img
                className="object-fit h-auto w-auto min-w-[300px] pr-0 md:pl-[0px] lg:pr-[150px]"
                src="https://raw.githubusercontent.com/jfung2019/myPortfolioImages/main/portfolio%20images/techSkills/aboutMeProfileblacker.webp"
                alt=""
              />
            </motion.div>
            <motion.div
              className="w-full lg:w-1/2 m-auto lg:ml-[-10px]"
              initial={{ scale: 0, opacity: 0, x: -500, y: 300 }}
              animate={{
                scale: 1,
                opacity: 1,
                x: 0,
                y: 0,
                transition: { ease: [0.6, 0.01, -0.05, 0.95], duration: 1 },
              }}
              exit={{
                y: -400,
                opacity: 0,
                transition: { ease: [0.25, 0.25, 0.13, 1], duration: 0.8 },
              }}>
              <h1 className="text-white text-[24px] lg:text-[32px] leading-[40px] md:leading-[40px] lg:leading-[60px] font-DMSerifDisplay mt-0 md:mt-8 lg:mt-0">
                Hi! I'm Fung Lam!
              </h1>
              <p className="text-white text-[24px] lg:text-[32px] leading-[40px] md:leading-[40px] lg:leading-[60px] font-DMSerifDisplay mt-4 lg:mt-8">
                A Web Developer Striving to be a full stack developer I'm a
                recent graduate of City University, School of Creative Media. I
                am currently available and looking for a full time job.
              </p>
            </motion.div>
          </div>
          {/* Scroll down arrow helpers */}
          <div className="absolute text-white top-[25%] md:top-[50%] right-[-60px] md:right-[-40px] hidden md:block">
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
                <img loading="lazy" src={arrow} alt="arrow" />
              </motion.div>
            </div>
          </div>
        </div>
        {/* Conveyer belt title */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { duration: 1 } }}
          exit={{ opacity: 0 }}
          viewport={{ once: true }}>
          <div className="w-full pl-[40px] pr-[25px] mt-8 overflow-hidden">
            <div className="flex justify-between space-x-4">
              {/* Heading Tech Skills */}
              <motion.div
                variants={HeadingContainer}
                initial="initial"
                whileInView="animate"
                exit="exit"
                viewport={{ once: true }}
                className="text-[40px] md:text-[70px] lg:text-[92px] font-bold text-[#EABE7B] px-8 pl-0 md:pl-[40px] lg:pl-[120px] font-DMSerifDisplay">
                <motion.span className="inline-block" variants={HeaderOne}>
                  T
                </motion.span>
                <motion.span className="inline-block" variants={HeaderOne}>
                  e
                </motion.span>
                <motion.span className="inline-block" variants={HeaderOne}>
                  c
                </motion.span>
                <motion.span className="inline-block" variants={HeaderOne}>
                  h
                </motion.span>
                <span className="pl-[4.5px] md:pl-4"></span>
                <motion.span className="inline-block" variants={HeaderOne}>
                  S
                </motion.span>
                <motion.span className="inline-block" variants={HeaderOne}>
                  k
                </motion.span>
                <motion.span className="inline-block" variants={HeaderOne}>
                  i
                </motion.span>
                <motion.span className="inline-block" variants={HeaderOne}>
                  l
                </motion.span>
                <motion.span className="inline-block" variants={HeaderOne}>
                  l
                </motion.span>
                <motion.span className="inline-block" variants={HeaderOne}>
                  s
                </motion.span>
              </motion.div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ ease: "linear", duration: 5, repeat: Infinity }}
                className="mt-[30px] md:mt-[23px] lg:mt-[17px] w-[40px] h-[40px] md:w-[80px] md:h-[80px] lg:w-[120px] lg:h-[120px]">
                <img src={gear} alt="testing" />
              </motion.div>
            </div>
          </div>
          {/* conveyer belt */}
          <div className="w-full overflow-hidden px-[20px]">
            <div className="w-full border-t-4 border-b-4 border-gray-200 py-2 md:py-5">
              <motion.div
                className="min-w-min hidden space-x-1 md:space-x-4 md:flex"
                initial={{ x: "100%" }}
                animate={{ x: "-100%" }}
                transition={{ ease: "linear", duration: 30, loop: Infinity }}>
                {authorData.techSkills.map((techSkills, index) => (
                  <div key={index}>
                    <img
                      loading="lazy"
                      className="object-cover h-auto w-[150px] min-w-[45px]"
                      src={techSkills}
                      alt="techSkills"
                    />
                  </div>
                ))}
              </motion.div>
              <motion.div
                className="min-w-min flex space-x-1 md:space-x-4 md:hidden"
                initial={{ x: "50%" }}
                animate={{ x: "-100%" }}
                transition={{ ease: "linear", duration: 30, loop: Infinity }}>
                {authorData.techSkills.map((techSkills, index) => (
                  <div key={index}>
                    <img
                      loading="lazy"
                      className="object-cover h-auto w-[150px] min-w-[45px]"
                      src={techSkills}
                      alt="techSkills"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
            <div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ ease: "linear", duration: 5, repeat: Infinity }}
                className="w-[40px] h-[40px] md:w-[80px] md:h-[80px] lg:w-[120px] lg:h-[120px]">
                <img loading="lazy" src={gear} alt="testing" />
              </motion.div>
            </div>
            {/* conveyer belt 2 bellow */}
            <div className="w-full border-t-4 border-b-4 border-gray-200 py-2 md:py-5">
              <motion.div
                className="min-w-min flex space-x-1 md:space-x-4"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ ease: "linear", duration: 30, loop: Infinity }}>
                {authorData.techSkills.map((techSkills, index) => (
                  <div key={index}>
                    <img
                      loading="lazy"
                      className="object-cover h-auto w-[150px] min-w-[45px]"
                      src={techSkills}
                      alt="techSkills"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
            <div className="w-full flex justify-end">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ ease: "linear", duration: 5, repeat: Infinity }}
                className="w-[40px] h-[40px] md:w-[80px] md:h-[80px] lg:w-[120px] lg:h-[120px] right-0">
                <img loading="lazy" src={gear} alt="testing" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { duration: 1 } }}
          exit={{ opacity: 0 }}
          viewport={{ once: true }}
          className="w-full px-8 md:px-[70px] lg:px-[160px] mt-8 overflow-hidden">
          {/* Heading Experience Title */}
          <motion.div
            variants={HeadingContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            exit="exit"
            className="text-[40px] md:text-[70px] lg:text-[92px] mb-4 font-bold text-[#EABE7B] font-DMSerifDisplay">
            <motion.span className="inline-block" variants={HeaderOne}>
              E
            </motion.span>
            <motion.span className="inline-block" variants={HeaderOne}>
              x
            </motion.span>
            <motion.span className="inline-block" variants={HeaderOne}>
              p
            </motion.span>
            <motion.span className="inline-block" variants={HeaderOne}>
              e
            </motion.span>
            <motion.span className="inline-block" variants={HeaderOne}>
              r
            </motion.span>
            <motion.span className="inline-block" variants={HeaderOne}>
              i
            </motion.span>
            <motion.span className="inline-block" variants={HeaderOne}>
              e
            </motion.span>
            <motion.span className="inline-block" variants={HeaderOne}>
              n
            </motion.span>
            <motion.span className="inline-block" variants={HeaderOne}>
              c
            </motion.span>
            <motion.span className="inline-block" variants={HeaderOne}>
              e
            </motion.span>
          </motion.div>
          <ol className="relative border-l-4 border-white">
            {authorData.experience &&
              authorData.experience.map((experience, index) => (
                <li className="mb-10 ml-4" key={index}>
                  <div className="absolute w-[40px] h-[40px] md:w-[60px] md:h-[60px] bg-white rounded-full mt-0 -left-[23px] md:-left-[33px] border border-white text-white"></div>
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{
                      opacity: [0, 1],
                      y: 0,
                      transition: {
                        duration: 1,
                        ease: [0.43, 0.13, 0.23, 0.96],
                      },
                    }}
                    viewport={{ once: true }}
                    className="ml-4 md:ml-[40px] text-[30px] md:text-[56px] font-bold leading-none text-white font-DMSerifDisplay">
                    {experience.date}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 200 }}
                    whileInView={{
                      opacity: [0, 1],
                      x: 0,
                      transition: {
                        duration: 1,
                        delay: 0.5,
                        ease: [0.43, 0.13, 0.23, 0.96],
                      },
                    }}
                    viewport={{ once: true }}
                    className="mx-4 md:mx-[40px] mt-4 md:mt-8 bg-[#191919] p-4 rounded-md">
                    <h3 className="text-2xl text-white font-DMSerifDisplay">
                      {experience.title}
                    </h3>
                    <h3 className="text-2xl text-white font-DMSerifDisplay">
                      {experience.subTitle}
                    </h3>
                    <div className="mt-4 mb-4 text-[16px] text-white font-DmSans">
                      <BlockContent
                        blocks={experience.experience}
                        projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                        dataset="production"
                      />
                    </div>
                  </motion.div>
                </li>
              ))}
          </ol>
        </motion.div>
      </div>
    </>
  );
}
