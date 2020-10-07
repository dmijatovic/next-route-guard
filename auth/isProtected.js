export default function isProtected(url){
  switch (url){
    //public routes
    case "/":
    case "/about":
    //authentication routes
    case "/logout":
    case "/msal":
    //error routes
    case "/404":
    case "/401":
      return false
    default:
      // by default routes are protected
      // 2 special protected routes are
      // msal: return from Azure AD
      // logout: to logout user needs to exists
      return true
  }
}
