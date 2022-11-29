import React, { useState, useEffect } from 'react'
import { Button, Toast } from 'react-bootstrap'
import { authHeader } from '_helpers'
import axios from 'axios'
import { ImageGalleryUpload } from './ImageGalleryUpload'
import { ImageGalleryPreview } from './ImageGalleryPreview'
import { ListManager } from "react-beautiful-dnd-grid";


const Display = (props) => {
  const [selectedImages, setSelectedImages] = useState([])
  const [toUpload, setToUpload] = useState([])
  const [orderList, setOrderList] = useState([])
  const [showNotify, setShowNotify] = useState(false);
  const toggleShowNotify = () => setShowNotify(!showNotify);

  const handleSortAZ = () => {
    let l = orderList
    l = l.slice(0, l.length - 1).sort((a, b) => { return a.name.localeCompare(b.name) })
    l.forEach((e, index) => e.order = index)
    l = l.concat({ id: -2, order: l.length, index: 0 })
    console.log("L", l)
    setOrderList(l)
  }

  const handleSortZA = () => {
    let l = orderList
    l = l.slice(0, l.length - 1).sort((a, b) => { return b.name.localeCompare(a.name) })
    l.forEach((e, index) => e.order = index)
    l = l.concat({ id: -2, order: l.length, index: 0 })
    console.log("L", l)
    setOrderList(l)
  }

  const handleSortTimeAscending = () => {
    let l = orderList
    l = l.slice(0, l.length - 1).sort((a, b) => { console.log(a.last_modified_date); return new Date(a.last_modified_date).getTime() - new Date(b.last_modified_date).getTime() })
    l.forEach((e, index) => e.order = index)
    l = l.concat({ id: -2, order: l.length, index: 0 })
    console.log("L", l)
    setOrderList(l)
  }

  const handleSortTimeDescending = () => {
    let l = orderList
    l = l.slice(0, l.length - 1).sort((a, b) => { return new Date(b.last_modified_date).getTime() - new Date(a.last_modified_date).getTime() })
    l.forEach((e, index) => e.order = index)
    l = l.concat({ id: -2, order: l.length, index: 0 })
    console.log("L", l)
    setOrderList(l)
  }

  const handleUpload = async () => {
    toggleShowNotify()
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
        console.log("form data", formData)
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
    setShowNotify(false);
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
    console.log("sorting..")
    let l = list.slice().sort((first, second) => {
      if (second.id === -2)
        return -1
      if (first.id === -2)
        return 1
      return first.order - second.order
    });
    console.log("sorting", l)
    return l;
  }

  console.log("orderList", orderList)

  useEffect(() => {
    if (selectedImages) {
      setSelectedImages(selectedImages.sort((a, b) => { return a.order - b.order }))
      let count = 0;
      let maxID = 0;
      let sol = []
      selectedImages.forEach((i, index) => {
        if (i.id > maxID)
          maxID = i.id
        sol.push({ last_modified_date: i.last_modified_date, id: i.id, order: count++, image: i, index: index, name: i.name });
      })
      let uol = []
      toUpload.forEach((i, index) => {
        uol.push({ last_modified_date: i.lastModifiedDate, id: -1, order: count++, name: i.name, image: { id: 0, name: i.name, type: 'Looks', file: URL.createObjectURL(i) }, index: index });
      })
      let final = sol.concat(uol).concat({ id: -2, order: count, index: 0 })
      console.log("final", final)
      setOrderList(final)
    }
  }, [selectedImages, toUpload])

  return (
    <>
      <ListManager
        items={orderList}
        direction="horizontal"
        maxItems={window.innerWidth > 600 ? 5 : 1}
        render={item => {
          return item.id !== -2 ?
            <ImageGalleryPreview number={orderList.indexOf(item)} key={item.order + item.id} image={item} selectedImages={selectedImages} setSelectedImages={setSelectedImages} toUpload={toUpload} setToUpload={setToUpload} />
            : <ImageGalleryUpload setToUpload={setToUpload} toUpload={toUpload} />
        }}
        onDragEnd={reorderList}
      />
      <div className="px-2">
        <Button className="me-1" onClick={handleUpload}>UPDATE {props.type.toUpperCase()}</Button>
        <Button className="mx-1" onClick={handleSortAZ}>Sort A-Z</Button>
        <Button className="mx-1" onClick={handleSortZA}>Sort Z-A</Button>
        <Button className="mx-1" onClick={handleSortTimeAscending}>Sort Time Ascending</Button>
        <Button className="mx-1" onClick={handleSortTimeDescending}>Sort Time Descending</Button>
      </div>

      <Toast style={{ position: 'fixed', top: 60, right: 60 }} show={showNotify} onClose={toggleShowNotify}>
        <Toast.Header>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded me-2"
            alt=""
          />
          <strong className="me-auto">Loading</strong>
        </Toast.Header>
        <Toast.Body>Updating gallery, please wait</Toast.Body>
      </Toast>
    </>
  )
}

export default Display
