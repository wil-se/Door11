import React from "react";
import { Row, Col, Button, Card } from 'react-bootstrap'


export function ImageGalleryUpload(props) {
    return (
        <Card style={{height: 250}}>
            UPLOAD
            <input
          type="file"
          name="images"
          multiple="multiple"
          onChange={(event) => {
            console.log(event.target.files)
            props.setSelectedImages(event.target.files)
          }}
        />
        </Card>
    )
}