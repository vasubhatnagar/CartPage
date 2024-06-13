import { ADD_TO_CART, GET_CART_TOTAL, REMOVE_FROM_CART } from "./constants";

export const addToCart =
  (data, quantity) => async (dispatch, getState) => {
    console.log(data)
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.id,
        name: data.title,
        price: data.price,
        quantity,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
    dispatch({ type: GET_CART_TOTAL });
  };

export const removeItemFromCart = (productId) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: {
      product: productId,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  dispatch({ type: GET_CART_TOTAL });
};