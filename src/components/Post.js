import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";
import { motion } from "framer-motion";

export default function Post() {
  const [postData, setPost] = useState(null);
  const [filter, setFilter] = useState("Web App");

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post" && "${filter}" in categories[]->title] | order(publishedAt desc){
          "categories": categories[]->title,
          title,
          slug,
          categories[],
          mainImage{
            asset->{
              _id,
              url
            },
            alt 
          },
          publishedAt
        }`
      )
      .then((data) => setPost(data))
      .catch(console.error);
  }, [filter]);


  const filterItem = (filter) => {
    setFilter(`${filter}`);
  };

  if (!postData) {
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
    <main>
      <section>
        <h1>This is the Post page!</h1>

        <button
          className="bg-red-200 p-4"
          value="Games"
          onClick={(e) => filterItem(e.target.value)}
        >
          Games
        </button>
        <button
          className="bg-blue-200 p-4"
          value="Web App"
          onClick={(e) => filterItem(e.target.value)}
        >
          Web App
        </button>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {postData &&
            postData.map((post, index) => (
              <article key={index}>
                <Link to={"/post/" + post.slug.current} key={post.slug.current}>
                  <span>
                    <span>
                      <h1>{post.title}</h1>
                    </span>
                    <img
                      src={post.mainImage.asset.url}
                      alt={post.mainImage.alt}
                    />
                  </span>
                </Link>
              </article>
            ))}
        </div>
      </section>
    </main>
  );
}
