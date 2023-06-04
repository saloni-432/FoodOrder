import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import cartcontext from "../../store/cart-context";
import { useContext, useEffect, useState } from "react";
const HeaderCartButton = ({ onClickHandler }) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cntx = useContext(cartcontext);
  const total_cnt = cntx.item.reduce((val, item) => val + item.amount, 0);
  const { item } = cntx;
  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (item.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [item]);

  return (
    <button className={btnClasses} onClick={onClickHandler}>
      <span className={classes.icon}>
        <CartIcon />{" "}
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{total_cnt}</span>
    </button>
  );
};
export default HeaderCartButton;
