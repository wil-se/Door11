import { useEffect, useState } from 'react'
import { fetchWrapper } from '_helpers'
import { useParams } from 'react-router-dom'
import { Row, Col, Form, Button, FormControl } from 'react-bootstrap'
import { parseDateTime, parseYear } from '_helpers'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

Post.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
  ],
  clipboard: {
    matchVisual: false,
  },
}
Post.formats = [
  'header',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
]

export { Post }

function Post(props) {
  let { id } = useParams()
  const [post, setPost] = useState(undefined)
  const [brands, setBrands] = useState([])
  const [collections, setCollections] = useState([])
  const [seasons, setSeasons] = useState([])
  const [venue, setVenue] = useState([])
  const [value, setValue] = useState('')

  const [formTitle, setFormTitle] = useState('')
  const [formStatus, setFormStatus] = useState('Private')
  const [formType, setFormType] = useState('Article')
  const [formDate, setFormDate] = useState(new Date())
  const [formBrands, setFormBrands] = useState([])
  const [formCollection, setFormCollection] = useState('')
  const [formSeason, setFormSeason] = useState('')
  const [formYear, setFormYear] = useState(new Date().getFullYear())
  const [formVenue, setFormVenue] = useState('')

  const fetchPost = async () => {
    let post
    post = await fetchWrapper.get(
      `${process.env.REACT_APP_API_URL}/backend/post/?id=${id}`,
    )
    console.log(post)
    setPost(post)
    setValue(post.content)
    setFormTitle(post.title)
    setFormType(post.type)
    setFormDate(new Date(post.date))
    setFormBrands(post.brand)
    setFormCollection(post.collection)
    setFormSeason(post.season)
    setFormYear(post.year)
    setFormVenue(post.venue)
    setFormStatus(post.status)
  }
  const fetchBrands = async () => {
    let brands = await fetchWrapper.get(
      `${process.env.REACT_APP_API_URL}/backend/brand/?no_page`,
    )
    setBrands(brands)
  }
  const fetchCollections = async () => {
    let collections = await fetchWrapper.get(
      `${process.env.REACT_APP_API_URL}/backend/collection/?no_page`,
    )
    setCollections(collections)
    setFormCollection(collections[0].id)
  }
  const fetchSeasons = async () => {
    let seasons = await fetchWrapper.get(
      `${process.env.REACT_APP_API_URL}/backend/season/?no_page`,
    )
    setSeasons(seasons)
    setFormSeason(seasons[0].id)
  }
  const fetchVenue = async () => {
    let venue = await fetchWrapper.get(
      `${process.env.REACT_APP_API_URL}/backend/venue/?no_page`,
    )
    setVenue(venue)
    setFormVenue(venue[0].id)
  }

  useEffect(() => {
    // dispatch(postActions.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    !props.blank && fetchPost()
    fetchBrands()
    fetchCollections()
    fetchSeasons()
    fetchVenue()
    // eslint-disable-next-line
  }, [])

  const handleSubmit = async () => {
    let data = {
      id: id,
      title: formTitle,
      type: formType,
      status: formStatus,
      date: formDate,
      brand: formBrands,
      collection: formCollection,
      season: formSeason,
      year: parseInt(formYear),
      venue: formVenue,
      content: value,
    }
    console.log(data)
    props.blank
      ? await fetchWrapper.post(
          `${process.env.REACT_APP_API_URL}/backend/post/`,
          data,
        )
      : await fetchWrapper.put(
          `${process.env.REACT_APP_API_URL}/backend/post/?id=${id}`,
          data,
        )
  }

  const handleDelete = async () => {
    await fetchWrapper.delete(
      `${process.env.REACT_APP_API_URL}/backend/post/?id=${id}`,
    )
  }

  return (
    <>
      {props.blank ? <h2>New {formType}</h2> : <h2>{formType}</h2>}
      {
        <Form>
          <Row>
            <Col xs={12} md={10}>
              <Row>
              <Col xs={12} md={12}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    defaultValue={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={3}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledSelect">Type</Form.Label>
                  <Form.Select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    id="disabledSelect"
                  >
                    <option value={'Event'}>Event</option>
                    <option value={'Article'}>Article</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} md={3}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledSelect">Status</Form.Label>
                  <Form.Select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value)}
                    id="disabledSelect"
                  >
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
                  <DatePicker
                    className="form-control"
                    selected={formDate}
                    onChange={(date) => setFormDate(date)}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={3}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledSelect">Collection</Form.Label>
                  <Form.Select
                    value={formCollection}
                    onChange={(e) => setFormCollection(e.target.value)}
                    id="disabledSelect"
                  >
                    {collections.map((c) => (
                      <option value={c.id} key={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} md={3}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledSelect">Season</Form.Label>
                  <Form.Select
                    value={formSeason}
                    onChange={(e) => setFormSeason(e.target.value)}
                    id="disabledSelect"
                  >
                    {seasons.map((s) => (
                      <option value={s.id} key={s.id}>
                        {s.name}
                      </option>
                    ))}
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
                    onChange={(e) => setFormYear(e.target.value)}
                    min={1990}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={3}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledSelect">Venue</Form.Label>
                  <Form.Select
                    value={formVenue}
                    onChange={(e) => setFormVenue(e.target.value)}
                    id="disabledSelect"
                  >
                    {venue.map((v) => (
                      <option value={v.id} key={v.id}>
                        {v.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Content</Form.Label>
                  <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    modules={Post.modules}
                    formats={Post.formats}
                  />
                </Form.Group>
              </Col>
              </Row>
              <div className="text-center">
                <Button
                  className="mx-1"
                  onClick={handleSubmit}
                  variant="primary"
                >
                  {props.blank ? 'Create' : 'Update'}
                </Button>
                {!props.blank && (
                  <Button
                    className="mx-1"
                    onClick={handleDelete}
                    variant="primary"
                  >
                    Delete
                  </Button>
                )}
              </div>
            </Col>
            <Col xs={12} md={2}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledSelect">Brands</Form.Label>
                  <Form.Select
                    className='multiple-select'
                    multiple
                    value={formBrands}
                    onChange={(e) =>
                      setFormBrands(
                        Array.from(e.target.selectedOptions).map(
                          (v) => v.value,
                        ),
                      )
                    }
                    id="disabledSelect"
                  >
                    {brands.map((b) => (
                      <option value={b.id} key={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
            </Col>
          </Row>
        </Form>
      }
    </>
  )
}
