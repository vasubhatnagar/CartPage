import React, { useState, useEffect } from "react";
import "./productCard.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeItemFromCart } from "./cartActions";
const ProductCard = ({ product }) => {
  const [productQty, setProductQty] = useState(0);

  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const qtyDecreaseHandler = () => {
    if (productQty >= 1) {
      const qty = productQty - 1;
      setProductQty(qty);
    }
  };
  const removeItemHandler = () => {
    dispatch(removeItemFromCart(product.id));
  };
  const qtyIncreaseHandler = () => {
    if (productQty < 10) {
      const qty = productQty + 1;
      setProductQty(qty);
    }
  };
  useEffect(()=>{
    const cartItemlocal = cartItems.find((i) => i.product == product.id);
    if(cartItemlocal){
        setProductQty(cartItemlocal.quantity);
    }else{
        setProductQty(0);
    }
  },[cartItems]);

  const addProductToCart = () => {
    dispatch(addToCart(product, productQty));

    const cartQuantity = cartItems.filter((i) => i.product == product.id);
    console.log("ajfdlnajokjdf" + cartQuantity);
  };
  return (
    <div className="productCard">
      <h5>Name : {product.title}</h5>
      <h5>Price : {product.price}</h5>
      <h5>Category : {product.category}</h5>
      <div className="qtyContainer">
        <button onClick={qtyDecreaseHandler}>-</button>
        <h5>{productQty} </h5>
        <button onClick={qtyIncreaseHandler}>+</button>
      </div>
      <button onClick={addProductToCart} disabled={productQty == 0}>
        Add To Cart
      </button>
      <button onClick={removeItemHandler} disabled={productQty == 0}>
        Remove Item
      </button>
    </div>
  );
};

export default ProductCard;
