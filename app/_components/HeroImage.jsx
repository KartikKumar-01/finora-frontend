"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AspectRatio } from "./ui/aspect-ratio";

const HeroImage = () => {
    return (
        <motion.div
            className="w-full max-w-5xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: 1,
                scale: 1,
                y: [0, -10, 0],
            }}
            transition={{
                opacity: { duration: 1 },
                scale: { duration: 1 },
                y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                },
            }}
        >
            <AspectRatio ratio={16 / 9} className="rounded-lg bg-muted">
                <Image
                    src={'/istockphoto-1448519280-612x612.webp'}
                    alt="hero-img"
                    fill
                    className="object-cover"
                />
            </AspectRatio>
        </motion.div>

    );
}

export default HeroImage