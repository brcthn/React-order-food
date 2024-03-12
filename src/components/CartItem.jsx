import { useContext } from "react";
import CartContext from "../store/CartContex";
import { currencyFormatter } from "../util/formating";
import Button from "../UI/Button";
export default function CartItem({item}){
    const cartCtx = useContext(CartContext);

    function increaseItemQuantity(item){
        cartCtx.addItem(item);
    }
    function decreaseItemQuantity(item){
        cartCtx.removeItem(item.id);
    }
    return(
        <div className="flex justify-between">
            <li  key={item.id}>{item.name} - {item.quantity}  x  {currencyFormatter.format(item.price)}</li>
            <p>
                <Button className="bg-black rounded-full text-center text-white px-2 mt-1" onClick = {() =>decreaseItemQuantity(item)}>-</Button>
                <span className="mx-2 text-center text-justify mt-1">{item.quantity}</span>
                <Button  className="bg-black rounded-full text-center text-white px-2 mt-1" onClick = {() =>increaseItemQuantity(item)}>+</Button>
        </p>
       </div>
    )
}