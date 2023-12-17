import { createContext, useContext, useReducer, useEffect, useState } from "react";
import reducer from "../reducer/cartReducer";
import { toast } from "react-toastify";
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
      else {
        dispatch({ type: "UPDATE_CART", payload: newUserData });
        return newUserData;
      }
    } catch (error) {
      console.error("Error parsing local cart data:", error);
      return [];
    }
  };

  const clearLogoutCart = () => {
    dispatch({ type: "CLEAR_CART" });
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

  const initialState = {
    cart: localStorage.getItem("authToken") ? cart : [],
    // cart: localStorage.getItem("authToken") ? getLocalCartData1() : [],
    total_item: "",
    total_price: "",
    shipping_fee: 5000,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = async (_id, color, amount, product, category, company) => {
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
            try {
              const response = await fetch(`${host}/api/carts/updatecart/${_id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  "auth-token": localStorage.getItem("authToken"),
                },
                body: JSON.stringify({ newAmount }),
              });
              const json = await response.json();
              if (response.ok) {
                toast.success("Item updated successfully");
                dispatch({
                  type: "ADD_TO_CART",
                  payload: {
                    _id: (json._pid).replace(color, "").trim(),
                    color,
                    amount,
                    product,
                    category,
                    company,
                    user: json.user,
                    nid: json._id,
                  },
                });
              } else {
                toast.error(`${json.error}`);
                console.error("Failed to update cart data on the server");
              }
            } catch (error) {
              toast.error("Server error");
              console.error("Error updating cart data:", error);
            }
          };
          editCart(curElem.nid, newAmount);
          return {
            ...curElem,
            amount: newAmount,
          };
        } else {
          return curElem;
        }
      });
      setCart(updatedProduct);
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
          const responseData = await response.json();
          if (response.ok) {
            const newUserData = {
              amount: responseData.amount,
              color: responseData.color,
              price: responseData.price,
              image: responseData.image,
              max: responseData.max,
              name: responseData.name,
              _id: responseData._pid,
              nid: responseData._id,
              user: responseData.user,
              category: responseData.category,
              company: responseData.company,
            }
            const updatedCart = cart.concat(newUserData);
            setCart(updatedCart);
            const user = responseData.user;
            const _proid = responseData._id;
            toast.success("Item successfully added in the cart");
            dispatch({ type: "ADD_TO_CART", payload: { _id, color, amount, product, category, company, user, nid: _proid } });
          } else {
            toast.error(`${responseData.error}`);
            console.error("Failed to add cart data to the server");
          }
        } catch (error) {
          toast.error("Server error");
          console.error("Error adding cart data:", error);
        }
      };
      if (localStorage.getItem("authToken")) {
        addCart(cartProduct.amount, cartProduct.color, cartProduct.price, cartProduct.image, cartProduct.max, cartProduct.name, cartProduct._id, cartProduct.category, cartProduct.company);
      }
    }
  };

  // increment and decrement the product
  const setDecrease = (_id) => {
    dispatch({ type: "SET_DECREMENT", payload: _id, });
    let updatedProduct = cart.map((curElem) => {
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
          if (response.ok) {
            toast.success("Cart amount updated successfully");
          } else {
            toast.error(`${json.error}`);
          }
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
          if (response.ok) {
            toast.success("Cart amount updated successfully");
          } else {
            toast.error(`${json.error}`);
          }
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
        if (response.ok) {
          toast.success("Item removed successfully");
        } else {
          toast.error(`${json.error}`);
        }
      } catch (error) {
        toast.error("Server error");
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
        const response = await fetch(`${host}/api/carts/deleteallcarts`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("authToken"),
          },
        });
        const json = await response.json();
        if (response.ok) {
          toast.success("All item removed successfully");
        } else {
          toast.error(`${json.error}`);
        }
      } catch (error) {
        toast.error("Server error");
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
        getData,
        clearLogoutCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };