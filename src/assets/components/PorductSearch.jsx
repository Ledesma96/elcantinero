// import { collection, getDocs, getFirestore } from 'firebase/firestore';
// import React, { useEffect, useState } from 'react';

// const ProductSearch = () => {
//   const [product, setProduct] = useState("")
//   const [searchTerm, setSearchTerm] = useState('');
  
//   useEffect(() => {
//     const dataBase = getFirestore();

//     const items = collection(dataBase, "products")
//     getDocs(items).then((snapshot) => {
//         const documents = snapshot.docs.map((doc) =>{
//             return{
//                 id:doc.id,
//                 ...doc.data()
//             }
//         })
//         setProduct(documents)
//     })
//   } , [])
//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };
  
//   const filteredProducts = product.filter((product) =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
  
//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Buscar producto"
//         value={searchTerm}
//         onChange={handleSearch}
//       />
//       <ul>
//         {searchTerm == "" ?<></> : filteredProducts.map((product) => (
//           <li key={product.id}>
//             <h3>{product.name}</h3>
//             <p>{product.description}</p>
//           </li>))
//         }
//       </ul>
//     </div>
//   );
// };

// export default ProductSearch;
