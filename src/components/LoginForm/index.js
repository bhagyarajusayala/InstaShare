import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  onUsername = event => {
    this.setState({username: event.target.value})
  }

  onSuccess = jwtToken => {
    console.log(jwtToken)
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 90, path: '/'})

    history.replace('/')
  }

  onFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onSubmitOf = async event => {
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
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
    this.setState({username: '', password: ''})
  }

  render() {
    const {username, password, showError, errorMsg} = this.state
    return (
      <div className="main-con">
        <img
          src="https://res.cloudinary.com/dhwcldgtg/image/upload/v1705315659/Illustration_1_jwqcmw.png"
          alt="website login"
          className="logo-size1"
        />
        <form onSubmit={this.onSubmitOf}>
          <div className="con1">
            <img
              src="https://res.cloudinary.com/dhwcldgtg/image/upload/v1702969043/Standard_Collection_8_gjgyo9.png"
              alt="logo"
              className="logo"
            />
            <h1 className="head">Insta share</h1>
          </div>
          <div className="con">
            <label htmlFor="user" className="label1">
              USERNAME
            </label>
            <input
              type="text"
              id="user"
              value={username}
              onChange={this.onUsername}
            />
          </div>
          <div className="con">
            <label htmlFor="password" className="label1">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={this.onPassword}
            />
          </div>
          {showError && <p>{errorMsg}</p>}
          <button type="submit" className="button">
            Login
          </button>
        </form>
      </div>
    )
  }
}
export default LoginForm
