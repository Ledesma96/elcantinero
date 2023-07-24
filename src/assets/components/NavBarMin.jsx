import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Input
  } from '@chakra-ui/react'
import { HamburgerIcon, SearchIcon} from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import CartWidget from './CartWidget'


const NavbarMin = () => {
  return (
    <>
    <div className='menu'>
        <Menu className="menu__nav">
            <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
                variant='outline'
            />
            <Link to={`/`}>
                <img src="/imagenes/ElCantinero.png" alt="" width={180}/>
                </Link>
            <MenuList>
                <Link to={`/`}>
                    <MenuItem className='menu__category ' color='black'>
                    Inicio
                    </MenuItem>
                </Link>
                <Link to={`/category/${"cerveza"}`}>
                    <MenuItem className='menu__category' color='black'>
                    Cervezas
                    </MenuItem>
                </Link>
                <Link to={`/category/${"vino"}`}>
                    <MenuItem className='menu__category' color='black'>
                    Vinos
                    </MenuItem>
                </Link>
                <Link to={`/category/${"destilados"}`}>
                    <MenuItem className='menu__category' color='black'>
                    destilados
                    </MenuItem>
                </Link>
                <Link to={`/category/${"aperitivos"}`}>
                    <MenuItem className='menu__category' color='black'>
                    Aperitivos
                    </MenuItem>
                </Link>
                <Link to={`/category/${"otras"}`}>
                    <MenuItem className='menu__category' color='black'>
                    Otras
                    </MenuItem>
                </Link>
                <Link to={`/contact`}>
                <MenuItem className='menu__category' color='black'>
                    Contacto
                </MenuItem></Link>
            </MenuList>
            <CartWidget/>
        </Menu>
    </div>
    {/* <div className='search'>
        <Input variant='flushed' />
        <IconButton aria-label='Search database' icon={<SearchIcon />} />
    </div> */}
</>
  )
}

export default NavbarMin