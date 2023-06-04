import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = ({ onClickHandler,list }) => {

  const nameinpRef = useRef();
  const streetinpRef = useRef();
  const postinpRef = useRef();
  const cityinpRef = useRef();
  const [isNameValid, setisNameValid] = useState(true);
  const [isstreetValid, setisstreetValid] = useState(true);
  const [ispostValid, setispostValid] = useState(true);
  const [iscityValid, setiscityValid] = useState(true);
  const confirmHandler = (event) => {
    event.preventDefault();
    setisNameValid(true);
    setisstreetValid(true);
    setispostValid(true);
    setiscityValid(true);
    const name = nameinpRef.current.value;
    const street = streetinpRef.current.value;
    const post = postinpRef.current.value;
    const city = cityinpRef.current.value;
    if (name.trim().length === 0) setisNameValid(false);
    if (street.trim().length === 0) setisstreetValid(false);
    if (!(post.trim().length === 5)) setispostValid(false);
    if (city.trim().length === 0) setiscityValid(false);
    const person = {
      name,
      street,
      post,
      city,
    };
    fetch(
      "https://dametucasito-d0f73-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: person,
          orders:list,
        }),
      }
    ).then((res) => console.log(res.ok));
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${isNameValid ? "" : classes.invalid}`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameinpRef} />
        {!isNameValid && <p>Enter a valid Name</p>}
      </div>
      <div
        className={`${classes.control} ${isstreetValid ? "" : classes.invalid}`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetinpRef} />
        {!isstreetValid && <p>Enter a valid street</p>}
      </div>
      <div
        className={`${classes.control} ${ispostValid ? "" : classes.invalid}`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postinpRef} />
        {!ispostValid && <p>Enter a valid postal code</p>}
      </div>
      <div
        className={`${classes.control} ${iscityValid ? "" : classes.invalid}`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityinpRef} />
        {!iscityValid && <p>Enter a valid City</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={onClickHandler}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
