import { createContext, useState,useEffect } from "react";

export const CartContext = createContext(null);

export const ShoppingCartProvider = ({children}) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
      });
    
      // Guardar los datos del carrito en el localStorage cada vez que el carrito cambie
      useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
      }, [cart]);
    

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    );
};
