"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styled from "styled-components";

// ---------- Styled Components ----------

const Section = styled.section`
  padding: 4rem 1.5rem;
  width: 100%;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const Heading = styled.h2`
  font-size: clamp(2.25rem, 5vw, 3rem);
  font-weight: 300;
  text-align: center;
  color: white;
  margin-bottom: 3rem;
`;

const CarouselWrapper = styled.div`
  position: relative;
`;

const CarouselButton = styled.button<{ position: "left" | "right" }>`
  position: absolute;
  top: 50%;
  ${(props) => (props.position === "left" ? "left: 0;" : "right: 0;")}
  transform: translateY(-50%);
  z-index: 20;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 0.75rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const CarouselViewport = styled.div`
  margin: 0 4rem;

  @media (max-width: 1024px) {
    margin: 0 2rem;
  }

  @media (max-width: 640px) {
    margin: 0 1rem;
  }
`;

const CarouselTrack = styled.div<{ isTransitioning: boolean; slide: number; numVisible: number }>`
  display: flex;
  gap: 1.5rem;
  transition: ${(props) => (props.isTransitioning ? "transform 0.5s ease-out" : "none")};
  transform: ${(props) => `translateX(-${(props.slide * (100 / props.numVisible + 2))}%)`};
`;

const CarouselItem = styled.article<{ numVisible: number }>`
  flex-shrink: 0;
  width: ${(props) => {
    switch (props.numVisible) {
      case 1:
        return "100%";
      case 2:
        return "50%";
      case 3:
      default:
        return "33.3333%";
    }
  }};
`;

const CardLink = styled.a`
  display: block;
  text-decoration: none;
`;

const Card = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  transition: all 0.3s;
   padding-bottom: 1.5rem;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.35);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
`;

const CarouselImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;

  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5));
  opacity: 0.7;
  transition: opacity 0.3s;

  ${Card}:hover & {
    opacity: 0.8;
  }
`;

const CardTitle = styled.h3`
  text-align: center;
  font-size: 1.125rem;
  font-weight: 500;
  color: white;
  margin-top: 1rem;
  transition: color 0.3s;
  flex-vertical-align: middle;

  ${Card}:hover & {
    color: #14b8a6; /* teal-300 */
  }
`;

// ---------- Component ----------

