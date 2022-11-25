import { useEffect, useState } from 'react'
import { fetchWrapper } from '_helpers'
import { useParams } from 'react-router-dom'
import { Row, Col, Form, Button, FormControl } from 'react-bootstrap'
import 'react-quill/dist/quill.snow.css';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom'


export { City }

function City(props) {
  let { id } = useParams()
  let navigate = useNavigate()
  const [city, setCity] = useState(undefined)
  const [name, setName] = useState(undefined)
  const [region, setRegion] = useState('')
  const [country, setCountry] = useState(0)
  const [countries, setCountries] = useState([])
  const [timezone, setTimezone] = useState('')
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  const fetchCity = async () => {
    let city = await fetchWrapper.get(`${process.env.REACT_APP_API_URL}/backend/city/?id=${id}`)
    setCity(city)
    setName(city.name)
    setRegion(city.region)
    setTimezone(city.timezone)
    setLatitude(city.latitude)
    setLongitude(city.longitude)
    setCountry(city.country)
  }

  const fetchCountries = async () => {
    let countries = await fetchWrapper.get(`${process.env.REACT_APP_API_URL}/backend/country/?no_page`)
    setCountries(countries)
  }

  useEffect(() => {
    !props.blank && fetchCity()
    fetchCountries()
  }, [])

  const handleSubmit = async () => {
    let data = {
      name: name,
      region: region,
      country: parseInt(country),
      timezone: timezone,
      latitude: latitude,
      longitude: longitude,
    }
    props.blank ?
    await fetchWrapper.post(`${process.env.REACT_APP_API_URL}/backend/city/`, data) && navigate(-1)
    : await fetchWrapper.put(`${process.env.REACT_APP_API_URL}/backend/city/?id=${id}`, data) && navigate(-1)
  }

  const handleDelete = async () => {
    await fetchWrapper.delete(`${process.env.REACT_APP_API_URL}/backend/city/?id=${id}`) && navigate(-1)
  }

  return (
    <>
    <h2>City</h2>
      {(
        <Form>
          <Row>
          <Col xs={12} md={4}>
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
            <Col xs={12} md={4}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledSelect">Country</Form.Label>
                <Form.Select value={country} onChange={e => setCountry(e.target.value)} id="disabledSelect">
                  {countries.map(c => <option value={c.id} key={c.id}>{c.name}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Region</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter region"
                  defaultValue={region}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Timezone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter timezone"
                  defaultValue={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter latitude"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Longitude</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter longitude"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
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
