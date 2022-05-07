import React, { useState, useEffect } from "react";
import sanityClient from "../client";
import BlockContent from "@sanity/block-content-to-react";
import { motion } from "framer-motion";

export default function Home() {
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    sanityClient
      .fetch(
        `*[_type == "author"]
          {
            name,
            introOne,
            introTwo,
            introThree,
            lastName,
            title,
            resumeOrCV{
              asset->{
                _id,
                url
              }
            },
            recomendationLetter{
              asset->{
                _id,
                url
              }
            },
            bio,
            "authorImage": image.asset-> url
          }
        `
      )
      .then(data => setAuthorData(data[0]))
      .catch(console.error);
  }, []);

  const spanVariants = {
    visible: { y: 0, scaleY: 1 },
    hover: {
      y: [-1, -2, -2.8, 0.9, 0],
      scaleY: [1, 1.3, 0.8, 1, 1.2],
      color: "red",
    },
  };

  if (!authorData || loading === true) {
    return (
      <div className="w-full h-screen absolute align-middle z-30">
        <motion.div
          className="w-full h-screen absolute bg-[#EABE7B]"
          initial={{ scaleY: 1.5, y: "100vh", opacity: 1 }}
          animate={{
            scaleY: 1.5,
            y: ["100vh", "5vh", "5vh", "0vh"],
            opacity: [1, 1, 1, 1, 0],
            transition: {
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.5, 0.3, 1.2],
            },
          }}></motion.div>
      </div>
    );
  }

  return (
    <>
      {/* transition ease-in-out duration-[5000ms] */}
      <div className={`w-full h-[calc(100vh - 200px)] text-white z-50`}>
        <div className="w-full h-[80vh] px-8 md:px-[80px] lg:px-[150px] relative overflow-hidden flex flex-col lg:flex-row bg-general-black">
          {/* <div className="w-full h-auto mx-auto absolute z-1 top-0 right-0 left-0 bottom-0">
            <svg
              id="visual"
              viewBox="0 0 450 450"
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
          </div> */}
          <div className="my-auto py-8">
            <div className="text-[40px] md:text-[70px] lg:text-[104px] xl:text-[120px] 2xl:text-[144px] md:leading-[100px] lg:leading-[130px] xl:leading-[140px] 2xl:leading-[150px] text-white font-bold font-DMSerifDisplay">
              <div className="flex space-x-[0.6rem] md:space-x-[1rem] lg:space-x-[2rem]">
                <h1 className="flex cursor-pointer text-white">
                  {authorData.introOne[0].split("").map((letter, id) => (
                    <motion.div
                      key={id}
                      initial={{ y: 0, scaleY: 1 }}
                      whileHover={{
                        y: [-1, -2, -2.8, 0.9, 0],
                        scaleY: [1, 1.3, 0.8, 1.2, 1],
                        color: "#eabe7b",
                      }}>
                      {letter}
                    </motion.div>
                  ))}
                </h1>
                <h1 className="flex cursor-pointer text-white">
                  {authorData.introOne[1].split("").map((letter, id) => (
                    <motion.div
                      key={id}
                      initial={{ y: 0, scaleY: 1 }}
                      whileHover={{
                        y: [-1, -2, -2.8, 0.9, 0],
                        scaleY: [1, 1.3, 0.8, 1.2, 1],
                        color: "#eabe7b",
                      }}>
                      {letter}
                    </motion.div>
                  ))}
                </h1>
              </div>

              <div className="flex space-x-[0.6rem] md:space-x-[1rem] lg:space-x-[2rem]">
                <h1 className="flex cursor-pointer text-white">
                  {authorData.introTwo[0].split("").map((letter, id) => (
                    <motion.div
                      key={id}
                      initial={{ y: 0, scaleY: 1 }}
                      whileHover={{
                        y: [-1, -2, -2.8, 0.9, 0],
                        scaleY: [1, 1.3, 0.8, 1.2, 1],
                        color: "#eabe7b",
                      }}>
                      {letter}
                    </motion.div>
                  ))}
                </h1>
                <h1 className="flex cursor-pointer text-[#eabe7b]">
                  {authorData.introTwo[1].split("").map((letter, id) => (
                    <motion.div
                      key={id}
                      initial={{ y: 0, scaleY: 1 }}
                      whileHover={{
                        y: [-1, -2, -2.8, 0.9, 0],
                        scaleY: [1, 1.3, 0.8, 1.2, 1],
                        color: "#FFFF",
                      }}>
                      {letter}
                    </motion.div>
                  ))}
                </h1>
                <h1 className="flex cursor-pointer text-[#eabe7b]">
                  {authorData.introTwo[2].split("").map((letter, id) => (
                    <motion.div
                      key={id}
                      initial={{ y: 0, scaleY: 1 }}
                      whileHover={{
                        y: [-1, -2, -2.8, 0.9, 0],
                        scaleY: [1, 1.3, 0.8, 1.2, 1],
                        color: "#FFFF",
                      }}>
                      {letter}
                    </motion.div>
                  ))}
                </h1>
              </div>

              <div className="flex space-x-[0.6rem] md:space-x-[1rem] lg:space-x-[2rem]">
                <h1 className="flex cursor-pointer text-white">
                  {authorData.introThree[0].split("").map((letter, id) => (
                    <motion.div
                      key={id}
                      initial={{ y: 0, scaleY: 1 }}
                      whileHover={{
                        y: [-1, -2, -2.8, 0.9, 0],
                        scaleY: [1, 1.3, 0.8, 1.2, 1],
                        color: "#eabe7b",
                      }}>
                      {letter}
                    </motion.div>
                  ))}
                </h1>
                <h1 className="flex cursor-pointer text-[#eabe7b]">
                  {authorData.introThree[1].split("").map((letter, id) => (
                    <motion.div
                      key={id}
                      initial={{ y: 0, scaleY: 1 }}
                      whileHover={{
                        y: [-1, -2, -2.8, 0.9, 0],
                        scaleY: [1, 1.3, 0.8, 1.2, 1],
                        color: "#FFFF",
                      }}>
                      {letter}
                    </motion.div>
                  ))}
                </h1>
                <h1 className="flex cursor-pointer text-[#eabe7b]">
                  {authorData.introThree[2].split("").map((letter, id) => (
                    <motion.div
                      key={id}
                      initial={{ y: 0, scaleY: 1 }}
                      whileHover={{
                        y: [-1, -2, -2.8, 0.9, 0],
                        scaleY: [1, 1.3, 0.8, 1.2, 1],
                        color: "#FFFF",
                      }}>
                      {letter}
                    </motion.div>
                  ))}
                </h1>
                <h1
                  className="flex cursor-pointer text-[#eabe7b] relative hover:line-through decoration-[#2b2b2b]"
                  onMouseEnter={onHover}
                  onMouseLeave={onLeave}
                  role="button">
                  {authorData.introThree[3].split("").map((letter, id) => (
                    <motion.div
                      key={id}
                      initial={{ y: 0, scaleY: 1 }}
                      whileHover={{
                        y: [-1, -2, -2.8, 0.9, 0],
                        scaleY: [1, 1.3, 0.8, 1.2, 1],
                        color: "#FFFF",
                      }}>
                      {letter}
                    </motion.div>
                  ))}
                  <div
                    className={`${
                      hover ? "opacity-1" : "opacity-0"
                    } transition-opacity duration-300 tooltip bottom-[-30px] right-[-70px] md:bottom-[-50px] md:right-[-20px] lg:bottom-[-80px] lg:right-[100px] absolute font-DMSerifDisplay text-[#eabe7b] text-[30px]`}>
                    Developer
                  </div>
                </h1>
              </div>
            </div>

            <div className="w-full flex flex-row gap-x-8 mx-auto mt-8">
              {authorData.resumeOrCV !== null && (
                <div className="text-sm md:text-[24px] px-4 py-3 font-DMSerifDisplay rounded-[30px] bg-black-v1 hover:bg-gold hover:text-black-v1 transition-all duration-400">
                  <a href={`${authorData.resumeOrCV.asset.url}?dl=`}>
                    Download CV
                  </a>
                </div>
              )}

              <div className="text-sm md:text-[24px] px-4 py-3 font-DMSerifDisplay rounded-[30px] bg-black-v1 hover:bg-gold hover:text-black-v1 transition-all duration-400">
                <a href="/projects">See my works</a>
              </div>

              {authorData.recomendationLetter !== null && (
                <div>
                  <a
                    className="text-sm md:text-[24px] px-4 py-3 font-DMSerifDisplay rounded-[30px] bg-black-v1 hover:bg-gold hover:text-black-v1"
                    href={`${authorData.resumeOrCV.asset.url}?dl=`}>
                    Download Recomendation Letter
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
