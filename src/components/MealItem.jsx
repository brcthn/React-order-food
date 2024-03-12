import {currencyFormatter} from "../util/formating"
import Button from "../UI/Button";
import { useContext } from "react";
import CartContext from "../store/CartContex.jsx";

export default function MealItem({meal}){

    const cartCtx = useContext(CartContext)
    function handleAddMealToCart(){
       cartCtx.addItem(meal);
    }
    return(
        <div className="rounded-md bg-neutral-900 max-w-72 max-h-screen mb-5 mt-5">
            <img src={`http://localhost:3000/${meal.image}`} alt = {meal.image} className="rounded-t-md"></img>
            <p className="text-center font-bold text-xl mb-2">{meal.name}</p>
            <p className="text-center bg-neutral-800  text-amber-500 rounded-sm mx-24 mb-2">{currencyFormatter.format(meal.price)}</p>
            <p className="text-center text-sm mb-4">{meal.description}</p>
            <div className=" grid justify-items-center">
                <div>
                    <Button onClick={handleAddMealToCart} className="bg-amber-500 hover:bg-amber-400 text-center text-neutral-800 rounded-sm mb-4 p-2">Add to card</Button>
                </div>
            </div>          
        </div>
    )
}