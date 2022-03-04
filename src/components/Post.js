import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";


export default function Post() {
  const [postData, setPost] = useState(null);

  useEffect(() => {
    sanityClient.fetch(
      `*[_type == "post"]{
      title,
      slug,
      mainImage{
        asset->{
          _id,
          url
        },
        alt 
      }
    }`)
    .then((data) => setPost(data))
    .catch((console.error));
  }, []);

  return (
    <main>
      <section>
      <h1>This is the Post page!</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {postData && postData.map((post, index) => (
          <article>
            <Link to={"/post/" + post.slug.current} key={post.slug.current}>
              <span key={index}>
                <span>
                  <h1>
                    {post.title}
                  </h1>
                </span>
                <img src={post.mainImage.asset.url} alt={post.mainImage.alt} />
              </span>
            </Link>
          </article>
          ))}
        </div>
      </section>
    </main>
  )
}