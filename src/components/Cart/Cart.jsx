import { useContext, useState } from "react";
import cartcontext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = ({ onClickHandler }) => {
  const [isClicked, setisClicked] = useState(false);
  const cartcntxt = useContext(cartcontext);
  const List = cartcntxt.item;
  const onClickHandler2 = () => setisClicked(true);
  const onAdd = (item) => {
    cartcntxt.addItem({ ...item, amount: 1 });
  };
  const onRemove = (item) => {cartcntxt.removeItem(item);};
  return (
    <Modal onClickHandler={onClickHandler}>
      <div> 
        <ul className={classes["cart-items"]}>
          {List.map((item) => (
            <CartItem
              key={item.id}
              {...item}
              onAdd={onAdd.bind(null, item)} 
              onRemove={onRemove.bind(null, item)}
            />
          ))}
        </ul> 
      </div>
      <div className={classes["total"]}>
        <span>Total Amount</span>
        <span>{`$${cartcntxt.totalAmount.toFixed(2)}`}</span>
      </div>
      {isClicked && <Checkout onClickHandler={onClickHandler} list={List}/>}
      {!isClicked && (
        <div className={classes["actions"]}>
          <button className={classes["button--alt"]} onClick={onClickHandler}>
            Cancel
          </button>
          {List.length === 0 ? (
            ""
          ) : (
            <button className={classes.button} onClick={onClickHandler2}>
              Order
            </button>
          )}
        </div>
      )}
    </Modal>
  );
};

export default Cart;
