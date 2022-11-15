import React from 'react'
import ActionButton from '../../components/ActionButton';
import image1 from '../../img/1.png'
import image2 from '../../img/2.png'

const Sale50PercentSection: React.FC = () => {
  return (
    <section className="mt-0">
        <div className="showcase bg-light-gray">
          <img src={image1} className="w-md-auto"/>
          <img src={image2} className="w-md-auto"/>
          <div className='position-absolute d-flex flex-column'>
            <div>
              <h1 className="text-align-center">SALE UP<br/>To 50% Off</h1>
              <h5>Online shopping free home delivery over $100</h5>
              <ActionButton text="Shop now" color="red"/>
            </div>
          </div>
        </div>
    </section>
  )
}

export default Sale50PercentSection