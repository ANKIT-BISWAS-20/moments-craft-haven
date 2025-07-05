import React, { useState } from 'react';
import { X, CreditCard, Calendar, Lock, Mail, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useCart, CartItem, Order } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

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
  const { user, isAuthenticated, verifyEmail, sendEmailOTP } = useAuth();
  const [step, setStep] = useState<'auth' | 'email-verify' | 'payment' | 'processing'>('auth');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [emailOTP, setEmailOTP] = useState('');
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });


  React.useEffect(() => {
    if (isAuthenticated && user) {
      if (user.email && !user.emailVerified) {
        setStep('email-verify');
      } else {
        setStep('payment');
      }
    } else {
      setStep('auth');
      setIsAuthModalOpen(true); // Automatically open auth modal
    }
  }, [isAuthenticated, user, isOpen]);

  if (!isOpen) return null;

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    if (user?.email && !user.emailVerified) {
      setStep('email-verify');
    } else {
      setStep('payment');
    }
  };

  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
    if (!isAuthenticated) {
      onClose(); // Close payment modal if user cancels auth
    }
  };

  const handleSendEmailOTP = async () => {
    if (user?.email) {
      setIsVerifyingEmail(true);
      await sendEmailOTP(user.email);
      setIsVerifyingEmail(false);
    }
  };

  const handleVerifyEmail = async () => {
    if (user?.email && emailOTP) {
      setIsVerifyingEmail(true);
      const success = await verifyEmail(user.email, emailOTP);
      setIsVerifyingEmail(false);
      
      if (success) {
        setStep('payment');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
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
    <>
      <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
        <div className="bg-primary rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-secondary/20">
            <h2 className="text-xl font-bold text-tertiary">
              {step === 'auth' && 'Sign In Required'}
              {step === 'email-verify' && 'Verify Email'}
              {step === 'payment' && 'Payment Details'}
              {step === 'processing' && 'Processing...'}
            </h2>
            <button onClick={onClose}>
              <X className="w-6 h-6 text-tertiary hover:text-tertiary/80" />
            </button>
          </div>

          <div className="p-6">
            {step === 'email-verify' && user?.email && (
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <Mail className="w-12 h-12 text-tertiary mx-auto mb-2" />
                  <p className="text-tertiary">Verify your email address</p>
                  <p className="text-sm text-tertiary/70">{user.email}</p>
                </div>
                
                <div>
                  <Input
                    type="text"
                    placeholder="Enter OTP"
                    value={emailOTP}
                    onChange={(e) => setEmailOTP(e.target.value)}
                    className="bg-secondary/10 border-secondary/30 text-tertiary text-center text-lg tracking-widest"
                    maxLength={6}
                  />
                  <p className="text-xs text-tertiary/50 mt-2 text-center">
                    Demo: Use 123456 as OTP
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={handleSendEmailOTP}
                    disabled={isVerifyingEmail}
                    variant="outline"
                    className="flex-1 border-tertiary text-tertiary hover:bg-tertiary hover:text-primary"
                  >
                    {isVerifyingEmail ? 'Sending...' : 'Send OTP'}
                  </Button>
                  <Button 
                    onClick={handleVerifyEmail}
                    disabled={isVerifyingEmail || emailOTP.length !== 6}
                    className="flex-1 bg-tertiary text-primary hover:bg-tertiary/90"
                  >
                    {isVerifyingEmail ? 'Verifying...' : 'Verify'}
                  </Button>
                </div>
                
                <Button 
                  onClick={() => setStep('payment')}
                  variant="ghost"
                  className="w-full text-tertiary/70 hover:text-tertiary"
                >
                  Skip for Now
                </Button>
              </div>
            )}

            {step === 'processing' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 border-4 border-tertiary/20 border-t-tertiary rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-tertiary font-medium">Processing your payment...</p>
                <p className="text-tertiary/60 text-sm mt-2">Please wait while we confirm your order</p>
              </div>
            ) : step === 'payment' && user && (
              <form onSubmit={handlePayment} className="space-y-4">
                {/* User Information Display */}
                <div className="bg-secondary/10 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-tertiary mb-2">Delivery Information</h3>
                  <p className="text-sm text-tertiary"><strong>Name:</strong> {user.name}</p>
                  <p className="text-sm text-tertiary"><strong>Phone:</strong> {user.phoneNumber}</p>
                  <p className="text-sm text-tertiary"><strong>Address:</strong> {user.address}</p>
                  {user.email && (
                    <p className="text-sm text-tertiary">
                      <strong>Email:</strong> {user.email} 
                      {user.emailVerified ? (
                        <span className="text-green-600 ml-1">✓ Verified</span>
                      ) : (
                        <span className="text-yellow-600 ml-1">⚠ Unverified</span>
                      )}
                    </p>
                  )}
                </div>

                {/* Payment Information */}
                <div>
                  <label className="block text-sm font-medium text-tertiary mb-1">
                    <CreditCard className="w-4 h-4 inline mr-1" />
                    Card Number
                  </label>
                  <Input
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={paymentData.cardNumber}
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
                    value={paymentData.cardName}
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
                      value={paymentData.expiryDate}
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
                      value={paymentData.cvv}
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
              </form>
            )}
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={handleAuthModalClose}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default PaymentModal;
