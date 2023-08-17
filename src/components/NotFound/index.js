import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import {notfound} from '../../assets'
import './index.css'

const NotFound = () => (
  <div>
    <Navbar />
    <div className="payment-background">
      <div>
        <img src={notfound} alt="not found" />
        <h1>Page Not Found</h1>
        <p>
          We are sorry, the page you requested could not be found.
          <br />
          Please go back to the homepage
        </p>
        <Link to="/">
          <button className="home" type="button">
            Home Page
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default NotFound
