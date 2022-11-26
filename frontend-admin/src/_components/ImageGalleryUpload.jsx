import React from "react";
import { Row, Col, Button, Card } from 'react-bootstrap'


export function ImageGalleryUpload(props) {

  const handleToUpload = (event) => {
    var l = props.toUpload
    Array.from(event.target.files).forEach(f => l.push(f))
    props.setToUpload([...l])
  }

  return (
    <Card style={{ height: 150, }} className="w-100 mb-3 mx-2 filepreview">
      <label style={{height: '100%',}} className="m-0 d-flex justify-content-center align-items-center" htmlFor="image-event" id="image-event-label">
      
      <div>DRAG AND DROP <br/> OR CLICK UPLOAD</div>
      <input
        id="upload"
        type="file"
        name="images"
        multiple="multiple"
        onChange={(event) => { handleToUpload(event) }}
      />
      </label>
    </Card>
  )
}