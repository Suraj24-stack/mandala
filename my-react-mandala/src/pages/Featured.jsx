import React from "react";
import { Link } from "react-router-dom";
import painting1 from "../assets/paintings/painting1.jpg";
import painting2 from "../assets/paintings/painting2.jpg";
import painting3 from "../assets/paintings/painting3.jpg";
import painting5 from "../assets/paintings/painting5.png";
import painting6 from "../assets/paintings/painting6.png";
import painting8 from "../assets/paintings/painting8.png";

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

const Featured = () => {
  return (
    <div className="min-h-screen bg-heritage-paper pt-24 pb-12 px-6">
      <section className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-heritage-charcoal mb-4">
          Featured Masterpieces
        </h2>
        <div className="w-24 h-1 bg-heritage-gold mx-auto mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {featuredArt.map((art) => (
            <Link
              key={art.id}
              to={`/product/${art.id}`}
              className="group block relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white"
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
      </section>
    </div>
  );
};

export default Featured;
