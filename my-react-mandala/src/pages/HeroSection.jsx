import React, { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Scene from "../components/3d/Scene";
import Particles from "../components/3d/Particles";
import painting1 from "../assets/paintings/painting1.jpg";
import painting2 from "../assets/paintings/painting2.jpg";
import painting3 from "../assets/paintings/painting3.jpg";
import painting4 from "../assets/paintings/painting4.jpg";
import painting5 from "../assets/paintings/painting5.png";
import painting6 from "../assets/paintings/painting6.png";
import painting8 from "../assets/paintings/painting8.png";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const heroImages = [
  {
    id: 1,
    image: painting4,
    title: "White Tara",
    description: "Symbol of compassion and longevity",
  },
  {
    id: 2,
    image: painting5,
    title: "Mandala of Compassion",
    description: "Sacred geometric representation",
  },
  {
    id: 3,
    image: painting6,
    title: "Wheel of Life",
    description: "The cycle of existence",
  },
  {
    id: 4,
    image: painting8,
    title: "Manjushri",
    description: "Bodhisattva of Wisdom",
  },
];

const featuredArt = [
  {
    id: 1,
    image: painting1,
    title: "Lord Ganesha",
    desc: "Remover of Obstacles",
  },
  {
    id: 2,
    image: painting2,
    title: "Green Tara",
    desc: "Mother of Liberation",
  },
  { id: 3, image: painting3, title: "Mahakala", desc: "The Great Protector" },
  { id: 5, image: painting5, title: "Mandala", desc: "Circle of Compassion" },
  {
    id: 6,
    image: painting6,
    title: "Wheel of Life",
    desc: "Cycle of Existence",
  },
  { id: 8, image: painting8, title: "Manjushri", desc: "Wisdom & Insight" },
];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [prevImageIndex, setPrevImageIndex] = React.useState(0);
  const containerRef = useRef(null);
  const galleryRef = useRef(null);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  // Image rotation with crossfade
  React.useEffect(() => {
    const interval = setInterval(() => {
      setPrevImageIndex(currentImageIndex);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImageIndex]);

  // Opening animation timeline
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
      })
        .from(
          subtitleRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 1,
          },
          "-=0.6"
        )
        .from(
          ctaRef.current,
          {
            y: 30,
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
          },
          "-=0.4"
        );

      // Parallax effect on hero section
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: 200,
        opacity: 0.5,
      });

      // Gallery cards animation
      const cards = gsap.utils.toArray(".art-card");
      gsap.fromTo(
        cards,
        { y: 100, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 75%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const currentImage = heroImages[currentImageIndex];
  const prevImage = heroImages[prevImageIndex];

  return (
    <div
      ref={containerRef}
      className="bg-heritage-cream min-h-screen overflow-hidden"
    >
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      >
        {/* Background Images with Crossfade */}
        <div className="absolute inset-0 z-0">
          {/* Previous Image */}
          <motion.div
            key={`prev-${prevImageIndex}`}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center transform scale-110"
            style={{ backgroundImage: `url(${prevImage.image})` }}
          />
          {/* Current Image */}
          <motion.div
            key={`current-${currentImageIndex}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1.05 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentImage.image})` }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 backdrop-blur-[1px]" />
        </div>

        {/* 3D Particles Layer */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Scene>
            <Particles count={150} />
          </Scene>
        </div>

        {/* Content */}
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <div>
            <h1
              ref={titleRef}
              className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 tracking-wide drop-shadow-2xl"
            >
              Sacred Art of the Himalayas
            </h1>
            <motion.p
              ref={subtitleRef}
              key={currentImageIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-xl md:text-2xl font-light mb-10 text-gray-100 tracking-wider"
            >
              {currentImage.title}{" "}
              <span className="mx-3 text-heritage-gold text-3xl">•</span>{" "}
              {currentImage.description}
            </motion.p>
            <motion.div
              ref={ctaRef}
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <Link
                to="/product"
                className="inline-block px-10 py-4 border-2 border-white/40 bg-white/10 backdrop-blur-md hover:bg-heritage-gold hover:border-heritage-gold hover:text-white hover:shadow-2xl hover:shadow-heritage-gold/50 transition-all duration-500 text-lg tracking-[0.3em] uppercase rounded-sm font-semibold"
              >
                Enter Gallery
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 text-white/80"
        >
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-white/80 to-transparent mx-auto" />
          <span className="text-xs tracking-[0.4em] uppercase mt-3 block font-light">
            Scroll
          </span>
        </motion.div>
      </section>

      {/* Featured Gallery Section */}
      <section
        ref={galleryRef}
        className="py-24 px-6 md:px-12 bg-heritage-paper relative"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-heritage-charcoal mb-4">
              Featured Masterpieces
            </h2>
            <div className="w-24 h-1 bg-heritage-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {featuredArt.map((art) => (
              <Link
                key={art.id}
                to={`/product/${art.id}`}
                className="art-card group block relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white"
              >
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                </div>
                <div className="p-6 text-center border-t-4 border-heritage-gold/0 group-hover:border-heritage-gold transition-all duration-300">
                  <h3 className="text-2xl font-serif text-heritage-charcoal mb-2 group-hover:text-heritage-gold transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-gray-500 font-light italic">{art.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
