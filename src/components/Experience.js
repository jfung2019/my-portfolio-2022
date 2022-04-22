import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import { AnimatePresence, motion } from "framer-motion";
import gear from "../assets/images/gear.png";
import arrow from "../assets/images/arrow.png";

export default function Experience() {
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

  console.log(authorData);

  if (!authorData.length < 0 || loading === true) {
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
          }}>
        </motion.div>
      </div>
    );
  }

  console.log(authorData);

  return (
    <>
      <div className="w-full py-0 bg-black">
        {/* Landing page of experience */}
        <div className="w-full px-8 md:px-[160px] relative overflow-hidden">
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
                loading="lazy"
                className="object-fit h-auto w-auto min-w-[300px] pr-0 md:pl-[0px] lg:pr-[150px]"
                src="https://raw.githubusercontent.com/jfung2019/myPortfolioImages/main/portfolio%20images/techSkills/aboutMeHeader.png"
                alt=""
              />
              {/* <div className="w-full h-auto relative">
                <svg
                  id="visual"
                  viewBox="0 0 500 500"
                  height="100%"
                  width="100%"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1">
                  <g>
                    <motion.path
                      d="M409.06419,322.5266Q395.0532,395.0532,322.5266,445.11739Q250,495.18159,163.51944,459.07135Q77.03888,422.96112,82.39949,336.48056Q87.7601,250,115.64271,196.76266Q143.52532,143.52532,196.76266,76.83657Q250,10.14783,323.24578,56.82813Q396.49156,103.50844,409.78338,176.75422Q423.07519,250,409.06419,322.5266Z"
                      fill="#EABE7B"
                      animate={{
                        d: [
                          "M409.06419,322.5266Q395.0532,395.0532,322.5266,445.11739Q250,495.18159,163.51944,459.07135Q77.03888,422.96112,82.39949,336.48056Q87.7601,250,115.64271,196.76266Q143.52532,143.52532,196.76266,76.83657Q250,10.14783,323.24578,56.82813Q396.49156,103.50844,409.78338,176.75422Q423.07519,250,409.06419,322.5266Z",
                          "M408.24461,332.63257Q415.26513,415.26513,332.63257,434.71568Q250,454.16622,179.33614,422.74697Q108.67228,391.32772,65.87585,320.66386Q23.07942,250,63.27221,176.73251Q103.46501,103.46501,176.73251,63.02288Q250,22.58075,311.86507,74.4253Q373.73015,126.26985,387.47712,188.13493Q401.22409,250,408.24461,332.63257Z",
                          "M418.08664,320.33435Q390.6687,390.6687,320.33435,427.91946Q250,465.17023,188.27506,419.31005Q126.55013,373.44987,106.38448,311.72494Q86.21883,250,84.09726,165.98785Q81.9757,81.9757,165.98785,53.98938Q250,26.00305,311.1687,76.83282Q372.3374,127.6626,408.92099,188.8313Q445.50458,250,418.08664,320.33435Z",
                          "M423.42552,332.41134Q414.82268,414.82268,332.41134,424.30554Q250,433.78841,170.96572,420.92848Q91.93144,408.06856,46.07152,329.03428Q0.21159,250,66.88003,191.77423Q133.54846,133.54846,191.77423,102.82861Q250,72.10876,305.00592,106.04846Q360.01185,139.98815,396.0201,194.99408Q432.02836,250,423.42552,332.41134Z",
                          "M409.06419,322.5266Q395.0532,395.0532,322.5266,445.11739Q250,495.18159,163.51944,459.07135Q77.03888,422.96112,82.39949,336.48056Q87.7601,250,115.64271,196.76266Q143.52532,143.52532,196.76266,76.83657Q250,10.14783,323.24578,56.82813Q396.49156,103.50844,409.78338,176.75422Q423.07519,250,409.06419,322.5266Z",
                        ],
                      }}
                      transition={{
                        repeat: Infinity,
                        ease: "easeInOut",
                        duration: 10,
                      }}></motion.path>
                  </g>
                </svg>
                <div className="absolute top-0">
                  <img loading="lazy"
                    className="object-fit h-auto w-auto min-w-[500px] pr-0 md:pl-[0px] lg:pr-[150px]"
                    src="https://raw.githubusercontent.com/jfung2019/myPortfolioImages/main/portfolio%20images/techSkills/aboutMeHeader.png"
                    alt=""
                  />
                </div>
              </div> */}
            </motion.div>
            <motion.div
              className="w-full lg:w-1/2 m-auto ml-0 md:ml-[-10px]"
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
                transition: { ease: "easeInOut", duration: 0.8 },
              }}>
              <h1 className="text-white text-3xl md:text-[32px] leading-[45px] md:leading-[60px] font-DMSerifDisplay">
                Hi! I'm Fung Lam!
              </h1>
              <p className="text-white text-3xl md:text-[32px] leading-[45px] md:leading-[60px] font-DMSerifDisplay mt-4 md:mt-8">
                A Web Developer Striving to be a full stack developer I'm a
                recent graduate of City University, School of Creative Media. I
                am currently available and looking for a full time job.
              </p>
            </motion.div>
          </div>
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
                <img loading="lazy" src={arrow} alt="arrow" />
              </motion.div>
            </div>
          </div>
        </div>
        {/* Conveyer belt title */}
        <div className="w-full px-8 mt-8">
          <div className="flex justify-between space-x-4">
            <div className="text-[40px] md:text-[70px] lg:text-[92px] font-bold text-[#EABE7B] px-8 pl-0 md:pl-[120px] font-DMSerifDisplay">
              Tech Skills
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ ease: "linear", duration: 5, repeat: Infinity }}
              className="mt-[30px] md:mt-[17px] w-[40px] h-[40px] md:w-[120px] md:h-[120px]">
              <img loading="lazy" src={gear} alt="testing" />
            </motion.div>
          </div>
        </div>
        {/* conveyer belt */}
        <div className="w-full overflow-hidden px-[20px]">
          <div className="w-full border-t-4 border-b-4 border-gray-200 py-2 md:py-5">
            <motion.div
              className="min-w-min flex space-x-1 md:space-x-4"
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
          </div>
          <div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ ease: "linear", duration: 5, repeat: Infinity }}
              className="w-[40px] h-[40px] md:w-[120px] md:h-[120px]">
              <img loading="lazy" src={gear} alt="testing" />
            </motion.div>
          </div>
          {/* conveyer belt 2 bellow */}
          <div className="w-full border-t-4 border-b-4 border-gray-200 py-2 md:py-5">
            <AnimatePresence>
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
            </AnimatePresence>
          </div>
          <div className="w-full flex justify-end">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ ease: "linear", duration: 5, repeat: Infinity }}
              className="w-[40px] h-[40px] md:w-[120px] md:h-[120px] right-0">
              <img loading="lazy" src={gear} alt="testing" />
            </motion.div>
          </div>
        </div>

        {/* Timeline */}
        <div className="w-full px-8 lg:px-[160px] mt-8">
          <div className="text-[40px] md:text-[70px] lg:text-[92px] mb-4 font-bold text-[#EABE7B] font-DMSerifDisplay">
            Experience
          </div>
          <ol className="relative border-l-4 border-white">
            {authorData.experience &&
              authorData.experience.map((experience, index) => (
                <li className="mb-10 ml-4" key={index}>
                  <div className="absolute w-[40px] h-[40px] md:w-[80px] md:h-[80px] bg-white rounded-full mt-0 -left-[23px] md:-left-[40px] border border-white text-white"></div>
                  <time className="ml-4 md:ml-[40px] text-[30px] md:text-[70px] lg:text-[92px] font-bold leading-none text-white font-DMSerifDisplay">
                    {experience.date}
                  </time>
                  <div className="mx-4 md:mx-[40px] mt-4 md:mt-8 bg-[#191919] p-4 rounded-md">
                    <h3 className="text-lg text-white font-DMSerifDisplay">
                      {experience.title}
                    </h3>
                    <h3 className="text-lg text-white font-DMSerifDisplay">
                      {experience.subTitle}
                    </h3>
                    <div className="mt-4 mb-4 text-white font-DMSerifDisplay">
                      <BlockContent
                        className=""
                        blocks={experience.experience}
                        projectId="22zf6zhh"
                        dataset="production"
                      />
                    </div>
                  </div>
                </li>
              ))}
          </ol>
        </div>
      </div>
    </>
  );
}
