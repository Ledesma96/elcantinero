import './App.css'
import Banner from './assets/components/Banner'
import Navbar from './assets/components/Navbar'
import Footer from './assets/components/Footer'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Contact from './assets/components/Contact'
import ItemListContainer from './assets/components/ItemListContainer'
import ItemDetailContainer from "./assets/components/ItemDetailCointainer"
import { ItemListContainer2 } from './assets/components/ItemListContainer2'
import {ShoppingCartProvider} from "./context/ShoppingCartContext"
import Cart from './assets/components/Cart'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <ShoppingCartProvider>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<ItemListContainer/>}/>
        <Route exact path='/category/:category' element={<ItemListContainer2/>}/>
        <Route exact path='/contact' element={<Contact/>}/>
        <Route exact path='/item/:id'  element={<ItemDetailContainer/>}/>
        <Route exact path='/cart' element={<Cart/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
    </ShoppingCartProvider>
    
  )
}

export default App
