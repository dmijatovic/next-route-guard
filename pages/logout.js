import {logout} from '../auth/loginRedirect'

export default function Logout(){
  logout()
  return null
}