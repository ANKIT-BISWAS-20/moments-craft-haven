
import React from 'react';

const AnnouncementBar = () => {
  return (
    <div className="bg-tertiary text-primary overflow-hidden whitespace-nowrap py-2">
      <div className="animate-slide-left inline-block">
        <span className="mx-8 text-sm font-medium">🎉 Limited Time: 20% OFF All DIY Kits!</span>
        <span className="mx-8 text-sm font-medium">✨ Free Shipping on Orders Over $50</span>
        <span className="mx-8 text-sm font-medium">🎁 Perfect Gifts for Every Moment</span>
      </div>
    </div>
  );
};

export default AnnouncementBar;
