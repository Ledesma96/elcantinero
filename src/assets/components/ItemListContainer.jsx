import { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore,  limit,  query} from "firebase/firestore";
import ItemList from './ItemList';
import Banner from './Banner';
import Loading from "./Loading"

const ItemListContainer = () => {
    const [spinner, setSpinner] = useState(true)
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const dataBase = getFirestore();
       
        const items = query( collection(dataBase, "products"), limit(20));
        getDocs(items).then((snapshot) => {
          const documents = snapshot.docs.map((doc) =>{
            return{
              id:doc.id,
              ...doc.data()
            }
          })
          setProducts(documents)
        })
        setSpinner(false)
      }, [])

      if (spinner){
        return(
          <Loading/>
        )
      }
      console.log(products)


  return (
    <>
      <Banner/>
      <h4 className='h4 algunosProductos'>ALGUNOS PRODUCTOS</h4>
      <ItemList products={products}/>
    </>
  )
}

export default ItemListContainer