import { useState } from "react";
import Cart from "./components/Cart/Cart";
  import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";
function App() {
  const [isClicked, setisClicked] = useState(false);
  const onClickHandler=()=>setisClicked(isClicked=>!isClicked)
  return (
    <CartProvider>
      {isClicked && <Cart onClickHandler={onClickHandler}/> }
      <Header onClickHandler={onClickHandler}/>
      <main>
      <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;