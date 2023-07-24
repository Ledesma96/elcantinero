import { Button } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import Swal from "sweetalert2";
import {collection, getFirestore, addDoc,  updateDoc, doc, getDoc} from "firebase/firestore"
import { useContext } from "react";
import { CartContext } from "../../context/ShoppingCartContext";




const Buy = () => {
    const [orederId, setOrderId] = useState("")
    const [cart, setCart] = useContext(CartContext)
    const [name, setName] = useState("")
    const [dni, setDni] = useState(0)
    const [apellido, setApellido] = useState("")
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');


    const [currentDatee, setCurrentDatee] = useState(new Date());

      useEffect(() => {
        const timer = setInterval(() => {
        setCurrentDatee(new Date());
      }, 1000);

      return () => {
        clearInterval(timer);
      };
      },[]);

const getFormattedTime = () => {
    const hours = currentDatee.getHours();
    const minutes = currentDatee.getMinutes();
    const seconds = currentDatee.getSeconds();

    // Agrega un cero inicial si los minutos o segundos son menores a 10
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${hours}:${formattedMinutes}:${formattedSeconds}`;
  };
    const tot = cart.reduce((total, producto) => total + producto.price * producto.cantidad, 0);
 

    const dataBase = getFirestore()
    const handleSubmit = (e) => {
         e.preventDefault();
    }
    const handleConfirm = () => {
        window.location.href = "/";
      };

    const updateStock = async () => {
        const productsCollection = collection(dataBase, 'products');
        await Promise.all(cart.map(async (producto) => {
          const { id, cantidad } = producto;
          const productDoc = doc(productsCollection, id);
          const productSnap = await getDoc(productDoc);
          const currentStock = productSnap.data().stock;
          return updateDoc(productDoc, {
            stock: currentStock - cantidad
          });
        }));
      };


    const putOrder =() => {
    
      
        
        const order = {
            buyer: {
             nombre:name,
             apellido:apellido,
             dni: dni
            },
            items:[],
            fecha: `${formattedDay}/${formattedMonth}/${year.toString().slice(-2)}`,
            hora:getFormattedTime(),
            fechaYhora: currentDate,
            total: tot
        }
            if ( dni == "" || name == "" || apellido == ""){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Parece que algunos campos estan vacios!'
                  })
            } else {
                cart.forEach((producto) => {
                  const { cantidad, price, name } = producto;
                  order.items.push({ cantidad, price, name });
                });

            const ordersCollection = collection(dataBase, 'order');
            addDoc(ordersCollection, order)
              .then(({ id }) => {
                setOrderId(id);
                const pedido = "Tu número de pedido es: " + id;
                setTimeout(() => {
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Compra exitosa',
                    text: pedido,
                    showConfirmButton:true 
                  }).then((result) => {
                    if (result.isConfirmed) {
                        setCart([]);
                        handleConfirm();
                    }
                  });
                }, 2000);
                updateStock();
              })
                .catch((error) =>{
                    console.error('Error al agregar el documento:', error);
                    Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al procesar tu compra. Por favor, inténtalo nuevamente.',
                    });
                })
            }
    }



  return (
    <div className="buy">
        <main className="buy__main">
            <form action="" className="buy__main__form">
                <input onKeyUp={(e) => setName(e.target.value)} className="buy__main__form__input" type="text" placeholder="nombre" required/>
                <input onKeyUp={(e) => setApellido(e.target.value)} className="buy__main__form__input" type="text" placeholder="apellido" required/>
                <input onKeyUp={(e) => setDni(e.target.value)} className="buy__main__form__input" type="text" placeholder="dni" required/>
                
                <Button onClick={putOrder} className="buy__main__comprar" colorScheme='blue' mt="15px" mb="15px">Comprar</Button>
            </form>
            
        </main>
        <div className="buy__div">
            <img src="" alt="" />
            <h3>CBU:</h3>
            <h3>ALIAS:</h3>
        </div>
    </div>
  )
}

export default Buy