import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  const Token = Cookies.get('jwt_token')
  if (Token === undefined) {
    return <Redirect path="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
