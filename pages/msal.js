import { useEffect, useState } from 'react'
import { handleRedirectPromise } from '../auth/loginRedirect'

export default function MsalPage(){
  // call msal to handle tokens in url
  const [content, setContent] = useState(null)
  console.log("MsalPage...handleRedirectPromise")
  // call handleRedirectPrimise from msal
  // this will extract tokens from url and
  // redirect to page from where login process started
  // in this example this will be profile or dashboard page
  handleRedirectPromise()
  return content
}