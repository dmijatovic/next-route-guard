import {useState, useEffect } from 'react'
import {useAuthContext} from './RouteGuard'

/**
 * Creates role guard react component. It receives isRoleAllowed method which
 * decides if the user role is allowed to see the content. If isRoleAllowed returns
 * true the children will be shown.
 * @param {Function} isRoleAllowed method which receives user object and returns true/false
 * @returns {Function} RoleGuard (functional React component)
 */

export function CreateRoleGuard(isRoleAllowed){
  return function RoleGuard({children}){
    const [content, setContent] = useState(null)
    const {user} = useAuthContext()

    // Check that user role is OK
    function handleRBAC(user){
      // debugger
      if (isRoleAllowed(user)){
        // console.log("RoleGuard...ALLOWED")
        setContent(children)
      }else{
        console.log("RoleGuard...NOT ALLOWED")
        setContent(null)
      }
    }
    useEffect(()=>{
      handleRBAC(user)
    },[user])

    return content
  }
}

// export default CreateRoleGuard