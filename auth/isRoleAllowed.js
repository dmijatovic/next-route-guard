import jwt_decode from 'jwt-decode'

function checkExp(token){
  const {exp} = jwt_decode(token)
  const nowInSec = Math.round(Date.now()/1000)
  // allowed 60sec before expiration
  return nowInSec < (exp - 60)
}

function checkRole(token, role){
  const {roles} = jwt_decode(token)
  return roles.includes(role)
}

export function allowedRole(role){
  return function isAllowed(user){
    if (user && user['accessToken']){
      //check if token expired
      if (checkExp(user['accessToken'])===false) return false
      //check if role present in roles array
      return (checkRole(user['accessToken'], role))
    } else {
      return false
    }
  }
}

export default allowedRole