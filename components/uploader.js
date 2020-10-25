import React, { useState } from 'react';
import { createProduct as CreateProduct } from "../src/graphql/mutations";
import { v4 as uuid } from 'uuid'
import {  API, graphqlOperation, Storage } from "aws-amplify";
import {Button,Form} from 'react-bootstrap';
import config from '../src/aws-exports'


const {
    aws_user_files_s3_bucket: bucket
  } = config



export default function Uploader(){

    const [file, updateFile] = useState(null)
    const [productName, updateProductName] = useState('')
    
  
    function handleChange() {
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



    return(
         <div>
          <hr/>

          <Form >
            <Form.Group>
              <Form.File custom id="exampleFormControlFile1"   label={productName} onChange={handleChange}/>
            </Form.Group>
          </Form>        
          <Button  type="submit" onClick={createProduct} variant="outline-primary" >Upload</Button>

            <hr/>

        </div>
        
      )
}



/**
 *  <input
                  type="file"
                  onChange={handleChange}
                  style={{margin: '10px 0px'}}
              />

              <Button
                onClick={createProduct}>
                  
                  Upload! Picture
              </Button>   
 */



