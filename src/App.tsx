import React, { useState, useMemo } from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { products } from './data/products';
import { CartItem, WishlistItem } from './types';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = useMemo(() => 
    Array.from(new Set(products.map(p => p.category))),
    []
  );

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const addToCart = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const toggleWishlist = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setWishlistItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);
      if (existingItem) {
        return prevItems.filter((item) => item.id !== productId);
      }
      return [...prevItems, product];
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Mini Shop</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-2 text-gray-600 hover:text-gray-900"
              >
                <ShoppingBag size={24} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
              <div className="relative p-2 text-gray-600">
                <Heart size={24} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={addToCart}
                onAddToWishlist={toggleWishlist}
                isInWishlist={wishlistItems.some(item => item.id === product.id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-full max-w-md">
            <div className="h-full bg-gray-100 p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Your Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <Cart 
                items={cartItems} 
                onRemoveFromCart={removeFromCart}
                onUpdateQuantity={updateCartQuantity}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;