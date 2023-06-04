import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
const MealItemForm = ({id,itemadder}) => {
  const [showError, setshowError] = useState(false)
  const InputRef = useRef();
  const onSubmitHandler=(e)=>{
    e.preventDefault();
    const enteredAmount=InputRef.current.value;
    const enteredAmountNum=+enteredAmount;
    if(enteredAmount.trim().length===0 || enteredAmountNum<1 || enteredAmountNum>5)
    {
      setshowError(true);
      return;
    }
    itemadder(enteredAmountNum);

  }
  return <form className={classes.form} onSubmit={onSubmitHandler}>
    <Input
    ref={InputRef}
    label="Amount"
    input={{
      id:"amount"+{id},
      type:"number",
      min:"1",
      max:"5",
      step:"1",
      defaultValue:"1",
    }}
    />
    <button type="submit">+Add</button>
    {showError && <div>Enter a Valid Amount(1-5)</div>}
  </form>
};
export default MealItemForm;
