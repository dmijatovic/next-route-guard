/**
 * Config object to be passed to MSAL on creation.
 * For a full list of msal.js configuration parameters,
 * visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_configuration_.html
 * */
export const msalConfig = {
  auth: {
    clientId:"0bb2e832-fe23-44d2-920e-120caf021a74",
    authority: "https://login.microsoftonline.com/0f22a838-ece9-49f4-b8dc-e71e2a5d705c",
    //common end point
    // authority: "https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration",
    validateAuthority: true,
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
  },
  cache: {
    // This configures where your cache will be stored
    cacheLocation: "localStorage",
    // Set this to "true" to save cache in cookies to address trusted zones limitations in IE
    //(see: https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/Known-issues-on-IE-and-Edge-Browser)
    storeAuthStateInCookie: true
  }
};

/**
 * User scopes for this app. Passed during login process.
 * These scopes need to be defined in Azure AD of client.
 */
export const userConfig={
  state:`${JSON.stringify({
    redirecUrl:"/profile"
  })}`,
  scopes:[
    "openid","profile","email",
    // "User.Read.All",
    "api://0bb2e832-fe23-44d2-920e-120caf021a74/api.test.scope"
  ]
}