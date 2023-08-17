import {Link} from 'react-router-dom'
import Navbar from '../Navbar'

import {check} from '../../assets'
import './index.css'

const PaymentSuccessful = () => (
  <div>
    <Navbar />
    <div className="payment-background">
      <div>
        <img src={check} alt="check" />
        <h1>Payment Successful</h1>
        <p>
          Thank you for ordering
          <br />
          Your payment is successfully completed.
        </p>
        <Link to="/">
          <button className="home" type="button">
            Go To Home Page
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default PaymentSuccessful
