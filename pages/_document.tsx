// import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
// import { ServerStyleSheets } from '@material-ui/core/styles';
// import theme from 'styles/theme';

export default class MyDocument extends Document {
  render() {
    // console.log("document")
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8"/>
          {/* dv4loader for app loading */}
          <script src="https://cdn.jsdelivr.net/npm/@dv4all/loaders@1.0.1/lib/dv4loaders.cjs.min.js"></script>
          {/* PWA primary color */}
          {/* <meta name="theme-color" content={theme.palette.primary.main} /> */}
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700"/>
          {/* MSAL OpenID/oAuth2 Microsoft lib for Azure */}
          <script
            src="https://alcdn.msauth.net/browser/2.1.0/js/msal-browser.min.js"
            integrity="sha384-EmYPwkfj+VVmL1brMS1h6jUztl4QMS8Qq8xlZNgIT/luzg7MAzDVrRa2JxbNmk/e"
            crossOrigin="anonymous"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// // `getInitialProps` belongs to `_document` (instead of `_app`),
// // it's compatible with server-side generation (SSG).
// MyDocument.getInitialProps = async (ctx) => {
//   // Resolution order
//   //
//   // On the server:
//   // 1. app.getInitialProps
//   // 2. page.getInitialProps
//   // 3. document.getInitialProps
//   // 4. app.render
//   // 5. page.render
//   // 6. document.render
//   //
//   // On the server with error:
//   // 1. document.getInitialProps
//   // 2. app.render
//   // 3. page.render
//   // 4. document.render
//   //
//   // On the client
//   // 1. app.getInitialProps
//   // 2. page.getInitialProps
//   // 3. app.render
//   // 4. page.render

//   // Render app and page and get the context of the page with collected side effects.
//   const sheets = new ServerStyleSheets();
//   const originalRenderPage = ctx.renderPage;

//   // console.log("getInitalProps...")

//   ctx.renderPage = () =>
//     originalRenderPage({
//       enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
//     });

//   const initialProps = await Document.getInitialProps(ctx);

//   return {
//     ...initialProps,
//     // Styles fragment is rendered after the app and page rendering finish.
//     styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
//   };
// };