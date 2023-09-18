import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../reducer/cartReducer";

const CartContext = createContext();


// const getLocalCartData = async () => {
//   // API Call
//   const response = await fetch(`${host}/api/carts/fetchallcarts`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "auth-token": localStorage.getItem("authToken"),
//     },
//   });
//   const userCart = await response.json();
//   console.log("data from api", userCart, "length", userCart.length);
//   if (userCart.length > 0) {
//     console.log("parse data", JSON.parse(userCart));
//     return (userCart);
//   } else { return []; }
//   // const parseData = JSON.parse(userCart);
//   // localStorage.setItem("cartdata", JSON.stringify(userCart));
//   // if (!Array.isArray(userCart))
//   //   return [];
//   // return (userCart);
// };

// const getLocalCartData = () => {
//   const localCartData = localStorage.getItem("userCartData");
//   const parsedData = JSON.parse(localCartData);
//   if (!Array.isArray(parsedData))
//     return [];
//   return parsedData;
// };

// let getLocalCartData = JSON.parse(localStorage.getItem('userCartData')) ? JSON.parse(localStorage.getItem('userCartData')) : [];



const CartProvider = ({ children }) => {
  // const host = "http://localhost:3001";
  const host = "http://134.122.17.33:5000";

  const getLocalCartData = () => {
    const localCartData = localStorage.getItem("userCartData");
    if (!localCartData) return [];
    try {
      const parsedData = JSON.parse(localCartData);
      if (!Array.isArray(parsedData)) return [];
      return parsedData;
    } catch (error) {
      console.error("Error parsing local cart data:", error);
      return [];
    }
  };

  // const getLocalCartData = async () => {
  //   // API Call
  //   const response = await fetch(`${host}/api/carts/fetchallcarts`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "auth-token": localStorage.getItem("authToken"),
  //     },
  //   });
  //   const userCart = await response.json();
  //   console.log("data from api", userCart, "length", userCart.length);
  //   if (userCart.length > 0) {
  //     console.log("parse data", JSON.parse(userCart));
  //     return (userCart);
  //   } else { return []; }
  //   // const parseData = JSON.parse(userCart);
  //   // localStorage.setItem("cartdata", JSON.stringify(userCart));
  //   // if (!Array.isArray(userCart))
  //   //   return [];
  //   // return (userCart);
  // };

  const initialState = {
    // cart: [],
    // cart: getLocalCartData,
    cart: localStorage.getItem("authToken") ? getLocalCartData() : [],
    total_item: "",
    total_price: "",
    shipping_fee: 5000,
  };

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


  // get vs set
  useEffect(() => {
    // dispatch({ type: "CART_TOTAL_ITEM" });
    // dispatch({ type: "CART_TOTAL_PRICE" });
    dispatch({ type: "CART_ITEM_PRICE_TOTAL" });

    const deleteall = async () => {
      try {
        await fetch(`${host}/api/carts/deleteallcarts`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("authToken"),
          },
        });
      } catch (error) {
        console.error("Error deleteing cart data:", error);
      }
    };
    if (localStorage.getItem("authToken")) {
      deleteall();
    }

    // {if(localStorage.getItem("authToken")){
    // }else{
    // }}
    localStorage.setItem("userCartData", (JSON.stringify(state.cart)));

    const addCart = async (amount, color, price, image, max, name, _pid) => {
      try {
        const response = await fetch(`${host}/api/carts/addcarts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("authToken"),
          },
          body: JSON.stringify({ amount, color, price, image, max, name, _pid }),
        });
        if (response.ok) {
          console.log("send response", await response.json());
        } else {
          console.error("Failed to add cart data to the server");
        }
      } catch (error) {
        console.error("Error adding cart data:", error);
      }
    };

    const cartdata = JSON.stringify((state.cart))
    if (localStorage.getItem("authToken")) {
      JSON.parse(cartdata).forEach(({ amount, color, price, image, max, name, _id }) => {
        addCart(amount, color, price, image, max, name, _id);
      });
    }

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