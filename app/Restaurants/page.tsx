"use client";
import React, { useEffect, useState, useRef } from "react";
import TinderCard from "react-tinder-card";
import SwipeButtons from '../../components/swipe/swipe';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Header from "../../components/Header/Header";
import RestaurantDetails from '../../components/RestaurantDetails/RestaurantDetails';
import * as XLSX from "xlsx";
import styles from "./restaurant.module.css";

interface Restaurant {
  [key: string]: string | number; // This allows for dynamic keys from the Excel sheet
}

const RestaurantCards: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useRef<any[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const url = "https://docs.google.com/spreadsheets/d/1fZcP0WVpspmU-LlCtqMR__uwaqvMIEjczQ4Intfv4yk/pub?output=xlsx";
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const blob = await response.blob();
        const reader = new FileReader();
        
        reader.onload = (e) => {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json(worksheet) as Restaurant[];
          
          const reversedRestaurants = json.reverse();
          setRestaurants(reversedRestaurants);
          childRefs.current = Array(reversedRestaurants.length).fill(0).map((i) => React.createRef());
          
          setCurrentIndex(reversedRestaurants.length - 1);
          currentIndexRef.current = reversedRestaurants.length - 1;
        };
        
        reader.readAsArrayBuffer(blob);
      } catch (error) {
        console.error("Error fetching or processing the spreadsheet:", error);
      }
    };
    
    fetchRestaurants();
  }, []);

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canSwipe = currentIndex >= 0;

  const swiped = (direction: string, nameToDelete: string, index: number) => {
    console.log("Removing: " + nameToDelete);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name: string, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    if (currentIndexRef.current >= idx) {
      childRefs.current[idx].current.restoreCard();
    }
  };

  const swipe = async (dir: string) => {
    if (canSwipe && currentIndex < restaurants.length) {
      await childRefs.current[currentIndex].current.swipe(dir);
    }
  };

  const handleSwipe = (direction: string, restaurant: Restaurant) => {
    if (direction === 'up') {
      setSelectedRestaurant(restaurant);
      setShowDetails(true);
    } else {
      swiped(direction, restaurant.Name as string, currentIndex);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={`${styles.tinderCards__cardContainer} ${showDetails ? styles.blurred : ''}`}>
        {restaurants.map((restaurant, index) => (
          <TinderCard
            ref={childRefs.current[index]}
            className={styles.swipe}
            key={restaurant.Name as string}
            onSwipe={(dir) => handleSwipe(dir, restaurant)}
            onCardLeftScreen={() => outOfFrame(restaurant.Name as string, index)}
            swipeRequirementType="position"
            swipeThreshold={80}
            flickOnSwipe={true}
          >
            <div
              style={{ backgroundImage: `url(${restaurant["Image URL"]})` }}
              className={styles.card}
            >
              <div className={styles.cardContent}>
                <h3>{restaurant.Name}</h3>
                <p>{restaurant.Cuisine}</p>
                <p>Rating: {restaurant.Rating} ⭐</p>
                <p>{restaurant.Location}</p>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>

      {/* Add swipe-up message with bounce effect */}
      {!showDetails && (
        <div className={styles.swipeUpMessage}>
          <KeyboardArrowUpIcon className={styles.bounceIcon} />
          <p>Swipe up</p>
        </div>
      )}

      <div className={`${styles.iconContainer} ${showDetails ? styles.hidden : ''}`}>
        <SwipeButtons
          onSwipeLeft={() => swipe('left')}
          onSwipeRight={() => swipe('right')}
        />
      </div>
      
      {showDetails && selectedRestaurant && (
        <RestaurantDetails
          restaurant={selectedRestaurant}
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
};

export default RestaurantCards;
