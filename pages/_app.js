import '../styles/globals.css'

import {CreateRouteGuard} from '../auth/RouteGuard'
import isProtected from '../auth/isRouteProtected'

const RouteGuard = CreateRouteGuard(isProtected)

function MyApp({ Component, pageProps }) {
  return (
    <RouteGuard>
      <Component {...pageProps} />
    </RouteGuard>
  )
}

export default MyApp
