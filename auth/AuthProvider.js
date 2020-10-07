import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { loginRedirect } from './loginRedirect'

import AppLoader from '../components/AppLoader'
import isProtected from './isProtected'

const AuthContext = createContext()

function AuthProvider({ children }) {
  const { pathname, replace } = useRouter()
  const [content, setContent] = useState(null)
  const [ {user, error}, setUser ] = useState({
    user:undefined,
    error:undefined
  })

  //get user profile (login user)
  function getUser() {
    loginRedirect()
    .then(resp=>{
      if (resp){
        const [user,error] = resp
        setUser({
          user,
          error
        })
      }else{
        console.log("getUser...empty response...", resp)
      }
    })
  }
  
  // Check that new route is OK
  function handleRouteChange(url){
    // debugger
    if (isProtected(url)){
      console.log("handleRouteChange...protected...", url)
      setContent(
        <AuthContext.Provider value={{user,setUser}}>
          {children}
        </AuthContext.Provider>
      )
    }else{
      console.log("handleRouteChange...public...", url)
      setContent(children)
    }
  }

  useEffect(()=>{
    // console.log("user...changed...", user)
    if (user){
      handleRouteChange(pathname)
    } else if (error){
      replace("/401")
    }
  },[user,error])

  //on path change get user?
  useEffect(() => {
    console.log("pathname...changed...", pathname)
    if (isProtected(pathname) && user===undefined){
      setContent(<AppLoader></AppLoader>)
      //this path is protected and user is not logged in (yet)
      getUser(pathname)
    }else{
      handleRouteChange(pathname)
    }
  }, [pathname])

  return content
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }