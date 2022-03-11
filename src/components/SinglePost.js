import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import { motion } from "framer-motion";


export default function SinglePost() {
  const [singlePostData, setSinglePostData] = useState(null);
  const { slug } = useParams();

  useEffect(() =>{
    sanityClient.fetch(`*[slug.current == "${slug}"]{
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
    }`)
    .then((data) => setSinglePostData(data[0]))
    .catch(console.error);
  }, [slug]);

  if (!singlePostData) {
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

  return (
    <>
      <h1>SinglePost page!</h1>
      <h1>{singlePostData.title}</h1>
      <h1>{singlePostData.body.name}</h1>
      <img src={singlePostData.mainImage.asset.url} alt={singlePostData.name} />
      <div className="prose lg:prose-xl list-disc">
        <BlockContent blocks={singlePostData.body} projectId="22zf6zhh" dataset="production" />
      </div>
    </>
  )
}