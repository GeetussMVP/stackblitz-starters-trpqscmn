"use client";
import { useEffect, useRef, useState } from "react";

const imageData = [
  { title: "Mountain Landscape", description: "Majestic peaks covered in snow during golden hour" },
  { title: "Forest Path", description: "A winding trail through ancient woodland" },
  { title: "Lake Reflection", description: "Serene waters mirroring the surrounding landscape" },
  { title: "Ocean Sunset", description: "Golden hour over endless ocean waves" },
  { title: "Desert Dunes", description: "Rolling sand dunes under vast blue skies" },
  { title: "Starry Night", description: "Countless stars illuminating the dark sky" },
  { title: "Waterfall", description: "Cascading water through lush green forest" }
];

export default function CoverflowCarousel() {
  const [currentIndex, setCurrentIndex] = useState(3);
  const [isPlaying, setIsPlaying] = useState(true);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const updateCoverflow = () => {
    itemsRef.current.forEach((item, index) => {
      if (!item) return;

      let offset = index - currentIndex;
      if (offset > imageData.length / 2) offset -= imageData.length;
      if (offset < -imageData.length / 2) offset += imageData.length;

      const abs = Math.abs(offset);
      const sign = Math.sign(offset);

      let translateX = offset * 220;
      let translateZ = -abs * 200;
      let rotateY = -sign * Math.min(abs * 60, 60);
      let opacity = 1 - abs * 0.2;
      let scale = 1 - abs * 0.1;

      if (abs > 3) {
        opacity = 0;
        translateX = sign * 800;
      }

      item.style.transform = `
        translateX(${translateX}px)
        translateZ(${translateZ}px)
        rotateY(${rotateY}deg)
        scale(${scale})
      `;
      item.style.opacity = `${opacity}`;
      item.style.zIndex = `${100 - abs}`;
    });
  };

  const navigate = (dir: number) => {
    stopAutoplay();
    setCurrentIndex(prev => (prev + dir + imageData.length) % imageData.length);
  };

  const goToIndex = (i: number) => {
    stopAutoplay();
    setCurrentIndex(i);
  };

  const startAutoplay = () => {
    autoplayRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % imageData.length);
    }, 4000);
    setIsPlaying(true);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    updateCoverflow();
  }, [currentIndex]);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">

      {/* Title + Description */}
      <div className="absolute top-24 text-center text-white transition-opacity">
        <h2 className="text-3xl font-semibold mb-1">
          {imageData[currentIndex].title}
        </h2>
        <p className="opacity-70 text-sm">
          {imageData[currentIndex].description}
        </p>
      </div>

      <div className="relative flex items-center justify-center perspective-[1200px]">
        {imageData.map((data, i) => (
          <div
            key={i}
            ref={(el: HTMLDivElement | null) => {
              itemsRef.current[i] = el;
            }}
            onClick={() => goToIndex(i)}
            className="absolute w-[240px] h-[260px] cursor-pointer transition-all duration-500"
          >
            <img
              src={`https://picsum.photos/600/600?random=${i}`}
              alt={data.title}
              className="rounded-lg w-full h-full object-cover shadow-xl"
            />
          </div>
        ))}
      </div>

      {/* Navigation */}
      <button
        className="absolute left-10 top-1/2 -translate-y-1/2 text-white text-4xl"
        onClick={() => navigate(-1)}
      >
        ‹
      </button>

      <button
        className="absolute right-10 top-1/2 -translate-y-1/2 text-white text-4xl"
        onClick={() => navigate(1)}
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 flex gap-3">
        {imageData.map((_, i) => (
          <div
            key={i}
            onClick={() => goToIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              currentIndex === i ? "bg-white scale-125" : "bg-gray-500"
            }`}
          />
        ))}
      </div>

      {/* Play / Pause */}
      <button
        onClick={() => (isPlaying ? stopAutoplay() : startAutoplay())}
        className="absolute bottom-24 text-white bg-white/10 border border-white/20 
        w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center"
      >
        {isPlaying ? "❚❚" : "►"}
      </button>
    </div>
  );
}