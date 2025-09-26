import React, { useState, useEffect, useRef } from "react";
import emailjs from "emailjs-com";
import sanityClient from "../client.js";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "./LoadingScreen";
import sample from "../assets/svg/sample2.svg";
import "../App.css";

export default function Contact() {
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const form = useRef();
  const [sentMail, setSentMail] = useState(false);

  function handleSendMail() {
    setSentMail(true);
    setTimeout(() => {
      setSentMail(false);
    }, 5000);
  }

  const sendEmail = e => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_08pn7os",
        "template_erzllto",
        form.current,
        "lclBvOSP8Rd9cApz-"
      )
      .then(
        result => {
          console.log(result.text);
          if (result.text === "OK") {
            // alert("Success" + result.status);
            handleSendMail();
            e.target.reset();
          } else {
            alert("Error");
          }
        },
        error => {
          console.log(error.text);
        }
      );
  };

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

  // Animation
  const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

  const HeadingContainer = {
    initial: {
      y: 0,
    },
    animate: {
      y: 0,
      transition: {
        delayChildren: 0.05,
        staggerChildren: 0.02,
      },
    },
  };

  const HeaderOne = {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: { y: 0, opacity: 1, transition: { duration: 3, ...transition } },
    exit: {
      x: "100vw",
      opacity: 0,
      transition: { duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] },
    },
  };

  const HeaderTwo = {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: { y: 0, opacity: 1, transition: { duration: 3, ...transition } },
    exit: {
      x: "-100vw",
      opacity: 0,
      transition: { duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] },
    },
  };
  // End of Animation

  if (!authorData || loading === true) {
    return <LoadingScreen text="Contact" show={loading} />;
  }

  return (
    <div className="px-8 md:px-[80px] lg:px-[160px] bg-general-black flex text-white overflow-hidden">
      <div className="m-auto">
        {/* Email Notification Toast for sucess on sending */}
        <AnimatePresence
          initial={true}
          exitBeforeEnter={true}
          onExitComplete={() => console.log("exit")}>
          {sentMail && (
            <div className="w-full h-screen bg-[#191919] fixed top-0 left-0 z-50 flex">
              <motion.div
                initial={{ y: "-100vh" }}
                animate={{
                  y: 0,
                  transition: { type: "spring", damping: 25, stiffness: 500 },
                }}
                exit={{ y: "-100vh" }}
                className="w-[800px] bg-[#EABE7B]  p-8 m-auto rounded-[25px] z-50 flex justify-center items-center">
                <div className="flex justify-center items-center">
                  <img
                    className="rounded-[25px] mx-auto w-[100px] mr-[10px]"
                    src="https://c.tenor.com/b-pCRufrKp8AAAAC/thumbs-up.gif"
                    alt=""
                  />
                  <h1 className="text-black-v1 font-bold text-[24px] text-center">
                    Your message has been sent successfully. Thank you!
                  </h1>
                </div>
                <div className="top-[5px] right-[20px] absolute">
                  <button
                    className="text-black-v1 hover:text-white font-DMSerifDisplay"
                    onClick={() => setSentMail(false)}>
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        {/* End of Email Notification Toast */}

        <div className="flex flex-col">
          <div className="text-center w-full py-12 mt-0 md:mt-8">
            <motion.div>
              <motion.span
                variants={HeadingContainer}
                initial="initial"
                animate="animate"
                exit="exit"
                className="text-[32px] md:text-[40px] lg:text-[80px] font-bold text-[#EABE7B] font-DMSerifDisplay">
                <motion.span className="inline-block" variants={HeaderOne}>
                  T
                </motion.span>
                <motion.span className="inline-block" variants={HeaderOne}>
                  h
                </motion.span>
                <motion.span className="inline-block" variants={HeaderOne}>
                  a
                </motion.span>
                <motion.span className="inline-block" variants={HeaderOne}>
                  t
                </motion.span>
                <motion.span className="inline-block" variants={HeaderOne}>
                  '
                </motion.span>
                <motion.span className="inline-block" variants={HeaderOne}>
                  s
                </motion.span>
                <span className="pl-[4.5px] md:pl-4"></span>
                <motion.span className="inline-block" variants={HeaderOne}>
                  e
                </motion.span>
                <motion.span className="inline-block" variants={HeaderOne}>
                  n
                </motion.span>
                <motion.span className="inline-block" variants={HeaderOne}>
                  o
                </motion.span>
                <motion.span className="inline-block" variants={HeaderOne}>
                  u
                </motion.span>
                <motion.span className="inline-block" variants={HeaderOne}>
                  g
                </motion.span>
                <motion.span className="inline-block" variants={HeaderOne}>
                  h
                </motion.span>
                <span className="pl-[4.5px] md:pl-4"></span>
                <motion.span className="inline-block" variants={HeaderOne}>
                  a
                </motion.span>
                <motion.span className="inline-block" variants={HeaderOne}>
                  b
                </motion.span>
                <motion.span className="inline-block" variants={HeaderOne}>
                  o
                </motion.span>
                <motion.span className="inline-block" variants={HeaderOne}>
                  u
                </motion.span>
                <motion.span className="inline-block" variants={HeaderOne}>
                  t
                </motion.span>
                <span className="pl-[4.5px] md:pl-4"></span>
                <motion.span className="inline-block" variants={HeaderOne}>
                  m
                </motion.span>
                <motion.span className="inline-block" variants={HeaderOne}>
                  e
                </motion.span>
                <motion.span className="inline-block" variants={HeaderOne}>
                  ,
                </motion.span>
              </motion.span>
              <motion.h1
                variants={HeadingContainer}
                initial="initial"
                animate="animate"
                exit="exit"
                className="text-[32px] md:text-[40px] lg:text-[80px] font-bold text-[#EABE7B] font-DMSerifDisplay">
                <motion.span className="inline-block" variants={HeaderTwo}>
                  L
                </motion.span>
                <motion.span className="inline-block" variants={HeaderTwo}>
                  e
                </motion.span>
                <motion.span className="inline-block" variants={HeaderTwo}>
                  t
                </motion.span>
                <motion.span className="inline-block" variants={HeaderTwo}>
                  '
                </motion.span>
                <motion.span className="inline-block" variants={HeaderTwo}>
                  s
                </motion.span>
                <motion.span
                  className="inline-block pl-[4.5px] md:pl-4"
                  variants={HeaderTwo}></motion.span>
                <motion.span className="inline-block" variants={HeaderTwo}>
                  t
                </motion.span>
                <motion.span className="inline-block" variants={HeaderTwo}>
                  a
                </motion.span>
                <motion.span className="inline-block" variants={HeaderTwo}>
                  l
                </motion.span>
                <motion.span className="inline-block" variants={HeaderTwo}>
                  k
                </motion.span>
                <motion.span
                  className="inline-block pl-[4.5px] md:pl-4"
                  variants={HeaderTwo}></motion.span>
                <motion.span className="inline-block" variants={HeaderTwo}>
                  a
                </motion.span>
                <motion.span className="inline-block" variants={HeaderTwo}>
                  b
                </motion.span>
                <motion.span className="inline-block" variants={HeaderTwo}>
                  o
                </motion.span>
                <motion.span className="inline-block" variants={HeaderTwo}>
                  u
                </motion.span>
                <motion.span className="inline-block" variants={HeaderTwo}>
                  t
                </motion.span>
                <motion.span
                  className="inline-block pl-[4.5px] md:pl-4"
                  variants={HeaderTwo}></motion.span>
                <motion.span className="inline-block" variants={HeaderTwo}>
                  y
                </motion.span>
                <motion.span className="inline-block" variants={HeaderTwo}>
                  o
                </motion.span>
                <motion.span className="inline-block" variants={HeaderTwo}>
                  u
                </motion.span>
                <motion.span className="inline-block" variants={HeaderTwo}>
                  !
                </motion.span>
              </motion.h1>
            </motion.div>

            <motion.form
              ref={form}
              onSubmit={sendEmail}
              initial={{ y: 100, scale: 0 }}
              animate={{
                y: 0,
                scale: 1,
                transition: { delay: 0.8, duration: 0.8 },
              }}
              exit={{
                y: 0,
                scale: 0,
                transition: { duration: 0.5, delay: 0.3 },
              }}
              className="px-4 md:px-8 mt-8 space-y-10">
              <div className="flex flex-col space-y-5 relative">
                <input
                  required
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                  className="bg-transparent border-b-2 focus-within:border-[#EABE7B] text-[24px] font-DMSerifDisplay focus:outline-none peer placeholder-transparent"></input>
                <label className="cursor-text absolute left-0 top-[-50px] text-[24px] font-DMSerifDisplay transition-all peer-placeholder-shown:text-[24px] peer-placeholder-shown:text-white/75 peer-placeholder-shown:-top-5">
                  Subject
                </label>
              </div>
              <div className="flex flex-col space-y-5 relative ">
                <input
                  required
                  id="user_name"
                  name="user_name"
                  placeholder="Your Name"
                  className="bg-transparent border-b-2 focus-within:border-[#EABE7B] text-[24px] font-DMSerifDisplay focus:outline-none peer placeholder-transparent"></input>
                <label className="cursor-text absolute left-0 top-[-50px]  text-[24px] font-DMSerifDisplay transition-all peer-placeholder-shown:text-[24px] peer-placeholder-shown:text-white/75 peer-placeholder-shown:-top-5">
                  Your Name
                </label>
              </div>
              <div className="flex flex-col space-y-5 relative ">
                <input
                  required
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  className="bg-transparent border-b-2 focus-within:border-[#EABE7B] text-[24px] font-DMSerifDisplay focus:outline-none peer placeholder-transparent"></input>
                <label className="cursor-text absolute left-0 top-[-50px]  text-[24px] font-DMSerifDisplay transition-all peer-placeholder-shown:text-[24px] peer-placeholder-shown:text-white/75 peer-placeholder-shown:-top-5">
                  Your Email
                </label>
              </div>
              <div className="flex flex-col space-y-5 relative ">
                <textarea
                  required
                  id="message"
                  name="message"
                  placeholder="Share me your thoughts"
                  className="bg-transparent border-b-2 h-[40px] focus-within:border-[#EABE7B] text-[24px] font-DMSerifDisplay focus:outline-none peer placeholder-transparent"></textarea>
                <label className="cursor-text absolute left-0 top-[-50px]  text-[24px] font-DMSerifDisplay transition-all peer-placeholder-shown:text-[24px] peer-placeholder-shown:text-white/75 peer-placeholder-shown:-top-5">
                  Your Message
                </label>
              </div>
              <div>
                <button
                  type="submit"
                  value="Send"
                  className="bg-black-v1 rounded-lg w-full py-3 font-DMSerifDisplay hover:bg-[#EABE7B] hover:text-black-v1 transition-all duration-500">
                  Send
                </button>
              </div>
            </motion.form>
          </div>
          <div className="w-full py-8 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 2 } }}
              exit={{ opacity: 0 }}
              viewport={{ once: true }}
              className="text-[32px] md:text-[40px] lg:text-[80px] font-bold text-[#EABE7B] font-DMSerifDisplay">
              Or you can contact me directly
            </motion.div>
            <div className="w-full justify-center m-auto font-DMSerifDisplay order-first lg:order-last hidden md:flex">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1,
                  transition: { delay: 0.3, duration: 2 },
                }}
                exit={{ opacity: 0 }}
                viewport={{ once: true }}
                className="relative">
                <div>
                  <img
                    className="h-[700px] w-auto object-cover"
                    src={sample}
                    alt="blob"
                  />
                </div>
                <div className="absolute top-0 px-8 mt-4">
                  <h1 className="mt-[25%] text-[32px] md:text-[44px] lg:text-[64px] xl:text-[56px] 2xl:text-[64px] font-bold text-white font-DMSerifDisplay text-center">
                    Contact Me
                  </h1>
                  <h1 className="mt-8 ml-8 text-[24px] font-DMSerifDisplay text-center px-8">
                    {" "}
                    If you wish to email me directly, please reach out to me via
                    email at{" "}
                    <span className="text-[#EABE7B]">
                      <a href={`mailto: ${authorData.email}`}>
                        {authorData.email}
                      </a>
                    </span>{" "}
                    or call me at{" "}
                    <span className="text-[#EABE7B]">
                      <a
                        href={`https://wa.me/852${authorData.phoneNumber}`}
                        target="_blank"
                        rel="noreferrer">
                        {authorData.phoneNumber}
                      </a>
                    </span>
                  </h1>
                </div>
              </motion.div>
            </div>
            {/* only mobile without animated svg */}
            <div className="w-full mt-0 font-DMSerifDisplay order-first md:order-last block md:hidden">
              <div className="">
                <h1 className="ml-8 text-[24px] font-DMSerifDisplay text-left mt-4">
                  <span className="text-[#EABE7B]">
                    <a href={`mailto: ${authorData.email}`}>
                      {authorData.email}
                    </a>
                  </span>{" "}
                  or call me at{" "}
                  <span className="text-[#EABE7B]">
                    <a
                      href={`https://wa.me/852${authorData.phoneNumber}`}
                      target="_blank"
                      rel="noreferrer">
                      {authorData.phoneNumber}
                    </a>
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
