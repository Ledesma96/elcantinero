import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../context/ShoppingCartContext";
import Swal from "sweetalert2";

const ItemCount = ({id, stock, name, image, price}) => {
  const [count, SetCount] = useState(1);
  const [cart, setCart] = useContext(CartContext)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const existInCart = (id) => {
    const prev =  cart.find((item) => item.id === id)
    if(!prev) console.log("no existe este producto en el carrito");
    return prev
  }
  const cuantity = existInCart(id).cantidad

  const addCart = () =>{
    setCart ((currItem) => {
      const isItemFound = currItem.find((item) => item.id === id);
      if (isItemFound){
        return currItem.map((item) => {
          if (item.id === id && item.cantidad + count <= item.stock) {
             const Toast = Swal.mixin({
               toast: true,
               position: 'top-end',
               showConfirmButton: false,
               timer: 3000,
               timerProgressBar: true,
               didOpen: (toast) => {
                 toast.addEventListener('mouseenter', Swal.stopTimer)
                 toast.addEventListener('mouseleave', Swal.resumeTimer)
               }
             })        
             Toast.fire({
               icon: 'success',
               title: 'Producto agregado al carrito'
             })
            SetCount(1)
            return { ...item, cantidad: item.cantidad + count };
          } else {
            SetCount(1)
            return item;
          }
        });
      } else {
        SetCount(1)
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })        
        Toast.fire({
          icon: 'success',
          title: 'Producto agregado al carrito'
        })
        return [... currItem, {id, cantidad: count, price, name,stock, image}]
      }
      
    })
  }

  const noStock = () => {
    const existInCart = cart.find((item) => item.id === id)
    const maxCount = existInCart.cantidad + count
    if(maxCount >= stock){
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })        
      Toast.fire({
        icon: 'warning',
        title: 'Stock alcanzado'
      })
    }
  }
    
    const suma = () => {
    
    if (count < stock){
      SetCount(count + 1)
      if(!existInCart(id)){
        console.log("este producto no se encuentra en el carrito");
      } else {
        if((existInCart(id).cantidad + count) >= stock){
          noStock()
          SetCount(stock - existInCart(id).cantidad)
        }
      } 
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'warning',
        title: 'Cantidad maxima alcanzada'
      })
    }
    }

    
    const resta = () =>{
      if (count < 1){
        SetCount (0)
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })        
        Toast.fire({
          icon: 'warning',
          title: 'Cantidad minima alcanzada'
        })
      }
      else{
        SetCount( count - 1)
      }
    }

  return (
    <div className='detail__main__div1'>
      <div className='detail__main__div1__count'>
        <button className='counter' onClick={resta}>-</button>
        <p className='count'>{count}</p>
        <button className='counter' stock onClick={suma}>+</button>
      </div>
      <button disabled={stock === 0 || count === 0} className={` ${stock === 0 || count === 0? 'detail__main__div1__add__Off' : 'detail__main__div1__add'}`} onClick={addCart}>Agregar al carrito</button>
    </div>
  )
}

export default ItemCount