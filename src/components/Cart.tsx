
import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Button } from './ui/button';
import PaymentModal from './PaymentModal';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [showPayment, setShowPayment] = useState(false);

  if (!isOpen) return null;

  const total = getTotalPrice();

  const handleCheckout = () => {
    if (items.length > 0) {
      setShowPayment(true);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    clearCart();
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose}>
        <div 
          className="fixed right-0 top-0 h-full w-full max-w-md bg-primary shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-secondary/20">
            <h2 className="text-xl font-bold text-tertiary flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Your Cart
            </h2>
            <button onClick={onClose}>
              <X className="w-6 h-6 text-tertiary hover:text-tertiary/80" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-tertiary/30 mx-auto mb-4" />
                <p className="text-tertiary/70">Your cart is empty</p>
                <p className="text-sm text-tertiary/50 mt-2">Add some products to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-secondary/10 rounded-lg p-4">
                    <div className="flex gap-4">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-tertiary text-sm truncate">{item.name}</h3>
                        <p className="text-xs text-tertiary/60 mb-2">{item.category}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-tertiary">${item.price.toFixed(2)}</span>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full bg-tertiary/10 flex items-center justify-center hover:bg-tertiary/20"
                            >
                              <Minus className="w-3 h-3 text-tertiary" />
                            </button>
                            <span className="text-sm font-medium text-tertiary w-8 text-center">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full bg-tertiary/10 flex items-center justify-center hover:bg-tertiary/20"
                            >
                              <Plus className="w-3 h-3 text-tertiary" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-tertiary/50 hover:text-tertiary/80"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-secondary/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-tertiary">Total:</span>
                <span className="text-2xl font-bold text-tertiary">${total.toFixed(2)}</span>
              </div>
              <Button 
                onClick={handleCheckout}
                className="w-full bg-tertiary text-primary hover:bg-tertiary/90 h-12 text-base font-semibold"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </div>

      <PaymentModal 
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        onSuccess={handlePaymentSuccess}
        total={total}
        items={items}
      />
    </>
  );
};

export default Cart;
