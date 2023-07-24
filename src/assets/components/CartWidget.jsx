import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/ShoppingCartContext';


const CartWidget = () => {
const [cart , setCart] = useContext(CartContext);

  return (
    <div className='icon'>
      <Link to={`/cart/`}>
       <span className="material-symbols-outlined span">
            shopping_cart
        </span>
      </Link>
      <span className='numberCart'>{cart.length}</span>
    </div>
  )
}

export default CartWidget