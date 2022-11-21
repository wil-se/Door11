import { useEffect, useState } from 'react'
import { fetchWrapper } from '_helpers'
import { useParams } from 'react-router-dom'
import { Row, Col, Form, Button, FormControl } from 'react-bootstrap'
import 'react-quill/dist/quill.snow.css'
import 'react-datepicker/dist/react-datepicker.css'
import { propTypes } from 'react-bootstrap/esm/Image'

export { Brand }

function Brand() {
  let { id } = useParams()
  const [brand, setBrand] = useState(undefined)
  const [name, setName] = useState(undefined)

  const fetchBrand = async () => {
    let brand = await fetchWrapper.get(
      `${process.env.REACT_APP_API_URL}/backend/brand/?id=${id}`,
    )
    setBrand(brand)
    setName(brand.name)
  }

  useEffect(() => {
    fetchBrand()
  }, [])

  const handleSubmit = async () => {
    let data = {
      name: name
    }
    await fetchWrapper.put(`${process.env.REACT_APP_API_URL}/backend/brand/?id=${id}`, data)
  }

  return (
    <>
    <h2>Brand</h2>
      { brand && (
        <Form>
          <Row>
            <Col xs={12} md={12}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
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
