import React from "react";
import { useParams, Link } from "react-router-dom";
import painting1 from "../assets/paintings/painting1.jpg";
import painting2 from "../assets/paintings/painting2.jpg";
import painting3 from "../assets/paintings/painting3.jpg";
import painting4 from "../assets/paintings/painting4.jpg";
import painting5 from "../assets/paintings/painting5.png";
import painting6 from "../assets/paintings/painting6.png";
import painting7 from "../assets/paintings/painting7.png";
import painting8 from "../assets/paintings/painting8.png";

const products = [
  {
    id: 1,
    name: "Lord Ganesha Thangka",
    image: painting1,
    description:
      "This exquisite Thangka painting depicts Lord Ganesha, the elephant-headed deity widely revered as the remover of obstacles, the patron of arts and sciences, and the deva of intellect and wisdom. Hand-painted by master artisans using traditional mineral pigments and gold dust on cotton canvas.",
    specs: [
      "Material: Cotton Canvas",
      "Pigments: Mineral & Gold Dust",
      "Origin: Nepal",
      "Dimensions: 50cm x 70cm",
    ],
  },
  {
    id: 2,
    name: "Green Tara",
    image: painting2,
    description:
      'Green Tara is the female Buddha of active compassion. She is known as the "Mother of Liberation" and represents the virtues of success in work and achievements. This painting captures her dynamic energy, ready to step down from her lotus throne to help sentient beings.',
    specs: [
      "Material: Cotton Canvas",
      "Pigments: Natural Stone Colors",
      "Origin: Kathmandu Valley",
      "Dimensions: 45cm x 60cm",
    ],
  },
  {
    id: 3,
    name: "Mahakala",
    image: painting3,
    description:
      "Mahakala is a Dharmapala (Protector of the Dharma) in Vajrayana Buddhism. Despite his wrathful appearance, he is a compassionate being who protects practitioners from deception and delusions. This powerful artwork features intricate details and vibrant, fiery colors.",
    specs: [
      "Material: Silk Brocade",
      "Pigments: Mineral Colors",
      "Style: Black Thangka",
      "Dimensions: 60cm x 80cm",
    ],
  },
  {
    id: 4,
    name: "White Tara",
    image: painting4,
    description:
      "White Tara is associated with compassion, long life, healing, and serenity. She is depicted with seven eyes—on her palms, soles, and forehead—symbolizing her watchfulness over all beings. This painting radiates peace and spiritual purity.",
    specs: [
      "Material: Cotton Canvas",
      "Pigments: Gold & Mineral",
      "Theme: Longevity & Healing",
      "Dimensions: 50cm x 70cm",
    ],
  },
  {
    id: 5,
    name: "Mandala of Compassion",
    image: painting5,
    description:
      "A mesmerizing Mandala of Compassion (Chenrezig). The intricate geometric patterns represent the cosmos and the pure land of the Buddha. This Thangka is perfect for meditation and bringing harmonious energy to any space.",
    specs: [
      "Material: Cotton Canvas",
      "Pigments: 24K Gold & Minerals",
      "Style: Mandala",
      "Dimensions: 50cm x 50cm",
    ],
  },
  {
    id: 6,
    name: "Wheel of Life",
    image: painting6,
    description:
      "The Bhavachakra or Wheel of Life is a complex symbolic representation of samsara (cyclic existence). It illustrates the six realms of existence, the three poisons, and the twelve links of dependent origination. A profound educational and spiritual masterpiece.",
    specs: [
      "Material: Aged Cotton",
      "Pigments: Natural Earth Colors",
      "Style: Traditional",
      "Dimensions: 60cm x 80cm",
    ],
  },
  {
    id: 7,
    name: "Life of Buddha",
    image: painting7,
    description:
      "This narrative Thangka beautifully illustrates the twelve major deeds of Shakyamuni Buddha, from his birth in Lumbini to his Parinirvana. Each scene is delicately painted with soft colors and fine gold lines, telling the story of enlightenment.",
    specs: [
      "Material: Fine Cotton",
      "Pigments: Stone Colors & Gold",
      "Theme: Narrative",
      "Dimensions: 70cm x 100cm",
    ],
  },
  {
    id: 8,
    name: "Manjushri",
    image: painting8,
    description:
      "Manjushri is the Bodhisattva of Great Wisdom. He is depicted holding a flaming sword in his right hand to cut through ignorance and a lotus flower supporting the Prajnaparamita sutra in his left. This painting inspires clarity, intelligence, and insight.",
    specs: [
      "Material: Cotton Canvas",
      "Pigments: Mineral & Gold",
      "Deity: Manjushri",
      "Dimensions: 45cm x 60cm",
    ],
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="page-container flex items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-serif text-heritage-dark-red">
          Product not found
        </h2>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Link
        to="/product"
        className="inline-flex items-center text-heritage-gold hover:text-heritage-dark-red transition-colors duration-300 mb-8 font-medium"
      >
        <span className="mr-2">&larr;</span> Back to Collection
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="w-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg shadow-2xl border-4 border-white hover:scale-[1.02] transition-transform duration-500"
          />
        </div>

        <div className="w-full space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif text-heritage-dark-red mb-4">
              {product.name}
            </h1>
            <div className="w-20 h-1 bg-heritage-blue rounded-full"></div>
          </div>

          <p className="text-lg text-gray-600 leading-relaxed font-light">
            {product.description}
          </p>

          <div className="bg-heritage-cream/30 p-6 rounded-lg border border-heritage-gold/20">
            <h3 className="text-xl font-serif text-heritage-charcoal mb-4 border-b border-heritage-gold/30 pb-2">
              Specifications
            </h3>
            <ul className="space-y-3">
              {product.specs &&
                product.specs.map((spec, index) => (
                  <li key={index} className="flex items-start text-gray-700">
                    <span className="text-heritage-blue mr-3 mt-1.5 text-xs">
                      ◆
                    </span>
                    <span>{spec}</span>
                  </li>
                ))}
            </ul>
          </div>

          <Link
            to="/inquiry"
            state={{ productName: product.name }}
            className="block w-full bg-heritage-dark-red text-white bg-blue-400 text-center font-semibold py-4 rounded-md hover:bg-red-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 tracking-wide uppercase"
          >
            Inquire About This Product
          </Link>
          {/* Price is intentionally omitted */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
