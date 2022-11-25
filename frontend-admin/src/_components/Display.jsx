import React, { useState } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { fetchWrapper, authHeader } from '_helpers'
import axios from 'axios'
import { ImageGalleryUpload } from './ImageGalleryUpload'
import { ImageGalleryPreview } from './ImageGalleryPreview'

const Display = () => {
  const [selectedImages, setSelectedImages] = useState([])

  const handleUpload = async () => {
    const url = `${process.env.REACT_APP_API_URL}/backend/image/`
    const formData = new FormData()
    formData.append('file', selectedImages[0])
    formData.append('name', selectedImages[0].name)
    let auth = authHeader(url)
    console.log(auth)
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: auth['Authorization'],
      },
    }
    axios.post(url, formData, config)
  }

  return (
    <>
      <Row>
        {Array.from(selectedImages).map((i, index) => {
          return (
            <Col key={index} xs={12} md={3}><ImageGalleryPreview key={index} index={index} image={i} selectedImages={selectedImages} setSelectedImages={setSelectedImages}/></Col>
          )
        })}

        {/* <input
          type="file"
          name="images"
          multiple="multiple"
          onChange={(event) => {
            console.log(event.target.files)
            setSelectedImages(event.target.files)
          }}
        /> */}
        <Col xs={12} md={3}>
          <ImageGalleryUpload setSelectedImages={setSelectedImages}/>
        </Col>
      </Row>
      {/* <Button onClick={handleUpload}>UPLOAD</Button> */}
    </>
  )
}

export default Display
