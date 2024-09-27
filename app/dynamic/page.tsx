"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import styles from "./dynamicCat.module.css";

interface Restaurant {
  Name: string;
  Cuisine: string;
  Rating: number;
  Location: string;
  "Image URL": string;
}

const CategoryPage: React.FC = () => {
  const { category } = useParams(); // Get category from URL
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const url = "https://docs.google.com/spreadsheets/d/1fZcP0WVpspmU-LlCtqMR__uwaqvMIEjczQ4Intfv4yk/pub?output=xlsx";
      const response = await fetch(url);
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const json: Restaurant[] = XLSX.utils.sheet_to_json(worksheet);

        
        const categoryString = Array.isArray(category) ? category[0] : category || '';

        // Filter restaurants based on the category parameter
        const filteredRestaurants = json.filter(
          (restaurant) =>
            restaurant.Cuisine?.toLowerCase() === categoryString.toLowerCase()
        );
        setRestaurants(filteredRestaurants);
      };

      reader.readAsArrayBuffer(blob);
    };

    if (category) fetchRestaurants();
  }, [category]);

  // Ensure categoryString is always a string for rendering
  const categoryDisplay = Array.isArray(category) ? category[0] : category;

  return (
    <div className={styles.categoryPage}>
      <h1>{categoryDisplay ? categoryDisplay.charAt(0).toUpperCase() + categoryDisplay.slice(1) : "Loading..."} Restaurants</h1>
      <div className={styles.restaurantList}>
        {restaurants.map((restaurant) => (
          <div key={restaurant.Name} className={styles.restaurantCard}>
            <img src={restaurant["Image URL"]} alt={restaurant.Name} />
            <h3>{restaurant.Name}</h3>
            <p>{restaurant.Cuisine}</p>
            <p>{restaurant.Rating} ⭐</p>
            <p>{restaurant.Location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
