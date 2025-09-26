import React, { useState, useEffect } from "react";
import sanityClient from "../client";
import { motion } from "framer-motion";
import LoadingScreen from "./LoadingScreen";

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
  if (!authorData || loading === true) {
    return <LoadingScreen text="Welcome" show={loading} />;
  }

  return (
    <>
      <div className={`w-full h-[calc(100vh - 200px)] text-white z-50`}>
        <div className="w-full h-[80vh] px-8 md:px-[80px] lg:px-[150px] relative overflow-hidden flex flex-col lg:flex-row bg-general-black">
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
                <a href="/projects">See my work</a>
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
