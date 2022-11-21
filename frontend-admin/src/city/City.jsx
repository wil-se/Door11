import { useEffect, useState } from 'react'
import { fetchWrapper } from '_helpers'
import { useParams } from 'react-router-dom'
import { Row, Col, Form, Button, FormControl } from 'react-bootstrap'
import 'react-quill/dist/quill.snow.css';
import "react-datepicker/dist/react-datepicker.css";


export { City }

function City() {
  let { id } = useParams()
  const [city, setCity] = useState(undefined)
  
  const fetchCity = async () => {
    let city = await fetchWrapper.get(`${process.env.REACT_APP_API_URL}/backend/city/?id=${id}`)
    setCity(city)
  }

  useEffect(() => {
    fetchCity()
  }, [])

  const handleSubmit = async () => {
    let data = {}
    // await fetchWrapper.put(`${process.env.REACT_APP_API_URL}/backend/post/?id=${id}`, data)
  }

  return (
    <>
    <h2>City</h2>
      {city && (
        <Form>
          <Row>
          <Col xs={12} md={12}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  defaultValue={city.name}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="text-center">
              <Col>
                <Button onClick={handleSubmit} variant="primary">
                  Update
                </Button>
              </Col>
            </Row>
        </Form>
      )}
    </>
  )
}
