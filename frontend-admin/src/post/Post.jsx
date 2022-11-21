import { useEffect, useState } from 'react'
import { fetchWrapper } from '_helpers'
import { useParams } from 'react-router-dom'
import { Row, Col, Form, Button, FormControl } from 'react-bootstrap'
import { parseDateTime, parseYear } from '_helpers'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

Post.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'},],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
  ],
  clipboard: {
    matchVisual: false,
  }
}
Post.formats = [
  'header', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]


export { Post }

function Post() {
  let { id } = useParams()
  const [post, setPost] = useState(undefined)
  const [brands, setBrands] = useState([])
  const [collections, setCollections] = useState([])
  const [seasons, setSeasons] = useState([])
  const [cities, setCities] = useState([])
  const [venue, setVenue] = useState([])
  const [value, setValue] = useState('');
  
  const [formTitle, setFormTitle] = useState('')
  const [formStatus, setFormStatus] = useState('')
  const [formType, setFormType] = useState('Event')
  const [formDate, setFormDate] = useState('')
  const [formBrands, setFormBrands] = useState(0)
  const [formCollection, setFormCollection] = useState('')
  const [formSeason, setFormSeason] = useState('')
  const [formYear, setFormYear] = useState('')
  const [formCity, setFormCity] = useState('')
  const [formVenue, setFormVenue] = useState('')
  

  const fetchPost = async () => {
    let post = await fetchWrapper.get(`${process.env.REACT_APP_API_URL}/backend/post/?id=${id}`)
    setPost(post)
    setValue(post.content)
    setFormTitle(post.title)
    setFormType(post.type)
    setFormDate(new Date(post.date))
    setFormBrands(post.brand)
    setFormCollection(post.collection)
    setFormSeason(post.season)
    setFormYear(post.year)
    setFormCity(post.city)
    setFormVenue(post.venue)
  }
  const fetchBrands = async () => {
    let brands = await fetchWrapper.get(`${process.env.REACT_APP_API_URL}/backend/brand/`)
    setBrands(brands)
  }
  const fetchCollections = async () => {
    let collections = await fetchWrapper.get(`${process.env.REACT_APP_API_URL}/backend/collection/`)
    setCollections(collections)
  }
  const fetchSeasons = async () => {
    let seasons = await fetchWrapper.get(`${process.env.REACT_APP_API_URL}/backend/season/`)
    setSeasons(seasons)
  }
  const fetchCities = async () => {
    let cities = await fetchWrapper.get(`${process.env.REACT_APP_API_URL}/backend/city/`)
    setCities(cities)
  }
  const fetchVenue = async () => {
    let venue = await fetchWrapper.get(`${process.env.REACT_APP_API_URL}/backend/venue/`)
    setVenue(venue)
  }

  useEffect(() => {
    // dispatch(postActions.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchPost()
    fetchBrands()
    fetchCollections()
    fetchSeasons()
    fetchCities()
    fetchVenue()
    // eslint-disable-next-line
  }, [])

  const handleSubmit = async () => {
    console.log('formTitle: '+formTitle)
    console.log('formType: '+formType)
    console.log('formDate: '+formDate)
    console.log('formBrands: '+formBrands)
    console.log('formCollection: '+formCollection)
    console.log('formSeason: '+formSeason)
    console.log('formYear: '+formYear)
    console.log('formCity: '+formCity)
    console.log('formVenue: '+formVenue)
    console.log('value: '+value)
    let data = {
      id: id,
      title: formTitle,
      type: formType,
      // status: 'Draft',
      date: formDate,
      brand: formBrands,
      collection: formCollection,
      season: formSeason,
      year: parseInt(formYear),
      city: formCity,
      venue: formVenue,
      content: value,
    }
    await fetchWrapper.put(`${process.env.REACT_APP_API_URL}/backend/post/?id=${id}`, data)
  }

  return (
    <>
      {post && (
        <Form>
          <Row>
            <Col xs={12} md={9}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  defaultValue={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledSelect">Type</Form.Label>
                <Form.Select value={formType} onChange={e => setFormType(e.target.value)} id="disabledSelect">
                  <option value={'Event'}>Event</option>
                  <option value={'Article'}>Article</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledSelect">Status</Form.Label>
                <Form.Select value={formStatus} onChange={e => setFormStatus(e.target.value)} id="disabledSelect">
                  <option value={'Draft'}>Draft</option>
                  <option value={'Private'}>Private</option>
                  <option value={'Public'}>Public</option>
                  <option value={'Password'}>Password</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Date</Form.Label>
                <DatePicker className='form-control' selected={formDate} onChange={(date) => setFormDate(date)} />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledSelect">Collection</Form.Label>
                <Form.Select value={formCollection} onChange={e => setFormCollection(e.target.value)} id="disabledSelect">
                  {collections.map(c => <option value={c.id} key={c.id}>{c.name}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledSelect">Season</Form.Label>
                <Form.Select value={formSeason} onChange={e => setFormSeason(e.target.value)} id="disabledSelect">
                  {seasons.map(s => <option value={s.id} key={s.id}>{s.name}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter date"
                  defaultValue={formYear}
                  onChange={e => setFormYear(e.target.value)}
                  min={1990}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledSelect">City</Form.Label>
                <Form.Select value={formCity} onChange={e => setFormCity(e.target.value)} id="disabledSelect">
                  {cities.map(c => <option value={c.id} key={c.id}>{c.name}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledSelect">Venue</Form.Label>
                <Form.Select value={formVenue} onChange={e => setFormVenue(e.target.value)} id="disabledSelect">
                  {venue.map(v => <option value={v.id} key={v.id}>{v.name}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledSelect">Brands</Form.Label>
                <Form.Select size='2' multiple defaultValue={formBrands} onChange={e => setFormBrands(Array.from(e.target.selectedOptions).map(v => v.value))} id="disabledSelect">
                  {brands.map(b => <option value={b.id} key={b.id}>{b.name}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Content</Form.Label>
                <ReactQuill theme="snow" value={value} onChange={setValue} modules={Post.modules} formats={Post.formats}/>
              </Form.Group>
            </Col>
            <Row className="text-center">
              <Col>
                <Button onClick={handleSubmit} variant="primary">
                  Submit
                </Button>
              </Col>
            </Row>
          </Row>
        </Form>
      )}
    </>
  )
}
