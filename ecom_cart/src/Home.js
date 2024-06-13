import "./App.css";
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const [ProductList, setProductList] = useState([]);
  const { cartItems } = useSelector((state) => state.cart);
  const [Full_List, setFull_List] = useState([]);
  const [plist, setPlist] = useState([]);
  const setPList = (val) => {
    if (val == "All Categories") {
      setProductList(Full_List);
    } else {
      const tempList = Full_List.filter((i) => i.category == val);
      setProductList(tempList);
    }
  };
  const getData = async () => {
    var data = await fetch("https://fakestoreapi.com/products");
    var dataJson = await data.json();
    setProductList(dataJson);
    setFull_List(dataJson);
    for (let i = 0; i < dataJson.length; i++) {
      if (!set.includes(dataJson[i].category)) set.push(dataJson[i].category);
    }
    set.unshift("All Categories");
    setPlist(set);
  };
  const set = [];
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="App">
      <div className="Header">
      <h3>Total Items : {ProductList.length}</h3>
      <div >
        {plist && (
          <select
            onChange={(e) => {
              setPList(e.target.value);
            }}
          >
            {plist.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        )}
      </div>
      <div>
        <Link className="" to={`/cart`}>
          Go To Cart ({cartItems.length})
        </Link>
      </div>
      </div>
      <div className="container">
        {ProductList && ProductList.length > 0
          ? ProductList.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))
          : cartItems && <h1>LOADING...</h1>}
      </div>
    </div>
  );
};
export default Home;
