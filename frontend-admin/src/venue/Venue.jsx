import { useEffect, useState } from 'react'
import { fetchWrapper } from '_helpers'
import { useParams } from 'react-router-dom'
import { Row, Col, Form, Button } from 'react-bootstrap'
import 'react-quill/dist/quill.snow.css'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from 'react-router-dom'

export { Venue }

function Venue(props) {
  let { id } = useParams()
  let navigate = useNavigate()
  const [name, setName]= useState(undefined)
  const [address, setAddress] = useState(undefined)
  const [subvenue, setSubVenue] = useState(undefined)
  const [city, setCity] = useState(0)
  const [cities, setCities] = useState([])

  const fetchVenue = async () => {
    let venue = await fetchWrapper.get(
      `${process.env.REACT_APP_API_URL}/backend/venue/?id=${id}`,
    )
    setName(venue.name)
    setAddress(venue.address)
    setSubVenue(venue.subvenue)
    setCity(venue.city)
  }

  const fetchCities = async () => {
    let cities = await fetchWrapper.get(`${process.env.REACT_APP_API_URL}/backend/city/?no_page`)
    setCities(cities)
    setCity(cities[0].id)
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
      city: city
    }
    console.log(data)
    props.blank ?
    await fetchWrapper.post(`${process.env.REACT_APP_API_URL}/backend/venue/`, data) && navigate(-1)
    : await fetchWrapper.put(`${process.env.REACT_APP_API_URL}/backend/venue/?id=${id}`, data) && navigate(-1)
  }

  const handleDelete = async () => {
    await fetchWrapper.delete(`${process.env.REACT_APP_API_URL}/backend/venue/?id=${id}`) && navigate(-1)
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
      )}
    </>
  )
}
