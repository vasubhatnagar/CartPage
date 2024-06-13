import { useDispatch, useSelector } from "react-redux";
import "./cart.css";
import { addToCart, removeItemFromCart } from "./cartActions";
import { useEffect, useState } from "react";
const CartCard = ({ product }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [productQty, setProductQty] = useState(0);
  const [enableSave, setEnableSave] = useState(false);
  const qtyDecreaseHandler = () => {
    if (productQty > 1) {
      const qty = productQty - 1;
      setProductQty(qty);
    }
  };
  const removeItemHandler = () => {
    dispatch(removeItemFromCart(product.product));
  };
  const saveData = () => {
    const obj = {
      id: product.product,
      title: product.name,
      price: product.price,
      quantity: product.quantity,
    };
    dispatch(addToCart(obj, productQty));
  };
  const qtyIncreaseHandler = () => {
    if (productQty < 10) {
      const qty = productQty + 1;
      setProductQty(qty);
    }
  };
  useEffect(() => {
    if (cartItems) {
      const item = cartItems.find((i) => i.product == product.product);
      setProductQty(item.quantity);
    }
  }, []);

  useEffect(() => {
    if (productQty != product.quantity) {
      saveData();
      setEnableSave(true);
    } else {
      setEnableSave(false);
    }
  }, [productQty, cartItems]);
  return (
    <div className="cartCard">
      <h5>NAME: {product.name}</h5>
      <h5>PRICE: {product.price}</h5>

      <div className="qtyContainer">
        <button onClick={qtyDecreaseHandler}>-</button>
        <h5>{productQty}</h5>
        <button onClick={qtyIncreaseHandler}>+</button>
      </div>

      <button onClick={removeItemHandler}>Remove Product</button>
    </div>
  );
};

export default CartCard;
