import { useContext, useRef } from "react"
import Button from "../UI/Button";
import  Logo from "../assets/logo.jpg";
import CartContext from"../store/CartContex.jsx";
import UserProgressContext from "../store/UserProgressContext";
export default function Header(){

    const userProgressCtx = useContext( UserProgressContext)
    const cartCtx = useContext(CartContext);

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    },0)

    function handleShowCart(){
        userProgressCtx.showCart();
    }

    return(
        <header className = "flex justify-between mt-6 mx-6">
            
            <div>
                <div className="flex justify-start items-center gap-x-2">
                    <img src ={Logo} alt="Logo" className=" border-amber-500 border-2 max-h-16 max-w-16 object-contain rounded-full"></img>
                    <h1 className="text-amber-500 font-bold text-xl">REACTFOOD</h1>
                </div>
            </div>
            <div className="flex">
                <Button className=" text-amber-500 self-center hover:text-amber-400" onClick={handleShowCart}>Cart({totalCartItems})</Button>
            </div>
           
        </header>
       

    )
}