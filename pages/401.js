import Head from 'next/head'
import {useRouter} from 'next/router'
import PageLayout from '../components/PageLayout'

export default function Page401(){
  const router = useRouter()
  return (
    <>
    <Head>
      <title>Router guard: 401 page</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <PageLayout>
      <h1>401 - Protected</h1>
      <button onClick={()=>{
        router.replace("/")
      }}>Back to home</button>
    </PageLayout>
    </>
  )
}