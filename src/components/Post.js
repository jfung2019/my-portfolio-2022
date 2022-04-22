import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";
import { motion } from "framer-motion";

export default function Post() {
  const [postData, setPost] = useState(null);
  const [filter, setFilter] = useState("All Post");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);

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
      .then(data => setPost(data))
      .catch(console.error);
  }, [filter]);

  const filterItem = filter => {
    setFilter(`${filter}`);
  };

  console.log(postData);

  if (!postData || loading === true) {
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
          }}>
        </motion.div>
      </div>
    );
  }

  return (
    <main>
      <section className="w-full px-8 md:px-[160px] relative overflow-hidden">
        <h1>This is the Post page!</h1>

        <button
          className="bg-red-200 p-4"
          value="Games"
          onClick={e => filterItem(e.target.value)}>
          Games
        </button>
        <button
          className="bg-blue-200 p-4"
          value="Web App"
          onClick={e => filterItem(e.target.value)}>
          Web App
        </button>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {postData &&
            postData.map((post, index) => (
              <motion.article key={index}>
                <Link to={"/Post/" + post.slug.current} key={post.slug.current}>
                  <span>
                    <span>
                      <h1 className="text-white">{post.title}</h1>
                    </span>
                    <img
                      src={post.mainImage.asset.url}
                      alt={post.mainImage.alt}
                    />
                  </span>
                </Link>
              </motion.article>
            ))}
        </div>
      </section>
    </main>
  );
}
