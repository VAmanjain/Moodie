'use client'

import React from "react";
import { Damion } from "next/font/google";
import Link from "next/link";
import { motion } from "framer-motion";

const damion = Damion({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-damion",
});

interface FloatingImageProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}

const FloatingImage: React.FC<FloatingImageProps> = ({
  src,
  alt,
  className = "",
  delay = 0,
}) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [0.7, 1, 0.7],
        scale: [0.8, 1.1, 0.8],
        y: [-20, 20, -20],
        rotate: [-5, 5, -5],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      <img
        src={src}
        alt={alt}
        className="w-16 h-16 md:w-24 md:h-24 object-contain drop-shadow-lg"
      />
    </motion.div>
  );
};

export default function HomePage() {

  const floatingImages = [
    {
      src: "happy-face (1).png",
      alt: "Happy emoji",
      position: "top-30 left-16 md:left-20",
      delay: 0,
    },
    {
      src: "cool.png",
      alt: "Cool emoji",
      position: "top-42 right-16 md:right-20",
      delay: 1.5,
    },
    {
      src: "star.png",
      alt: "Excited emoji",
      position: "bottom-32 md:bottom-42 left-16 md:left-32",
      delay: 3,
    },
    {
      src: "confused.png",
      alt: "Confused emoji",
      position: "bottom-30 right-16 md:right-32",
      delay: 4.5,
    },
  ];


  return (
    <div className="h-screen  bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">

{floatingImages.map((image, index) => (
        <FloatingImage
          key={index}
          src={image.src}
          alt={image.alt}
          className={`${image.position} z-10`}
          delay={image.delay}
        />
      ))}

      <div className="w-full md:text-8xl text-6xl max-w-3xl md:max-w-7xl text-center  grid gap-6">
        <h1 className=" font-bold inline ">
          Track your team's
          <span
            className={
              `${damion.className}` +
              " font-bold mx-2 text-teal-600 p-1 rounded-lg "
            }
          >
            moods
          </span>
        </h1>
        <p className=" md:text-2xl text-lg text-gray-700 font-medium  ">
          Because happy teams create better results
          <br />
        </p>

        <Link
          href="/mood"
          className="w-full max-w-[20rem] font-semibold text-sm md:text-xl py-4 border-2 border-teal-600 px-6 rounded-full italic mx-auto hover:font-['Damion',cursive] text-teal-600 borde-teal-600 hover:bg-teal-600 hover:text-white hover:px-8  transition-all duration-300"
        >
          Submit Your Mood
        </Link>
      </div>
    </div>
  );
}
