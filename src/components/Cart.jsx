import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../store/CartContex";
import { currencyFormatter } from "../util/formating";
import Button from "../UI/Button"
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart(){
const userProgressCtx = useContext( UserProgressContext);
const cartCtx = useContext(CartContext);

const cartTotal = cartCtx.items.reduce((totalPrice,item) =>{
    return totalPrice + (item.quantity *item.price)

},0)

function handleCloseCart(){
    userProgressCtx.hideCart();
}
function handleCheckoutCart(){
    userProgressCtx.showCheckout();

}

    return(
        <Modal className="min-w-96 min-h-56 bg-stone-100" open = {userProgressCtx.progress === "cart"} onClose = {userProgressCtx.progress === "cart" ? handleCloseCart : null}>
            <h2 className="font-bold m-3">Your Cart</h2>
            <ul className="m-3">
            {cartCtx.items.map((item)=>
            <CartItem key={item.id} item ={item}/>
                
            )}
            </ul>
            <div className="grid">
                <p className="m-3 justify-self-end">{currencyFormatter.format(cartTotal)}</p>
            </div>
            
            <p className="flex justify-end">
                <Button className="rounded-sm mb-4 p-2 mr-2 hover:bg-stone-200 " onClick = {handleCloseCart}>Close</Button>
                {cartCtx.items.length > 0 && <Button className="bg-amber-500 hover:bg-amber-400 text-center text-neutral-800 rounded-sm mb-4 p-2 mx-2" onClick = {handleCheckoutCart}>Go to Checkout</Button>}
            </p>
        </Modal>
    )
}