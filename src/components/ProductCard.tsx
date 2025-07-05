
import React from 'react';
import { ShoppingCart, Plus } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  id, 
  name, 
  price, 
  originalPrice, 
  image, 
  category 
}) => {
  return (
    <div className="bg-primary rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover-scale">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-secondary text-tertiary px-3 py-1 rounded-full text-sm font-medium">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-tertiary group-hover:text-tertiary/80 transition-colors">
          {name}
        </h3>
        
        <div className="flex items-center gap-2 mt-2">
          <span className="text-2xl font-bold text-tertiary">${price}</span>
          {originalPrice && (
            <span className="text-sm text-tertiary/50 line-through">${originalPrice}</span>
          )}
        </div>
        
        <div className="flex gap-3 mt-4">
          <button className="flex-1 bg-tertiary text-primary py-3 px-4 rounded-lg font-semibold hover:bg-tertiary/90 transition-colors flex items-center justify-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Buy Now
          </button>
          <button className="border-2 border-tertiary text-tertiary p-3 rounded-lg hover:bg-tertiary hover:text-primary transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
