import React from 'react';
import styles from './Details.module.css';

interface Restaurant {
  [key: string]: string | number;
}

interface Props {
  restaurant: Restaurant;
  onClose: () => void;
}

const RestaurantDetails: React.FC<Props> = ({ restaurant, onClose }) => {
  return (
    <div className={styles.detailsContainer}>
      <div className={styles.detailsContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        {restaurant["Image URL"] && (
          <img src={restaurant["Image URL"] as string} alt={restaurant.Name as string} className={styles.restaurantImage} />
        )}
        {Object.entries(restaurant).map(([key, value]) => {
          // Skip the Image URL as we're displaying it separately
          if (key === "Image URL") return null;
          
          return (
            <p key={key}>
              <strong>{key}:</strong> {value}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantDetails;