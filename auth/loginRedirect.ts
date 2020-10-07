import {useState, useEffect} from "react";
import {msalConfig, userConfig} from './config'
import logger, {LogType} from 'utils/logger'

// NextJS workaround for SSR error "window is undefined" with msal-browser
export let msalClient = undefined
if (typeof window !=="undefined"){
  // debugger
  // console.log("msalConfig:", msalConfig)
  const PublicClientApplication = window['msal']['PublicClientApplication'];
  msalClient = new PublicClientApplication(msalConfig);
}
// Sign-out the user
export function logout() {
  // Removes all sessions, need to call AAD endpoint to do full logout
  msalClient.logout();
}
/**
 * Acquire Token silently. Uses MSAL builtin fn acquireTokenSilent.
 * @param {Object} claims {
 *  account: msal account object,
 *  scopes: ["openid","profile","other-scopes-to-include"]
 * }
 * @returns [token,error]
 */
export function acquireTokenSilent({account,scopes}:
  {account:{},scopes:string[]}):Promise<[any,string]>{
  return msalClient.acquireTokenSilent({
    account,
    scopes
  })
  .then(tokens=>{
    return [tokens, undefined]
  })
  .catch(e=>{
    return [undefined, e.message]
  })
}

/**
 * Get saved accounts. If user account is
 * saved locally. We can use this info to
 * obtain tokens silently
 */
export function getAllAccounts(){
  return msalClient.getAllAccounts()
}

/**
 * Redirect user to AzureAD for login.
 */
export function redirectForLogin(src:string):Promise<[any,string]>{
  return msalClient.handleRedirectPromise()
  .then(tokens=>{
    if (tokens!==null){
      return [tokens, undefined]
    }else if (src!=="msal"){
      //start redirect if we are
      //not back to msal page
      msalClient.loginRedirect({
        ...userConfig
      })
    }
  })
  .catch(e => {
    debugger
    // console.error("loginRedirect...ERROR: ",e)
    logger(`${e.message}`,LogType.error)
    //clear remaining vars MSAL might leave there
    localStorage.clear()
    return [undefined, e.message]
  })
}

/**
 * Handle redirect promise
 */
export function handleRedirectPromise(){
  msalClient.handleRedirectPromise()
}

/**
 * OpenID Connect Redirect strategy using MSAL library.
 * Used to login user on Azure AD. Configuration is stored
 * in config.ts file in the same folder.
 */
export function loginRedirect(){
  // console.log("useLoginRedirect.useEffect[]..enter")
  // Redirect: once login is successful and redirects with tokens
  // the user token will be catched in this function
  // note! if initial run produces null response
  // we try to get user from cache/ls/cookie
  return msalClient.handleRedirectPromise()
  .then(tokens=>{
    // redirect response
    if (tokens!==null){
      // debugger
      return {handleRedirectPromise: tokens}
    } else {
      // we do not have token yet
      // 1. try to get account from cache/ls/cookie
      const accounts = msalClient.getAllAccounts()
      if (accounts.length === 1){
        // we have account but not id_token/login token
        // require token for claims silently for first account
        logger("loginRedirect.acquireTokenSilent...START")
        return msalClient.acquireTokenSilent({
          ...userConfig,
          account: accounts[0]
        })
      } else {
        //user needs to login
        //this promise returns to handleRedirectPromise = parent
        //user is not logged in and we have no account info
        //stored locally in MSAL. Start login redirect process
        // debugger
        logger("loginRedirect.loginRedirect...START")
        msalClient.loginRedirect({
          ...userConfig
        })
      }
    }
  })
  .then(resp=>{
    if (resp){
      if (resp['accessToken']){
        //this is response from silent token
        logger("loginRedirect.acquireTokenSilent...RESPONSE")
        return [resp, undefined]
      } else if (resp['handleRedirectPromise']){
        //this is response from handleRedirectPromise
        logger("loginRedirect.handleRedirectPromise...RESPONSE")
        return [resp['handleRedirectPromise'], undefined]
      }
    }
  })
  .catch(e => {
    // debugger
    // console.error("loginRedirect...ERROR: ",e)
    logger(`${e.message}`,LogType.error)
    //clear remaining vars MSAL might leave there
    localStorage.clear()
    return [undefined, e.message]
  })
}