import {
    Center,
    Heading,
    Alert,
    AlertDescription,
    AlertIcon,
    Button
  } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/ShoppingCartContext";
import Buy from "./Buy";
  
  const Cart = () => {
    const [buy, setBuy] = useState(false)
    const [cart, setCart] = useContext(CartContext);
    const [total, setTotal] = useState([])
    const tot = cart.map((productos)=>productos.price*productos.cantidad)
    setTotal[tot]
    const totalCarrito = tot.reduce((total, item)=>total + item, 0);

    const finalizar = () =>{
      setBuy(!buy)
    }

    const incrementQuantity = (id) => {
      const updatedCart = cart.map((item) => {
        if (item.id === id && item.cantidad < item.stock) {
          return {
            ...item,
            cantidad: item.cantidad + 1
          };
        }
        return item;
      });
      setCart(updatedCart);
    };
  
    const decrementQuantity = (id) => {
      const updatedCart = cart.map((item) => {
        if (item.id === id && item.cantidad > 1) {
          return {
            ...item,
            cantidad: item.cantidad - 1
          };
        }
        return item;
      });
      setCart(updatedCart);
    };
  
    const removeItem = (id) =>{
      setCart(cart.filter((item) => item.id !== id)) 
    }
      
    return (
      <>
        <Center bg="#D6EAF8" h="100px" color="black">
          <Heading  as="h3" size="2xl">
            <p className="cart__tittle">CARRITO DE COMPRAS</p>
          </Heading>
        </Center>
        {cart.map((item) => {
          return (
              <div className="product" key={item.id}>
               <div className="cart">
                 <img className="cart__img" src={item.image}  alt={item.name}/>
                 <div className="cart__info">
                     <h6 className="h6 cart__info__name">{item.name}</h6>
                     <div className="cart__info__cantidad">
                        <button className="cart__info__cantidad__button" onClick={() => decrementQuantity(item.id)}>-</button>
                        <p><b>{item.cantidad}</b></p>
                        <button className="cart__info__cantidad__button" onClick={() => incrementQuantity(item.id)}>+</button>
                     </div>
                     <p className="price">${item.price * item.cantidad}</p>
                 </div>
                 <Link to={`/cart`}>
                  <img src="../imagenes/trash.svg" onClick={()=> removeItem(item.id)} alt="papelera"/>
                 </Link>
                </div>
              </div>
          );
        })}
        {totalCarrito > 0 ? <div className="total"><div className="cart"><h2 className="h2">Total</h2><h2 className="h2">${totalCarrito}</h2></div><div className="checkout"><Button mt="15px" mb="15px" onClick={finalizar} colorScheme='blue'>Finalizar compra</Button></div></div>: 
        <><Alert status='warning'>
        <AlertIcon />
        Su carrito se encuentra vacio!
      </Alert><Link to={`/`}><Button>Volver a la tienda</Button></Link></>}
      {buy ? <Buy ></Buy> : <div></div>}
        
      </>
    );
  };
  
  export default Cart;