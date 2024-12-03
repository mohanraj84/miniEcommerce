import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps extends Product {
  onAddToCart: (id: number) => void;
  onAddToWishlist: (id: number) => void;
  isInWishlist: boolean;
}

export function ProductCard({ 
  id, 
  name, 
  price, 
  image, 
  description,
  onAddToCart, 
  onAddToWishlist,
  isInWishlist 
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <button
          onClick={() => onAddToWishlist(id)}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isInWishlist ? 'text-red-500' : 'text-gray-500'
          } hover:text-red-500 bg-white shadow-md`}
        >
          <Heart size={20} fill={isInWishlist ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
        <p className="text-gray-600 mt-2 font-bold">${price.toFixed(2)}</p>
        <button
          onClick={() => onAddToCart(id)}
          className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <ShoppingCart size={20} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}