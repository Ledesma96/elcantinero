import {initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { Button } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import Swal from "sweetalert2";
import {collection, getFirestore, addDoc,  updateDoc, doc, getDoc} from "firebase/firestore"
import { useContext } from "react";
import { CartContext } from "../../context/ShoppingCartContext";





const Buy = ({total}) => {
    const [preferenceID, setPreferenceID] = useState(null);
    const [isWalletVisible, setIsWalletVisible] = useState(false);
    const [orederId, setOrderId] = useState("")
    const [cart, setCart] = useContext(CartContext)
    const [name, setName] = useState("")
    const [dni, setDni] = useState("")
    const [apellido, setApellido] = useState("")
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');
    const [currentDatee, setCurrentDatee] = useState(new Date());

    //firebase

    const dataBase = getFirestore()
     const handleSubmit = (e) => {
          e.preventDefault();
     }
    //  const handleConfirm = () => {
    //       window.location.href = "/";
    //     };

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

      //   useEffect(() => {
      //    const timer = setInterval(() => {
      //    setCurrentDatee(new Date());
      //  }, 1000);

      //  return () => {
      //    clearInterval(timer);
      //  };
      //  },[]);

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
          //  setTimeout(() => {
          //    Swal.fire({
          //      position: 'center',
          //      icon: 'success',
          //      title: 'Compra exitosa',
          //      text: pedido,
          //      showConfirmButton:true 
          //     })
          //    .then((result) => {
          //          if (result.isConfirmed) {
          //             setCart([]);
          //             handleConfirm();
          //          }
          //       });
          //  }, 2000);
          // updateStock();
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





    //mercado pago
    const quantity = cart.reduce((acumulador, producto) => {
      return acumulador + producto.cantidad;
    }, 0);

    initMercadoPago('TEST-dcccdd99-b2e7-47ca-aef5-495a72fcf51a');

    
    const createPreference = async () => {
      try {
        const response = await fetch("https://backend-cantinero.vercel.app/create_preference", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            products: cart,
            price: total,
            quantity: quantity
          }),
        });
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const data = await response.json();
        const { id } = data;
        return id;
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const handleBuy = async () => {
      if ( dni == "" || name == "" || apellido == ""){
        console.log("campos vacios");
      } else {
          const id = await createPreference();
          console.log("este es el id", id);
          if (id) {
          setPreferenceID(id);
          setTimeout(() => {
            setIsWalletVisible(true);
          }, 1000)
          
        }
      }
    }

  return (
    <div className="buy">
        <main className="buy__main">
          <form action="" className="buy__main__form">
            <input onKeyUp={(e) => setName(e.target.value)} className="buy__main__form__input" type="text" placeholder="nombre" required/>
            <input onKeyUp={(e) => setApellido(e.target.value)} className="buy__main__form__input" type="text" placeholder="apellido" required/>
            <input onKeyUp={(e) => setDni(e.target.value)} className="buy__main__form__input" type="number" placeholder="dni" required/>
            <Button onClick={handleBuy} className="buy__main__comprar" colorScheme='blue' mt="15px" mb="15px">Comprar</Button>
          </form>
          {isWalletVisible && <Wallet className="MC" initialization={{ preferenceId: preferenceID, redirectMode: 'modal'}} />}
        </main>
    </div>
  )
}

export default Buy