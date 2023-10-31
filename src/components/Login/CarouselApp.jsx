import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

function CarouselApp() {
  return (
    <div className="carousel_container">
      
      <Carousel autoPlay={true}
      showArrows={false}
      showThumbs={false}
      dynamicHeight={true}
      showStatus={false}
      useKeyboardArrows={false}
      showIndicators={false}
      animationHandler="fade"
      swipeable={false}
      className="carousel_wrapper">
                <div>
                    <img src="image1.png" className='carousel_image' />
                </div>
                <div>
                    <img src="image2.png" className='carousel_image'/>
                </div>
                <div>
                    <img src="image3.png" className='carousel_image'/>
                </div>
                <div>
                    <img src="image4.png" className='carousel_image'/>
                </div>
      </Carousel>
    </div>
  )
}

export default CarouselApp