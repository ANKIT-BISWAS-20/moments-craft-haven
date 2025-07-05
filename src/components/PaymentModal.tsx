
import React, { useState } from 'react';
import { X, CreditCard, Calendar, Lock, User, Mail, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useCart, CartItem, Order } from '../contexts/CartContext';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  total: number;
  items: CartItem[];
}

const PaymentModal: React.FC<PaymentModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  total, 
  items 
}) => {
  const { addOrder } = useCart();
  const [step, setStep] = useState<'shipping' | 'payment' | 'processing'>('shipping');
  const [formData, setFormData] = useState({
    // Shipping info
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    // Payment info
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleShippingNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create order
    const newOrder: Order = {
      id: `ORDER-${Date.now()}`,
      items: [...items],
      total: total,
      status: 'pending',
      date: new Date().toISOString(),
      trackingNumber: `TRK${Math.random().toString(36).substring(2, 10).toUpperCase()}`
    };
    
    addOrder(newOrder);
    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div className="bg-primary rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-secondary/20">
          <h2 className="text-xl font-bold text-tertiary">
            {step === 'shipping' && 'Shipping Information'}
            {step === 'payment' && 'Payment Details'}
            {step === 'processing' && 'Processing...'}
          </h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-tertiary hover:text-tertiary/80" />
          </button>
        </div>

        <div className="p-6">
          {step === 'processing' ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-tertiary/20 border-t-tertiary rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-tertiary font-medium">Processing your payment...</p>
              <p className="text-tertiary/60 text-sm mt-2">Please wait while we confirm your order</p>
            </div>
          ) : step === 'shipping' ? (
            <form onSubmit={handleShippingNext} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-tertiary mb-1">
                    <User className="w-4 h-4 inline mr-1" />
                    First Name
                  </label>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="bg-secondary/10 border-secondary/30 text-tertiary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-tertiary mb-1">
                    Last Name
                  </label>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="bg-secondary/10 border-secondary/30 text-tertiary"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-tertiary mb-1">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email Address
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-secondary/10 border-secondary/30 text-tertiary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-tertiary mb-1">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Address
                </label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="bg-secondary/10 border-secondary/30 text-tertiary"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-tertiary mb-1">
                    City
                  </label>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="bg-secondary/10 border-secondary/30 text-tertiary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-tertiary mb-1">
                    ZIP Code
                  </label>
                  <Input
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="bg-secondary/10 border-secondary/30 text-tertiary"
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-tertiary text-primary hover:bg-tertiary/90">
                Continue to Payment
              </Button>
            </form>
          ) : (
            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-tertiary mb-1">
                  <CreditCard className="w-4 h-4 inline mr-1" />
                  Card Number
                </label>
                <Input
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                  className="bg-secondary/10 border-secondary/30 text-tertiary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-tertiary mb-1">
                  Name on Card
                </label>
                <Input
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  required
                  className="bg-secondary/10 border-secondary/30 text-tertiary"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-tertiary mb-1">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Expiry Date
                  </label>
                  <Input
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                    className="bg-secondary/10 border-secondary/30 text-tertiary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-tertiary mb-1">
                    <Lock className="w-4 h-4 inline mr-1" />
                    CVV
                  </label>
                  <Input
                    name="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    required
                    className="bg-secondary/10 border-secondary/30 text-tertiary"
                  />
                </div>
              </div>
              
              <div className="bg-secondary/10 rounded-lg p-4 mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-tertiary">Subtotal:</span>
                  <span className="text-tertiary">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-tertiary">Shipping:</span>
                  <span className="text-tertiary">Free</span>
                </div>
                <div className="border-t border-secondary/20 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-tertiary">Total:</span>
                    <span className="text-xl font-bold text-tertiary">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-tertiary text-primary hover:bg-tertiary/90 h-12 text-base font-semibold">
                <Lock className="w-5 h-5 mr-2" />
                Complete Payment - ${total.toFixed(2)}
              </Button>
              
              <button 
                type="button"
                onClick={() => setStep('shipping')}
                className="w-full text-tertiary/70 hover:text-tertiary text-sm"
              >
                ← Back to Shipping
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
