import React, { useCallback, useState, useEffect } from "react";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";

import styles from "./AvailableMeals.module.css";
import useHttp from "../../hooks/use-http";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const transformMeals = useCallback((mealObj) => {
    const loadedMeals = [];

    for (const mealKey in mealObj) {
      loadedMeals.push(
        <MealItem
          key={mealKey}
          id={mealKey}
          name={mealObj[mealKey].name}
          description={mealObj[mealKey].description}
          price={mealObj[mealKey].price}
        />
      );
    }

    setMeals(loadedMeals);
  }, []);

  const { isLoading, error, sendRequest: getMeals } = useHttp();

  useEffect(() => {
    getMeals(
      {
        url: `${process.env.REACT_APP_API_ENDPOINT}meals.json`,
      },
      transformMeals
    );
  }, [getMeals, transformMeals]);

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{meals}</ul>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
