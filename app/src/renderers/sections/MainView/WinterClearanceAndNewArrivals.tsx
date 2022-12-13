import React from 'react'
import ActionButton from '../../components/ActionButton';

const WinterClearanceSection: React.FC = () => {
  return (
    <section className="main-layout container row w-100 text-start">

        <div className="col-xxl-7 bg-model model3 d-flex h-560">
            <div className="mx-5 my-auto text-start w-100 max-width-425 s-align-center text-s-white">
                <h2>Winter Clearance<br/>Up to 70% Off!</h2>
                <h6>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem apriam eaque ipsa quae ab illo inventore.</h6>
                <ActionButton text="Shop Now" color="black"/>
            </div>
        </div>

        <div className="col-xxl bg-model model4 h-560 d-flex mt-5 mt-xxl-0">
            <div className="mx-5 my-auto text-start w-100 s-align-center text-s-white">
                <h2>New<br/>Arrivals</h2>
                <ActionButton text="Shop Now" color="black"/>
            </div>
        </div>

    </section>
  )
}

export default WinterClearanceSection