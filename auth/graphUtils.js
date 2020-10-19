import {acquireTokenSilent} from "./loginRedirect"
import {fetchUrl} from "../utils/fetchApi"

function getAccessToken(account){
  const config={
    account,
    scopes:["User.Read.All"]
  }

  return acquireTokenSilent(config)
    .then(resp=>{
      const [tokens,error] = resp
      if (error) throw Error(error)
      if (tokens) return tokens['accessToken']
    })
}

export function getUsersList(account){
  const url = 'https://graph.microsoft.com/v1.0/users'
  return getAccessToken(account)
    .then(token=>{
      if (token){
        return fetchUrl(url,token)
      } else {
        throw Error("access_token missing")
      }
    })
    .then(resp=>{
      return resp
    })
    .catch(e=>{
      return {
        payload: undefined,
        error: e
      }
    })
}