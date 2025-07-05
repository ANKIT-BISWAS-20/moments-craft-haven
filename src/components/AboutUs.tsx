
import React from 'react';
import { Heart, Gift, Palette, Users } from 'lucide-react';

const AboutUs = () => {
  return (
    <section id="about" className="py-16 bg-gradient-to-br from-secondary/20 to-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-tertiary mb-4">About Moments</h2>
          <p className="text-xl text-tertiary/80 max-w-3xl mx-auto leading-relaxed">
            Welcome to Moments — a brand born from love, creativity, and the joy of gifting.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <p className="text-lg text-tertiary/80 leading-relaxed">
              We create thoughtful DIY birthday kits, charming jewelry gift sets, fun learning bundles for kids, 
              and vibrant painting kits. Each product is carefully designed to spark joy, inspire bonding, 
              and make memories that last.
            </p>
            <p className="text-lg text-tertiary/80 leading-relaxed">
              Whether it's for a special occasion or a cozy family evening, Moments brings heartfelt 
              experiences to life. We're just beginning, and every purchase helps grow a dream — 
              one small Moment at a time. ✨
            </p>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop"
              alt="Creative crafting moment"
              className="rounded-2xl shadow-xl"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 text-tertiary" />
            </div>
            <h3 className="text-xl font-semibold text-tertiary">Made with Love</h3>
            <p className="text-tertiary/70">Every kit is crafted with care and attention to detail</p>
          </div>
          
          <div className="text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto">
              <Gift className="w-8 h-8 text-tertiary" />
            </div>
            <h3 className="text-xl font-semibold text-tertiary">Perfect Gifts</h3>
            <p className="text-tertiary/70">Thoughtful presents that create lasting memories</p>
          </div>
          
          <div className="text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto">
              <Palette className="w-8 h-8 text-tertiary" />
            </div>
            <h3 className="text-xl font-semibold text-tertiary">Creative Fun</h3>
            <p className="text-tertiary/70">Spark imagination and artistic expression</p>
          </div>
          
          <div className="text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto">
              <Users className="w-8 h-8 text-tertiary" />
            </div>
            <h3 className="text-xl font-semibold text-tertiary">Family Bonding</h3>
            <p className="text-tertiary/70">Activities that bring families closer together</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
