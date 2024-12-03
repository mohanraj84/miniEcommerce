import React from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onRemoveFromCart: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

export function Cart({ items, onRemoveFromCart, onUpdateQuantity }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      className="p-1 hover:bg-gray-100"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => onRemoveFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center font-semibold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}