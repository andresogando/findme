// pages/index.js
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import React, { useEffect, useState } from 'react';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

// unused import import SweetAlert from 'react-bootstrap-sweetalert';

import { Amplify, API, Auth, withSSRContext, graphqlOperation, Storage } from "aws-amplify";
// will use later import Head from "next/head";
import awsExports from "../src/aws-exports";
import { createProduct as CreateProduct } from "../src/graphql/mutations";
import { listProducts as ListProducts } from "../src/graphql/queries";
import { v4 as uuid } from 'uuid'




Amplify.configure({ ...awsExports, ssr: true });
import config from '../src/aws-exports'

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket
} = config
 
Sentry.init({
  dsn: "https://ca07aec136804065bfae72e2593bf55f@o431905.ingest.sentry.io/5472399",
  integrations: [
    new Integrations.BrowserTracing(),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});
 

function App() {
  const [file, updateFile] = useState(null)
  const [productName, updateProductName] = useState('')
  const [products, updateProducts] = useState([])
  useEffect(() => {
    listProducts()
  }, [])

  // Query the API and save them to the state
  async function listProducts() {
    const products = await API.graphql(graphqlOperation(ListProducts))
    updateProducts(products.data.listProducts.items)
  }

  function handleChange(event) {
    const { target: { value, files } } = event
    const fileForUpload = files[0]
    updateProductName(fileForUpload.name.split(".")[0])
    updateFile(fileForUpload || value)
  }

  

  // upload the image to S3 and then save it in the GraphQL API
  async function createProduct() {
    if (file) {
      const extension = file.name.split(".")[1]
      const { type: mimeType } = file
      const key = `images/${uuid()}${productName}.${extension}`      
      const url = `https://${bucket}.s3.amazonaws.com/public/${key}`
      const inputData = { name: productName , image: url }
      // s3://findme120646-dev/public/images/70cf6141-39a8-4977-bb11-a9dbbfa1d4caPresident-Trump-Official-Portrait-200x200.jpg
      // https://findme120646-dev.s3.amazonaws.com/public/images/70cf6141-39a8-4977-bb11-a9dbbfa1d4caPresident-Trump-Official-Portrait-200x200.jpg
      //       const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}` ORIGINAL 
      try {
        await Storage.put(key, file, {
          contentType: mimeType
        })
        await API.graphql(graphqlOperation(CreateProduct, { input: inputData }))
      } catch (err) {
        console.log('error: ', err)
      }
    }
  }

  
  const MoodButton = ({ rating, onClick }) => (
    <button 
      data-rating={rating}
      className="mood-btn" 
      onClick={() => onClick(rating)}
    />
  )


  return (
    <div style={styles.container}>
      <input
        type="file"
        onChange={handleChange}
        style={{margin: '10px 0px'}}
      />

      <MoodButton onClick={onPick}> </MoodButton>
      <MoodButton onClick={onPick}> holaaa </MoodButton>

      <input
        placeholder='Image'
        value={productName}
        onChange={e => updateProductName(e.target.value)}
      />



      <button
        style={styles.button}
        onClick={createProduct}>
          
          Upload! Picture
      </button>

      {
        products.map((p, i) => (
          <img
            style={styles.image}
            key={i}
            src={p.image}
          />
        ))
      }
    </div>
  );
}








const styles = {
  container: {
    width: 400,
    margin: '0 auto',
  },
  image: {
    width: 75
  },
  button: {
    width: 200,
    backgroundColor: '#ddd',
    cursor: 'pointer',
    height: 30,
    margin: '0px 0px 8px'
  }
}

export default App;