import React, { useState, useEffect } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { fetchWrapper, authHeader } from '_helpers'
import axios from 'axios'
import { ImageGalleryUpload } from './ImageGalleryUpload'
import { ImageGalleryPreview } from './ImageGalleryPreview'
import { ListManager } from "react-beautiful-dnd-grid";


const Display = (props) => {

  const [selectedImages, setSelectedImages] = useState([])
  const [toUpload, setToUpload] = useState([])
  const [allImages, setAllImages] = useState([])
  const [cardList, setCardList] = useState([])
  const [orderList, setOrderList] = useState([])

  const handleUpload = async () => {
    var count = 0;
    orderList.forEach(o => {
      const formData = new FormData()
      if (o.id === -1) {
        const url = `${process.env.REACT_APP_API_URL}/backend/image/?gallery=${props.gallery.id}`
        let file;
        toUpload.forEach(f => {
          if(f.name === o.image.name) {
            file = f
          }
        })
        formData.append('file', file)
        formData.append('name', file.name)
        formData.append('order', count++)

        let auth = authHeader(url)
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: auth['Authorization'],
          },
        }
      axios.post(url, formData, config)
      } else {
        const url = `${process.env.REACT_APP_API_URL}/backend/image/?gallery=${props.gallery.id}&id=${o.image.id}`
        let auth = authHeader(url)
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: auth['Authorization'],
          },
        }
      axios.put(url, {order: count++}, config)
      }
    })
    
  }

  useEffect(() => {
    props.gallery && setSelectedImages(props.gallery.images)
  }, [props.gallery])

  const reorderList = (sourceIndex, destinationIndex) => {
    if (destinationIndex === sourceIndex) {
      return;
    }
    const list = orderList;
    if (destinationIndex === 0) {
      list[sourceIndex].order = list[0].order - 1;
      setOrderList(sortList(list));
      return;
    }
    if (destinationIndex === list.length - 1) {
      list[sourceIndex].order = list[list.length - 1].order + 1;
      setOrderList(sortList(list));
      return;
    }
    if (destinationIndex < sourceIndex) {
      list[sourceIndex].order = (list[destinationIndex].order + list[destinationIndex - 1].order) / 2;
      setOrderList(sortList(list));
      return;
    }
    list[sourceIndex].order = (list[destinationIndex].order + list[destinationIndex + 1].order) / 2;
    setOrderList(sortList(list));
  }

  function sortList(list) {
    return list.slice().sort((first, second) => first.order - second.order);
  }

  useEffect(() => {
    if (selectedImages) {
    // setAllImages(selectedImages.concat(toUpload))
    setSelectedImages(selectedImages.sort((a, b) => {return a.order - b.order}))
    let count = 0;
    let maxID = 0;
    let sol = []
    let scards = selectedImages.map((i, index) => {
      if (i.id > maxID)
        maxID = i.id
      sol.push({id: i.id, order: count++, image: i, index: index});
      return (
        <></>
      )
    })
    let uol = []
    let ucards = toUpload.map((i, index) => {
      uol.push({id: -1, order: count++, image: {id:0, name: i.name, type: 'Looks', file: URL.createObjectURL(i)}, index: index});
      return (
        <></>
      )
    })
    setCardList(scards.concat(ucards))
    setOrderList(sol.concat(uol))
  }
  }, [selectedImages, toUpload])
  
  console.log("ol", orderList)

  return (
    <>
      <Row>
        {/* {cardList} */}
        <ListManager
        items={orderList}
        direction="horizontal"
        maxItems={4}
        render={item => <ImageGalleryPreview key={item.order+item.id} image={item} selectedImages={selectedImages} setSelectedImages={setSelectedImages} toUpload={toUpload} setToUpload={setToUpload} />}
        onDragEnd={reorderList}
      />
        <Col xs={12} md={3}>
          <ImageGalleryUpload setToUpload={setToUpload} toUpload={toUpload} />
        </Col>
      </Row>
      <Button onClick={handleUpload}>UPLOAD</Button>
    </>
  )
}

export default Display