const CategoryCarousel = () => {
  const categories = [
  { title: "Apvadų kampai", image: "/images/landing/apvadu-kampai.webp", href: "/produktai/apvadu-kampai" },
  { title: "Architravai", image: "/images/landing/architravai.webp", href: "/produktai/architravai" },
  { title: "Arkiniai elementai", image: "/images/landing/arkiniai-elementai.webp", href: "/produktai/arkiniai-elementai" },
  { title: "Arkiniai apvadai", image: "/images/landing/arkiniai-apvadai.webp", href: "/produktai/arkiniai-apvadai" },
  { title: "Balustrados pagrindai", image: "/images/landing/balustrados-pagrindai.webp", href: "/produktai/balustrados-pagrindai" },
  { title: "Balustrados porankiai", image: "/images/landing/balustrados-porankiai.webp", href: "/produktai/balustrados-porankiai" },
  { title: "Balustrai", image: "/images/landing/balustrai.webp", href: "/produktai/balustrai" },
  { title: "Bossage", image: "/images/landing/bossage.webp", href: "/produktai/bossage" },
  { title: "Durų dekora", image: "/images/landing/duru-dekora.webp", href: "/produktai/duru-dekora" },
  { title: "Fasado ornamentai", image: "/images/landing/fasado-ornamentai.webp", href: "/produktai/fasado-ornamentai" },
  { title: "Fasado frontonai", image: "/images/landing/fasado-frontonai.webp", href: "/produktai/fasado-frontonai" },
  { title: "Fasado galiniai elementai", image: "/images/landing/fasado-galiniai-elementai.webp", href: "/produktai/fasado-galiniai-elementai" },
  { title: "Frizai", image: "/images/landing/frizai.webp", href: "/produktai/frizai" },
  { title: "Gembės", image: "/images/landing/gembes.webp", href: "/produktai/gembes" },
  { title: "Grindjuostės", image: "/images/landing/grindu-apvadai.webp", href: "/produktai/grindjuostes" },
  { title: "Lango arkiniai rėmai", image: "/images/landing/lango-arkiniai-remai.webp", href: "/produktai/lango-arkiniai-remai" },
  { title: "Lango soniniai apvadai", image: "/images/landing/lango-soniniai-apvadai.webp", href: "/produktai/lango-soniniai-apvadai" },
  { title: "Lango angokrastai", image: "/images/landing/lango-angokrastai.webp", href: "/produktai/lango-angokrastai" },
  { title: "Lubu apvadai", image: "/images/landing/lubu-apvadai.webp", href: "/produktai/lubu-apvadai" },
  { title: "Lubu paneles", image: "/images/landing/lubu-paneles.webp", href: "/produktai/lubu-paneles" },
  { title: "Kolonos", image: "/images/landing/kolonos.webp", href: "/produktai/kolonos" },
  { title: "Kolonos liemuo", image: "/images/landing/kolonos-liemuo.webp", href: "/produktai/kolonos-liemuo" },
  { title: "Lauko palangės", image: "/images/landing/palanges.webp", href: "/produktai/lauko-palanges" },
  { title: "Lubų paneles", image: "/images/landing/lubu-paneles.webp", href: "/produktai/lubu-paneles" },
  { title: "Nisos", image: "/images/landing/nisos.webp", href: "/produktai/nisos" },
  { title: "Pediment", image: "/images/landing/pediment.webp", href: "/produktai/pediment" },
  { title: "Pjedestalines gembės", image: "/images/landing/pjedestalines-gembes.webp", href: "/produktai/pjedestalines-gembes" },
  { title: "Platband", image: "/images/landing/platband.webp", href: "/produktai/platband" },
  { title: "Postcap", image: "/images/landing/postcap.webp", href: "/produktai/postcap" },
  { title: "Rozetės", image: "/images/landing/rozetes.webp", href: "/produktai/rozetes" },
  { title: "Rustikai", image: "/images/landing/rustikai.webp", href: "/produktai/rustikai" },
  { title: "Sieninis dekoras", image: "/images/landing/sieninis-dekoras.webp", href: "/produktai/sieninis-dekoras" },
  { title: "Sienu apvadai", image: "/images/landing/sienu-apvadai.webp", href: "/produktai/sienu-apvadai" },
  { title: "Sienu paneles", image: "/images/landing/sienu-paneles.webp", href: "/produktai/sienu-paneles" },
  { title: "Statulėlės", image: "/images/landing/statuleles.webp", href: "/produktai/statuleles" },
  { title: "Stulpo kepurė", image: "/images/landing/stulpo-kepure.webp", href: "/produktai/stulpo-kepure" },
  { title: "Zidinio dekoracija", image: "/images/landing/zidinio-dekoracija.webp", href: "/produktai/zidinio-dekoracija" },
  { title: "Ziedai", image: "/images/landing/ziedai.webp", href: "/produktai/ziedai" },
  { title: "Ornamentai", image: "/images/landing/ornamentai.webp", href: "/produktai/ornamentai" },
  { title: "Puskolonos", image: "/images/landing/puskolonos.webp", href: "/produktai/puskolonos" },
  { title: "Papildomi elementai", image: "/images/landing/papildomi-elementai.webp", href: "/produktai/papildomi-elementai" },
];


  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [numVisible, setNumVisible] = useState(3);

  const displayCategories: (typeof categories[number] & { id: number })[] = [];
  for (let i = 0; i < categories.length * 3; i++) {
    displayCategories.push({ ...categories[i % categories.length], id: i });
  }

  useEffect(() => {
    const updateNumVisible = () => {
      if (window.innerWidth < 640) setNumVisible(2);
      else if (window.innerWidth < 1024) setNumVisible(2);
      else setNumVisible(3);
    };

    updateNumVisible();
    window.addEventListener("resize", updateNumVisible);
    return () => window.removeEventListener("resize", updateNumVisible);
  }, []);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);

    if (currentSlide >= displayCategories.length - numVisible - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(0);
      }, 0);
    }
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    if (currentSlide === 0) {
      setIsTransitioning(false);
      setCurrentSlide(displayCategories.length - numVisible - 1);
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentSlide((prev) => prev - 1);
      }, 50);
    } else {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 500);
      return () => clearTimeout(timer);
    }
  }, [currentSlide, isTransitioning]);

  return (
    <Section>
      <Container>
        <Heading>Kategorijos</Heading>

        <CarouselWrapper>
          <CarouselButton onClick={handlePrev} position="left" disabled={isTransitioning} aria-label="Previous categories">
            <ChevronLeft size={24} color="white" />
          </CarouselButton>

          <CarouselButton onClick={handleNext} position="right" disabled={isTransitioning} aria-label="Next categories">
            <ChevronRight size={24} color="white" />
          </CarouselButton>

          <CarouselViewport>
            <CarouselTrack isTransitioning={isTransitioning} slide={currentSlide} numVisible={numVisible}>
              {displayCategories.map((category, index) => (
                <CarouselItem key={`category-${category.id}-${index}`} numVisible={numVisible}>
                  <CardLink href={category.href}>
                    <Card>
                      <ImageWrapper>
                        <CarouselImage src={category.image} alt={category.title} />
                        <ImageOverlay />
                      </ImageWrapper>
                      <CardTitle>{category.title}</CardTitle>
                    </Card>
                  </CardLink>
                </CarouselItem>
              ))}
            </CarouselTrack>
          </CarouselViewport>
        </CarouselWrapper>
      </Container>
    </Section>
  );
};

export default CategoryCarousel;
