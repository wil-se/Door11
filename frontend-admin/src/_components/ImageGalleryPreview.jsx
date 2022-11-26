import React from 'react'
import { Row, Col, Button, Card } from 'react-bootstrap'
import { fetchWrapper, authHeader } from '_helpers'


export function ImageGalleryPreview(props) {
  // console.log("pp", props)
  const handleRemove = async () => {
    if (props.image.image.id) {
      let l = Array.from(props.selectedImages)
      l.splice(props.image.index, 1)
      props.setSelectedImages(l)
      const url = `${process.env.REACT_APP_API_URL}/backend/image/?id=${props.image.image.id}&gallery=${props.gallery}`
      await fetchWrapper.delete(url)
    } else {
      let l = Array.from(props.toUpload)
      l.splice(props.image.index, 1)
      props.setToUpload(l)
    }
  }
  const url = props.image.image.file ? props.image.image.file : URL.createObjectURL(props.image.image)
  
  return (
    <Card style={{ height: 250 }} className="mb-4 mx-2">
      <Card.Body>
      <img
        alt="not found"
        width={'150px'}
        src={url}
      />
      </Card.Body>
      <Card.Footer className='text-center'>
          <Button onClick={handleRemove}>Remove</Button>
      </Card.Footer>
    </Card>
  )
}
