import React, { useContext } from "react";
import { motion } from "framer-motion";
import { LocationContext } from "../Contexts/LocationContext";
import SearchBox from "./SearchBox";
import ServiceCategories from "./ServiceCategories";

const Hero = () => {
  const { location, detectLocation, isFetchingLocation } = useContext(LocationContext);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const bgVariants = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 0.8,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      transition: {
        yoyo: Infinity,
        duration: 0.4
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const floatingVariants = {
    float: {
      y: [-10, 10],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2,
          ease: "easeInOut"
        }
      }
    }
  };

  return (
    <motion.div 
      className="relative min-h-[85vh] flex flex-col items-center justify-center pt-16 sm:pt-24 pb-32 sm:pb-48"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Backgrounds */}
      <motion.div
        className="absolute inset-0 bg-gray-900 z-0"
        style={{
          backgroundImage: `url(https://mydukaan.io/blog/wp-content/uploads/Rural-Handicrafts.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        variants={bgVariants}
      />
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 z-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Content */}
      <motion.div 
        className="relative z-10 text-center px-4 sm:px-6"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-3xl mt-10 sm:text-5xl font-bold text-white drop-shadow-lg"
          variants={itemVariants}
        >
          Discover Local Treasures
        </motion.h1>
        
        <motion.p 
          className="text-lg sm:text-xl text-gray-100 font-medium max-w-md sm:max-w-2xl mx-auto mt-3 sm:mt-4"
          variants={itemVariants}
        >
          Connect with trusted businesses and essential services in your neighborhood
        </motion.p>

        {/* Search Box */}
        <motion.div 
          className="w-full max-w-sm sm:max-w-4xl mx-auto rounded-xl p-4 mt-6 sm:mt-8"
          variants={itemVariants}
        >
          <SearchBox locationQuery={location} />
        </motion.div>

        <motion.button
          onClick={detectLocation}
          className="hidden sm:inline-flex mt-6 px-6 py-2 rounded-xl border border-white/30 bg-white/10 text-white backdrop-blur-sm text-lg font-semibold"
          variants={itemVariants}
          whileHover="hover"
          whileTap="tap"
        
          animate="float"
        >
          Detect My Location
        </motion.button>
      </motion.div>

      
        <ServiceCategories />
    </motion.div>
  );
};

export default Hero;