import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../context/ShoppingCartContext";
import Swal from "sweetalert2";

const ItemCount = ({id, stock, name, image, price}) => {
    const [count, SetCount] = useState(1);
    const [cart, setCart] = useContext(CartContext)
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const addCart = () =>{
        setCart ((currItem) => {
          const isItemFound = currItem.find((item) => item.id === id);
          if (isItemFound){
            return currItem.map((item)=>{
              if (item.id === id && item.cantidad < stock){
                return {...item , cantidad: item.cantidad + count}
              } else {
                return item
              }
            })
          } else {
            return [... currItem, {id, cantidad: count, price, name,stock, image}]
          }
        })
      }
    
    const suma = () => {
    if (count < stock){
      SetCount( count + 1)
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
                <button className='counter' onClick={suma}>+</button>
                </div>
                <button className='detail__main__div1__add' disabled={stock === 0 || count === 0} onClick={addCart}>Agregar al carrito</button>
    </div>
  )
}

export default ItemCount