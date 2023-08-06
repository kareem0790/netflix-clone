import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="logos-container">
      <button type="button" className="button">
        <FaGoogle size={25} />
      </button>
      <button type="button" className="button">
        <FaTwitter size={25} />
      </button>
      <button type="button" className="button">
        <FaInstagram size={25} />
      </button>
      <button type="button" className="button">
        <FaYoutube size={25} />
      </button>
    </div>
    <p className="contact-us">Contact Us </p>
  </div>
)

export default Footer
