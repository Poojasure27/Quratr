declare module 'react-tinder-card' {
  import React from 'react';

  interface TinderCardProps {
    onSwipe?: (direction: string) => void;
    onCardLeftScreen?: (name: string) => void;
    className?: string;
    key?: string;
    swipeRequirementType?: 'position' | 'speed'; // Narrow down the possible values if applicable
    swipeThreshold?: number;
    flickOnSwipe?: boolean;
    ref?: React.Ref<HTMLDivElement>; // Update this to a more specific type (HTMLDivElement in this case)
  }

  const TinderCard: React.FC<TinderCardProps>;
  export default TinderCard;
}
