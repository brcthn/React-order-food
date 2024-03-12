import { useContext } from "react";
import CartContext from "../store/CartContex";
import { currencyFormatter } from "../util/formating";
import Input from "../UI/Input";
import Button from "../UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import Modal from "../UI/Modal";
import {saveMeals} from "../http"
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
    method:"POST",
    headers:{
    'Content-Type':"application/json"
    }  
}
export default function Checkout(){
    const userProgressCtx = useContext( UserProgressContext);
    const cartCtx = useContext(CartContext);

    const cartTotal = cartCtx.items.reduce((totalPrice,item) =>{
    return totalPrice + (item.quantity *item.price)

    },0)

    function handleClose(){
        userProgressCtx.hideCheckout();
    }

    const {data, isLoading, error, sendRequest, clearData} = useHttp("http://localhost:3000/orders", requestConfig);

    function handleSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const costumerData = Object.fromEntries(formData.entries());
        sendRequest(
            JSON.stringify({
                order:{
                    items:cartCtx.items,
                    customer: costumerData
                }
            })
        )
    }
   
    if(data && !error){
        return  (
        <Modal open = {userProgressCtx.progress === "checkout"} onClose={handleClose} className="bg-stone-300">
            <h2>Success</h2>
            <p>Your order was submitted succesfully</p>
            <Button onClick={handleFinish}>Close</Button>
        </Modal>)
    }

    function handleFinish(){
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }
   
    return(
        <Modal className="min-w-128 min-h-56 bg-stone-100" open = {userProgressCtx.progress === "checkout"} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2 className="font-bold m-3">Checkout</h2>
                <p className="m-3">Total Amount: {currencyFormatter.format(cartTotal)}</p>
                <Input type="text" label="Full Name" id="name"/>
                <Input type="email" label="E-mail Address" id="email"/>
                <Input type="text" label="Street" id="street"/>
                <Input type="text" label="Postal Code" id="postal-code"/>
                <Input type="text" label="City" id="city"/>
                {error && <Error title="Failed to submit order" message={error}/>}
                <div className="flex justify-end mb-4 mt-3"> 
                {isLoading ? <span>Sending order data...</span> : 
                (<><Button  className="rounded-sm mb-4 p-2 hover:bg-stone-200" type="button"  onClick={handleClose}>Close</Button>
                <Button className="bg-amber-500 text-center hover:bg-amber-400 text-neutral-800 rounded-sm mb-4 p-2 mx-4">Submit Order</Button></>
                )}
                </div>
            </form>
        </Modal>
    )
}