import Head from 'next/head'
import PageLayout from '../components/PageLayout'
import {useState} from 'react'
import {useAuthContext} from "../auth/RouteGuard"

// import {fetchUrl} from '../utils/fetchApi'
import {RoleBasedContent} from "../auth/RoleGuard"
import {getUsersList} from "../auth/graphUtils"

export default function Users(){
  const {user} = useAuthContext()
  const [list, setList] = useState(undefined)

  function getUserList(){
    // console.log("getUserList")
    if (user){
      getUsersList(user['account'])
      .then(resp=>{
        const {payload,error} = resp
        if (payload){
          setList(payload)
        }
        if (error){
          console.log(error)
        }
      })
    }
  }

  function showUserList(){
    if (list){
      const {value} = list
      console.log("showUserList")
      return(
        <ul>
          {
            value.map(item=>{
              return <li key={item['id']}>{item['displayName']}</li>
            })
          }
        </ul>
      )
    } else {
      return null
    }
  }

  function showGetUsersBtn(){
    if (user){
      if (list){
        return null
      }else{
        return (<button onClick={getUserList}>Get user list</button>)
      }
    }else{
      return null
    }
  }

  return (
    <>
    <Head>
      <title>User management page</title>
    </Head>
    <PageLayout>
      {/* <RoleBasedContent allowedRoles={["analyst"]}>
        <h1>401- Insufficient role assigned</h1>
      </RoleBasedContent> */}
      <RoleBasedContent allowedRoles={["admin"]}>
        <h1>User management</h1>
        {showGetUsersBtn()}
        {showUserList()}
      </RoleBasedContent>
    </PageLayout>
    </>
  )
}