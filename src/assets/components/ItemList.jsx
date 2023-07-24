import { Item } from "./Item"


const ItemList = ({products}) => {
  return (
    <div className='cardHolder'>
        {products?.map((products)=>{
            return(
                <Item 
                    key={products.id}
                    id={products.id}
                    name={products.name}
                    price={products.price}
                    image={products.image}
                    stock={products.stock}
                    category={products.category}
                    description={products.description}/>
            )
        })}
    </div>
  )
}

export default ItemList