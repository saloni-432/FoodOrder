import { useReducer } from "react";
import cartcontext from "./cart-context";
const def_cart_state = {
  item: [],
  totalAmount: 0,
};
const CartReducer = (state, action) => {
  if (action.type === "ITEM_ADD") {
    const itemadd = action.val;
    const ind = state.item.findIndex((item) => item.id === itemadd.id);
    if (ind === -1)
      return {
        item: [itemadd, ...state.item],
        totalAmount: state.totalAmount + itemadd.price * itemadd.amount,
      };   
        else {
      const new_itemList = JSON.parse(JSON.stringify(state.item));
      new_itemList[ind].amount = new_itemList[ind].amount + itemadd.amount;
      return {
        item: new_itemList.map(x=>x),
        totalAmount: state.totalAmount + itemadd.price * itemadd.amount,
      };
    }
  } 
  else if (action.type === "ITEM_REMOVE") {
    const itemadd = action.val;
    const ind = state.item.findIndex((item) => item.id === itemadd.id);

    const new_itemList = JSON.parse(JSON.stringify(state.item));

    new_itemList[ind].amount -= 1;
    if (new_itemList[ind].amount === 0) {
      return {
        item: new_itemList.filter((item) => item.id !== itemadd.id),
        totalAmount: state.totalAmount - itemadd.price,
      };
    } else {
      return {
        item: new_itemList,
        totalAmount: state.totalAmount - itemadd.price,
      };
    }
  }
  return def_cart_state;
};
const CartProvider = (props) => {
  const [Cart, dispatchCart] = useReducer(CartReducer, def_cart_state);
  const addItem = (item) => dispatchCart({ type: "ITEM_ADD", val: item });
  const removeItem = (item) => dispatchCart({ type: "ITEM_REMOVE", val: item });

  const init_ob = {
    item: Cart.item,
    totalAmount: Cart.totalAmount,
    addItem,
    removeItem,
  };
  return (
    <cartcontext.Provider value={init_ob}>
      {props.children}
    </cartcontext.Provider>
  );
};
export default CartProvider;
