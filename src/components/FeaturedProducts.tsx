
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import Cart from './Cart';

const FeaturedProducts = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products = [
    {
      id: 1,
      name: "DIY Birthday Kit",
      price: 29.99,
      originalPrice: 39.99,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
      category: "Birthday"
    },
    {
      id: 2,
      name: "Creative Craft Set",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
      category: "Crafts"
    },
    {
      id: 3,
      name: "Memory Scrapbook Kit",
      price: 34.99,
      originalPrice: 44.99,
      image: "https://images.unsplash.com/photo-1606107557309-e709ed7d4aea?w=400&h=400&fit=crop",
      category: "Memory"
    },
    {
      id: 4,
      name: "Jewelry Making Set",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop",
      category: "Jewelry"
    },
    {
      id: 5,
      name: "Photo Frame Kit",
      price: 19.99,
      originalPrice: 29.99,
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
      category: "Decor"
    },
    {
      id: 6,
      name: "Art Painting Set",
      price: 44.99,
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
      category: "Art"
    }
  ];

  const handleBuyNow = () => {
    setIsCartOpen(true);
  };

  return (
    <>
      <section id="shop" className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-tertiary mb-4">
              Featured Products
            </h2>
            <p className="text-tertiary/70 max-w-2xl mx-auto">
              Discover our most popular DIY kits designed to create unforgettable moments and memories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                {...product} 
                onBuyNow={handleBuyNow}
              />
            ))}
          </div>
        </div>
      </section>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default FeaturedProducts;
