"use client"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { useState } from "react"

export const ThreeDCarousel = ({
  images = [],
  className,
}: {
  images?: string[]
  className?: string
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Add this early return
  if (!images || images.length === 0) {
    return (
      <div className={cn("mx-auto flex h-[600px] items-center justify-center overflow-hidden rounded-2xl", className)}>
        <div className="text-center text-gray-500">
          <p>No images provided</p>
        </div>
      </div>
    )
  }

  // Calculate the angle between each image
  const angleStep = 360 / images.length
  const radius = 400 // Distance from center

  return (
    <div
      className={cn("mx-auto flex h-[600px] items-center justify-center overflow-hidden rounded-2xl", className)}
      style={{ perspective: "1000px" }}
    >
      <div className="relative h-96 w-96">
        <motion.div
          className="relative h-full w-full transform-3d"
          animate={{ rotateY: 360 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {images.map((image, index) => {
            const angle = index * angleStep
            const isHovered = hoveredIndex === index

            return (
              <motion.div
                key={index}
                className="absolute left-1/2 top-1/2 origin-center"
                style={{
                  transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`,
                  transformStyle: "preserve-3d",
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <motion.img
                  src={image}
                  alt={`Carousel image ${index + 1}`}
                  className="h-48 w-32 rounded-lg object-cover shadow-2xl ring-1 ring-gray-950/10"
                  animate={{
                    scale: isHovered ? 1.1 : 1,
                    z: isHovered ? 50 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  style={{
                    backfaceVisibility: "hidden",
                  }}
                />

                {/* Reflection effect */}
                <motion.div
                  className="absolute top-full left-0 h-48 w-32 overflow-hidden rounded-lg opacity-20"
                  style={{
                    background: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 100%), url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transform: "scaleY(-1)",
                    maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 70%)",
                  }}
                  animate={{
                    scale: isHovered ? 1.1 : 1,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                />
              </motion.div>
            )
          })}
        </motion.div>

        {/* Center glow effect */}
        <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-blue-500/20 to-transparent blur-xl" />

        {/* Floor grid */}
        <div className="absolute left-1/2 top-full h-96 w-[800px] -translate-x-1/2 opacity-30">
          <div
            className="h-full w-full"
            style={{
              background: `
                linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px),
                linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
              transform: "rotateX(90deg) translateZ(-200px)",
              transformOrigin: "top center",
            }}
          />
        </div>
      </div>
    </div>
  )
}
