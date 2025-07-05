
import React from 'react';
import { Heart, Instagram, Facebook, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-tertiary text-primary">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-tertiary font-bold text-lg">Q</span>
              </div>
              <h3 className="text-2xl font-bold">Moments</h3>
            </div>
            <p className="text-primary/80 text-sm leading-relaxed">
              Creating magical moments through thoughtful DIY kits and heartfelt experiences. 
              One small moment at a time. ✨
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-primary/80 hover:text-primary transition-colors">Home</a></li>
              <li><a href="#shop" className="text-primary/80 hover:text-primary transition-colors">Shop</a></li>
              <li><a href="#about" className="text-primary/80 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-primary/80 hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-primary/80 hover:text-primary transition-colors">Birthday Kits</a></li>
              <li><a href="#" className="text-primary/80 hover:text-primary transition-colors">Jewelry Sets</a></li>
              <li><a href="#" className="text-primary/80 hover:text-primary transition-colors">Learning Bundles</a></li>
              <li><a href="#" className="text-primary/80 hover:text-primary transition-colors">Art Kits</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Connect With Us</h4>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-primary/80 text-sm">
              Subscribe to our newsletter for creative inspiration and special offers.
            </p>
          </div>
        </div>

        <div className="border-t border-primary/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary/60 text-sm">
            © 2024 Moments. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-primary/60 text-sm mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-400 fill-current" />
            <span>for creating beautiful moments</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
