import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Inquiry = () => {
  const location = useLocation();
  const productName = location.state?.productName || "this product";
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".inquiry-card", {
        y: 50,
        opacity: 0,
        duration: 1,
      })
        .from(
          ".inquiry-title",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          ".inquiry-desc",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          ".form-group",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.4"
        );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-heritage-paper pt-28 pb-16 px-6 relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-heritage-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-heritage-dark-red/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="inquiry-card bg-white p-8 md:p-12 rounded-lg shadow-2xl border-t-4 border-heritage-dark-red relative overflow-hidden">
          {/* Traditional Pattern Accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-heritage-blue via-heritage-dark-red to-heritage-blue opacity-50"></div>

          <h1 className="inquiry-title text-4xl md:text-5xl font-serif text-center mb-6 text-heritage-charcoal">
            Product Inquiry
          </h1>
          <div className="w-24 h-1 bg-heritage-gold mx-auto mb-8 rounded-full opacity-80"></div>

          <p className="inquiry-desc text-center mb-10 text-lg text-gray-600 leading-relaxed">
            You are inquiring about{" "}
            <span className="text-heritage-dark-red font-serif font-bold text-xl block mt-2">
              {productName}
            </span>
            <span className="block mt-2 text-sm">
              Please fill out the form below and we will get back to you
              shortly.
            </span>
          </p>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-heritage-charcoal uppercase tracking-wider"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Full Name"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:border-heritage-dark-red focus:ring-1 focus:ring-heritage-dark-red outline-none transition-all duration-300"
                />
              </div>

              <div className="form-group space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-heritage-charcoal uppercase tracking-wider"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="your.email@example.com"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:border-heritage-dark-red focus:ring-1 focus:ring-heritage-dark-red outline-none transition-all duration-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group space-y-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-heritage-charcoal uppercase tracking-wider"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="+977 98XXXXXXXX"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:border-heritage-dark-red focus:ring-1 focus:ring-heritage-dark-red outline-none transition-all duration-300"
                />
              </div>

              <div className="form-group space-y-2">
                <label
                  htmlFor="product"
                  className="block text-sm font-medium text-heritage-charcoal uppercase tracking-wider"
                >
                  Product
                </label>
                <input
                  type="text"
                  id="product"
                  value={productName}
                  readOnly
                  className="w-full px-4 py-3 bg-heritage-cream/30 border border-gray-200 rounded-sm text-heritage-blue font-medium cursor-not-allowed"
                />
              </div>
            </div>

            <div className="form-group space-y-2">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-heritage-charcoal uppercase tracking-wider"
              >
                Your Message *
              </label>
              <textarea
                id="message"
                rows="4"
                placeholder="I am interested in this artwork. Please provide more details about..."
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:border-heritage-dark-red focus:ring-1 focus:ring-heritage-dark-red outline-none transition-all duration-300 resize-none"
              ></textarea>
            </div>

            <div className="form-group pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-4 rounded-sm hover:bg-[#b01030] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 tracking-widest uppercase border border-transparent hover:border-heritage-gold"
              >
                Submit Inquiry
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;
