import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SupportCard = () => {
  return (
    <div className="flex items-center justify-center py-5 text-neutral-800">
      <BlockInTextCard
        text={
          <>
            <strong>Need assistance?</strong> We're here to help! Ask us anything.
          </>
        }
        examples={[
          "How can I add my business to the listing?",
          "Can I update my business details after listing?",
          "Is there a way to promote my business on your platform?",
          "How do customer reviews impact my business ranking?",
        ]}
      />
    </div>
  );
};

const BlockInTextCard = ({ tag, text, examples }) => {
  return (
    <div className="w-full max-w-xl space-y-6 pt-2">
      <div>
        <p className="mb-1.5 text-sm font-light uppercase">{tag}</p>
        <hr className="border-neutral-700" />
      </div>
      <p className="max-w-lg text-xl leading-relaxed">{text}</p>
      <div>
        <Typewrite examples={examples} />
        <hr className="border-neutral-300" />
      </div>
    </div>
  );
};

const LETTER_DELAY = 0.025;
const BOX_FADE_DURATION = 0.125;
const FADE_DELAY = 5;
const MAIN_FADE_DURATION = 0.25;
const SWAP_DELAY_IN_MS = 5500;

const Typewrite = ({ examples }) => {
  const [exampleIndex, setExampleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setExampleIndex((pv) => (pv + 1) % examples.length);
    }, SWAP_DELAY_IN_MS);

    return () => clearInterval(intervalId);
  }, [examples.length]);

  return (
    <p className="mb-2.5 text-sm font-light uppercase">
      <span className="inline-block size-2 bg-neutral-950" />
      <span className="ml-3">
        EXAMPLE:{" "}
        {examples[exampleIndex].split("").map((l, i) => (
          <motion.span
            initial={{
              opacity: 1,
            }}
            animate={{
              opacity: 0,
            }}
            transition={{
              delay: FADE_DELAY,
              duration: MAIN_FADE_DURATION,
              ease: "easeInOut",
            }}
            key={`${exampleIndex}-${i}`}
            className="relative"
          >
            <motion.span
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: i * LETTER_DELAY,
                duration: 0,
              }}
            >
              {l}
            </motion.span>
            <motion.span
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                delay: i * LETTER_DELAY,
                times: [0, 0.1, 1],
                duration: BOX_FADE_DURATION,
                ease: "easeInOut",
              }}
              className="absolute bottom-[3px] left-[1px] right-0 top-[3px] bg-neutral-950"
            />
          </motion.span>
        ))}
      </span>
    </p>
  );
};

export default SupportCard;
