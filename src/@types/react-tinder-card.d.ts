declare module 'react-tinder-card' {
    import React from 'react';
  
    interface TinderCardProps {
      onSwipe?: (direction: string) => void;
      onCardLeftScreen?: (name: string) => void;
      className?: string;
      key?: string;
      swipeRequirementType?: string;
      swipeThreshold?: number;
      flickOnSwipe?: boolean;
      ref?: React.Ref<any>;
    }
  
    const TinderCard: React.FC<TinderCardProps>;
    export default TinderCard;
  }
  