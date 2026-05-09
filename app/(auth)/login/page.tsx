"use client";
import { useState, useEffect } from "react";
import { ShoppingCart, Search, ArrowRight, Zap, X, Plus, Minus, Trash2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function Storefront() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setProducts(data);
      }
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  const addToCart = (product: any) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, change: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0);

  // 🔴 NAYA HISSA: Checkout Logic
  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      // Dekhte hain ke koi user login hai ya nahi
      const { data: { user } } = await supabase.auth.getUser();
      const customerEmail = user ? user.email : "Guest User";

      // Order ko Supabase Database mein bhejein
      const { error } = await supabase.from('orders').insert([{
        customer_email: customerEmail,
        total_amount: cartTotal,
        status: 'Pending'
      }]);

      if (error) throw error;

      alert("🎉 Order placed successfully!");
      setCart([]); // Order successful hone par cart khali kar dein
      setIsCartOpen(false); // Drawer band kar dein

    } catch (error: any) {
      alert("Error placing order: " + error.message);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-blue-500/30">

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">SaaSify Store</span>
            </div>

            <div className="flex items-center gap-6">
              <button className="text-slate-400 hover:text-white transition">
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-slate-400 hover:text-white transition"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-in zoom-in">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-[#0f172a] z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6 border border-blue-500/20">
            <Zap className="w-4 h-4" /> Next-Gen E-Commerce
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
            Discover Premium <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
              Digital Products
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
            Upgrade your digital lifestyle with our curated collection of high-quality electronics, accessories, and more.
          </p>
          <button className="inline-flex items-center gap-2 bg-white text-[#0f172a] px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-200 transition-all hover:scale-105 active:scale-95">
            Shop Now <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold text-white">Featured Collection</h2>
          <div className="text-sm font-medium text-blue-400 hover:text-blue-300 cursor-pointer">View All</div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-[#1e293b] rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-lg">No products available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-[#1e293b] rounded-2xl border border-slate-800 overflow-hidden group hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 flex flex-col"
              >
                <div className="aspect-square bg-slate-800 relative overflow-hidden">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500">No Image</div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">{product.category}</p>
                  <h3 className="text-lg font-semibold text-white leading-tight mb-2 line-clamp-2">{product.name}</h3>

                  <div className="flex items-center justify-between mt-auto pt-6">
                    <span className="text-2xl font-bold text-white">${product.price.toFixed(2)}</span>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white p-3 rounded-xl transition-colors active:scale-95"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setIsCartOpen(false)}
        ></div>
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0f172a] shadow-2xl border-l border-slate-800 z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" /> Your Cart
            <span className="bg-blue-600 text-sm px-2 py-0.5 rounded-full">{cartItemsCount}</span>
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center text-slate-400 mt-20">
              <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p>Your cart is currently empty.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 items-center bg-[#1e293b] p-3 rounded-xl border border-slate-800">
                <div className="w-16 h-16 bg-slate-800 rounded-lg overflow-hidden flex-shrink-0">
                  {item.image_url && <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white truncate">{item.name}</h4>
                  <p className="text-blue-400 text-sm font-medium">${item.price.toFixed(2)}</p>

                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => updateQuantity(item.id, -1)} className="text-slate-400 hover:text-white bg-slate-800 p-1 rounded-md">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-white w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="text-slate-400 hover:text-white bg-slate-800 p-1 rounded-md">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-rose-500 hover:bg-rose-500/10 p-2 rounded-lg transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-slate-800 bg-[#0f172a]">
            <div className="flex justify-between text-slate-400 mb-2">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-white font-bold text-xl mb-6">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            {/* 🔴 NAYA HISSA: Updated Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-2"
            >
              {isCheckingOut ? (
                "Processing Order..."
              ) : (
                <>Proceed to Checkout <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </div>
        )}
      </div>

    </div>
  );
}