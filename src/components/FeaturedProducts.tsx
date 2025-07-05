
import React from 'react';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "DIY Birthday Party Kit",
      price: 29.99,
      originalPrice: 39.99,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      category: "Birthday Kit"
    },
    {
      id: 2,
      name: "Charm Bracelet Making Set",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop",
      category: "Jewelry"
    },
    {
      id: 3,
      name: "Kids Learning Bundle",
      price: 34.99,
      originalPrice: 44.99,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
      category: "Learning"
    },
    {
      id: 4,
      name: "Watercolor Painting Kit",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
      category: "Art Kit"
    }
  ];

  const popularProducts = [
    {
      id: 5,
      name: "Memory Scrapbook Kit",
      price: 27.99,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
      category: "Memory Kit"
    },
    {
      id: 6,
      name: "Friendship Bracelet Set",
      price: 16.99,
      originalPrice: 22.99,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      category: "Jewelry"
    },
    {
      id: 7,
      name: "Creative Sticker Pack",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop",
      category: "Stickers"
    },
    {
      id: 8,
      name: "Mini Garden Growing Kit",
      price: 22.99,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
      category: "Garden Kit"
    }
  ];

  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        {/* Featured Products */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-tertiary mb-4">Featured Products</h2>
            <p className="text-tertiary/70 max-w-2xl mx-auto">
              Discover our most loved DIY kits, carefully curated to create beautiful moments and lasting memories.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>

        {/* Popular Products */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-tertiary mb-4">Popular Products</h2>
            <p className="text-tertiary/70 max-w-2xl mx-auto">
              Join thousands of happy customers who have created magical moments with these bestselling kits.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
