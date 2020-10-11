import Head from 'next/head'
import PageLayout from '../components/PageLayout'

import {RoleBasedContent} from "../auth/RoleGuard"

export default function Dashboard() {
  return (
    <>
    <Head>
      <title>Role guard: Dashboard page</title>
    </Head>
    <PageLayout>
      <RoleBasedContent allowedRoles={["user"]}>
        <h1>Content allowed for all users</h1>
        <p>This content is allowed to all roles</p>
      </RoleBasedContent>
      <RoleBasedContent allowedRoles={["admin"]}>
        <h1>Content allowed for admin ONLY</h1>
        <p>This content is allowed to admins ONLY</p>
      </RoleBasedContent>
    </PageLayout>
    </>
  )
}