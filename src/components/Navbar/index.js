import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {hat} from '../../assets'
import './index.css'

const Navbar = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="nav-background">
      <div className="nav-container1">
        <img src={hat} alt="hat" className="nav-icon" />
        <p className="nav-title">Tasty Kitchens</p>
      </div>
      <div className="nav-container2">
        <Link to="/">
          <p className="active">Home</p>
        </Link>
        <Link to="/cart">
          <p className="not-active">Cart</p>
        </Link>
        <Link to="/login">
          <div>
            <button
              className="logout-button"
              type="button"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
        </Link>
      </div>
    </div>
  )
}
export default Navbar
