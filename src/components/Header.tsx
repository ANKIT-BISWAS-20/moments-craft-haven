
import React, { useState } from 'react';
import { ShoppingCart, User, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(3);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-primary border-b border-secondary/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-tertiary rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-lg">Q</span>
            </div>
            <h1 className="text-2xl font-bold text-tertiary">Moments</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="story-link text-tertiary hover:text-tertiary/80 font-medium">Home</a>
            <a href="#shop" className="story-link text-tertiary hover:text-tertiary/80 font-medium">Shop</a>
            <a href="#about" className="story-link text-tertiary hover:text-tertiary/80 font-medium">About Us</a>
            <a href="#contact" className="story-link text-tertiary hover:text-tertiary/80 font-medium">Contact</a>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-tertiary cursor-pointer hover:text-tertiary/80" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-tertiary text-primary text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="hidden md:flex items-center space-x-2 cursor-pointer hover:text-tertiary/80">
              <User className="w-6 h-6 text-tertiary" />
              <span className="text-tertiary font-medium">Account</span>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden text-tertiary"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-secondary/20 pt-4">
            <div className="flex flex-col space-y-4">
              <a href="#home" className="text-tertiary hover:text-tertiary/80 font-medium">Home</a>
              <a href="#shop" className="text-tertiary hover:text-tertiary/80 font-medium">Shop</a>
              <a href="#about" className="text-tertiary hover:text-tertiary/80 font-medium">About Us</a>
              <a href="#contact" className="text-tertiary hover:text-tertiary/80 font-medium">Contact</a>
              <div className="flex items-center space-x-2 pt-2">
                <User className="w-6 h-6 text-tertiary" />
                <span className="text-tertiary font-medium">Account</span>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
