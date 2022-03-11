import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import { motion } from "framer-motion";


export default function Home() {
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    sanityClient
      .fetch(
        `*[_type == "author"]{
              name,
              title,
              bio,
              "authorImage": image.asset-> url
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
    {loading ? <div className="w-full h-max align-middle">
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
      </div> : ""}
    <div className="bg-red-200 text-black">
      <h1>Home page!</h1>
      <img src={authorData.authorImage} alt="asd" />
      <h1>{authorData.name}</h1>
      <h1>{authorData.title}</h1>
      <BlockContent blocks={authorData.bio} projectId="22zf6zhh" dataset="production" />
    </div>
    </>
  )
}