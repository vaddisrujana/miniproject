import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import {tastyKitchens, instagram, twitter, facebook} from '../../assets'

import './index.css'

const Footer = () => (
  <div className="footer-background">
    <div className="footer-container1">
      <img src={tastyKitchens} alt="website-footer-logo" />
      <h1 className="footer-tasty-kitchens">Tasty Kitchens</h1>
    </div>
    <p className="footer-para">
      The only thing we are serious about is food. Contact us on
    </p>
    <div className="footer-container2">
      <FaPinterestSquare
        className="footer-logo"
        testid="pintrest-social-icon"
      />
      <FaInstagram className="footer-logo" testid="instagram-social-icon" />
      <FaTwitter className="footer-logo" testid="twitter-social-icon" />
      <FaFacebookSquare className="footer-logo" testid="facebook-social-icon" />
    </div>
  </div>
)

export default Footer
