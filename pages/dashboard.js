import Head from 'next/head'
import PageLayout from '../components/PageLayout'

import {CreateRoleGuard} from "../auth/RoleGuard"
import {allowedRole} from "../auth/isRoleAllowed"

const userIsAllowed = allowedRole("user")
const RoleGuardUser = CreateRoleGuard(userIsAllowed)
const RoleGuardAdmin = CreateRoleGuard(allowedRole("admin"))

export default function Dashboard() {
  return (
    <>
    <Head>
      <title>Role guard: Dashboard page</title>
    </Head>
    <PageLayout>
      <RoleGuardUser>
        <h1>Content allowed for all users</h1>
        <p>This content is allowed to all roles</p>
      </RoleGuardUser>
      <RoleGuardAdmin>
        <h1>Content allowed for admin ONLY</h1>
        <p>This content is allowed to admins ONLY</p>
      </RoleGuardAdmin>
    </PageLayout>
    </>
  )
}