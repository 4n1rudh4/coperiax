import Carousel from 'react-bootstrap/Carousel';
import Cards from '../components/cards';
import Data from '../resources/carddata'

function ImgOverlayExample() {
  
  return (<div className='m-auto block'>
     <Carousel>
      <Carousel.Item>
        <img src="./resources/hero1.jpg" className='w-full h-auto' alt="hero"/>
        <Carousel.Caption>
        <button className="md:block hidden  m-auto h-fit w-fit first-letter: bg-green-600 p-3 hover:bg-green-200 font-bold text-black text-2xl mt-2 rounded-full" ><a href="/login">Click here to get Started</a></button>
          <p className='hidden md:block md:font-medium md:text-3xl'>Agrow is a comprehensive online platform meticulously designed to empower farmers in their agricultural pursuits. Leveraging cutting-edge technology, it offers an array of indispensable tools and resources to aid farmers in optimizing their crop cultivation and financial management.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="./resources/hero2.png" className='w-full h-auto' alt="hero"/>
        
      </Carousel.Item>
      <Carousel.Item>
        <img src="./resources/hero3.png" className='w-full h-auto' alt="hero"/>
        
      </Carousel.Item>
      <Carousel.Item>
        <img src="./resources/hero4.png" className='w-full h-auto' alt="hero"/>
        
      </Carousel.Item>
    </Carousel>
    <div className='block text-center pt-2'>
    <button className="md:hidden  m-auto h-fit w-fit first-letter: bg-green-600 p-3 hover:bg-green-200 font-bold text-black text-2xl mt-2 rounded-full"><a href="/login">Click here to get Started</a></button>
       <p className='md:hidden font-medium  text-lg'>Agrow is a comprehensive online platform meticulously designed to empower farmers in their agricultural pursuits. Leveraging cutting-edge technology, it offers an array of indispensable tools and resources to aid farmers in optimizing their crop cultivation and financial management.</p>
    
    <p className='font-bold text-xl  p-2'>Sailient Features</p></div>
    <hr className="block pb-2 m-auto w-11/12 border-2 border-bg-black"/>
    <div className='md:grid md:grid-cols-2'>
    {Data.map((props) => (
                <Cards
                key={props.id}
                src={props.src}
                name={props.name}
                />
    ))}</div></div>
  );
}

export default ImgOverlayExample;