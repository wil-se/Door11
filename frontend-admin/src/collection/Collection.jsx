import { useEffect, useState } from 'react'
import { fetchWrapper } from '_helpers'
import { useParams } from 'react-router-dom'
import { Row, Col, Form, Button, FormControl } from 'react-bootstrap'
import 'react-quill/dist/quill.snow.css';
import "react-datepicker/dist/react-datepicker.css";


export { Collection }

function Collection() {
  let { id } = useParams()
  const [post, setPost] = useState(undefined)
  
  const fetchVenue = async () => {
    let venue = await fetchWrapper.get(`${process.env.REACT_APP_API_URL}/backend/venue/`)
  }

  useEffect(() => {
  }, [])

  const handleSubmit = async () => {
    let data = {}
    // await fetchWrapper.put(`${process.env.REACT_APP_API_URL}/backend/post/?id=${id}`, data)
  }

  return (
    <>
      {post && (
        <Form>
          <Row>

          </Row>
        </Form>
      )}
    </>
  )
}
