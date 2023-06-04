import classes from './Header.module.css'
import mealsImage from "../../assets/meals.jpg"
import HeaderCartButton from './HeaderCartButton'   
const Header=({onClickHandler})=>{
    return <>
            <header className={classes.header}>
                <h1>ZooshyDelivers </h1>
                <HeaderCartButton onClickHandler={onClickHandler}/>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="table of foods" />
            </div>

          </>
}
export default Header