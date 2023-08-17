import {Link} from 'react-router-dom'
import Navbar from '../Navbar'

import {cooking} from '../../assets'

const NoOrders = () => (
  <div>
    <Navbar />
    <div className="payment-background">
      <div>
        <img src={cooking} alt="empty cart" />
        <h1>No Order Yet!</h1>
        <p>Your cart is empty. Add something from the menu.</p>
        <Link to="/">
          <button className="home" type="button">
            Order Now
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default NoOrders
