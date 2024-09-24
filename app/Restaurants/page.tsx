"use client";
import React, { useEffect, useState, useRef } from "react";
import TinderCard from "react-tinder-card";
import SwipeButtons from '../../components/swipe/swipe';
import Header from "../../components/Header/Header";
import * as XLSX from "xlsx";
import styles from "./restaurant.module.css";

interface Restaurant {
  Name: string;
  Cuisine: string;
  Rating: number;
  Location: string;
  "Image URL": string;
}

const RestaurantCards: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
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
          const json: Restaurant[] = XLSX.utils.sheet_to_json(worksheet);
          
          // Reverse the array so we start from the last item
          const reversedRestaurants = json.reverse();
          setRestaurants(reversedRestaurants);
          childRefs.current = Array(reversedRestaurants.length).fill(0).map((i) => React.createRef());
          
          // Set the current index to the last item (which is now the first in our reversed array)
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

  return (
    <div>
      <Header />
      <div className={styles.tinderCards__cardContainer}>
        {restaurants.map((restaurant, index) => (
          <TinderCard
            ref={childRefs.current[index]}
            className={styles.swipe}
            key={restaurant.Name}
            preventSwipe={["up", "down"]}
            onSwipe={(dir) => swiped(dir, restaurant.Name, index)}
            onCardLeftScreen={() => outOfFrame(restaurant.Name, index)}
            swipeRequirementType="position"
            swipeThreshold={10}
            flickOnSwipe={true}
          >
            <div
              style={{ backgroundImage: `url(${restaurant["Image URL"]})` }}
              className={styles.card}
            >
              <h3>{restaurant.Name}</h3>
              <p>{restaurant.Cuisine}</p>
              <p>Rating: {restaurant.Rating} ⭐</p>
              <p>{restaurant.Location}</p>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className={styles.iconContainer}>
        <SwipeButtons
          onSwipeLeft={() => swipe('left')}
          onSwipeRight={() => swipe('right')}
        />
      </div>
    </div>
  );
};

export default RestaurantCards;