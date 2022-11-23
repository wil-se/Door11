import { useEffect, useState } from 'react'
import { fetchWrapper } from '_helpers'
import { useParams } from 'react-router-dom'
import { Row, Col, Form, Button, FormControl } from 'react-bootstrap'
import 'react-quill/dist/quill.snow.css'
import 'react-datepicker/dist/react-datepicker.css'

export { Venue }

function Venue(props) {
  let { id } = useParams()
  const [venue, setVenue] = useState(undefined)
  const [name, setName]= useState(undefined)
  const [address, setAddress] = useState(undefined)
  const [subvenue, setSubVenue] = useState(undefined)
  const [toBeAnnounced, setToBeAnnounced] = useState(false)
  const [city, setCity] = useState('')
  const [cities, setCities] = useState([])

  const fetchVenue = async () => {
    let venue = await fetchWrapper.get(
      `${process.env.REACT_APP_API_URL}/backend/venue/?id=${id}`,
    )
    setVenue(venue)
    setName(venue.name)
    setAddress(venue.address)
    setSubVenue(venue.subvenue)
    setToBeAnnounced(venue.to_be_announced)
    setCity(venue.city)
  }

  const fetchCities = async () => {
    let cities = await fetchWrapper.get(`${process.env.REACT_APP_API_URL}/backend/city/?no_page`)
    setCities(cities)
  }

  useEffect(() => {
    !props.blank && fetchVenue()
    fetchCities()
  }, [])

  const handleSubmit = async () => {
    let data = {
      name: name,
      address: address,
      subvenue: subvenue,
      to_be_announced: toBeAnnounced,
      city: city
    }
    props.blank ?
    await fetchWrapper.post(`${process.env.REACT_APP_API_URL}/backend/venue/`, data)
    : await fetchWrapper.put(`${process.env.REACT_APP_API_URL}/backend/venue/?id=${id}`, data)
  }

  const handleDelete = async () => {
    await fetchWrapper.delete(`${process.env.REACT_APP_API_URL}/backend/venue/?id=${id}`)
  }

  return (
    <>
      <h2>Venue</h2>
      {(
        <Form>
          <Row>
          <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledSelect">City</Form.Label>
                <Form.Select value={city} onChange={e => setCity(e.target.value)} id="disabledSelect">
                  {cities.map(c => <option value={c.id} key={c.id}>{c.name}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
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
            <Col xs={12} md={3} className=''>
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
      )}
    </>
  )
}
