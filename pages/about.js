import Head from 'next/head'

import PageLayout from '../components/PageLayout'

export default function About() {
  return (
    <>
    <Head>
      <title>Router guard: About page</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <PageLayout>
      <h1>This is ABOUT PAGE!</h1>
    </PageLayout>
    </>
  )
}