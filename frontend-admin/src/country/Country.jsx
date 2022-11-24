import { useEffect, useState } from 'react'
import { fetchWrapper } from '_helpers'
import { useParams } from 'react-router-dom'
import { Row, Col, Form, Button, FormControl } from 'react-bootstrap'
import 'react-quill/dist/quill.snow.css'
import 'react-datepicker/dist/react-datepicker.css'
import { propTypes } from 'react-bootstrap/esm/Image'
import { useNavigate } from 'react-router-dom'

export { Country }

function Country(props) {
  let { id } = useParams()
  const [country, setCountry] = useState(undefined)
  const [name, setName] = useState(undefined)
  let navigate = useNavigate()

  const fetchCountry = async () => {
    let country = await fetchWrapper.get(
      `${process.env.REACT_APP_API_URL}/backend/country/?id=${id}`,
    )
    setCountry(country)
    setName(country.name)
  }

  useEffect(() => {
    !props.blank && fetchCountry()
  }, [])

  const handleSubmit = async () => {
    let data = {
      name: name,
    }
    props.blank
      ? await fetchWrapper.post(
          `${process.env.REACT_APP_API_URL}/backend/country/`,
          data,
        ) && navigate(-1)
      : await fetchWrapper.put(
          `${process.env.REACT_APP_API_URL}/backend/country/?id=${id}`,
          data,
        ) && navigate(-1)
  }

  const handleDelete = async () => {
    await fetchWrapper.delete(
      `${process.env.REACT_APP_API_URL}/backend/country/?id=${id}`,
    ) && navigate(-1)
  }

  return (
    <>
      <h2>Country</h2>
      {
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
          <div className="text-center">
            <Button className="mx-1" onClick={handleSubmit} variant="primary">
              {props.blank ? 'Create' : 'Update'}
            </Button>
            {!props.blank && (
              <Button className="mx-1" onClick={handleDelete} variant="primary">
                Delete
              </Button>
            )}
          </div>
        </Form>
      }
    </>
  )
}
