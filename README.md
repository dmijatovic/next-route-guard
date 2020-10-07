# Route guard example with NextJS and msal.js (Azure AD)

This sample experiments with custom route guard possiblities using next/router and msal.js library for Azure AD using OpenID Connect protocol.

Next router can listen to route changes. Based on this info we can guard the routes. But if the page is rendered staticaly could I access the content of the page? Let's test this!

## Dependencies

The main dependency is msal.js library. The library is added in the header of the document template (see pages/\_document.tsx).

## Implementation

The authentication component and useAuth hook are in auth folder. The route protecting component is added to \_app.js template page.

```javascript
import { AuthProvider } from "../auth/AuthProvider";
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
```

To obtain user information (tokens) received from Azure AD use the hook `useAuth` (see page/dashboard.js).

```javascript
import { useAuth } from "../auth/AuthProvider";

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuth();
  return (
    <>
      <Head>
        <title>Router guard: Dashboard page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        {user ? (
          <>
            <h1>This is PROTECTED DASHBOARD PAGE!</h1>
            <h3>User: {user["idTokenClaims"]["name"]}</h3>
            <button
              onClick={() => {
                router.push("/logout");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <h1>401 - Protected</h1>
        )}
      </PageLayout>
    </>
  );
}
```

## Configuration

The configuration is in this example is placed in .env file and in the auth/config.ts file. For the production all configuration variables should be moved into .env file. This will allow for more flexibility and reusability.
