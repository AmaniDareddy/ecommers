import React, { createContext, useContext, useReducer, useEffect } from "react";
import products from "../data/Products";

const StoreContext = createContext();

const initialState = {
  products: products,
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  wishlist: JSON.parse(localStorage.getItem("wishlist")) || [],
  cart: [],
  orders: [],
  tempOrder: null, // <-- For "Buy Now"
};



function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const itemExists = state.cart.find((i) => i.id === action.payload.id);
      let newCart;
      if (itemExists) {
        newCart = state.cart.map((i) =>
          i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        newCart = [...state.cart, { ...action.payload, qty: 1 }];
      }
      return { ...state, cart: newCart };
    }
    case "REMOVE_FROM_CART": {
  const updatedCart = state.cart.filter((item) => item.name !== action.payload);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  return { ...state, cart: updatedCart };
}
    case "ADD_TO_WISHLIST":
    return {
    ...state,
    wishlist: [...state.wishlist, action.payload],
   };
   case "REMOVE_FROM_WISHLIST":
   return {
    ...state,
    wishlist: state.wishlist.filter((item) => item.id !== action.payload),
   };
   case "SET_TEMP_ORDER":
     return { ...state, tempOrder: action.payload };

  case "PLACE_ORDER":
      return {
        ...state,
        orders: [...state.orders, action.payload],
        tempOrder: null
      };
  case "UPDATE_QTY": {
  const updatedCart = state.cart.map((item) =>
    item.name === action.payload.id ? { ...item, qty: action.payload.qty } : item
  );
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  return { ...state, cart: updatedCart };
}
    case "CLEAR_CART":
      return { ...state, cart: [] };
    default:
      return state;
  }
}
export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  const value = { state, dispatch };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  return useContext(StoreContext);
}
