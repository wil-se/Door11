import React from 'react'
import { Row, Col, Button, Card } from 'react-bootstrap'

export function ImageGalleryPreview(props) {
  const handleRemove = () => {
    let l = Array.from(props.selectedImages)
    l.splice(props.index, 1)
    props.setSelectedImages(l)
  }
  return (
    <Card style={{ height: 250 }} className="mb-4">
      <Card.Body>
      <img
        alt="not found"
        width={'100%'}
        src={URL.createObjectURL(props.image)}
      />
      </Card.Body>
      <Card.Footer className='text-center'>
          <Button onClick={handleRemove}>Remove</Button>
      </Card.Footer>
    </Card>
  )
}
