import { createContext, useContext, useReducer, useEffect, useState } from "react";
import reducer from "../reducer/cartReducer";

const CartContext = createContext();

const getLocalCartData = () => {
  const localCartData = localStorage.getItem("userCartData");
  const parsedData = JSON.parse(localCartData);
  if (!Array.isArray(parsedData))
    return [];
  return parsedData;
};

// let getLocalCartData1 = JSON.parse(localStorage.getItem('userCartData')) ? JSON.parse(localStorage.getItem('userCartData')) : [];

const initialState = {
  // cart: [],
  // cart: getLocalCartData,
  cart: getLocalCartData(),
  total_item: "",
  total_price: "",
  shipping_fee: 5000,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (_id, color, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { _id, color, amount, product } });
  };

  // increment and decrement the product

  const setDecrease = (_id) => {
    dispatch({ type: "SET_DECREMENT", payload: _id });
  };

  const setIncrement = (_id) => {
    dispatch({ type: "SET_INCREMENT", payload: _id });
  };

  // to remove the individual item from cart
  const removeItem = (_id) => {
    dispatch({ type: "REMOVE_ITEM", payload: _id });
  };

  // to clear the cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // to add the data in localStorage
  // get vs set

  useEffect(() => {
    // dispatch({ type: "CART_TOTAL_ITEM" });
    // dispatch({ type: "CART_TOTAL_PRICE" });
    dispatch({ type: "CART_ITEM_PRICE_TOTAL" });

    localStorage.setItem("userCartData", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        clearCart,
        setDecrease,
        setIncrement,
      }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };