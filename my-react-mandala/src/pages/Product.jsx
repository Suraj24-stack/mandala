import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import painting1 from "../assets/paintings/painting1.jpg";
import painting2 from "../assets/paintings/painting2.jpg";
import painting3 from "../assets/paintings/painting3.jpg";
import painting4 from "../assets/paintings/painting4.jpg";
import painting5 from "../assets/paintings/painting5.png";
import painting6 from "../assets/paintings/painting6.png";
import painting7 from "../assets/paintings/painting7.png";
import painting8 from "../assets/paintings/painting8.png";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const products = [
  {
    id: 1,
    name: "Lord Ganesha Thangka",
    image: painting1,
    description:
      "Intricate Thangka painting of Lord Ganesha, the remover of obstacles.",
  },
  {
    id: 2,
    name: "Green Tara",
    image: painting2,
    description: "Beautiful depiction of Green Tara, the Mother of Liberation.",
  },
  {
    id: 3,
    name: "Mahakala",
    image: painting3,
    description: "Fierce and protective deity Mahakala, a symbol of power.",
  },
  {
    id: 4,
    name: "White Tara",
    image: painting4,
    description: "Serene White Tara, representing compassion and longevity.",
  },
  {
    id: 5,
    name: "Mandala of Compassion",
    image: painting5,
    description:
      "A highly detailed geometric Mandala representing the universe and compassion.",
  },
  {
    id: 6,
    name: "Wheel of Life",
    image: painting6,
    description:
      "Traditional Bhavachakra depicting the cycle of existence and samsara.",
  },
  {
    id: 7,
    name: "Life of Buddha",
    image: painting7,
    description:
      "Narrative Thangka illustrating key moments from the life of Siddhartha Gautama.",
  },
  {
    id: 8,
    name: "Manjushri",
    image: painting8,
    description:
      "The Bodhisattva of Wisdom, wielding the flaming sword of insight.",
  },
];

const Product = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  useGSAP(
    () => {
      // Header animation
      gsap.from(headerRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Product cards stagger animation
      const cards = gsap.utils.toArray(".product-card");
      gsap.fromTo(
        cards,
        {
          y: 80,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".products-grid",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const handleContact = (e, type, productName) => {
    e.preventDefault();
    e.stopPropagation();
    // Replace with actual contact details
    const email = "owner@example.com";
    const phone = "1234567890";

    if (type === "email") {
      window.location.href = `mailto:${email}?subject=Inquiry about ${productName}`;
    } else {
      window.open(
        `https://wa.me/${phone}?text=I am interested in ${productName}`,
        "_blank"
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-heritage-cream to-heritage-paper pt-28 pb-16 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center mb-20">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-heritage-charcoal mb-6">
              Ancient Thangka Collection
            </h1>
            <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-heritage-gold to-transparent mx-auto mb-6" />
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore our curated collection of traditional masterpieces, each
              telling a sacred story of wisdom and compassion.
            </p>
          </motion.div>
        </div>

        <div className="products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="product-card group bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-heritage-gold/30"
            >
              <Link
                to={`/product/${product.id}`}
                className="block relative overflow-hidden aspect-[3/4]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7 }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                  <p className="text-sm font-light tracking-wide">
                    View Details →
                  </p>
                </div>
              </Link>

              <div className="p-6 bg-gradient-to-b from-white to-gray-50/50">
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-2xl font-serif text-heritage-charcoal mb-3 group-hover:text-heritage-gold transition-colors duration-300">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
