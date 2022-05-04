import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import { motion } from "framer-motion";

export default function SingleProject() {
  const [singleProjectData, setSingleProjectData] = useState(null);
  const { slug } = useParams();
  const transition = { duration: 0.5, ease: "easeInOut" };
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

  console.log(singleProjectData);

  if (!singleProjectData || loading === true) {
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
      <div className="w-full px-8 md:px-[80px] lg:px-[160px] relative overflow-hidden">
        {/* header */}
        <div className="w-full text-white mt-8">
          <div className="w-full flex flex-col lg:flex-row h-auto">
            <div className="w-full lg:w-1/2 my-auto order-last lg:order-first">
              {singleProjectData.title != null && (
                <h1 className="pr-0 lg:pr-14 text-left lg:text-right font-DMSerifDisplay text-[40px] md:text-[70px] lg:text-[92px] font-bold text-white mt-4 lg:mt-0">
                  {singleProjectData.title}
                </h1>
              )}

              <div className="w-full mt-4 lg:mt-8 pr-0 lg:pr-14">
                <h1 className="text-left lg:text-right text-[24px] font-DMSerifDisplay mb-1 pr-4">
                  Tech Used
                </h1>
                <div className="flex flex-wrap lg:flex-wrap justify-start lg:justify-end space-x-2 font-DmSans pt-2 gap-y-4">
                  {singleProjectData !== null &&
                    singleProjectData.techUsed.map((techUsed, id) => (
                      <div
                        className="mr-2 bg-black-v1 rounded-[30px] py-1 px-4"
                        key={id}>
                        {techUsed}
                      </div>
                    ))}
                </div>
                <div className="flex flex-wrap justify-start lg:justify-end space-x-2 font-DmSans mt-4">
                  {/* demo url */}
                  {singleProjectData.demoUrl != null && (
                    <a
                      className="mr-2 bg-black-v1 rounded-[30px] py-1 px-4 hover:bg-gold"
                      href={singleProjectData.demoUrl}>
                      Demo
                    </a>
                  )}

                  {/* code url */}
                  {singleProjectData.demoUrl != null && (
                    <a
                      className="mr-2 bg-black-v1 rounded-[30px] py-1 px-4 hover:bg-gold"
                      href={singleProjectData.codeUrl}>
                      Git Hub
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 justify-end text-right mt-8 lg:my-auto order-first lg:order-last p-0">
              {singleProjectData.singleProjectImagePost != null && (
                <img
                  className="w-full h-auto rounded-[30px] object-cover"
                  src={singleProjectData.singleProjectImagePost}
                  alt={singleProjectData.singleProjectImagePost}
                />
              )}
            </div>
          </div>
        </div>

        {/* role */}
        {singleProjectData.role != null && (
          <div className="w-full text-white mt-8 lg:mt-24">
            <h1 className="font-DMSerifDisplay text-[24px]">Role</h1>
            <div className="font-DmSans text-white mt-1 md:mt-4">
              <BlockContent
                blocks={singleProjectData.role}
                projectId="22zf6zhh"
                dataset="production"
              />
            </div>
          </div>
        )}

        {/* background */}
        <div className="w-full text-white mt-8 mb-8 lg:mb-24">
          <h1 className="font-DMSerifDisplay text-[24px]">Background</h1>
          {singleProjectData.body != null && (
            <div className="flex flex-wrap w-full mt-1 md:mt-4">
              <div className="font-DmSans text-white">
                <BlockContent
                  blocks={singleProjectData.body}
                  projectId="22zf6zhh"
                  dataset="production"
                />
              </div>
            </div>
          )}
        </div>

        {singleProjectData.projectData != null &&
          singleProjectData.projectData.map((projectData, id) => (
            <div
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
                      projectId="22zf6zhh"
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
            </div>
          ))}

        {/* Conclusion */}
        {singleProjectData.conclusion != null && (
          <div className="w-full text-white mt-0 lg:mt-8 mb-24">
            <h1 className="font-DMSerifDisplay text-[24px]">Conclusion</h1>
            <div className="flex flex-wrap w-ful mt-1 md:mt-4 ">
              <div className="font-DmSans text-white">
                <BlockContent
                  blocks={singleProjectData.conclusion}
                  projectId="22zf6zhh"
                  dataset="production"
                />
              </div>
            </div>
          </div>
        )}

        {/* reference data */}
        {/* title */}
        {/* role */}
        {/* layout */}
        {/* main image for thumbnail */}
        {/* Single project post image header*/}
        {/* published at */}
        {/* body background*/}
        {/* Project Data */}
        {/* Title */}
        {/* Image Gallery Url */}
        {/* Gif Gallery Url */}
        {/* Videos Gallery Url */}
        {/* Paragraph */}
        {/* Date */}
      </div>
    </>
  );
}
