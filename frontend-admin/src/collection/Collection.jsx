import { useEffect, useState } from 'react'
import { fetchWrapper } from '_helpers'
import { useParams } from 'react-router-dom'
import { Row, Col, Form, Button } from 'react-bootstrap'
import 'react-quill/dist/quill.snow.css'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from 'react-router-dom'

export { Collection }

function Collection(props) {
  let { id } = useParams()
  let navigate = useNavigate()
  const [name, setName] = useState(undefined)

  const fetchCollection = async () => {
    let collection = await fetchWrapper.get(
      `${process.env.REACT_APP_API_URL}/backend/collection/?id=${id}`,
    )
    setName(collection.name)
  }


  useEffect(() => {
    !props.blank && fetchCollection()
  })

  const handleSubmit = async () => {
    let data = {
      name: name,
    }
    props.blank
      ? await fetchWrapper.post(
          `${process.env.REACT_APP_API_URL}/backend/collection/`,
          data,
        ) && navigate(-1)
      : await fetchWrapper.put(
          `${process.env.REACT_APP_API_URL}/backend/collection/?id=${id}`,
          data,
        ) && navigate(-1)
  }

  const handleDelete = async () => {
    await fetchWrapper.delete(`${process.env.REACT_APP_API_URL}/backend/collection/?id=${id}`) && navigate(-1)
  }

  return (
    <>
      <h2>Collection</h2>
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
          <div className="text-end">
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
