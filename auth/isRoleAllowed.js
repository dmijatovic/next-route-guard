
import {tokenValid,roleIncluded} from "./tokenUtils"

export function allowedRole(role){
  return function isAllowed(user){
    if (user && user['accessToken']){
      //check if token expired
      if (tokenValid(user['accessToken'])===false) return false
      //check if role present in roles array
      return (roleIncluded(user['accessToken'], role))
    } else {
      return false
    }
  }
}

export default allowedRole