import Head from 'next/head'

import PageLayout from '../components/PageLayout'

export default function Home() {
  return (
    <>
    <Head>
      <title>Router guard: Home page</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <PageLayout>
      <h1>This is main content of home page!</h1>
      <p>This page is not protected</p>
    </PageLayout>
    </>
  )
}
