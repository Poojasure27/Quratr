"use client";
import React from "react";
import Link from "next/link";
import styles from "./categories.module.css";

const Categories: React.FC = () => {
  const categories = [
    "Cafe",
    "Non-Veg",
    "Veg",
    "Gourmet",
    "Fast Food",
    "Desserts",
    "Beverages",
  ];

  return (
    <div className={styles.categoriesPage}>
      <h2>Restaurant Categories</h2>
      <ul className={styles.categoryList}>
        {categories.map((category) => (
          <li key={category}>
            <Link href={`/restaurants/${category.toLowerCase()}`} passHref>
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
