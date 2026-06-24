"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";

export interface ProductCard3DProps {
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  rating?: number;
  onActionClick?: () => void;
  className?: string;
}

export const ProductCard3D = React.forwardRef<HTMLDivElement, ProductCard3DProps>(
  (
    { name, category, description, price, image, rating = 4.5, onActionClick, className },
    ref
  ) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 12, stiffness: 180 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const rotateX = useTransform(springY, [-0.5, 0.5], ["25deg", "-25deg"]);
    const rotateY = useTransform(springX, [-0.5, 0.5], ["-25deg", "25deg"]);

    const percentX = useTransform(springX, [-0.5, 0.5], [0, 100]);
    const percentY = useTransform(springY, [-0.5, 0.5], [0, 100]);

    const spotlightBackground = useMotionTemplate`radial-gradient(circle 250px at ${percentX}% ${percentY}%, rgba(255,255,255,0.35), transparent)`;

    const edgeShadow = useMotionTemplate`${springX}px ${springY}px 50px rgba(68,54,42,0.3), inset 0 0 0 1px rgba(0,0,0,0.04)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const { width, height, left, top } = rect;
      const xPct = (e.clientX - left) / width - 0.5;
      const yPct = (e.clientY - top) / height - 0.5;
      mouseX.set(xPct);
      mouseY.set(yPct);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: 800 }}
        className={cn("w-full h-full", className)}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative h-full rounded-2xl bg-white overflow-hidden group cursor-pointer"
        >
          {/* Dynamic spotlight following cursor */}
          <motion.div
            style={{
              background: spotlightBackground,
              transform: "translateZ(1px)",
            }}
            className="absolute inset-0 z-20 pointer-events-none rounded-2xl"
          />

          {/* Inner content with depth layers */}
          <div
            style={{
              transform: "translateZ(1px)",
              transformStyle: "preserve-3d",
            }}
            className="h-full flex flex-col"
          >
            {/* Image with parallax depth */}
            <motion.div
              style={{ transform: "translateZ(15px)" }}
              className="relative h-48 overflow-hidden"
            >
              <img
                src={image}
                alt={name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </motion.div>

            {/* Content with elevated depth */}
            <motion.div
              style={{ transform: "translateZ(25px)" }}
              className="relative p-5 flex flex-col flex-1"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-[#927557] text-white shadow-md">
                  {category}
                </span>
                <span className="flex items-center gap-1 text-xs text-[#927557] font-semibold">
                  <Star className="w-3 h-3 fill-current" />
                  {rating}
                </span>
              </div>

              <h3
                style={{ transform: "translateZ(30px)" }}
                className="font-heading text-xl font-bold text-[#44362A] mb-2"
              >
                {name}
              </h3>

              <p
                style={{ transform: "translateZ(20px)" }}
                className="text-sm text-[#948D82] mb-4 line-clamp-2"
              >
                {description}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <span
                  style={{ transform: "translateZ(25px)" }}
                  className="font-heading text-2xl font-bold text-[#525A40]"
                >
                  {formatPrice(price)}
                </span>
                <motion.button
                  onClick={onActionClick}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ transform: "translateZ(30px)" }}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#927557] hover:gap-2 transition-all"
                >
                  View Details
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Dynamic edge shadow that shifts with tilt */}
          <motion.div
            style={{
              boxShadow: edgeShadow,
              transform: "translateZ(0px)",
            }}
            className="absolute inset-0 rounded-2xl pointer-events-none z-10"
          />
        </motion.div>
      </motion.div>
    );
  }
);

ProductCard3D.displayName = "ProductCard3D";
