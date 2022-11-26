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
  const [orderList, setOrderList] = useState([])

  const handleUpload = async () => {
    var count = 0;
    orderList.slice(0, orderList.length - 1).forEach(o => {
      const formData = new FormData()
      if (o.id === -1) {
        const url = `${process.env.REACT_APP_API_URL}/backend/image/?gallery=${props.gallery.id}`
        let file;
        toUpload.forEach(f => {
          if (f.name === o.image.name) {
            file = f
          }
        })
        formData.append('file', file)
        formData.append('name', file.name)
        formData.append('order', count++)
        formData.append('type', props.type)

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
        axios.put(url, { order: count++ }, config)
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
    return list.slice().sort((first, second) => {
      if (second.id === -2)
        return -1
      return first.order - second.order
    });
  }

  useEffect(() => {
    if (selectedImages) {
      setSelectedImages(selectedImages.sort((a, b) => { return a.order - b.order }))
      let count = 0;
      let maxID = 0;
      let sol = []
      selectedImages.map((i, index) => {
        if (i.id > maxID)
          maxID = i.id
        sol.push({ id: i.id, order: count++, image: i, index: index });
      })
      let uol = []
      toUpload.map((i, index) => {
        uol.push({ id: -1, order: count++, image: { id: 0, name: i.name, type: 'Looks', file: URL.createObjectURL(i) }, index: index });
      })
      setOrderList(sol.concat(uol).concat({ id: -2, order: count, index: 0 }))
    }
  }, [selectedImages, toUpload])


  return (
    <>
      <ListManager
        items={orderList}
        direction="horizontal"
        maxItems={window.innerWidth > 600 ? 4 : 1}
        render={item => {
          return item.id !== -2 ?
            <ImageGalleryPreview key={item.order + item.id} image={item} selectedImages={selectedImages} setSelectedImages={setSelectedImages} toUpload={toUpload} setToUpload={setToUpload} />
            : <ImageGalleryUpload setToUpload={setToUpload} toUpload={toUpload} />
        }}
        onDragEnd={reorderList}
      />
      <Row className="px-3">
        <Button onClick={handleUpload}>UPDATE GALLERY</Button>
      </Row>
    </>
  )
}

export default Display
