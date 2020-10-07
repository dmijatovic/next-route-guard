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
      <h1>This is test for main content!</h1>
    </PageLayout>
    </>
  )
}
