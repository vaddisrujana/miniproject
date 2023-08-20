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
        <Link to="/">
          <img src={hat} alt="website logo" className="nav-icon" />
        </Link>
        <p className="nav-title">Tasty Kitchens</p>
      </div>
      <ul>
        <div className="nav-container2 list">
          <li className="active">
            <Link to="/">Home </Link>
          </li>

          <li className="not-active list">
            <Link to="/cart">Cart</Link>
          </li>

          <li>
            <Link to="/login">
              <button
                className="logout-button list"
                type="button"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </Link>
          </li>
        </div>
      </ul>
    </div>
  )
}
export default Navbar
