import { useDispatch, useSelector } from "react-redux";
import "./cart.css";
import CartCard from "./CartCard";
import { Link } from "react-router-dom";
import { removeItemFromCart } from "./cartActions";
const Cart = () => {
  const { cartItems, GrandTotal } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const ClearCart = ()=>{
    for(let i=0; i<cartItems.length; i++){
      dispatch(removeItemFromCart(cartItems[i].product));
    }
  }
  return (
    <div>
      <div className="cartHeader">
        <h2>Cart Items ({cartItems.length})</h2>
        <button onClick={ClearCart}> Clear Cart</button>
        <h2>Grand Total : {GrandTotal}</h2>
        <Link to={`/`}><h2>Go To Home</h2></Link>
        
      </div>
      <div>
        {cartItems &&
          cartItems.map((product) => <CartCard product={product} />)}
      </div>
    </div>
  );
};

export default Cart;
