import {Component} from 'react'
import Cookies from 'js-cookie'
import {hat, loginImage} from '../../assets'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showSubmitError: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  login = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  render() {
    const {username, password} = this.state
    const {showSubmitError, errorMsg} = this.state
    return (
      <div className="background">
        <div className="login-background">
          <div className="login-container1">
            <img src={hat} alt="website logo" />
            <h1 className="title">Tasty Kitchens</h1>
            <h1 className="login-title">Login</h1>
            <form onSubmit={this.login}>
              <label htmlFor="username" className="label">
                USERNAME
              </label>
              <br />
              <input
                type="text"
                id="username"
                className="input"
                value={username}
                onChange={this.onChangeUsername}
              />
              <br />
              <label htmlFor="password" className="label">
                PASSWORD
              </label>
              <br />
              <input
                type="password"
                id="password"
                className="input"
                value={password}
                onChange={this.onChangePassword}
              />
              <br />
              <button className="submit-button" type="submit">
                Login
              </button>
              {showSubmitError && <p className="error-message">*{errorMsg}</p>}
            </form>
          </div>
        </div>
        <img src={loginImage} alt="website login" />
      </div>
    )
  }
}

export default Login
