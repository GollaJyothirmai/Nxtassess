import Cookies from 'js-cookie'

import {withRouter, Link} from 'react-router-dom'

import './index.css'

const Navbar = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="header">
      <Link to="/">
        <img
          className="image"
          src="https://res.cloudinary.com/dtas174iv/image/upload/v1738650686/yrzim8iie10muchipgnm.jpg"
          alt="website logo"
        />
      </Link>
      <button type="button" className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </div>
  )
}
export default withRouter(Navbar)
