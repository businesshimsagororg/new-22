/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Menu, ShoppingBag, ShoppingCart, User, Minus, Plus, Trash2, ArrowRight, Lock } from "lucide-react";

type CartItem = {
  id: string;
  name: string;
  tag: string;
  price: number;
  quantity: number;
  image: string;
};

const INITIAL_CART: CartItem[] = [
  {
    id: "moringa-powder",
    name: "Moringa Powder",
    tag: "ORGANIC • 250G",
    price: 1250,
    quantity: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHWhYB-E3MN2OSd-cNDgxAb4UoxlWeoFlq3rnMPF8KAiUXUbSXmao8-UqQVIkBIp8z3_RuVh4Fldb_e3G1AkWSMkFvY1QJIhUXDdi3Hh4VXUu4OwlNrZbNqzm-_5leMISqlcRbOZkUog_ZiF9HuMActymW9-oXHyKDFuQ_mm4oCOeCsq7SdDUSQL9DbEojP850z1E6EknagaOB68llHZsZodCP_65Pkr8j6f_LtQnWi9j_kAHnHUHqUALQdnE0alWdd47pmLE3wYg"
  },
  {
    id: "chia-seeds",
    name: "Chia Seeds",
    tag: "SUPERFOOD • 500G",
    price: 900,
    quantity: 2,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAcH_P37UseyTfDouXtNP_oprPpYKLvlkyvO8PG0Nv7VWV9Qf-7f1Y8BmvwDlmFg-0gvtmZ8i4Jg0u66QGZCTnYoWauqQxKvfilSBuBBISgYiRVxub7_N38jqWdBfxEXUscagXxlx0uccfoO7s-yqJtb64ay3r6Iht974zL-qm3rU3IV46uy-tb-2ByV4MTqG084sNqeGMzbIw4WskW_X24o5J2MgXO_QukpEqMskUyEUgVQRm7WicNoaHPwb1wSEevXk-zd_i2UQ"
  }
];

