
import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      discount: 20,
      text: "Create Magical Birthday Memories",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop"
    },
    {
      discount: 25,
      text: "Spark Creativity with DIY Kits",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&h=400&fit=crop"
    },
    {
      discount: 30,
      text: "Jewelry That Tells Your Story",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop"
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
    <section className="bg-gradient-to-br from-secondary/30 to-primary py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-block bg-tertiary text-primary px-4 py-2 rounded-full text-sm font-medium">
              {currentSlideData.discount}% Limited-Time Offer
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold text-tertiary leading-tight">
              {currentSlideData.text}
            </h2>
            
            <p className="text-lg text-tertiary/80 max-w-md">
              Thoughtfully crafted DIY kits that bring families together, spark creativity, and create lasting memories.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-tertiary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-tertiary/90 transition-colors hover-scale">
                Buy Now
              </button>
              <button className="border-2 border-tertiary text-tertiary px-8 py-4 rounded-lg font-semibold hover:bg-tertiary hover:text-primary transition-colors flex items-center gap-2 group">
                Find More
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src={currentSlideData.image}
                alt="Featured Product"
                className="w-full h-96 lg:h-[500px] object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tertiary/20 to-transparent"></div>
            </div>
            
            {/* Slide Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-tertiary' : 'bg-tertiary/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
