import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { doc, getDoc, getFirestore} from "firebase/firestore";
import ItemCount from './ItemCount';
import Loading from "./Loading";

const Itemdetail = ({products}) => {
    const {id} = useParams();
    const [spinner, setSpinner] = useState(true)
    const [product, setProduct] = useState([]);


    useEffect(() => {
        const dataBase = getFirestore();
    
        const item = doc(dataBase, "products", `${id}`)
        getDoc(item).then((snapshot)=>{
          if(snapshot.exists()){
            setProduct({
              ...snapshot.data(),
              id:snapshot.id
            })
            setSpinner(false)
          }
        })
      }, [])

      if(spinner){
        return(
          <Loading></Loading>
        )
      }

    const idFilter = products.filter((prod)=> prod.id === id)
  return (
    <>
    {idFilter.map((prod) =>(
        <div className='detail' key={prod.id}>
          <section className='detail__section'>
            <img className='detail__section__img' src={prod.image} alt="" />
          </section>
          <main className='detail__main'>
            <h1 className='h1 detail__main__h1'>{prod.name}</h1>
            <p className='detail__description__text'>{prod.description}</p>
            <h2 className='detail__main__price h2'>${prod.price}</h2>
            <ItemCount  key={prod.id}
                        image={prod.image}
                        stock={prod.stock}
                        price={prod.price}
                        name={prod.name}
                        id={prod.id}/>
            <div className='detail__main__div2'>
              <span className='detail__main__div2__icon'>
                <svg className='svg' xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                    <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z"/>
                </svg>
                <p className='svg__text'>Compra protegida</p>
              </span>
              {prod.stock == 0 ?  <span className='detail__main__div2__icon boorder'>
                <svg className='svg__noStock' color='red' xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                </svg>
                <p className='svg__text__noStock'>Sin Stock disponible: {prod.stock}</p>
              </span> :  <span className='detail__main__div2__icon boorder'>
                <svg className='svg' xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"/>
                    <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"/>
                </svg>
                <p className='svg__text'>Disponible Stock: {prod.stock}</p>
              </span>}           
              <span className='detail__main__div2__icon'>
                <svg className='svg' xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
                </svg>
                <p className='svg__text'>Retiro en el local</p>
              </span>
            </div>
            
          </main>
        </div>
    ))}
    </>
  )
}

export default Itemdetail