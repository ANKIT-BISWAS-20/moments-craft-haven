
import React, { useState } from 'react';
import { X, Phone, Mail, User, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { sendOTP, login } = useAuth();
  const [step, setStep] = useState<'phone' | 'otp' | 'details'>('phone');
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [userDetails, setUserDetails] = useState({
    name: '',
    address: '',
    email: ''
  });

  if (!isOpen) return null;

  const handleSendOTP = async () => {
    if (!phoneNumber.trim()) return;
    
    setLoading(true);
    const success = await sendOTP(phoneNumber);
    setLoading(false);
    
    if (success) {
      setStep('otp');
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp.trim()) return;
    
    setLoading(true);
    const success = await login(phoneNumber, otp, userDetails);
    setLoading(false);
    
    if (success && userDetails.name && userDetails.address) {
      onSuccess?.();
      onClose();
    } else if (success) {
      setStep('details');
    }
  };

  const handleCompleteProfile = async () => {
    if (!userDetails.name.trim() || !userDetails.address.trim()) return;
    
    setLoading(true);
    const success = await login(phoneNumber, otp, userDetails);
    setLoading(false);
    
    if (success) {
      onSuccess?.();
      onClose();
    }
  };

  const resetModal = () => {
    setStep('phone');
    setPhoneNumber('');
    setOtp('');
    setUserDetails({ name: '', address: '', email: '' });
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4">
      <div className="bg-primary rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-secondary/20">
          <h2 className="text-xl font-bold text-tertiary">
            {step === 'phone' && 'Sign In'}
            {step === 'otp' && 'Verify OTP'}
            {step === 'details' && 'Complete Profile'}
          </h2>
          <button onClick={handleClose}>
            <X className="w-6 h-6 text-tertiary hover:text-tertiary/80" />
          </button>
        </div>

        <div className="p-6">
          {step === 'phone' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-tertiary mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone Number
                </label>
                <Input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="bg-secondary/10 border-secondary/30 text-tertiary"
                />
              </div>
              <Button 
                onClick={handleSendOTP}
                disabled={loading || !phoneNumber.trim()}
                className="w-full bg-tertiary text-primary hover:bg-tertiary/90"
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </Button>
            </div>
          )}

          {step === 'otp' && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-tertiary/70 mb-4">
                  Enter the 6-digit code sent to {phoneNumber}
                </p>
                <Input
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="bg-secondary/10 border-secondary/30 text-tertiary text-center text-lg tracking-widest"
                  maxLength={6}
                />
                <p className="text-xs text-tertiary/50 mt-2">
                  Demo: Use 123456 as OTP
                </p>
              </div>
              <Button 
                onClick={handleVerifyOTP}
                disabled={loading || otp.length !== 6}
                className="w-full bg-tertiary text-primary hover:bg-tertiary/90"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </Button>
              <button 
                onClick={() => setStep('phone')}
                className="w-full text-tertiary/70 hover:text-tertiary text-sm"
              >
                ← Change Phone Number
              </button>
            </div>
          )}

          {step === 'details' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-tertiary mb-1">
                  <User className="w-4 h-4 inline mr-1" />
                  Full Name *
                </label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={userDetails.name}
                  onChange={(e) => setUserDetails(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-secondary/10 border-secondary/30 text-tertiary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-tertiary mb-1">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Delivery Address *
                </label>
                <Input
                  type="text"
                  placeholder="123 Main St, City, State, ZIP"
                  value={userDetails.address}
                  onChange={(e) => setUserDetails(prev => ({ ...prev, address: e.target.value }))}
                  className="bg-secondary/10 border-secondary/30 text-tertiary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-tertiary mb-1">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email Address (Optional)
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={userDetails.email}
                  onChange={(e) => setUserDetails(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-secondary/10 border-secondary/30 text-tertiary"
                />
              </div>
              
              <Button 
                onClick={handleCompleteProfile}
                disabled={loading || !userDetails.name.trim() || !userDetails.address.trim()}
                className="w-full bg-tertiary text-primary hover:bg-tertiary/90"
              >
                {loading ? 'Completing...' : 'Complete Profile'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
