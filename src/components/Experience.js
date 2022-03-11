import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import { motion } from "framer-motion";

export default function Experience() {
  const [authorData, setAuthorData] = useState(null);
  
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "author"]{
              experience
        }`
      )
      .then((data) => setAuthorData(data[0]))
      .catch(console.error);
  }, []);

  if (!authorData) {
    return (
      <div className="w-full h-max align-middle">
        <motion.div transition={{
          y: {
            duration: 1,
            yoyo: Infinity,  
            ease: "easeIn",
          }
        }}
        animate={{ y: ["0px", "-200px"] }}>
        <div className="flex h-screen">
          <div className="m-auto">
            <div className="h-10 w-10 rounded-full bg-blue-200 mx-auto"></div>
          </div>
        </div>
      </motion.div>
      </div>
    )
  }

  console.log(authorData)

  return (
    <>
      <div>This is the Experience page!</div>
        {authorData.experience &&
        authorData.experience.map((experience, index) => (
          <div className="bg-blue-200 p- my-4" key={index}>
          <h1>{experience.title}</h1>
          <h1>{experience.subTitle}</h1>
          <h1>{experience.date}</h1>
          <h1>{experience.length}</h1>
          <BlockContent className="" blocks={experience.experience} projectId="22zf6zhh" dataset="production" />
        </div>
        ))
      }
    </>
  )
}