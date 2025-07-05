
import React, { useState } from 'react';
import { X, Phone, Mail, User, MapPin, ArrowLeft, ArrowRight } from 'lucide-react';
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
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
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

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) return;
    
    setLoading(true);
    const success = await login(phoneNumber, otpString, userDetails);
    setLoading(false);
    
    if (success && userDetails.name && userDetails.address) {
      onSuccess?.();
      onClose();
      resetModal();
    } else if (success) {
      setStep('details');
    }
  };

  const handleCompleteProfile = async () => {
    if (!userDetails.name.trim() || !userDetails.address.trim()) return;
    
    setLoading(true);
    const otpString = otp.join('');
    const success = await login(phoneNumber, otpString, userDetails);
    setLoading(false);
    
    if (success) {
      onSuccess?.();
      onClose();
      resetModal();
    }
  };

  const resetModal = () => {
    setStep('phone');
    setPhoneNumber('');
    setOtp(['', '', '', '', '', '']);
    setUserDetails({ name: '', address: '', email: '' });
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white z-[70] flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img 
          src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&h=800&fit=crop"
          alt="Moments"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-tertiary/20 to-transparent"></div>
        <div className="absolute bottom-8 left-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Welcome to Moments</h2>
          <p className="text-lg opacity-90">Create magical memories with our DIY kits</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-secondary/20">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-tertiary rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-lg">M</span>
            </div>
            <h1 className="text-xl font-bold text-tertiary">Moments</h1>
          </div>
          <button onClick={handleClose} className="lg:hidden">
            <X className="w-6 h-6 text-tertiary hover:text-tertiary/80" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md space-y-6">
            {/* Step Indicator */}
            <div className="flex items-center justify-center space-x-2 mb-8">
              {['phone', 'otp', 'details'].map((stepName, index) => (
                <div key={stepName} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === stepName ? 'bg-tertiary text-primary' : 
                    ['phone', 'otp', 'details'].indexOf(step) > index ? 'bg-tertiary/20 text-tertiary' : 'bg-gray-200 text-gray-400'
                  }`}>
                    {index + 1}
                  </div>
                  {index < 2 && <div className="w-8 h-0.5 bg-gray-200 mx-2"></div>}
                </div>
              ))}
            </div>

            {step === 'phone' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-tertiary mb-2">Sign In</h2>
                  <p className="text-tertiary/70">Enter your phone number to get started</p>
                </div>
                
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
                      className="h-12 text-lg"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleSendOTP}
                    disabled={loading || !phoneNumber.trim()}
                    className="w-full h-12 bg-tertiary text-primary hover:bg-tertiary/90"
                  >
                    {loading ? 'Sending...' : (
                      <>
                        Send OTP
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {step === 'otp' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-tertiary mb-2">Verify OTP</h2>
                  <p className="text-tertiary/70">Enter the 6-digit code sent to</p>
                  <p className="font-medium text-tertiary">{phoneNumber}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-center space-x-2">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        className="w-12 h-12 text-center text-lg font-semibold"
                        maxLength={1}
                      />
                    ))}
                  </div>
                  
                  <p className="text-xs text-tertiary/50 text-center">
                    Demo: Use 123456 as OTP
                  </p>
                  
                  <div className="flex space-x-3">
                    <Button 
                      onClick={() => setStep('phone')}
                      variant="outline"
                      className="flex-1 h-12"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button 
                      onClick={handleVerifyOTP}
                      disabled={loading || otp.join('').length !== 6}
                      className="flex-1 h-12 bg-tertiary text-primary hover:bg-tertiary/90"
                    >
                      {loading ? 'Verifying...' : (
                        <>
                          Verify
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {step === 'details' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-tertiary mb-2">Complete Profile</h2>
                  <p className="text-tertiary/70">Tell us a bit about yourself</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-tertiary mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      value={userDetails.name}
                      onChange={(e) => setUserDetails(prev => ({ ...prev, name: e.target.value }))}
                      className="h-12"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-tertiary mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Delivery Address *
                    </label>
                    <Input
                      type="text"
                      placeholder="123 Main St, City, State, ZIP"
                      value={userDetails.address}
                      onChange={(e) => setUserDetails(prev => ({ ...prev, address: e.target.value }))}
                      className="h-12"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-tertiary mb-2">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email Address (Optional)
                    </label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={userDetails.email}
                      onChange={(e) => setUserDetails(prev => ({ ...prev, email: e.target.value }))}
                      className="h-12"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleCompleteProfile}
                    disabled={loading || !userDetails.name.trim() || !userDetails.address.trim()}
                    className="w-full h-12 bg-tertiary text-primary hover:bg-tertiary/90"
                  >
                    {loading ? 'Completing...' : 'Complete Profile'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Close button for desktop */}
      <button 
        onClick={handleClose}
        className="hidden lg:block absolute top-6 right-6 text-tertiary hover:text-tertiary/80 z-10"
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  );
};

export default AuthModal;
