import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    console.log("Producto recibido:", product);
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      console.log("El producto ya está en el carrito, actualizando cantidad...");
      const updatedCart = [...cart];
      updatedCart[existingProductIndex] = {
        ...updatedCart[existingProductIndex],
        quantity: updatedCart[existingProductIndex].quantity + quantity,
      };
      console.log("Carrito actualizado:", updatedCart);
      setCart(updatedCart);
    } else {
      console.log("El producto no está en el carrito, agregándolo...");
      const newCart = [...cart, { ...product, quantity }];
      console.log("Carrito actualizado:", newCart);
      setCart(newCart);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};
