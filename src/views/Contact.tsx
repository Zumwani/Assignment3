import React from 'react'
import BreadcrumbSection from '../sections/Breadcrumb'
import ContactSection from '../sections/ContactView/Contact'
import MapSection from '../sections/ContactView/Map'

const Contact: React.FC = () =>
(
  <>
    <BreadcrumbSection currentPage="Contact"/>
    <MapSection/>
    <ContactSection/>
  </>
)

export default Contact