import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Updated image URLs with valid sources
const imgs = [
  "https://www.himalayanbuzz.com/wp-content/uploads/2019/04/Dehradun_Cafe.jpg",
  "https://imgmediagumlet.lbb.in/media/2018/12/5c0e8b8eeabd9b1ed3bfb6d2_1544457102822.jpg",
  "https://cdn.prod.website-files.com/60414b21f1ffcdbb0d5ad688/66181abf2dbc25ec0de5b763_nathan-dumlao-gOn7dKcCWKg-unsplash.jpg",
  "https://thelagirl.com/wp-content/uploads/2022/06/coffee-shops-featured-image-1080x720.jpg",
  "https://www.littlestepsasia.com/wp-content/uploads/2022/05/Best-Coffee-Shops-For-Kids-Families-Hong-Kong.jpg",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  "https://thearchitectsdiary.com/wp-content/uploads/2023/07/feminist-design-3-1024x682.webp",
];

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

const SwipeCarousel = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();
      if (x === 0) {
        setImgIndex((prev) => (prev === imgs.length - 1 ? 0 : prev + 1));
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, [dragX]);

  const onDragEnd = () => {
    const x = dragX.get();
    if (x <= -DRAG_BUFFER && imgIndex < imgs.length - 1) {
      setImgIndex((prev) => prev + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((prev) => prev - 1);
    }
  };

  const nextImage = () => setImgIndex((prev) => (prev === imgs.length - 1 ? 0 : prev + 1));
  const prevImage = () => setImgIndex((prev) => (prev === 0 ? imgs.length - 1 : prev - 1));

  return (
    <div className="relative overflow-hidden bg-neutral-950 py-8 w-full h-full mx-auto">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x: dragX }}
        animate={{ translateX: `-${imgIndex * 100}%` }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex cursor-grab items-center active:cursor-grabbing h-full"
      >
        <Images imgIndex={imgIndex} />
      </motion.div>

      <GradientEdges />
      
      <button 
        onClick={prevImage} 
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white rounded-full p-2 hover:bg-white/10 transition-colors"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextImage} 
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white rounded-full p-2 hover:bg-white/10 transition-colors"
      >
        <ChevronRight size={24} />
      </button>
        
      <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} />
    </div>
  );
};

const Images = ({ imgIndex }) => {
  return (
    <>
      {imgs.map((imgSrc, idx) => (
        <motion.div
          key={idx}
          style={{
            backgroundImage: `url(${imgSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          animate={{
            scale: imgIndex === idx ? 0.95 : 0.85,
          }}
          transition={SPRING_OPTIONS}
          className="w-full h-full shrink-0 rounded-xl bg-neutral-800 object-cover"
        />
      ))}
    </>
  );
};

const Dots = ({ imgIndex, setImgIndex }) => {
  return (
    <div className="mt-2 flex w-full justify-center gap-1">
      {imgs.map((_, idx) => (
        <button
          key={idx}
          onClick={() => setImgIndex(idx)}
          className={`h-2 w-2 rounded-full transition-colors ${
            idx === imgIndex ? "bg-neutral-50" : "bg-neutral-500"
          }`}
        />
      ))}
    </div>
  );
};

const GradientEdges = () => {
  return (
    <>
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-neutral-950/50 to-neutral-950/0" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-neutral-950/50 to-neutral-950/0" />
    </>
  );
};

export default SwipeCarousel;
