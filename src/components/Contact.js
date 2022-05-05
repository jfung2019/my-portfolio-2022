import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import { motion } from "framer-motion";
import sample from "../assets/svg/sample2.svg";
import "../App.css";

export default function Contact() {
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    sanityClient
      .fetch(
        `*[_type == "author"]{
              name,
              title,
              email,
              phoneNumber,
              bio,
              "authorImage": image.asset-> url
        }`
      )
      .then(data => setAuthorData(data[0]))
      .catch(console.error);
  }, []);

  console.log(authorData);

  if (!authorData || loading === true) {
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
    <div className="px-8 md:px-[80px] lg:px-[160px] bg-general-black flex text-white">
      <div className="m-auto">
        <div className="flex flex-col">
          <div className="text-center w-full py-12 mt-8">
            <h1 className="text-[32px] md:text-[40px] lg:text-[80px] font-bold text-[#EABE7B] font-DMSerifDisplay">
              That's enough about me,
            </h1>
            <h1 className="text-[32px] md:text-[40px] lg:text-[80px] font-bold text-[#EABE7B] font-DMSerifDisplay">
              Let's talk about you!
            </h1>
            <motion.form
              initial={{ y: 100, scale: 0, x: -100 }}
              animate={{
                y: 0,
                scale: 1,
                x: [-400, 0],
                transition: { duration: 0.5 },
              }}
              exit={{
                y: 0,
                scale: 0,
                x: -500,
                transition: { duration: 0.5, delay: 0.3 },
              }}
              className="mt-8 space-y-10">
              <div className="flex flex-col space-y-5 relative ">
                <input
                  placeholder="Subject"
                  className="bg-transparent border-b-2 focus-within:border-[#EABE7B] text-[24px] font-DMSerifDisplay focus:outline-none peer placeholder-transparent"></input>
                <label className="cursor-text absolute left-0 top-[-50px]  text-[24px] font-DMSerifDisplay transition-all peer-placeholder-shown:text-[24px] peer-placeholder-shown:text-white/75 peer-placeholder-shown:-top-5">
                  Subject
                </label>
              </div>
              <div className="flex flex-col space-y-5 relative ">
                <input
                  placeholder="Your Name"
                  className="bg-transparent border-b-2 focus-within:border-[#EABE7B] text-[24px] font-DMSerifDisplay focus:outline-none peer placeholder-transparent"></input>
                <label className="cursor-text absolute left-0 top-[-50px]  text-[24px] font-DMSerifDisplay transition-all peer-placeholder-shown:text-[24px] peer-placeholder-shown:text-white/75 peer-placeholder-shown:-top-5">
                  Your Name
                </label>
              </div>
              <div className="flex flex-col space-y-5 relative ">
                <input
                  placeholder="Your Email"
                  className="bg-transparent border-b-2 focus-within:border-[#EABE7B] text-[24px] font-DMSerifDisplay focus:outline-none peer placeholder-transparent"></input>
                <label className="cursor-text absolute left-0 top-[-50px]  text-[24px] font-DMSerifDisplay transition-all peer-placeholder-shown:text-[24px] peer-placeholder-shown:text-white/75 peer-placeholder-shown:-top-5">
                  Your Email
                </label>
              </div>
              <div className="flex flex-col space-y-5 relative ">
                <textarea
                  placeholder="Share me your thoughts"
                  className="bg-transparent border-b-2 h-[40px] focus-within:border-[#EABE7B] text-[24px] font-DMSerifDisplay focus:outline-none peer placeholder-transparent"></textarea>
                <label className="cursor-text absolute left-0 top-[-50px]  text-[24px] font-DMSerifDisplay transition-all peer-placeholder-shown:text-[24px] peer-placeholder-shown:text-white/75 peer-placeholder-shown:-top-5">
                  Tell me about yourself
                </label>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-gray-800 rounded-lg w-full py-3 font-DMSerifDisplay hover:bg-[#EABE7B]">
                  Send
                </button>
              </div>
            </motion.form>
          </div>
          <div className="w-full py-8 text-center">
            <h1 className="text-[32px] md:text-[40px] lg:text-[80px] font-bold text-[#EABE7B] font-DMSerifDisplay">
              Or you can contact me directly
            </h1>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { duration: 1 } }}
              exit={{ scale: 0, transition: { duration: 0.5, delay: 0.5 } }}
              className="w-full justify-center m-auto font-DMSerifDisplay order-first lg:order-last hidden md:flex">
              <div className="relative">
                <div>
                  <img
                    className="h-[600px] w-auto object-cover"
                    src={sample}
                    alt=""
                  />
                </div>
                <div className="absolute top-0 px-8 mt-4">
                  <h1 className="mt-[25%] text-[32px] md:text-[44px] lg:text-[64px] xl:text-[56px] 2xl:text-[64px] font-bold text-white font-DMSerifDisplay text-center">
                    Contact Me
                  </h1>
                  <h1 className="mt-8 ml-8 text-[24px] font-DMSerifDisplay text-center">
                    Don’t hesitate to contact me!
                  </h1>
                  <h1 className="ml-8 text-[24px] font-DMSerifDisplay text-center">
                    {" "}
                    If you wish to email me directly, please reach out to me via
                    email at{" "}
                    <span className="text-[#EABE7B]">
                      {authorData.email}
                    </span>{" "}
                    or call me at{" "}
                    <span className="text-[#EABE7B]">
                      {authorData.phoneNumber}
                    </span>
                  </h1>
                </div>
              </div>
            </motion.div>
            {/* only mobile without animated svg */}
            <div className="w-full mt-0 font-DMSerifDisplay order-first md:order-last block md:hidden">
              <div className="">
                <h1 className="ml-8 text-[24px] font-DMSerifDisplay text-left mt-4">
                  Don’t hesitate to contact me!
                </h1>
                <h1 className="ml-8 text-[24px] font-DMSerifDisplay text-left">
                  {" "}
                  If you wish to email me directly, please reach out to me via
                  email at{" "}
                  <span className="text-[#EABE7B]">{authorData.email}</span> or
                  call me at{" "}
                  <span className="text-[#EABE7B]">
                    {authorData.phoneNumber}
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
