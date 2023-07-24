import { useState, useEffect } from 'react'
import NavbarMin from './NavBarMin'
import NavBarMax from './NavBarMax'


const Navbar = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      // Limpia el evento del listener al desmontar el componente
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  return (
    <>
    {windowWidth <= 1024 ? <NavbarMin></NavbarMin> : <NavBarMax></NavBarMax>}
</>
  )
}

export default Navbar