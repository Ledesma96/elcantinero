import { useRef, useState } from "react"
import { useEffect } from "react";
import {collection, getFirestore, addDoc, snapshotEqual} from "firebase/firestore"


const Contact = () => {
const form = useRef();
const [name, setName] = useState("");
const [numberTel, setTelephone] = useState()
const [email, setEmail] = useState("")
const [message, setMessage] = useState("")
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
  }, []);

const getFormattedTime = () => {
    const hours = currentDatee.getHours();
    const minutes = currentDatee.getMinutes();
    const seconds = currentDatee.getSeconds();

    // Agrega un cero inicial si los minutos o segundos son menores a 10
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${hours}:${formattedMinutes}:${formattedSeconds}`;
  };




const dataBase = getFirestore()
const handleSubmit = (e) => {
  e.preventDefault();
}


  const sendMessage = () => {
    const mensaje = {
        nombre: name,
        celular: numberTel,
        email: email,
        mensaje: message,
        fecha: `${formattedDay}/${formattedMonth}/${year.toString().slice(-2)}`,
        hora:getFormattedTime(),
        fechaYhora: currentDate
    }
    const messageCollection = collection(dataBase, "messages")

      if (name =="" || numberTel == "" || email == "" || message == ""){
        alert("campos vacios")
      }else{
        addDoc(messageCollection, mensaje).then(({id}) => {
            setMessage(id);
        })
        form.current.reset();
      }
  }


  return (
    <>
      <div className="contact"> 
        <div className="contact__div">
          <img className="contact__div__comillas comilla1" src="/imagenes/icons8-cita-izquierda-50.png" alt="" />
          <h5 className="contact__div__h5">Por favor, no dude en ponerse en contacto con nosotros con respecto a cualquier pregunta y consulta que pueda tener.</h5>
          <img className="contact__div__comillas comilla2" src="./imagenes/icons8-cita-derecha-50.png" alt="" />
        </div>
      </div>
      <div className="contactt">
        <div className="contactt__container">
          <h1 className="tittle" >CONTACTANOS</h1>
          <form ref={form} className="form" onSubmit={handleSubmit} action="">
            <input id="nombre" className="form__data" type="text" onChange={(e) => setName(e.target.value)} placeholder="Nombre"/>
            <input id="celular" className="form__data" type="numer" onChange={(e) => setTelephone(e.target.value)} placeholder="Numero de telefono"/>
            <input id="email" className="form__data" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
            <textarea className="form__message" onChange={(e) => setMessage(e.target.value)} name="" id="message" cols="30" rows="10" placeholder="Dejanos tu mensaje"></textarea>
            <input onClick={sendMessage}  className="form__submmit" type="submit" value="Enviar"/>
          </form>
        </div>
      </div>
      <div className="map">
        <section className="map__section">
          <iframe className="map__mapa"
        title="Google Maps"
        width="500"
        height="350"
        frameBorder="0"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3277.460662202835!2d-58.22556742479005!3d-34.76917666625432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a32f2bca959435%3A0x2d335dddec7c7532!2sEl%20Cantinero%2C%20tienda%20de%20bebidas!5e0!3m2!1ses-419!2sar!4v1684515980977!5m2!1ses-419!2sar"
        allowFullScreen
        >
          </iframe>
        </section>
        <section className="map__info">
          <div className="map__info__div mb">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
            </svg><a className="ml hover" href="https://api.whatsapp.com/send?phone=5491164323570&text=Hola!%20Me%20interesa%20sabrer%20mas%20sobre%20..." target="blank">11-2352-4578</a>
          </div>
          <div className="map__info__div">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"  viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"/>
          </svg><p className="ml direction">Av. 14 3453, B1884 Berazategui, Provincia de Buenos Aires</p>
          </div>
          <div className="map__info__div">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"  viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
            </svg><a className="ml hover" href="mailto:correo@ejemplo.com" target="blank">elcantinero@gmail.com</a>
          </div>
        </section>
      </div>
    </>
  )
}

export default Contact