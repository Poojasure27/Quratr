"use client";
import React, { useEffect, useState, useRef } from "react";
import TinderCard from "react-tinder-card"; 
import SwipeButtons from '../../components/swipe/swipe';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Header from "../../components/Header/Header";
import RestaurantDetails from '../../components/RestaurantDetails/RestaurantDetails';
import * as XLSX from "xlsx";
import styles from "./restaurant.module.css";

// Define the Restaurant interface
interface Restaurant {
  Name: string;
  Cuisine: string;
  Rating: number;
  Location: string;
  'Image URL': string;
  [key: string]: string | number;
}

// Define the TinderCardRef interface
interface TinderCardRef {
  swipe: (direction: string) => void;
}

type SwipeDirection = string; // Allow any string

// Define the component
const RestaurantCards: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const currentIndexRef = useRef<number>(currentIndex);

  // Update the type for childRefs to hold TinderCard refs
  const childRefs = useRef<(React.RefObject<TinderCardRef> | null)[]>([]);

  // Fetch restaurants from the spreadsheet
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
          const json = XLSX.utils.sheet_to_json<Restaurant>(worksheet);

          const reversedRestaurants = json.reverse();
          setRestaurants(reversedRestaurants);

          // Initialize refs array for TinderCard components
          childRefs.current = reversedRestaurants.map(() => React.createRef<TinderCardRef>());

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

  // Update the current index
  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canSwipe = currentIndex >= 0;

  // Handle swipe action
  const swiped = (direction: string, nameToDelete: string, index: number) => {
    console.log("Removing: " + nameToDelete);
    updateCurrentIndex(index - 1);
  };

  // Handle card leaving screen
  const outOfFrame = (name: string, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
  };

  // Swipe the card in a specific direction
  const swipe = async (dir: string) => {
    if (canSwipe && currentIndex < restaurants.length) {
      const currentCard = childRefs.current[currentIndex]?.current;
      if (currentCard) {
        currentCard.swipe(dir);
      }
    }
  };

  // Handle swipe actions
  const handleSwipe = (direction: SwipeDirection, restaurant: Restaurant) => {
    if (['up', 'down', 'left', 'right'].includes(direction)) {
      if (direction === 'up') {
        showRestaurantDetails(restaurant);
      } else {
        swiped(direction, restaurant.Name, currentIndex);
      }
    }
  };

  // Show restaurant details
  const showRestaurantDetails = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowDetails(true);
  };

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={`${styles.tinderCards__cardContainer} ${showDetails ? styles.blurred : ''}`}>
        {restaurants.map((restaurant, index) => (
          <TinderCard
            ref={childRefs.current[index]}
            className={styles.swipe}
            key={restaurant.Name}
            onSwipe={(dir: string) => handleSwipe(dir, restaurant)}
            onCardLeftScreen={() => outOfFrame(restaurant.Name, index)}
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
                <p>{restaurant.Address}</p>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>

      <div className={`${styles.iconContainer} ${showDetails ? styles.hidden : ''}`}>
        <SwipeButtons
          onSwipeLeft={() => swipe('left')}
          onSwipeRight={() => swipe('right')}
        />
      </div>
      
      <div className={styles.buttonContainer}>
        <button 
          className={styles.navButton} 
          style={{ backgroundColor: "#fed4e4" }}
          onClick={() => {/* Add your Discover functionality here */}}
        >
          Discover
        </button>
        <button 
          className={styles.navButton} 
          style={{ backgroundColor: "#fed4e4" }}
          onClick={() => router.push('/feed')}
        >
          Feed
        </button>
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