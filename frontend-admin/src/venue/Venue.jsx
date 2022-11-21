import { useEffect, useState } from 'react'
import { fetchWrapper } from '_helpers'
import { useParams } from 'react-router-dom'
import { Row, Col, Form, Button, FormControl } from 'react-bootstrap'
import 'react-quill/dist/quill.snow.css'
import 'react-datepicker/dist/react-datepicker.css'

export { Venue }

function Venue() {
  let { id } = useParams()
  const [venue, setVenue] = useState(undefined)
  const [name, setName]= useState(undefined)
  const [address, setAddress] = useState(undefined)
  const [subvenue, setSubVenue] = useState(undefined)
  const [toBeAnnounced, setToBeAnnounced] = useState(false)

  const fetchVenue = async () => {
    let venue = await fetchWrapper.get(
      `${process.env.REACT_APP_API_URL}/backend/venue/?id=${id}`,
    )
    console.log(venue)
    setVenue(venue)
    setName(venue.name)
    setAddress(venue.address)
    setSubVenue(venue.subvenue)
    setToBeAnnounced(venue.to_be_announced)
    console.log(toBeAnnounced)
  }

  useEffect(() => {
    fetchVenue()
  }, [])

  const handleSubmit = async () => {
    let data = {
      name: name,
      address: address,
      subvenue: subvenue,
      to_be_announced: toBeAnnounced
    }
    await fetchWrapper.put(`${process.env.REACT_APP_API_URL}/backend/venue/?id=${id}`, data)
  }

  return (
    <>
      <h2>Venue</h2>
      {venue && (
        <Form>
          <Row>
            <Col xs={12} md={3}>
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
            <Col xs={12} md={3}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  defaultValue={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Subvenue</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  defaultValue={subvenue}
                  onChange={(e) => setSubVenue(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={3} className='d-flex justify-content-end'>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                {/* <Form.Label>To be announced</Form.Label> */}
                <Form.Check
                  type={'checkbox'}
                  id={`formBasicEmail`}
                  label={`to be announced`}
                  defaultChecked={toBeAnnounced}
                  onChange={e => setToBeAnnounced(e.target.checked)}
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
