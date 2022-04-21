import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import { motion } from "framer-motion";

export default function SinglePost() {
  const [singlePostData, setSinglePostData] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
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

  if (!singlePostData) {
    return (
      <div className="w-full h-max align-middle">
        <div>
          <img
            className="mx-auto"
            src="http://static.demilked.com/wp-content/uploads/2016/06/gif-animations-replace-loading-screen-14.gif"
            alt="loading gif"
          />
        </div>
        {/* <img
          className="mx-auto"
          src="http://static.demilked.com/wp-content/uploads/2016/06/gif-animations-replace-loading-screen-14.gif"
          alt="loading gif"
        /> */}
      </div>
    );
  }

  return (
    <>
      <h1>SinglePost page!</h1>
      <h1>{singlePostData.title}</h1>
      <h1>{singlePostData.body.name}</h1>
      <motion.img 
        src={singlePostData.mainImage.asset.url}
        alt={singlePostData.name}
      />
      <div className="w-1/2 mx-auto text-white">
        <BlockContent
          blocks={singlePostData.body}
          projectId="22zf6zhh"
          dataset="production"
        />
      </div>
    </>
  );
}
