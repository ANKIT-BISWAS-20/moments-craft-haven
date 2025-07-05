
import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      discount: 20,
      text: "Create Magical Birthday Memories",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&h=600&fit=crop"
    },
    {
      discount: 25,
      text: "Spark Creativity with DIY Kits",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&h=600&fit=crop"
    },
    {
      discount: 30,
      text: "Jewelry That Tells Your Story",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative h-96 lg:h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={currentSlideData.image}
          alt="Featured Product"
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white animate-fade-in">
          <div className="inline-block bg-tertiary text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            {currentSlideData.discount}% Limited-Time Offer
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
            {currentSlideData.text}
          </h2>
          
          <p className="text-lg text-white/90 max-w-md mb-8">
            Thoughtfully crafted DIY kits that bring families together, spark creativity, and create lasting memories.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-tertiary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-tertiary/90 transition-colors hover-scale">
              Buy Now
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-tertiary transition-colors flex items-center justify-center gap-2 group">
              Find More
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
