import React from "react";
import { motion } from "framer-motion";
import gear from "../assets/images/gear.png";

const LoadingScreen = ({ text = "Loading...", show = true }) => (
  <motion.div
    className="w-full h-screen fixed top-0 left-0 z-30 flex items-center justify-center bg-[#EABE7B]"
    initial={{ opacity: 1 }}
    animate={{ opacity: show ? 1 : 0 }}
    transition={{ duration: 0.8 }}
  >
    <motion.div
      className="flex flex-col items-center justify-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.img
        src={gear}
        alt="Loading gear"
        className="w-20 h-20 mb-6"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
      />
      <motion.h1
        className="text-black-v1 font-DMSerifDisplay text-[32px] lg:text-[40px] font-bold"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {text}
      </motion.h1>
    </motion.div>
  </motion.div>
);

export default LoadingScreen;
