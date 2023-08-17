import {tastyKitchens, instagram, twitter, facebook, p} from '../../assets'

import './index.css'

const Footer = () => (
  <div className="footer-background">
    <div className="footer-container1">
      <img src={tastyKitchens} alt="logo" />
      <h1 className="footer-tasty-kitchens">Tasty Kitchens</h1>
    </div>
    <p className="footer-para">
      The only thing we are serious about is food.
      <br />
      Contact us on
    </p>
    <div className="footer-container2">
      <img src={p} alt="p" className="footer-logo" />
      <img src={instagram} alt="instagram" className="footer-logo" />
      <img src={twitter} alt="twitter" className="footer-logo" />
      <img src={facebook} alt="facebook" className="footer-logo" />
    </div>
  </div>
)

export default Footer
