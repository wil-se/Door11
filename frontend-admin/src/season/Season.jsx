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
  
  const fetchSeason = async () => {
    let season = await fetchWrapper.get(`${process.env.REACT_APP_API_URL}/backend/season/?id=${id}`)
    setSeason(season)
  }

  useEffect(() => {
    fetchSeason()
  }, [])

  const handleSubmit = async () => {
    let data = {}
    // await fetchWrapper.put(`${process.env.REACT_APP_API_URL}/backend/post/?id=${id}`, data)
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
                  defaultValue={season.name}
                  onChange={(e) => setSeason(e.target.value)}
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
