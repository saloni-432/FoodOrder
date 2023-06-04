import { useContext } from "react";
import cartcontext from "../../../store/cart-context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
const MealItem = ({ name, description, price,id }) => {
  console.log(name);
  const carcntx = useContext(cartcontext);
  const itemadder=quantity=>{
    const obj={
      name,
      price,
      amount:quantity,
      id
    }
    carcntx.addItem(obj);
  }
  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{`$${price.toFixed(2)}`}</div>
      </div>
      <div>
          <MealItemForm id={id} itemadder={itemadder}/>
      </div>
    </li>
  );
};
export default MealItem;
