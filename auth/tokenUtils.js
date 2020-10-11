import jwt_decode from 'jwt-decode'

export function tokenValid(token){
  try{
    const {exp} = jwt_decode(token)
    const nowInSec = Math.round(Date.now()/1000)
    // allowed 60sec before expiration
    return nowInSec < (exp - 60)
  } catch (e){
    // console.error("tokenValid: ",e)
    return false
  }
}

export function roleIncluded(token, allowedRoles){
  try{
    const {roles} = jwt_decode(token)
    if (Array.isArray(allowedRoles)){
      for (let pos in allowedRoles){
        const role = allowedRoles[pos]
        if (roles.includes(role)) return true
      }
      return false
    } else {
      //assuming string (single role)
      return roles.includes(allowedRoles)
    }
  }catch(e){
    // console.error("roleIncluded: ", e)
    return false
  }
}
