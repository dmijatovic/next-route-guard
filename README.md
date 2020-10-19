# User access management demo with NextJS and msal.js (Azure AD)

This repo contains examples of route and role guard React components. It uses next/router, jwt_decode and msal.js. MSAL handles Azure AD authentication using OpenID Connect protocol.

Next router is used to listen to route changes. Based on this info we guard the routes. The decision which route is guarded is delegated to isRouteProtected method which is passed to CreateRouteGuard upon route guard creation. In this example the router guard is implemented in the app template (pages/\_app.js).

RoleGuard componet regulates the content on the page based on user role. Allowed role is passed to RoleGuard component upon creation. Example use is shown in the dashboard page.

All relevant code concerning authentication and authorisation using MSAL is in auth folder.
The example implementations are in the profile and dashboard pages (pages/profile.js and pages/dashboard.js)

## Dependencies

The main dependency is `msal.js` for authentication and route guard. `jwt_decode` library is used for role guard to decode access token.

MSAL library is added in the header of the document template (see pages/\_document.tsx). This is done to avoid "window undefined" error with NextJS SSR.

## Implementation

### Route guard

The route guard component and useAuthContext hook are in auth folder. The route protecting component is added to pages/\_app.js (template) page.

```javascript
import { CreateRouteGuard } from "../auth/RouteGuard";
import isProtected from "../auth/isRouteProtected";

const RouteGuard = CreateRouteGuard(isProtected);

function MyApp({ Component, pageProps }) {
  return (
    <RouteGuard>
      <Component {...pageProps} />
    </RouteGuard>
  );
}

export default MyApp;
```

To obtain user information (tokens) received from Azure AD use the hook `useAuthContext` (see page/profile.js).

```javascript
import { useAuthContext } from "../auth/RouteGuard";

export default function Dashboard() {
  // get user/tokens from authContext
  const { user } = useAuthContext();
  //...REST
}
```

### Role guard

Role guard component is implemented in dashboard page.

```javascript
import {RoleBasedContent} from "../auth/RoleGuard"

export default function Dashboard() {
  return (
    //other code ...
      <RoleBasedContent allowedRoles={["user"]}>
        <h1>Content allowed for all users</h1>
        <p>This content is allowed to all roles</p>
      </RoleBasedContent>
      <RoleBasedContent allowedRoles={["admin","user"]}>
        <h1>Content allowed for admin ONLY</h1>
        <p>This content is allowed to admins ONLY</p>
      </RoleBasedContent>
    //other code ...
  )
}
```

## Configuration

The configuration is in this example is placed in .env file and in the auth/config.ts file. For the production all configuration variables should be moved into .env file. This will allow for more flexibility and reusability.

## Testing with Jest and react-test library

Setup testing with NextJs is [based on this article](https://medium.com/frontend-digest/setting-up-testing-library-with-nextjs-a9702cbde32d).

- install dependencies Jest and react testing library

```bash
npm i -D jest jest-dom @testing-library/react @testing-library/jest-dom @testing-library/dom babel-jest
```

- create setupTests.js file with content

```javascript
import "@testing-library/jest-dom/extend-expect";
```

- create .babelrc file with content

```json
{
  "presets": ["next/babel"]
}
```

- create jest.config.js file with content

```javascript
module.exports = {
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
};
```
