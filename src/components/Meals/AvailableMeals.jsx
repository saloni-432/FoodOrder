import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setmeals] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [hasError, sethasError] = useState("");
  useEffect(() => {
    setisLoading(true);
    fetch("https://dametucasito-d0f73-default-rtdb.firebaseio.com/meals.json")
      .then((res) => {
        if (!res.ok) throw new Error("Some Error in Loading Meals..Try again");
        return res.json();
      })
      .then((data) => {
        const avlbmeals = [];
        for (const key in data)
          avlbmeals.push({
            id: key,
            ...data[key],
          });
        setisLoading(false);
        setmeals(avlbmeals);
      })
      .catch((err) => {
        setisLoading(false);
        sethasError(err.message);
      });
  }, []);
  return (
    <section className={classes.meals}> 
      <Card>
        {hasError && <p>{hasError}</p>}
        {isLoading && !hasError && <p>Loading...</p>}
        {!isLoading && !hasError && (
          <ul>
            {meals.map((item) => (
              <MealItem key={item.id} {...item} />
            ))}
          </ul>
        )}
      </Card>
    </section>
  );
};
export default AvailableMeals;
