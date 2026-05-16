"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { CarouselApi } from "@/components/ui/carousel";
import type { BannerData } from "./types";

export function BannerCarousel({ banners, slideDuration = 4, isProductBanner = false }: { banners: BannerData[]; slideDuration?: number; isProductBanner?: boolean }) {
  // Use key to force re-creation of the autoplay plugin when duration changes
  const [autoplayKey, setAutoplayKey] = useState(0);
  const plugin = useRef(Autoplay({ delay: slideDuration * 1000, stopOnInteraction: false, stopOnMouseEnter: true }));
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevDurationRef = useRef(slideDuration);

  // Helper to get the display image for a banner
  const getBannerImage = (banner: BannerData) => {
    return (isProductBanner && banner.coverUrl) ? banner.coverUrl : banner.imageUrl;
  };

  // Re-create autoplay plugin when slideDuration changes
  useEffect(() => {
    if (prevDurationRef.current !== slideDuration) {
      prevDurationRef.current = slideDuration;
      plugin.current = Autoplay({ delay: slideDuration * 1000, stopOnInteraction: false, stopOnMouseEnter: true });
      setAutoplayKey((k) => k + 1);
    }
  }, [slideDuration]);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
      setProgress(0);
    };
    onSelect();
    api.on("select", onSelect);
    return () => { api.off("select", onSelect); };
  }, [api]);

  // Smooth progress bar timer
  useEffect(() => {
    if (progressRef.current) clearInterval(progressRef.current);
    
    const tickInterval = 50; // Update every 50ms for smooth progress
    const totalSteps = (slideDuration * 1000) / tickInterval;
    let currentStep = 0;

    progressRef.current = setInterval(() => {
      currentStep++;
      setProgress(Math.min((currentStep / totalSteps) * 100, 100));
      if (currentStep >= totalSteps) {
        currentStep = 0;
      }
    }, tickInterval);

    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [slideDuration, currentSlide]);

  // Only 1 banner: show full-width without peek
  if (banners.length <= 1) {
    return (
      <div className="relative">
        {banners.map((banner) => (
          <motion.div
            key={banner._id}
            initial={{ opacity: 0.6, scale: 1.02 }} 
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full rounded-2xl overflow-hidden group border border-white/10 shadow-xl shadow-black/30"
            style={{ aspectRatio: '1080/459' }}
          >
            {banner.link ? (
              <a href={banner.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                <img src={getBannerImage(banner)} alt={banner.title || "Banner"} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              </a>
            ) : (
              <img src={getBannerImage(banner)} alt={banner.title || "Banner"} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[var(--home-accent)]/60 to-transparent" />
            {banner.title && (
              <div className="absolute bottom-3 left-4 right-4 sm:bottom-5 sm:left-6 sm:right-6">
                <h2 className="text-sm sm:text-xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] line-clamp-1 font-heading">{banner.title}</h2>
                {banner.description && <p className="text-[10px] sm:text-xs text-white/70 mt-0.5 line-clamp-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">{banner.description}</p>}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    );
  }

  // Multiple banners: center peek carousel showing adjacent banners
  return (
    <div className="relative">
      <Carousel 
        key={autoplayKey}
        setApi={setApi} 
        opts={{ align: "center", loop: true, duration: 40, slidesToScroll: 1 }} 
        plugins={[plugin.current]} 
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {banners.map((banner, idx) => (
            <CarouselItem key={banner._id} className="pl-3 basis-[82%] sm:basis-[78%] md:basis-[75%]">
              <motion.div
                initial={{ opacity: 0.6, scale: 1.02 }} 
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative w-full rounded-2xl overflow-hidden group border border-white/10 shadow-xl shadow-black/30"
                style={{ aspectRatio: '1080/459' }}
              >
                {banner.link ? (
                  <a href={banner.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                    <img src={getBannerImage(banner)} alt={banner.title || "Banner"} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                  </a>
                ) : (
                  <img src={getBannerImage(banner)} alt={banner.title || "Banner"} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                )}
                {/* Gradient overlays - bottom fade for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent" />
                {/* Bottom accent gradient line */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[var(--home-accent)]/60 to-transparent" />
                {/* Banner text with shadow */}
                {banner.title && (
                  <motion.div 
                    initial={{ opacity: 0, y: 12 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.2, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute bottom-3 left-4 right-4 sm:bottom-5 sm:left-6 sm:right-6"
                  >
                    <h2 className="text-sm sm:text-xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] line-clamp-1 font-heading">{banner.title}</h2>
                    {banner.description && <p className="text-[10px] sm:text-xs text-white/70 mt-0.5 line-clamp-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">{banner.description}</p>}
                  </motion.div>
                )}
                {/* Slide counter badge */}
                <div className="absolute top-3 right-3">
                  <Badge className="bg-black/50 backdrop-blur-sm text-white/80 text-[9px] px-1.5 py-0.5 border border-white/10">{idx + 1}/{banners.length}</Badge>
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Navigation arrows */}
        <CarouselPrevious className="left-1 sm:left-2 bg-black/60 backdrop-blur-sm border-white/15 text-white hover:bg-black/80 hover:scale-110 transition-all h-9 w-9 rounded-full z-10" />
        <CarouselNext className="right-1 sm:right-2 bg-black/60 backdrop-blur-sm border-white/15 text-white hover:bg-black/80 hover:scale-110 transition-all h-9 w-9 rounded-full z-10" />
      </Carousel>
      {/* Dot indicators with progress bar */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        {banners.map((_, idx) => (
          <button 
            key={idx} 
            onClick={() => { api?.scrollTo(idx); setProgress(0); }}
            className="relative transition-all duration-500 rounded-full overflow-hidden"
            aria-label={`Slide ${idx + 1}`}
          >
            {/* Background track */}
            <div className={`rounded-full transition-all duration-300 ${
              currentSlide === idx 
                ? "w-7 h-2" 
                : "w-2 h-2 bg-white/20 hover:bg-white/40"
            }`}>
              {currentSlide === idx ? (
                <div className="relative w-full h-full rounded-full bg-white/15 overflow-hidden">
                  {/* Progress fill */}
                  <div 
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[var(--home-accent)] to-[var(--home-accent-to)] shadow-md"
                    style={{ width: `${progress}%`, transition: 'width 50ms linear' }}
                  />
                </div>
              ) : null}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
