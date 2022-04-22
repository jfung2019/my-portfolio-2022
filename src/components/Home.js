import React, { useState, useEffect } from "react";
import sanityClient from "../client";
import BlockContent from "@sanity/block-content-to-react";
import { motion } from "framer-motion";

export default function Home() {
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    sanityClient
      .fetch(
        `*[_type == "author"]
          {
            name,
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
    return (
      <div className="w-full h-screen absolute align-middle z-30">
        <motion.div
          className="w-full h-screen absolute bg-[#EABE7B]"
          initial={{scaleY: 1.5, y: "100vh", opacity: 1 }}
          animate={{
            scaleY: 1.5,
            y: ["100vh", "5vh", "5vh", "0vh"],
            opacity: [1, 1, 1, 1, 0],
            transition: {
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.5, 0.3, 1.2]
            },
          }}
      
          ></motion.div>
      </div>
    );
  }

  return (
    <>
      {/* transition ease-in-out duration-[5000ms] */}
      <motion.div
        className={`w-full h-screen text-white`}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { ease: "easeInOut", duration: 0.1 },
        }}
        exit={{ opacity: 0 }}>
        <div className="w-full h-[80vh] px-8 md:px-[160px] relative overflow-hidden flex flex-col lg:flex-row mx-auto">
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
          <motion.div
            className="m-auto py-8"
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1}}
            exit={{ opacity: 0 }}>
            <div className="text-[40px] md:text-[70px] lg:text-[92px] font-bold text-white font-DMSerifDisplay">
              <h1>Hi! I'm {authorData.name}</h1>
              <h1 className="">{authorData.title}</h1>
            </div>

            <div className="w-full flex flex-row gap-x-8 mx-auto mt-8">
              {authorData.resumeOrCV !== null && (
                <div className="text-sm md:text-[24px] px-4 py-2 font-DMSerifDisplay rounded-[30px] bg-[#202020]">
                  <a href={`${authorData.resumeOrCV.asset.url}?dl=`}>
                    Download CV
                  </a>
                </div>
              )}

              <div className="text-sm md:text-[24px] px-4 py-2 font-DMSerifDisplay rounded-[30px] bg-[#202020]">
                <a href="/projects">See my works</a>
              </div>

              {authorData.recomendationLetter !== null && (
                <div>
                  <a
                    className="text-sm md:text-[24px] px-4 py-2 font-DMSerifDisplay rounded-[30px] bg-[#202020]"
                    href={`${authorData.resumeOrCV.asset.url}?dl=`}>
                    Download Recomendation Letter
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
