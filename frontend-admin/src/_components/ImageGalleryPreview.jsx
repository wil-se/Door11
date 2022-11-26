import React from 'react'
import { Row, Col, Button, Card, Modal } from 'react-bootstrap'
import { fetchWrapper, authHeader } from '_helpers'
import { useState } from 'react';


export function ImageGalleryPreview(props) {
  // console.log("pp", props)
  const [modalShow, setModalShow] = useState(false);

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
    <>
      <Card style={{ height: 250, width: 186 }} className="mb-3 mx-2">
        <Card.Header className='text-center'>
          <b>{props.image.image.name.slice(0, 16)}</b>
        </Card.Header>
        <Card.Body className='p-0'>
          <img
            alt="not found"
            width={'100%'}
            height={'100%'}
            src={url}
            onClick={() => setModalShow(true)}
            style={{objectFit: 'cover'}}
          />
        </Card.Body>
        <Card.Footer className='text-center'>
          <Button className='removebutton' onClick={handleRemove}>Remove</Button>
        </Card.Footer>
      </Card>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

        <Modal.Header closeButton>
          {/* <Modal.Title id="contained-modal-title-vcenter">
            Preview
          </Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <img
            alt="not found"
            width={'100%'}
            src={url}
            onClick={() => setModalShow(true)}
          />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer> */}
      </Modal>
    </>
  )
}
