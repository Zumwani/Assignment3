import React from 'react'
import Sale50Percent from '../sections/MainView/Sale50Percent'
import WinterClearanceAndNewArrivals from '../sections/MainView/WinterClearanceAndNewArrivals'
import FeaturedProducts from '../sections/MainView/FeaturedProducts'
import PamelaRaifAndLetsBeConscious from '../sections/MainView/PamelaRaifAndLetsBeConscious'
import OurSpecialty from '../sections/MainView/OurSpecialty'
import WeirdAlignSections from '../sections/MainView/WeirdAlignSections'
import UpTo70Off from '../sections/MainView/UpTo70PercentOff'
import LatestAndBestSellingAndTopReactedProducts from '../sections/MainView/LatestAndBestSellingAndTopReactedProducts'
import ServiceInfo from '../sections/MainView/ServiceInfo'

const MainView: React.FC = () =>
(
  <>
    <Sale50Percent/>
    <WinterClearanceAndNewArrivals/>
    <FeaturedProducts/>
    <PamelaRaifAndLetsBeConscious/>
    <OurSpecialty/>
    <WeirdAlignSections/>
    <UpTo70Off/>
    <LatestAndBestSellingAndTopReactedProducts/>
    <ServiceInfo/>
  </>
)

export default MainView