import { useState, useEffect } from 'react'
import React from 'react'
import Itemdetail from './Itemdetail';
import { collection, getDocs, getFirestore} from "firebase/firestore";


const ItemDetailContainer = () =>{
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const dataBase = getFirestore();
   
    const items = collection(dataBase, "products");
    getDocs(items).then((snapshot) => {
      const documents = snapshot.docs.map((doc) =>{
        return{
          id:doc.id,
          ...doc.data()
        }
      } )
      setProducts(documents)
    })
    
  }, [])
  
  return (
    <div>
        <Itemdetail products={products}
                    key={products.id}/>
    </div>
  )
}

export default ItemDetailContainer