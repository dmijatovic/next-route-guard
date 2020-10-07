import Head from 'next/head'
import {useRouter} from 'next/router'
import PageLayout from '../components/PageLayout'
import {useAuth} from "../auth/AuthProvider"

export default function Dashboard() {
  const router = useRouter()
  const {user} = useAuth()
  return (
    <>
    <Head>
      <title>Router guard: Dashboard page</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <PageLayout>
      {user?
        <>
        <h1>This is PROTECTED DASHBOARD PAGE!</h1>
        <h3>User: {user['idTokenClaims']['name']}</h3>
        <button onClick={()=>{
          router.push("/logout")
        }}>Logout</button>
        </>:<h1>401 - Protected</h1>
      }
    </PageLayout>
    </>
  )
}