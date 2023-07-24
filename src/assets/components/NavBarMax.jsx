import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Text } from '@chakra-ui/react'
import CartWidget from './CartWidget'
const NavBarMax = () => {
  return (
    <div className='navbarMax'>
      <main className='navbarMax__main'>
        <div className='div'>
        <Link className='navbarMax__logo' to={`/`}>
            <img className='navbarMax__logo__img' src="/imagenes/elcantinero2.png"  alt="" />
        </Link>
        <div>
          <Text className='navbarMax__logo__text' color='white'>EL CANTINERO</Text>
          <p className='navbarMax__logo__p'>TIENDA DE BEBIDAS</p>
        </div>
        </div>
        <div className='navbarMax__links'>
            <Link className='navbarMax__links__link' to={`/`} >INICIO</Link>
            <Link className='navbarMax__links__link' to={`/category/${"cerveza"}`}>CERVEZAS</Link>
            <Link className='navbarMax__links__link' to={`/category/${"vino"}`}>VINOS</Link>
            <Link className='navbarMax__links__link' to={`/category/${"destilados"}`}>DESTILADOS</Link>
            <Link className='navbarMax__links__link' to={`/category/${"aperitivos"}`} >APERITIVOS</Link>
            <Link className='navbarMax__links__link' to={`/category/${"otras"}`} >OTROS</Link>
            <Link className='navbarMax__links__link' to={`/contact`}>CONTACTO</Link>
            <CartWidget></CartWidget>
        </div>
      </main>
    </div>
  )
}

export default NavBarMax