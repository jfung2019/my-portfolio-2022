import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";

export default function Home() {
  const [authorData, setAuthorData] = useState(null);

  useEffect(() => {
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

  if (!authorData) return <h1>Loading!</h1>

  return (
    <div className="bg-red-200 text-black">
      <h1>Home page!</h1>
      <img src={authorData.authorImage} alt="asd" />
      <h1>{authorData.name}</h1>
      <h1>{authorData.title}</h1>
      <h1>{authorData.bio[0].text}</h1>
      <BlockContent blocks={authorData.bio} projectId="22zf6zhh" dataset="production" />
    </div>
  )
}