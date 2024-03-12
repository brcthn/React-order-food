import Header from "./components/Header";
import Meals from "./components/Meals";
import {CartContextProvider} from "./store/CartContex";
import {UserProgressContextProvider} from "./store/UserProgressContext.jsx";
import Cart from "./components/Cart"
import Checkout from "./components/Checkout";
function App() {


  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header/>
        <div className="grid grid-cols-3 justify-items-center  mx-10">
          <Meals/>
        </div>
        <Cart/>
        <Checkout/>
    </CartContextProvider>
    </UserProgressContextProvider>
    
  );
}

export default App;
