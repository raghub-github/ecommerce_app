import { createContext, useContext, useReducer, useEffect, useState } from "react";
import reducer from "../reducer/cartReducer";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const host = process.env.REACT_APP_HOSTNAME;
  const [cart, setCart] = useState([]);

  const getLocalCartData = async () => {
    // API Call
    const response = await fetch(`${host}/api/carts/fetchallcarts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    });
    const userCart = await response.json();
    if (!userCart || !Array.isArray(userCart)) {
      return [];
    }
    try {
      const newUserData = userCart.map(({ amount, color, price, image, max, name, _pid, _id, user, category, company }) => ({
        amount,
        color,
        price,
        image,
        max,
        name,
        _id: _pid,
        nid: _id,
        user,
        category,
        company,
      }));
      if (!Array.isArray(newUserData)) return [];
      else return newUserData;
    } catch (error) {
      console.error("Error parsing local cart data:", error);
      return [];
    }
  };

  const getData = async () => {
    try {
      const cartData = await getLocalCartData();
      setCart(cartData);
      localStorage.setItem("userCartData", (JSON.stringify(cartData)));
    } catch (error) {
      console.error("Error getting cart data:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await getData();
    }
    fetchData();
    //eslint-disable-next-line
  }, []); // Run once on component mount

  const getLocalCartData1 = () => {
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

  const initialState = {
    // cart: localStorage.getItem("authToken") ? cart : [],
    cart: localStorage.getItem("authToken") ? getLocalCartData1() : [],
    total_item: "",
    total_price: "",
    shipping_fee: 5000,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (_id, color, amount, product, category, company) => {
    let existingProduct = cart.find((curItem) => curItem._id === _id + color);
    if (existingProduct) {
      let updatedProduct = cart.map((curElem) => {
        if (curElem._id === _id + color) {
          let newAmount = curElem.amount + amount;
          if (newAmount >= curElem.max) {
            newAmount = curElem.max;
          }
          const editCart = async (_id, newAmount) => {
            // API Call
            const response = await fetch(`${host}/api/carts/updatecart/${_id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("authToken"),
              },
              body: JSON.stringify({ newAmount }),
            });
            const json = await response.json();
            // console.log("edited item", json);
            dispatch({ type: "ADD_TO_CART", payload: { _id, color, amount, product, category, company, user: json.user, nid: json.nid } });
          };
          editCart(curElem.nid, newAmount);
          // setCart(...cart, { ...curElem, amount: newAmount });
          return {
            ...curElem,
            amount: newAmount,
          };
        } else {
          return curElem;
        }
      });
      // const updatedCart = [...cart, updatedProduct]; // Add the new item to the cart
      setCart(...updatedProduct);
      // return {
      //   ...initialState,
      //   cart: updatedProduct,
      // };
    } else {
      let cartProduct = {
        _id: _id + color,
        name: product.name,
        color,
        amount,
        category,
        company,
        image: product.image[0],
        price: product.price,
        max: product.stock,
      };
      const addCart = async (amount, color, price, image, max, name, _pid, category, company) => {
        try {
          const response = await fetch(`${host}/api/carts/addcarts`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("authToken"),
            },
            body: JSON.stringify({ amount, color, price, image, max, name, _pid, category, company }),
          });
          if (response.ok) {
            const responseData = await response.json();
            const updatedCart = cart.concat(responseData);
            setCart(updatedCart);
            // console.log("Add to cart done", updatedCart);
            const user = responseData.user;
            const _proid = responseData._id;
            dispatch({ type: "ADD_TO_CART", payload: { _id, color, amount, product, category, company, user, nid: _proid } });
          } else {
            console.error("Failed to add cart data to the server");
          }
        } catch (error) {
          console.error("Error adding cart data:", error);
        }
      };

      // const cartdata = JSON.stringify((cartProduct))
      if (localStorage.getItem("authToken")) {
        addCart(cartProduct.amount, cartProduct.color, cartProduct.price, cartProduct.image, cartProduct.max, cartProduct.name, cartProduct._id, cartProduct.category, cartProduct.company);
        // cartProduct.forEach(({ amount, color, price, image, max, name, _id }) => {
        // });
      }
      // return {
      //   ...initialState,
      //   cart: [...initialState.cart, cartProduct],
      // };
    }
    // dispatch({ type: "ADD_TO_CART", payload: { _id, color, amount, product, category, company } });
  };

  // increment and decrement the product
  const setDecrease = (_id) => {
    dispatch({ type: "SET_DECREMENT", payload: _id, });
    // console.log("_id: ", _id);
    let updatedProduct = cart.map((curElem) => {
      // console.log("cur: ", curElem._id, _id);
      // console.log("nid", curElem.nid);
      if (curElem._id === _id) {
        let decAmount = curElem.amount - 1;
        if (decAmount <= 1) {
          decAmount = 1;
        }
        const editCart = async (_id, newAmount) => {
          // API Call
          const response = await fetch(`${host}/api/carts/updatecart/${_id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("authToken"),
            },
            body: JSON.stringify({ newAmount }),
          });
          const json = await response.json();
        };
        editCart(curElem.nid, decAmount);
        return {
          ...curElem,
          amount: decAmount,
        };
      } else {
        return curElem;
      }
    });
    setCart(updatedProduct);
    return updatedProduct;
  };

  const setIncrement = (_id) => {
    dispatch({ type: "SET_INCREMENT", payload: _id, });
    let updatedProduct = cart.map((curElem) => {
      if (curElem._id === _id) {
        let incAmount = curElem.amount + 1;
        if (incAmount >= curElem.max) {
          incAmount = curElem.max;
        }
        const editCart = async (_id, newAmount) => {
          // API Call
          const response = await fetch(`${host}/api/carts/updatecart/${_id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("authToken"),
            },
            body: JSON.stringify({ newAmount }),
          });
          const json = await response.json();
        };
        editCart(curElem.nid, incAmount);
        return {
          ...curElem,
          amount: incAmount,
        };
      } else {
        return curElem;
      }
    });
    setCart(updatedProduct);
    return updatedProduct;
  };

  // to remove the individual item from cart
  const removeItem = (_id) => {
    dispatch({ type: "REMOVE_ITEM", payload: _id });
    let updatedProduct = cart.filter((curElem) => curElem._id !== _id);

    setCart(updatedProduct);

    // If you need to delete the item from the server as well, you can call the API here
    const deleteCart = async (id) => {
      try {
        const response = await fetch(`${host}/api/carts/deletecart/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("authToken"),
          },
        });
        const json = await response.json();
        // console.log(json);
        if (response.ok) {
        } else {
          console.error("Failed to delete cart data from the server");
        }
      } catch (error) {
        console.error("Error deleting cart data:", error);
      }
    };
    // Call deleteCart for the specific item
    const itemToDelete = cart.find((curElem) => curElem._id === _id);
    if (itemToDelete) {
      deleteCart(itemToDelete.nid);
    }
  };

  // to clear the cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
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
    if (localStorage.getItem("authToken") && cart.length > 0) {
      deleteall();
    }
    localStorage.setItem("userCartData", (JSON.stringify(state.cart)));
  };

  // get vs set
  useEffect(() => {
    dispatch({ type: "CART_ITEM_PRICE_TOTAL" });
    localStorage.setItem("userCartData", (JSON.stringify(state.cart)));
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