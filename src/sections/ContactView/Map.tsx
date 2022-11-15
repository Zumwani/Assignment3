import React from 'react'

const MapSection: React.FC = () => {
  return (
    <iframe className='map'
    title='map'
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12548.152136366463!2d18.009130612739614!3d59.34768425265853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d86c5590a35%3A0xac5dd727a529fe56!2sEC%20Utbildning%20AB!5e0!3m2!1sen!2sse!4v1666604021604!5m2!1sen!2sse"
    allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
  )
}

export default MapSection