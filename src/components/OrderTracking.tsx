
import React from 'react';
import { Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';
import { useCart, Order } from '../contexts/CartContext';

const OrderTracking: React.FC = () => {
  const { orders } = useCart();

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'processing':
        return <Package className="w-5 h-5 text-blue-600" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-purple-600" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Package className="w-16 h-16 text-tertiary/30 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-tertiary mb-4">No Orders Yet</h2>
            <p className="text-tertiary/70 mb-8">
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <a 
              href="/#shop" 
              className="inline-flex items-center px-6 py-3 bg-tertiary text-primary rounded-lg font-semibold hover:bg-tertiary/90 transition-colors"
            >
              Start Shopping
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-tertiary mb-4">Order Tracking</h1>
            <p className="text-tertiary/70">Track your orders and delivery status</p>
          </div>

          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-secondary/10 rounded-xl p-6 border border-secondary/20">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-tertiary mb-1">
                      Order {order.id}
                    </h3>
                    <p className="text-tertiary/60 text-sm">
                      Placed on {formatDate(order.date)}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-4 lg:mt-0">
                    <div className={`px-3 py-1 rounded-full border text-sm font-medium flex items-center gap-2 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </div>
                    <div className="text-lg font-bold text-tertiary">
                      ${order.total.toFixed(2)}
                    </div>
                  </div>
                </div>

                {order.trackingNumber && (
                  <div className="bg-primary/50 rounded-lg p-4 mb-4 flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-tertiary/70" />
                    <div>
                      <p className="text-sm font-medium text-tertiary">Tracking Number</p>
                      <p className="text-tertiary/70 font-mono">{order.trackingNumber}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <h4 className="font-medium text-tertiary">Items ({order.items.length})</h4>
                  {order.items.map((item) => (
                    <div key={`${order.id}-${item.id}`} className="flex items-center gap-4 p-3 bg-primary/30 rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-tertiary text-sm truncate">{item.name}</h5>
                        <p className="text-xs text-tertiary/60">{item.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-tertiary">
                          ${item.price.toFixed(2)} × {item.quantity}
                        </p>
                        <p className="text-xs text-tertiary/60">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-secondary/20">
                  <div className="flex justify-between items-center">
                    <span className="text-tertiary/70">Order Total</span>
                    <span className="text-lg font-bold text-tertiary">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
