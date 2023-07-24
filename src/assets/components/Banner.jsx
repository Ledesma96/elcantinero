import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import Marcas from "./Marcas"


const Banner = () => {
  return (
    <>
    <Carousel>
    <Carousel.Item>
        <img
          className="d-block w-100 carrouselImage"
          src="/imagenes/banner-bombay-sunset.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3></h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
    <Carousel.Item>
        <img
          className="d-block w-100 carrouselImage"
          src="/imagenes/banner2.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3></h3>
          <p>
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='carrouselItem'>
        <img
          className="d-block w-100 carrouselImage"
          src="/imagenes/absolut-vodka-750ml.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3></h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <Home></Home>
    <Marcas></Marcas>
    </>
  );
}

// const Banner = () => {
//   return (
//   <div className="background">
//     <div>
//       <img className="banner" src="https://www.jcsocialmedia.com/wp-content/uploads/heineken-banner.jpg" alt="" />
//     </div>
//     {<Home/>}
//     {<Marcas/>}
//   </div>
    
//   )
// }

export default Banner