
import {useContext, useEffect, useState} from 'react'

export enum API_METHOD{
  GET="GET",
  POST="POST",
  PUT="PUT",
  DELETE="DELETE"
}

interface ApiResponse{
  loading: boolean,
  error: undefined|string,
  payload: any
}

export function fetchApi(
  endpoint:string,
  access_token:string,
  method:API_METHOD=API_METHOD.GET):Promise<ApiResponse>{
  const headers = new Headers();

  if (access_token){
    // debugger
    const bearer = `Bearer ${access_token}`;
    headers.append("Authorization", bearer);
  }

  const options = {
    method: method,
    headers: headers
  };
  // console.log(access_token)
  const url = `${process.env.NEXT_PUBLIC_API_URI}/${endpoint}`
  // console.log("fetchApi: ", url)

  return fetch(url, options)
    .then(resp=>{
      //basic response check
      if (resp.ok){
        return resp.json()
      } else {
        const msg = `${resp.status}: ${resp.statusText}`
        throw new Error(msg)
      }
    })
    .then(data=>{
      return {
        payload:data.payload,
        error:undefined,
        loading:false
      }
    })
    .catch(e=>{
      debugger
      return {
        payload:undefined,
        error:e.message,
        loading:false
      }
    })
}

export default fetchApi