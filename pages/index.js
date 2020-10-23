import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import React from 'react';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
// unused import import SweetAlert from 'react-bootstrap-sweetalert';
import { Amplify, Analytics } from "aws-amplify";
// will use later import Head from "next/head";
import awsExports from "../src/aws-exports";


Analytics.record('Eventos');

Amplify.configure({ ...awsExports, ssr: true });
import Layout from "../components/layout";
import Showroom from "../components/showroom";


Sentry.init({
  dsn: "https://ca07aec136804065bfae72e2593bf55f@o431905.ingest.sentry.io/5472399",
  integrations: [
    new Integrations.BrowserTracing(),
  ],
  beforeBreadcrumb(breadcrumb, hint) {
    return breadcrumb.category === "ui.click" ? null : breadcrumb;
  },
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});
 

function App() {

  return (
    <Layout>
      <AmplifyAuthenticator>

      <div>
          <h3> HOLA </h3>
          <hr />
      </div>
      
    <Showroom   />

    </AmplifyAuthenticator>
    </Layout>
 );
};



export default App;