import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, getDocs, getFirestore} from "firebase/firestore";
import ItemList from './ItemList';

export const ItemListContainer2 = () => {
    const {category} = useParams();
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
          })
          setProducts(documents)
        })
        
      }, [])

    const catFilter = products.filter((prod) => prod.category === category)
  return (
    <>
      <ItemList products={catFilter}/>
    </>
  )
}
