import { useEffect, useState } from 'react'
import { fetchWrapper } from '_helpers'
import { useParams } from 'react-router-dom'
import { Row, Col, Form, Button, FormControl } from 'react-bootstrap'
import 'react-quill/dist/quill.snow.css';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


export { Eventset }

function Eventset(props) {
  let { id } = useParams()
  const [eventSet, setEventSet] = useState(undefined)
  const [name, setName] = useState(undefined)
  const [cities, setCities] = useState([])
  const [city, setCity] = useState(-1)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
 

  let navigate = useNavigate()

  const fetchEventSet = async () => {
    let eventSet = await fetchWrapper.get(`${process.env.REACT_APP_API_URL}/backend/eventset/?id=${id}`)
    console.log(eventSet)
    setEventSet(eventSet)
    setName(eventSet.name)
    setCity(eventSet.city)
    setStartDate(new Date(eventSet.start_date))
    setEndDate(new Date(eventSet.end_date))
  }

  const fetchCities = async () => {
    let cities = await fetchWrapper.get(
      `${process.env.REACT_APP_API_URL}/backend/city/?no_page`,
    )
    setCities(cities)
  }

  useEffect(() => {
    !props.blank && fetchEventSet()
    fetchCities()
  }, [])

  const handleSubmit = async () => {
    let data = {
      name: name,
      start_date: startDate,
      end_date: endDate
    }
    if (city >= 0)
      data.city = city
    console.log(data)
    props.blank ?
    await fetchWrapper.post(`${process.env.REACT_APP_API_URL}/backend/eventset/`, data) && navigate(-1)
    : await fetchWrapper.put(`${process.env.REACT_APP_API_URL}/backend/eventset/?id=${id}`, data) && navigate(-1)
  }

  const handleDelete = async () => {
    await fetchWrapper.delete(`${process.env.REACT_APP_API_URL}/backend/eventset/?id=${id}`) && navigate(-1)
  }

  return (
    <>
    <h2>Event set</h2>
      {(
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
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledSelect">City</Form.Label>
                  <Form.Select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    id="disabledSelect"
                  >
                    <option value={-1}>----</option>
                    {cities.map((c) => (
                      <option value={c.id} key={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} md={3}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Start Date</Form.Label>
                  <DatePicker
                    className="form-control"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={3}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>End Date</Form.Label>
                  <DatePicker
                    className="form-control"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
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
