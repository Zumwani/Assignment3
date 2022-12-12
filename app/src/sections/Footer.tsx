import React from 'react'
import ExternalLink from '../components/ExternalLink'

const Footer: React.FC = () => {
  return (
    <footer>
        <div className="text-align-center">
            <ExternalLink link="https://facebook.com" className="fa fa-facebook"></ExternalLink>
            <ExternalLink link="https://instagram.com" className="fab fa-instagram"></ExternalLink>
            <ExternalLink link="https://twitter.com" className="fab fa-twitter"></ExternalLink>
            <ExternalLink link="https://google.com" className="fab fa-google"></ExternalLink>
            <ExternalLink link="https://linkedin.com" className="fab fa-linkedin"></ExternalLink>
            <p>© 2022 Fixxo. All Rights Reserved.</p>
        </div>
    </footer>
  )
}

export default Footer