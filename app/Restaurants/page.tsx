"use client"; 
import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import Icons from '../../components/swipe/swipe';
import Header from "../../components/Header/Header";
import * as XLSX from "xlsx";
import styles from "./restaurant.module.css"; // Assuming you have CSS Modules for styling

interface Restaurant {
  Name: string;
  Cuisine: string;
  Rating: number;
  Location: string;
  "Image URL": string;
}

const RestaurantCards: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [lastDirection, setLastDirection] = useState(""); // Keep track of the last swipe direction

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

          // Assuming the data is in the first sheet
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const json: Restaurant[] = XLSX.utils.sheet_to_json(worksheet);

          setRestaurants(json);
        };

        reader.readAsArrayBuffer(blob);
      } catch (error) {
        console.error("Error fetching or processing the spreadsheet:", error);
      }
    };

    fetchRestaurants();
  }, []);

  const swiped = (direction: string, nameToDelete: string) => {
    setLastDirection(direction);
    console.log("Removing: " + nameToDelete);
    setRestaurants((prevRestaurants) =>
      prevRestaurants.filter((restaurant) => restaurant.Name !== nameToDelete)
    );
  };

  const outOfFrame = (name: string) => {
    console.log(name + " left the screen");
  };

  return (
    <div>
      <Header />
      <div className={styles.tinderCards__cardContainer}>
        {restaurants.map((restaurant) => (
          <TinderCard
            className={styles.swipe}
            key={restaurant.Name}
            preventSwipe={["up", "down"]}
            onSwipe={(dir) => swiped(dir, restaurant.Name)}
            onCardLeftScreen={() => outOfFrame(restaurant.Name)}
            swipeRequirementType="position" // Better for smoother swipe behavior
            swipeThreshold={10} // Adjust swipe threshold for sensitivity
            flickOnSwipe={true} // Enables flick for natural feel
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
        <Icons />
      </div>
    </div>
  );
};

export default RestaurantCards;
