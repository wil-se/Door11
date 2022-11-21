import { useEffect, useState } from 'react'
import { fetchWrapper } from '_helpers'
import { useParams } from 'react-router-dom'
import { Row, Col, Form, Button, FormControl } from 'react-bootstrap'
import 'react-quill/dist/quill.snow.css';
import "react-datepicker/dist/react-datepicker.css";


export { Season }

function Season() {
  let { id } = useParams()
  const [season, setSeason] = useState(undefined)
  const [name, setName] = useState(undefined)

  const fetchSeason = async () => {
    let season = await fetchWrapper.get(`${process.env.REACT_APP_API_URL}/backend/season/?id=${id}`)
    setSeason(season)
    setName(season.name)
  }

  useEffect(() => {
    fetchSeason()
  }, [])

  const handleSubmit = async () => {
    let data = {
      name: name
    }
    await fetchWrapper.put(`${process.env.REACT_APP_API_URL}/backend/season/?id=${id}`, data)
  }

  return (
    <>
    <h2>Season</h2>
      {season && (
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
