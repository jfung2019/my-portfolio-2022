import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import { motion } from "framer-motion";
import Sample from "../assets/svg/sample.svg";
import Sample2 from "../assets/svg/sample2.svg";
import "../App.css";

export default function SingleProject() {
  const [singleProjectData, setSingleProjectData] = useState(null);
  const { slug } = useParams();
  const transition = { duration: 0.5, ease: "easeInOut" };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);

    sanityClient
      .fetch(
        `*[slug.current == "${slug}"]{
      title,
      layout,
      _id,
      slug,
      mainImage{
        asset->{
          _id,
          url
        }
      },
      imagesGallery[]{
        asset->{
          _id,
          url
        },
        alt
      },
      gifGallery[]{
        asset->{
          _id,
          url
        }
      },
      videosUrl[],
      body,
      "name": author-> name,
      "authorImage": author-> image
    }`
      )
      .then(data => setSingleProjectData(data[0]))
      .catch(console.error);
  }, [slug]);

  console.log(loading);

  if (!singleProjectData || loading === true) {
    return (
      <div className="w-full h-screen align-middle">
        <img
          className="h-full mx-auto bg-blue-200"
          src="https://cdn.dribbble.com/users/2367833/screenshots/16195486/media/f0c5bacd01dad236bb23fb726330fa23.gif"
          alt="loading gif"
        />
      </div>
    );
  }

  return (
    <>
      {/* {singleProjectData.layout !== null
            ? 
            <div>
                {singleProjectData.layout === 'Layout 1' ?
                  <div>Use design 1</div>
                  : 
                  singleProjectData.layout === 'Layout 2' ? 
                  <div>Use design 2</div>
                  : 
                  <div>Use design 3</div>
                }
            </div>
            : 
            <div>
              show nothing
            </div>
      } */}
      <img src={Sample} alt="" />
      <img src={Sample2} alt="" />

      <div className="container w-full">
        <h1>SingleProject page!</h1>
        <h1>{singleProjectData.title}</h1>
        <h1>{singleProjectData.categories}</h1>
        <h1>This is the header Image!</h1>
        <img
          className="justify-center mx-auto w-full h-[400px]"
          src={singleProjectData.mainImage.asset.url}
          alt={singleProjectData.name}
        />
        <h1 className="text-white text-2xl font-bold">
          This is the image gallery
        </h1>

        <motion.section
          className="overflow-hidden text-gray-700"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition }}
          exit={{ y: -100, opacity: 0, transition }}>
          <div className="container px-5 py-2 mx-auto lg:pt-24 lg:px-32">
            <div className="flex flex-wrap -m-1 md:-m-2">
              <div className="flex flex-wrap w-1/2">
                <div className="w-full p-1 md:p-2">
                  {singleProjectData.imagesGallery !== null ? (
                    <div>
                      <img
                        alt={singleProjectData.imagesGallery[0].alt}
                        className="block object-cover object-center w-full h-full rounded-lg"
                        src={singleProjectData.imagesGallery[0].asset.url}
                      />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                {singleProjectData.imagesGallery !== null ? (
                  <div>
                    {singleProjectData.imagesGallery
                      .slice(1)
                      .map((gallery, index) => (
                        <div className="w-1/2 p-1 md:p-2" key={index}>
                          <img
                            alt=""
                            className="block object-cover object-center w-full h-full rounded-lg"
                            src={gallery.asset.url}
                          />
                        </div>
                      ))}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            {singleProjectData.body != null ? (
              <div className="flex flex-wrap w-1/2">
                <div className="prose lg:prose-xl">
                  <BlockContent
                    blocks={singleProjectData.body}
                    projectId="22zf6zhh"
                    dataset="production"
                  />
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          {singleProjectData.videosUrl != null ? (
            <div>
              {singleProjectData.videosUrl.map((item, index) => (
                <div key={index}>
                  <iframe
                    width="420"
                    height="315"
                    src={item}
                    title={item}></iframe>
                </div>
              ))}
            </div>
          ) : (
            <div></div>
          )}
          {singleProjectData.gifGallery != null ? (
            <div>
              {singleProjectData.gifGallery.map((item, index) => (
                <div key={index}>
                  <img
                    alt=""
                    className="block object-cover object-center w-full h-full rounded-lg"
                    src={item.asset.url}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </motion.section>
      </div>
    </>
  );
}
