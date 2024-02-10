'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';

// Import UI library components if using

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  const heroVariants = {
    initial: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.05,
    },
  };

  return (
    <motion.section
      variants={heroVariants}
      animate="animate"
      whileHover="hover"
      className="hero min-h-screen flex flex-col items-center justify-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(./hero-image.jpg)` }}
    >
      <motion.h1
        variants={heroVariants}
        className="text-5xl font-bold text-white mb-8"
      >
        Build the Perfect Web3 Resume
      </motion.h1>
      <motion.p
        variants={heroVariants}
        className="text-xl text-gray-200"
      >
        Stand out in the Web3 job market with a resume that showcases your skills and experience.
      </motion.p>
      {/* Interactive button with hover animation and loading state */}
      <motion.button
        whileHover={{ scale: 1 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 px-4 py-2 text-yellow-50 bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
      >
        {isHovered ? (
          <motion.span variants={{ initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.3 } } }}>
            Loading...
          </motion.span>
        ) : (
          'Start Building Now'
        )}
      </motion.button>
    </motion.section>
  );
};

// Other sections with creative animations and functionality (adapt based on your design)




// Other sections: About, Services, Features, Testimonials, FAQ, Contact (adapt accordingly)

const Homepage = () => {
  return (
    <div className="container mx-auto px-4 pt-20">
      <Head>
        <title>My Web3 Website</title>
        <meta name="description" content="A demo web3 website built with Next.js and Framer Motion." />
      </Head>

      <header className="fixed top-0 left-0 right-0 bg-white px-2 py-2 flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold text-black">My Web3 Company</h1>
        </Link>
        <nav className="text-black space-x-4">
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/features">Features</Link>
          {/* Add more links as needed */}
        
        </nav>
      </header>

      <HeroSection />

      {/* Other sections */}
    </div>
  );
};

export default Homepage;
