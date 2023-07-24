import { Link, NavLink } from "react-router-dom"

const Home = () => {
  return (
    <div className='home'>  
        <div className="home__img">
          <p className="elCantinero">EL CANTINERO</p>
          <p className="tiendaDeBebidas">TIENDA DE BEBIDAS</p>
        </div>
        <div className='items'>
           <Link to="/category/cerveza">
            <div className="item1">
                <p>Categoria</p>
                <h3 className="h3 item__tittle">Cervezas</h3>
                <p>Todos los estilos</p>
            </div>
           </Link>
           <Link to="/">
            <div className="item2">
                <p>Categoria</p>
                <h3 className="h3 item__tittle">Whiskys</h3>
                <p>Todos los estilos</p>
            </div>
           </Link>
           <Link to="/category/vino">
            <div className="item3">
                <p>Categoria</p>
                <h3 className="h3 item__tittle">Vinos</h3>
                <p>Todos los estilos</p>
            </div>
           </Link>
        </div>
    </div>
  )
}

export default Home