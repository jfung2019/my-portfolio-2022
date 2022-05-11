import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import { motion } from "framer-motion";

export default function SingleProject() {
  const [singleProjectData, setSingleProjectData] = useState(null);
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);

    // forced to start at top when loaded at first
    window.scrollTo(0, 0);

    sanityClient
      .fetch(
        `*[slug.current == "${slug}"]{
      title,
      _id,
      slug,
      layout,
      role,
      demoUrl,
      codeUrl,
      categories,
      techUsed,
      projectData,
      singleProjectImagePost,
      mainImage{
        asset->{
          _id,
          url
        }
      },
      body,
      "name": author-> name,
      "authorImage": author-> image,
      conclusion
    }`
      )
      .then(data => setSingleProjectData(data[0]))
      .catch(console.error);
  }, [slug]);

  if (!singleProjectData || loading === true) {
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
          <h1 className="text-white absolute w-full h-full flex items-center justify-center top-[-80px] font-DMSerifDisplay text-[32px] font-bold">
            Project Post
          </h1>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full px-8 md:px-[80px] lg:px-[160px] relative overflow-hidden">
        {/* header */}
        <div className="w-full text-white mt-8">
          <div className="w-full flex flex-col lg:flex-row h-auto">
            <div
              className={`w-full ${
                singleProjectData.singleProjectImagePost != null
                  ? "lg:w-1/2"
                  : ""
              }  my-auto order-last lg:order-first`}>
              {singleProjectData.title != null && (
                <motion.h1
                  initial={{ y: -200, x: -500, scale: 0 }}
                  animate={{
                    y: 0,
                    x: 0,
                    scale: 1,
                    transition: { delay: 0.1, type: "spring" },
                  }}
                  exit={{ opacity: 0 }}
                  className={`pr-0 lg:pr-14 text-left ${
                    singleProjectData.singleProjectImagePost != null
                      ? "lg:text-right"
                      : ""
                  }  font-DMSerifDisplay text-[40px] md:text-[70px] lg:text-[84px] 2xl:text-[92px] font-bold text-white mt-4 lg:mt-0`}>
                  {singleProjectData.title}
                </motion.h1>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.5, duration: 1.5 },
                }}
                exit={{
                  opacity: 0,
                  transition: { ease: "linear", duration: 0.5 },
                }}
                className="w-full mt-4 lg:mt-8 pr-0 lg:pr-14">
                <h1
                  className={`text-left ${
                    singleProjectData.singleProjectImagePost != null
                      ? "lg:text-right"
                      : ""
                  } text-[24px] font-DMSerifDisplay mb-1 pr-4`}>
                  Tech Used
                </h1>
                <div
                  className={`flex flex-wrap ${
                    singleProjectData.singleProjectImagePost != null
                      ? "lg:flex-wrap lg:justify-end"
                      : ""
                  } justify-start  space-x-2 font-DMSerifDisplay pt-2 gap-y-4`}>
                  {singleProjectData !== null &&
                    singleProjectData.techUsed.map((techUsed, id) => (
                      <div
                        className="mr-2 bg-black-v1 rounded-[30px] py-1 px-4"
                        key={id}>
                        {techUsed}
                      </div>
                    ))}
                </div>
                <div
                  className={`flex flex-wrap justify-start ${
                    singleProjectData.singleProjectImagePost != null
                      ? "lg:justify-end"
                      : ""
                  }  space-x-2 mt-4`}>
                  {/* demo url */}
                  {singleProjectData.demoUrl != null && (
                    <a
                      className="mr-2 bg-black-v1 rounded-[30px] py-1 px-4 hover:bg-gold hover:text-black-v1 font-DMSerifDisplay"
                      href={singleProjectData.demoUrl}>
                      Demo
                    </a>
                  )}

                  {/* code url */}
                  {singleProjectData.demoUrl != null && (
                    <a
                      className="mr-2 bg-black-v1 rounded-[30px] py-1 px-4 hover:bg-gold hover:text-black-v1 font-DMSerifDisplay"
                      href={singleProjectData.codeUrl}>
                      Git Hub
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
            {singleProjectData.singleProjectImagePost != null && (
              <div className="w-full lg:w-1/2 justify-end text-right mt-8 lg:my-auto order-first lg:order-last p-0">
                <motion.img
                  initial={{ y: -200, x: 500, scale: 0 }}
                  animate={{
                    y: 0,
                    x: 0,
                    scale: 1,
                    transition: { delay: 0.1, type: "spring" },
                  }}
                  exit={{ opacity: 0 }}
                  className="w-full h-auto rounded-[30px] object-cover"
                  src={singleProjectData.singleProjectImagePost}
                  alt={singleProjectData.singleProjectImagePost}
                />
              </div>
            )}
          </div>
        </div>

        {/* role */}
        {singleProjectData.role != null && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{
              opacity: [0, 1],
              x: 0,
              transition: {
                duration: 1,
                delay: 1.2,
                ease: [0.43, 0.13, 0.23, 0.96],
              },
            }}
            exit={{
              opacity: 0,
              x: "100vw",
              transition: { ease: "linear", duration: 0.3 },
            }}
            viewport={{ once: true }}
            className="w-full text-white mt-8 lg:mt-24">
            <h1 className="font-DMSerifDisplay text-[24px]">Role</h1>
            <div className="font-DmSans text-white mt-1 md:mt-4">
              <BlockContent
                blocks={singleProjectData.role}
                projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                dataset="production"
              />
            </div>
          </motion.div>
        )}

        {/* background */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{
            opacity: [0, 1],
            x: 0,
            transition: {
              duration: 1,
              delay: 1.2,
              ease: [0.43, 0.13, 0.23, 0.96],
            },
          }}
          exit={{
            opacity: 0,
            x: "-100vw",
            transition: { ease: "linear", duration: 0.3 },
          }}
          viewport={{ once: true }}
          className="w-full text-white mt-8 mb-8 lg:mb-[200px]">
          <h1 className="font-DMSerifDisplay text-[24px]">Background</h1>
          {singleProjectData.body != null && (
            <div className="flex flex-wrap w-full mt-1 md:mt-4">
              <div className="font-DmSans text-white">
                <BlockContent
                  blocks={singleProjectData.body}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>
            </div>
          )}
        </motion.div>

        {singleProjectData.projectData != null &&
          singleProjectData.projectData.map((projectData, id) => (
            <motion.div
              initial={{ opacity: 0, x: (id + 1) % 2 ? 100 : -100 }}
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
              key={id}
              className={`w-full flex flex-col lg:flex-row ${
                projectData.imageGalleryUrl !== undefined &&
                !projectData.imageGalleryUrl.includes("")
                  ? "h-[550px] md:h-[550px] lg:h-[450px] my-0 md:my-8 lg:my-24"
                  : "mt-8"
              } text-white`}>
              <div
                className={`w-full rounded-lg ${
                  (id + 1) % 2
                    ? "order-last lg:order-first"
                    : "order-last lg:order-last"
                } ${
                  projectData.imageGalleryUrl !== undefined &&
                  !projectData.imageGalleryUrl.includes("")
                    ? "lg:w-1/2 lg:my-auto mx-0 lg:mx-8 px-0 lg:px-4 py-0 lg:py-8"
                    : "lg:w-full mx-0 py-0 lg:-py-8 mb-8"
                }`}>
                <div className="m-auto">
                  <h1 className="font-DMSerifDisplay text-[24px]">
                    {projectData.title}
                  </h1>
                  <div className="mt-1 md:mt-4 font-DmSans">
                    <BlockContent
                      blocks={projectData.paragraph}
                      projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                      dataset="production"
                    />
                  </div>
                </div>
              </div>
              {!projectData.imageGalleryUrl.includes("") && (
                <div
                  className={`w-auto lg:w-1/2 m-auto rounded-lg order-first ${
                    (id + 1) % 2
                      ? "order-first lg:order-last"
                      : "order-first lg:order-first"
                  }`}>
                  <img
                    className="bg-[#4b4a4a] p-1 rounded-lg max-h-[400px]"
                    src={projectData.imageGalleryUrl}
                    alt={projectData.imageGalleryUrl}
                  />
                </div>
              )}
            </motion.div>
          ))}

        {/* Conclusion */}
        {singleProjectData.conclusion != null && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: [0, 1],
              transition: {
                duration: 1,
                delay: 1,
                ease: [0.43, 0.13, 0.23, 0.96],
              },
            }}
            viewport={{ once: true }}
            className="w-full text-white mt-0 lg:mt-8 mb-24">
            <h1 className="font-DMSerifDisplay text-[24px]">Conclusion</h1>
            <div className="flex flex-wrap w-ful mt-1 md:mt-4 ">
              <div className="font-DmSans text-white">
                <BlockContent
                  blocks={singleProjectData.conclusion}
                  projectId={process.env.REACT_APP_SANITY_PROJECT_ID}
                  dataset="production"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}