// Helper to convert English numbers to Bengali numerals
function toBengaliNumerals(number: number): string {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return number.toString().replace(/\d/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);

  const handleIncrement = (id: string) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecrement = (id: string) => {
    setCartItems(prev => {
      const item = prev.find(i => i.id === id);
      if (item && item.quantity <= 1) {
        return prev.filter(i => i.id !== id);
      }
      return prev.map(i => 
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  };

  const handleRemove = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 750 || subtotal === 0 ? 0 : 60;
  const total = subtotal + shipping;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      window.location.href = "/checkout";
    }
  };

  return (
    <div className="bg-[#fef8f2] text-[#1d1b18] font-sans antialiased min-h-screen">
      
      {/* ============================================== */}
      {/*               DESKTOP VIEW                     */}
      {/* ============================================== */}
      <div className="hidden md:flex flex-col min-h-screen">
        {/* Desktop Header */}
        <header className="w-full top-0 z-50 bg-[#fef8f2] border-b border-[#DCCFBF]/50">
          <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
            <a href="/" className="font-serif text-3xl font-bold text-[#023625] tracking-tight">PureOrigins</a>
            <nav className="flex gap-8 items-center">
              <a href="#" className="text-[#414944] hover:text-[#023625] font-medium transition-colors">Home</a>
              <a href="#" className="text-[#023625] font-bold border-b-2 border-[#023625] pb-1 transition-colors">Shop</a>
              <a href="#" className="text-[#414944] hover:text-[#023625] font-medium transition-colors">Combo</a>
              <a href="#" className="text-[#414944] hover:text-[#023625] font-medium transition-colors">Sunnah</a>
              <a href="#" className="text-[#414944] hover:text-[#023625] font-medium transition-colors">About</a>
              <a href="#" className="text-[#414944] hover:text-[#023625] font-medium transition-colors">Contact</a>
            </nav>
            <div className="flex items-center gap-4 text-[#023625]">
              <button className="relative hover:bg-[#F8F4EC] p-2 rounded-full transition-colors flex items-center justify-center">
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-[#5a4103] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
              <button className="hover:bg-[#F8F4EC] p-2 rounded-full transition-colors flex items-center justify-center">
                <User size={24} />
              </button>
            </div>
          </div>
        </header>

        {/* Desktop Main Content */}
        <main className="flex-grow w-full max-w-7xl mx-auto px-8 py-16">
          {/* Title Area */}
          <div className="mb-12">
            <h1 className="font-serif text-[44px] text-[#023625] font-bold mb-3 tracking-tight">আপনার কার্ট</h1>
            <p className="text-[#6F685F] text-lg">আপনার নির্বাচিত বিশুদ্ধ পণ্যসমূহ</p>
          </div>

          <div className="flex gap-12">
            {/* Cart Items Column */}
            <div className="flex-grow flex flex-col gap-6">
              
              {cartItems.length === 0 ? (
                <div className="bg-[#F8F4EC] rounded-xl p-12 text-center border border-[#DCCFBF]/60 shadow-sm flex flex-col items-center">
                  <ShoppingCart size={64} className="text-[#DCCFBF] mb-4" />
                  <h2 className="font-serif text-2xl mb-2 text-[#414944]">কার্ট খালি</h2>
                  <p className="text-[#6F685F]">আপনার কার্টে কোনো পণ্য নেই।</p>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="bg-[#F8F4EC] rounded-xl p-6 border border-[#DCCFBF]/60 flex items-center gap-8 shadow-sm">
                     <img 
                       src={item.image} 
                       alt={item.name} 
                       referrerPolicy="no-referrer"
                       className="w-[140px] h-[140px] object-cover rounded-lg shadow-sm bg-white"
                     />
                     
                     <div className="flex flex-col flex-grow h-[130px] justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-serif text-3xl text-[#1d1b18] mb-1">{item.name}</h3>
                            <p className="text-xs font-bold text-[#47672c] tracking-widest mt-1">{item.tag}</p>
                          </div>
                          <div className="font-serif text-2xl text-[#5a4103] font-medium pt-1">৳ {toBengaliNumerals(item.price * item.quantity).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                        </div>
                        
                        <div className="flex justify-between items-end pb-1">
                          {/* Quantity */}
                          <div className="flex items-center border border-[#DCCFBF] rounded-md bg-white overflow-hidden shadow-sm h-10 w-28">
                            <button 
                              aria-label="Decrease quantity" 
                              onClick={() => handleDecrement(item.id)}
                              className="w-10 h-full flex items-center justify-center text-[#6F685F] hover:text-[#023625] transition-colors hover:bg-[#F8F4EC]"
                            >
                               <Minus size={16} />
                            </button>
                            <input 
                              type="text" 
                              aria-label="Quantity" 
                              value={toBengaliNumerals(item.quantity)} 
                              className="w-8 text-center bg-transparent border-none focus:ring-0 p-0 text-[#1d1b18] font-medium" 
                              readOnly 
                            />
                            <button 
                              aria-label="Increase quantity" 
                              onClick={() => handleIncrement(item.id)}
                              className="w-10 h-full flex items-center justify-center text-[#6F685F] hover:text-[#023625] transition-colors hover:bg-[#F8F4EC]"
                            >
                               <Plus size={16} />
                            </button>
                          </div>
                          
                          {/* Remove */}
                          <button 
                            onClick={() => handleRemove(item.id)}
                            className="flex items-center gap-2 text-[#6F685F] hover:text-red-700 transition-colors group"
                          >
                            <Trash2 size={20} className="group-hover:scale-110 transition-transform" />
                            <span className="text-sm">মুছে ফেলুন</span>
                          </button>
                        </div>
                     </div>
                  </div>
                ))
              )}

            </div>

            {/* Sidebar Column */}
            <div className="w-[380px] flex-shrink-0">
              <div className="bg-[#F8F4EC] rounded-xl p-8 border border-[#DCCFBF]/60 sticky top-32 shadow-sm">
                <h2 className="font-serif text-3xl text-[#023625] mb-6 border-b border-[#DCCFBF]/60 pb-5">অর্ডার সারাংশ</h2>
                
                <div className="space-y-4 text-[#414944] font-medium">
                  <div className="flex justify-between">
                    <span>সাবটোটাল</span>
                    <span className="text-[#1d1b18]">৳ {toBengaliNumerals(subtotal).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>শিপিং খরচ</span>
                    <span className="text-[#1d1b18]">{shipping === 0 ? "ফ্রি" : `৳ ${toBengaliNumerals(shipping)}`}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center border-t border-[#DCCFBF]/60 pt-6 mt-6 mb-8">
                  <span className="text-2xl text-[#1d1b18]">মোট</span>
                  <span className="font-serif text-[40px] text-[#5a4103] font-bold tracking-tight">৳ {toBengaliNumerals(total).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                  className={`w-full font-medium text-lg py-4 rounded-lg shadow-md transition-colors flex justify-center items-center gap-3 ${
                    cartItems.length === 0 
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed" 
                      : "bg-[#023625] hover:bg-[#022b1d] text-white"
                  }`}
                >
                  চেকআউট করুন
                  <ArrowRight size={24} />
                </button>
                
                <div className="mt-6 flex justify-center items-center gap-2 text-[#6F685F] text-sm">
                  <Lock size={16} />
                  <span>নিরাপদ পেমেন্ট গ্যারান্টি</span>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        {/* Desktop Footer */}
        <footer className="bg-[#EBE5DB] border-t border-[#DCCFBF]/60 py-16 mt-auto">
           <div className="max-w-7xl mx-auto px-8 grid grid-cols-4 gap-12">
              <div className="col-span-2">
                 <h3 className="font-serif text-3xl font-bold text-[#023625] mb-4">PureOrigins</h3>
                 <p className="text-[#6F685F] text-[15px] max-w-sm mb-8 leading-relaxed">প্রকৃতির খাঁটি উপাদান দিয়ে তৈরি আমাদের পণ্য, আপনার সুস্বাস্থ্যের বিশ্বস্ত সঙ্গী।</p>
                 <p className="text-[#6F685F] text-sm">© {new Date().getFullYear()} PureOrigins. All rights reserved.</p>
              </div>
              <div>
                <h4 className="font-serif text-2xl text-[#1d1b18] mb-6">প্রয়োজনীয় লিংক</h4>
                <ul className="space-y-4">
                   <li><a href="#" className="text-[#6F685F] hover:text-[#023625] transition-colors text-[15px]">Return Policy</a></li>
                   <li><a href="#" className="text-[#6F685F] hover:text-[#023625] transition-colors text-[15px]">Privacy Policy</a></li>
                   <li><a href="#" className="text-[#6F685F] hover:text-[#023625] transition-colors text-[15px]">Terms of Service</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-serif text-2xl text-[#1d1b18] mb-6">যোগাযোগ</h4>
                <ul className="space-y-4">
                   <li><a href="#" className="text-[#6F685F] hover:text-[#023625] transition-colors text-[15px] flex items-center gap-3">WhatsApp</a></li>
                   <li><a href="#" className="text-[#6F685F] hover:text-[#023625] transition-colors text-[15px] flex items-center gap-3">Contact Us</a></li>
                </ul>
              </div>
           </div>
        </footer>
      </div>

      {/* ============================================== */}
      {/*               MOBILE VIEW                      */}
      {/* ============================================== */}
      <div className="flex md:hidden flex-col min-h-screen relative pb-[100px]">
        {/* Mobile Header */}
        <header className="w-full bg-[#fef8f2] sticky top-0 z-50 p-5 flex justify-between items-center">
          <button 
            aria-label="Menu" 
            className="text-[#1d1b18] flex items-center justify-center p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={28} />
          </button>
          <a href="/" className="font-serif text-3xl font-bold text-[#023625] tracking-tight">PureOrigins</a>
          <button aria-label="Cart" className="relative text-[#1d1b18] flex items-center justify-center p-1">
            <ShoppingBag size={28} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#5a4103] text-white text-[10px] w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </header>

        {/* Mobile Main Content */}
        <main className="flex-grow w-full px-5 py-8">
          
          {/* Mobile Title */}
          <div className="text-center mb-8">
            <h1 className="font-serif text-[38px] text-[#023625] font-bold mb-2">আপনার কার্ট</h1>
            <p className="text-[#6F685F] text-base">আপনার নির্বাচিত বিশুদ্ধ পণ্যসমূহ</p>
          </div>

          {/* Mobile Cart Items */}
          <div className="flex flex-col gap-4 mb-8">
            
            {cartItems.length === 0 ? (
              <div className="bg-[#F8F4EC] rounded-xl p-8 text-center border border-[#DCCFBF]/60 shadow-sm flex flex-col items-center">
                <ShoppingCart size={48} className="text-[#DCCFBF] mb-3" />
                <h2 className="font-serif text-xl mb-1 text-[#414944]">কার্ট খালি</h2>
                <p className="text-[#6F685F] text-sm">আপনার কার্টে কোনো পণ্য নেই।</p>
              </div>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="bg-[#F8F4EC] rounded-xl p-3 border border-[#DCCFBF]/60 flex gap-4 shadow-sm relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    referrerPolicy="no-referrer"
                    className="w-[100px] h-[100px] object-cover rounded-lg flex-shrink-0 shadow-sm mix-blend-multiply bg-white" 
                  />
                  
                  <div className="flex flex-col flex-grow justify-between py-1">
                     <div className="pr-8">
                       <h3 className="text-[17px] font-medium text-[#1d1b18] mb-0 leading-snug">{item.name}</h3>
                       <p className="text-[10px] font-bold text-[#47672c] tracking-widest mt-1 mb-2">{item.tag}</p>
                       <div className="font-serif text-xl text-[#023625] font-bold">৳ {toBengaliNumerals(item.price * item.quantity).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                     </div>
                     
                     <button 
                       aria-label="Remove item" 
                       onClick={() => handleRemove(item.id)}
                       className="absolute top-3 right-3 text-[#6F685F] hover:text-red-700 bg-transparent p-1 flex items-center justify-center"
                     >
                        <Trash2 size={22} />
                     </button>
                     
                     <div className="absolute bottom-3 right-3 flex items-center border border-[#DCCFBF] rounded-md bg-white overflow-hidden shadow-sm h-8 w-24">
                        <button 
                          aria-label="Decrease quantity" 
                          onClick={() => handleDecrement(item.id)}
                          className="w-8 h-full flex items-center justify-center text-[#6F685F]"
                        >
                           <Minus size={16} />
                        </button>
                        <input 
                          type="text" 
                          aria-label="Quantity" 
                          value={toBengaliNumerals(item.quantity)} 
                          className="w-8 text-center bg-transparent border-none focus:ring-0 p-0 text-[#1d1b18] font-medium text-sm" 
                          readOnly 
                        />
                        <button 
                          aria-label="Increase quantity" 
                          onClick={() => handleIncrement(item.id)}
                          className="w-8 h-full flex items-center justify-center text-[#6F685F]"
                        >
                           <Plus size={16} />
                        </button>
                     </div>
                  </div>
                </div>
              ))
            )}
            
          </div>

          {/* Mobile Order Summary Card */}
          <div className="bg-[#F8F4EC] rounded-xl p-6 border border-[#DCCFBF]/60 shadow-sm mb-8">
            <h2 className="font-serif text-[26px] text-[#023625] mb-4 border-b border-[#DCCFBF]/60 pb-4">অর্ডার সারাংশ</h2>
            
            <div className="space-y-4 text-[#414944] font-medium text-[15px]">
              <div className="flex justify-between">
                <span>সাবটোটাল</span>
                <span className="text-[#1d1b18]">৳ {toBengaliNumerals(subtotal).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
              </div>
              <div className="flex justify-between">
                <span>শিপিং খরচ</span>
                <span className="text-[#1d1b18]">{shipping === 0 ? "ফ্রি" : `৳ ${toBengaliNumerals(shipping)}`}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center border-t border-[#DCCFBF]/60 pt-5 mt-5">
              <span className="text-[17px] text-[#1d1b18] font-medium">মোট</span>
              <span className="font-serif text-[28px] text-[#5a4103] font-bold">৳ {toBengaliNumerals(total).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
            </div>
          </div>

          <div className="flex justify-center items-center gap-2 text-[#6F685F] text-sm pb-4">
            <Lock size={18} />
            <span>নিরাপদ পেমেন্ট গ্যারান্টি</span>
          </div>

        </main>

        {/* Mobile Fixed Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 w-full bg-[#FCFAF8] p-5 z-40 border-t border-[#DCCFBF]/30 shadow-[0_-4px_16px_rgba(31,77,58,0.04)]">
          <button 
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
            className={`w-full font-medium text-[18px] py-[15px] rounded-xl shadow-md transition-colors flex justify-center items-center gap-3 ${
              cartItems.length === 0 
                ? "bg-gray-400 text-gray-200 cursor-not-allowed" 
                : "bg-[#023625] text-white active:bg-[#022b1d]"
            }`}
          >
            চেকআউট করুন
            <ArrowRight size={22} />
          </button>
        </div>

      </div>
    </div>
  );
}


