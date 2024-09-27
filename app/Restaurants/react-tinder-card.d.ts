declare module 'react-tinder-card' {
  import React from 'react';

  interface TinderCardProps {
    className?: string;
    onSwipe: (direction: string) => void; // Accepts string for flexibility
    onCardLeftScreen?: () => void;
    swipeRequirementType?: string;
    swipeThreshold?: number;
    flickOnSwipe?: boolean;
    children?: React.ReactNode; 
  }

  interface TinderCardRef {
    swipe: (direction: string) => void;
  }

  const TinderCard: React.ForwardRefExoticComponent<
    TinderCardProps & React.RefAttributes<TinderCardRef>
  >;

  export default TinderCard;
}
