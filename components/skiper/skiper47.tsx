"use client";

/**
 * Perspective Carousel — Skiper UI (skiper47) recreation.
 * Adapted for Shuroq: uses the site's token ramp and service imagery instead
 * of the original illustrations. Core coverflow behavior unchanged.
 *
 * Credits:
 * - Component by @gurvinder-singh02 (Skiper UI / gxuri.me)
 * - Built with Swiper.js — https://swiperjs.com/
 * License: Free to use and modify in commercial projects with attribution.
 * Attribution to Skiper UI is required when using the free version.
 * No attribution required with Skiper UI Pro.
 */

import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as React from "react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { cn } from "@/lib/utils";

import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-cards";

export type CarouselSlide = {
  src: string;
  alt: string;
  title?: string;
  desc?: string;
};

const PERSPECTIVE_CSS = `
  .Carousal_001 {
    padding-bottom: 50px !important;
    /* The viewport clips the neighbouring slides. Fade those cut edges out so
       they never show as a hard vertical line beside the card. */
    -webkit-mask-image: linear-gradient(
      to right,
      transparent 0,
      #000 6%,
      #000 94%,
      transparent 100%
    );
    mask-image: linear-gradient(
      to right,
      transparent 0,
      #000 6%,
      #000 94%,
      transparent 100%
    );
  }
  .Carousal_001 .swiper-slide {
    transition: opacity 0.35s ease;
  }
  .Carousal_001 .swiper-slide:not(.swiper-slide-active) {
    opacity: 0.55;
  }
`;

export function Carousel_001({
  images,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 40,
}: {
  images: CarouselSlide[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
}) {
  // Swiper reads the clock while rendering (autoplay), which breaks static
  // prerendering. Mount it only on the client.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      className={cn("w-full relative", className)}
    >
      <style>{PERSPECTIVE_CSS}</style>

      {mounted && (
      <Swiper
        spaceBetween={spaceBetween}
        autoplay={
          autoplay
            ? { delay: 1500, disableOnInteraction: false }
            : false
        }
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={loop}
        slidesPerView={1.1}
        breakpoints={{
          640: { slidesPerView: 1.35 },
          1024: { slidesPerView: 1.55 },
        }}
        coverflowEffect={{
          rotate: 0,
          slideShadows: false,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={showPagination ? { clickable: true } : false}
        navigation={
          showNavigation
            ? { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
            : false
        }
        className="Carousal_001"
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className="w-full"
            style={{
              borderRadius: "48px",
              boxShadow:
                "inset 0 0 0 1.5px color-mix(in srgb, var(--fg) 30%, transparent)",
              overflow: "hidden",
              background: "var(--surface)",
              padding: 0,
              aspectRatio: "1 / 1",
              height: "auto",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt}
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </SwiperSlide>
        ))}
        {showNavigation && (
          <div>
            <div className="swiper-button-next after:hidden">
              <ChevronRightIcon className="h-6 w-6" style={{ color: "var(--fg)" }} />
            </div>
            <div className="swiper-button-prev after:hidden">
              <ChevronLeftIcon className="h-6 w-6" style={{ color: "var(--fg)" }} />
            </div>
          </div>
        )}
      </Swiper>
      )}
    </motion.div>
  );
}

export default Carousel_001;
