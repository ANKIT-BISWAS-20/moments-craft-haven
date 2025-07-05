
import React, { useState } from 'react';
import { ShoppingCart, User, Menu, X, LogOut, Package } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import Cart from './Cart';
import AuthModal from './AuthModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { getTotalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const cartCount = getTotalItems();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
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
              {/* <a href="/orders" className="story-link text-tertiary hover:text-tertiary/80 font-medium">My Orders</a> */}
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="text-tertiary hover:text-tertiary/80 transition-colors"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-tertiary text-primary text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
              
              {/* Account Section */}
              <div className="hidden md:block">
                {isAuthenticated && user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center space-x-2 cursor-pointer hover:text-tertiary/80">
                      <div className="w-8 h-8 bg-tertiary text-primary rounded-full flex items-center justify-center font-semibold text-sm">
                        {getInitials(user.name)}
                      </div>
                      <span className="text-tertiary font-medium">{user.name}</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-primary border-secondary/20">
                      <DropdownMenuItem asChild>
                        <a href="/orders" className="flex items-center text-tertiary">
                          <Package className="w-4 h-4 mr-2" />
                          My Orders
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-secondary/20" />
                      <DropdownMenuItem onClick={handleLogout} className="text-tertiary">
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div 
                    className="flex items-center space-x-2 cursor-pointer hover:text-tertiary/80"
                    onClick={() => setIsAuthModalOpen(true)}
                  >
                    <User className="w-6 h-6 text-tertiary" />
                    <span className="text-tertiary font-medium">Account</span>
                  </div>
                )}
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
                <a href="/orders" className="text-tertiary hover:text-tertiary/80 font-medium">My Orders</a>
                
                {isAuthenticated && user ? (
                  <div className="flex flex-col space-y-2 pt-2 border-t border-secondary/20">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-tertiary text-primary rounded-full flex items-center justify-center font-semibold text-sm">
                        {getInitials(user.name)}
                      </div>
                      <span className="text-tertiary font-medium">{user.name}</span>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center space-x-2 text-tertiary hover:text-tertiary/80"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div 
                    className="flex items-center space-x-2 pt-2 cursor-pointer hover:text-tertiary/80"
                    onClick={() => setIsAuthModalOpen(true)}
                  >
                    <User className="w-6 h-6 text-tertiary" />
                    <span className="text-tertiary font-medium">Account</span>
                  </div>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
};

export default Header;
