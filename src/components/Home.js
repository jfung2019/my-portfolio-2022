import React, { useState, useEffect } from "react";
import sanityClient from "../client";
import BlockContent from "@sanity/block-content-to-react";
import { motion } from "framer-motion";

export default function Home() {
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date());

  const fifteenMin = 60000;

  useEffect(() => {
    setInterval(() => setDate(new Date()), fifteenMin);
  }, [date]);
  console.log(date);

  var hour = date.getHours().toString();
  var min = date.getMinutes().toString();

  if (hour > 12) {
    hour = hour - "12";
  }

  var midnight = {
    bg: "bg-blue-200",
    description: "It's Midnight!",
    img1: "img/path1/path2",
    img2: "img/asdasd/asdasd",
  };
  var morning = {
    bg: "bg-yellow-200",
    description: "It's Morning!",
    img: "img/path1/path2",
    img2: "img/asdasd/asdasd",
  };

  function dayClass() {
    if (min % 2 === 0) {
      console.log("its midnight");
      return midnight;
    } else {
      console.log("its morning");
      return morning;
    }
  }

  console.log(dayClass());

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
    sanityClient
      .fetch(
        `*[_type == "author"]
          {
            name,
            title,
            resumeOrCV{
              asset->{
                _id,
                url
              }
            },
            recomendationLetter{
              asset->{
                _id,
                url
              }
            },
            bio,
            "authorImage": image.asset-> url
          }
        `
      )
      .then(data => setAuthorData(data[0]))
      .catch(console.error);
  }, []);

  if (!authorData || loading === true) {
    return (
      <div className="w-full h-screen absolute align-middle">
      <motion.div
        className="w-full h-screen absolute bg-[#EABE7B]"
        initial={{ scaleY: 1, y: "120vh", opacity: 1 }}
        animate={{
          scaleY: 1,
          y: ["100vh", "0vh", "0vh", "100vh"],
          transition: {
            duration: 1.2,
            ease: [0.25, 0.25, 0.13, 1],
          },
        }}>
        {/* <img
        className="h-full mx-auto"
        src="https://cdn.dribbble.com/users/2367833/screenshots/16195486/media/f0c5bacd01dad236bb23fb726330fa23.gif"
        alt="loading gif"
      /> */}
      </motion.div>
    </div>
    );
  }

  return (
    <>
      {/* <div className={`flex flex-col w-full ${dayClass()} text-black`}></div> */}
      <div
        className={`flex flex-col w-full ${
          dayClass().bg
        } text-black transition ease-in-out duration-[5000ms]`}>
        <h1>Home page!</h1>
        <h1>{dayClass().description}</h1>
        <h1>
          {date.getHours().toString()} : {date.getMinutes().toString()} :{" "}
          {date.getSeconds().toString()}
        </h1>
        <img className="w-[350px]" src={authorData.authorImage} alt="profile" />
        <h1>{authorData.name}</h1>
        <h1>{authorData.title}</h1>
        <a
          className="bg-gray-200 p-4 w-[150px]"
          href={`${authorData.resumeOrCV.asset.url}?dl=`}>
          {" "}
          Download CV{" "}
        </a>

        {authorData.recomendationLetter !== null ? (
          <div>
            <a
              className="bg-gray-200 p-4 w-[150px]"
              href={`${authorData.resumeOrCV.asset.url}?dl=`}>
              Download Recomendation Letter
            </a>
          </div>
        ) : null}

        <BlockContent
          blocks={authorData.bio}
          projectId="22zf6zhh"
          dataset="production"
        />
      </div>
    </>
  );
}
