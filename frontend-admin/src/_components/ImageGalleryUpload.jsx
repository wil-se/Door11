import React from "react";
import { Row, Col, Button, Card } from 'react-bootstrap'


export function ImageGalleryUpload(props) {
  
  const handleToUpload = (event) => {
    var l = props.toUpload
    Array.from(event.target.files).forEach(f => l.push(f))
    props.setToUpload([...l])
  }
  
  return (
        <Card style={{height: 250}}>
            UPLOAD
            <input
          type="file"
          name="images"
          multiple="multiple"
          onChange={(event) => {handleToUpload(event)}}
        />
        </Card>
    )
}