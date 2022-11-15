import React from 'react'
import ActionButton from '../../components/ActionButton';

const PamelaRaif_LetsBeConsiousSection: React.FC = () => {
  return (
    <section className="main-layout container row gap-5">
        
        <div className="col-xxl bg-model model5 d-flex w-100 h-403 d-flex">
            <div className="mx-5 my-auto text-end w-100">
                <h2 className="text-white mb-34">Pamela Raif's<br/>Top Picks</h2>
                <ActionButton text="Shop Now" color="black"/>
            </div>
        </div>

        <div className="col-xxl bg-model model6 w-100 h-403 d-flex">
            <div className="mx-5 my-auto text-start w-100">
                <h2 className="mb-34 text-s-white">Let's Be<br/>Conscious</h2>
                <ActionButton text="Flash Sale" color="white"/>
            </div>
        </div>

    </section>
  )
}

export default PamelaRaif_LetsBeConsiousSection