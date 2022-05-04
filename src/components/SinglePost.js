import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import { motion } from "framer-motion";

export default function SinglePost() {
  const [singlePostData, setSinglePostData] = useState(null);
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);

    sanityClient
      .fetch(
        `*[slug.current == "${slug}"]{
      title,
      _id,
      slug,
      mainImage{
        asset->{
          _id,
          url
        }
      },
      body,
      "name": author-> name,
      "authorImage": author-> image
    }`
      )
      .then(data => setSinglePostData(data[0]))
      .catch(console.error);
  }, [slug]);

  console.log(singlePostData);

  if (!singlePostData || loading === true) {
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
      <div className="w-full px-8 md:px-[80px] lg:px-[160px] relative overflow-hidden text-white">
        <div className="">

          {/* Title */}
          <h1 className="font-DMSerifDisplay text-[40px] md:text-[70px] lg:text-[92px] font-bold text-gold">
            My Blog Post
          </h1>

          <h1 className="font-DMSerifDisplay text-[24px] md:text-[32px] lg:text-[40px] font-bold text-white mb-8">
            {singlePostData.title}
          </h1>

          {/* Header Image if any */}
          <div className="w-full flex justify-center max-h-[400px]">
            <motion.img
              className="w-full"
              src={singlePostData.mainImage.asset.url}
              alt={singlePostData.name}
            />
          </div>
        </div>

        <div className="w-full flex justify-center text-white font-DmSans mt-8">
          <div className="">
            <BlockContent
              className="prose md:prose-lg lg:prose-xl text-white prose-headings:font-DMSerifDisplay prose-headings:text-white max-w-none prose-img:mx-auto "
              blocks={singlePostData.body}
              projectId="22zf6zhh"
              dataset="production"
            />
          </div>
        </div>
        
      </div>
    </>
  );
}
