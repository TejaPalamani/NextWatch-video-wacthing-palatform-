import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'

import ContextObject from '../../context/ContextObject'

import './index.css'

class Login extends Component {
  state = {
    userName: 'rahul',
    password: 'rahul@2021',
    errMesg: false,
    mesg: '',
    showPassword: 'password',
  }

  checkbox = () => {
    this.setState(prev => ({
      showPassword: prev.showPassword === 'password' ? 'text' : 'password',
    }))
  }

  onSuccessTrigger = jwtToken => {
    const {history} = this.props
    const jwt = jwtToken.jwt_token
    Cookies.set('token', jwt, {expires: 10})
    this.setState({mesg: '', errMesg: false, userName: '', password: ''})

    history.replace('/')
  }

  failureEventTrigger = jwtToken => {
    console.log(jwtToken)
    this.setState({mesg: jwtToken.error_msg, errMesg: true})
  }

  onSubmitFunction = async event => {
    event.preventDefault()
    const {userName, password, errMesg} = this.state

    const userOptions = {
      username: userName,
      password,
    }

    const apiUrl = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userOptions),
    }

    const apiCall = await fetch(apiUrl, options)

    if (apiCall.ok) {
      const jwtToken = await apiCall.json()
      this.onSuccessTrigger(jwtToken)
    } else {
      const jwtToken = await apiCall.json()
      this.failureEventTrigger(jwtToken)
    }
  }

  render() {
    const jwtToken = Cookies.get('token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <ContextObject.Consumer>
        {value => {
          const {isDarkMode} = value
          const {userName, password, errMesg, mesg, showPassword} = this.state

          const logoUrl = isDarkMode
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          return (
            <div
              className="login_form_light"
              style={{
                backgroundColor: isDarkMode ? 'black' : 'white',
                color: isDarkMode ? 'white' : 'black',
              }}
            >
              <form onSubmit={this.onSubmitFunction}>
                <img
                  src={logoUrl}
                  alt="logo"
                  style={{
                    width: '100px',
                    display: 'flex',
                    alignSelf: 'center',
                  }}
                />
                <label htmlFor="uname">Username</label>

                <input
                  type="text"
                  id="uname"
                  placeholder="Username"
                  value={userName}
                  onChange={event =>
                    this.setState({userName: event.target.value})
                  }
                />

                <label htmlFor="pass">Password</label>

                <input
                  type={showPassword}
                  id="pass"
                  placeholder="password"
                  value={password}
                  onChange={event =>
                    this.setState({password: event.target.value})
                  }
                />

                {errMesg && (
                  <p style={{color: 'red', fontSize: '13px'}}>{mesg}</p>
                )}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <input type="checkbox" onClick={this.checkbox} id="check" />
                  <lable htmlFor="check">Show Password</lable>
                </div>
                <button type="submit">Login</button>
              </form>
            </div>
          )
        }}
      </ContextObject.Consumer>
    )
  }
}

export default Login
