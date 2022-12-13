import React from 'react'
import SpecialtyButton from '../../components/SpecialtyButton'

const OurSpecialtySection: React.FC = () => {
  return (
    <section className="p-64 bg-light-gray container-fluid main-layout">
        <h5 className="row bold">Our Specialty</h5>
        <div className="row justify-content-evenly gap-35">
            <SpecialtyButton title="Track your order"/>
            <SpecialtyButton title="Make a return"/>
            <SpecialtyButton title="Make a price adjustment"/>
        </div>
    </section>
  )
}

export default OurSpecialtySection