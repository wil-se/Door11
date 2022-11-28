import { useEffect, useState } from 'react'
import { fetchWrapper } from '_helpers'
import { useParams } from 'react-router-dom'
import { Row, Col, Form, Button, Tab, Nav } from 'react-bootstrap'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from 'react-router-dom'
import Display from '_components/Display'

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
  let navigate = useNavigate()
  const [brands, setBrands] = useState([])
  const [collections, setCollections] = useState([])
  const [seasons, setSeasons] = useState([])
  const [venue, setVenue] = useState([])
  const [value, setValue] = useState('')
  const [cities, setCities] = useState([])
  const [eventSets, setEventSets] = useState([])
  const [looks, setLooks] = useState({})
  const [closeUps, setCloseUps] = useState({})
  const [vibes, setVibes] = useState({})
  const [backstage, setBackstage] = useState({})
  const [firstLooks, setFirstLooks] = useState({})
  const [people, setPeople] = useState({})

  const [formTitle, setFormTitle] = useState('')
  const [formStatus, setFormStatus] = useState('Private')
  const [formType, setFormType] = useState(props.type ? props.type : 'Article')
  const [formDate, setFormDate] = useState(new Date())
  const [formBrands, setFormBrands] = useState([])
  const [formCollection, setFormCollection] = useState(-1)
  const [formSeason, setFormSeason] = useState(-1)
  const [formYear, setFormYear] = useState(undefined)
  const [formVenue, setFormVenue] = useState(-1)
  const [formCity, setFormCity] = useState(-1)
  const [formEventSet, setFormEventSet] = useState(-1)
  const [formToBeAnnounced, setFormToBeAnnounced] = useState(false)

  const fetchPost = async () => {
    let post
    post = await fetchWrapper.get(
      `${process.env.REACT_APP_API_URL}/backend/post/?id=${id}`,
    )
    setValue(post.content)
    setFormTitle(post.title)
    setFormType(post.type)
    setFormDate(new Date(post.date))
    setFormBrands(post.brand)
    post.collection && setFormCollection(post.collection)
    post.season && setFormSeason(post.season)
    setFormYear(post.year)
    post.venue && setFormVenue(post.venue)
    setFormStatus(post.status)
    post.event_set && setFormEventSet(post.event_set)
    post.city && setFormCity(post.city)
    setFormToBeAnnounced(post.to_be_announced)
    // console.log(post.gallery)

    var tgall = structuredClone(post.gallery)
    tgall.images = []

    let types = {
      'Looks': structuredClone(tgall),
      'Close-Ups': structuredClone(tgall),
      'Vibes': structuredClone(tgall),
      'Backstage': structuredClone(tgall),
      'First Looks': structuredClone(tgall),
      'People': structuredClone(tgall)
    }

    post.gallery.images.forEach(i => {
      types[i.type].images.push(i)
    })

    setLooks(types['Looks'])
    setCloseUps(types['Close-Ups'])
    setVibes(types['Vibes'])
    setBackstage(types['Backstage'])
    setFirstLooks(types['First Looks'])
    setPeople(types['People'])

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
  }
  const fetchSeasons = async () => {
    let seasons = await fetchWrapper.get(
      `${process.env.REACT_APP_API_URL}/backend/season/?no_page`,
    )
    setSeasons(seasons)
  }
  const fetchCities = async () => {
    let cities = await fetchWrapper.get(
      `${process.env.REACT_APP_API_URL}/backend/city/?no_page`,
    )
    setCities(cities)
  }
  const fetchVenue = async () => {
    let venue = await fetchWrapper.get(
      `${process.env.REACT_APP_API_URL}/backend/venue/?no_page`,
    )
    setVenue(venue)
  }
  const fetchEventSets = async () => {
    let eventSets = await fetchWrapper.get(
      `${process.env.REACT_APP_API_URL}/backend/eventset/?no_page`,
    )
    setEventSets(eventSets)
  }

  const getBrandName = (brandID) => {
    console.log(brandID)
    for (let i = 0; i < brands.length; i++) {
      if (parseInt(brands[i].id) === parseInt(brandID)) {
        console.log('match', brands[i].name)
        return brands[i].name
      }
    }
  }

  const getCollectionName = (collectionID) => {
    console.log(collectionID)
    for (let i = 0; i < collections.length; i++) {
      if (parseInt(collections[i].id) === parseInt(collectionID)) {
        console.log('match', collections[i].name)
        return collections[i].name
      }
    }
  }

  const generateTitle = async () => {
    var brandTitleList = formBrands.map(b => getBrandName(b))
    var coll = getCollectionName(formCollection)
    console.log(formYear)
    setFormTitle(`${brandTitleList.join(' x ')} ${coll ? coll + ' ' : ''}${formYear}`)
  }

  useEffect(() => {
    // dispatch(postActions.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    !props.blank && fetchPost()
    fetchBrands()
    fetchCollections()
    fetchSeasons()
    fetchVenue()
    fetchCities()
    fetchEventSets()

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
      year: parseInt(formYear),
      content: value,
      to_be_announced: formToBeAnnounced
    }
    if (formCity >= 0) data.city = formCity
    if (formCollection >= 0) data.collection = formCollection
    if (formVenue >= 0) data.venue = formVenue
    if (formSeason >= 0) data.season = formSeason
    if (formEventSet >= 0) data.event_set = formEventSet
    console.log(data)
    props.blank
      ? (await fetchWrapper.post(
        `${process.env.REACT_APP_API_URL}/backend/post/`,
        data,
      )) && navigate(-1)
      : (await fetchWrapper.put(
        `${process.env.REACT_APP_API_URL}/backend/post/?id=${id}`,
        data,
      )) && navigate(-1)
  }

  const handleDelete = async () => {
    ; (await fetchWrapper.delete(
      `${process.env.REACT_APP_API_URL}/backend/post/?id=${id}`,
    )) && navigate(-1)
  }

  return (
    <>
      {props.blank ? <h2>New {formType}</h2> : <h2>{formType}</h2>}
      {
        <Form>
          <Row>
            <Col xs={12} md={10}>
              <Row>
                <Col xs={12} md={11}>
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
                <Col xs={12} md={1} className="d-flex align-items-center justify-content-end">
                  <Button onClick={() => { generateTitle() }} className='mt-2 p-1 pt-0'>Generate</Button>
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
                      <option value={-1}>----</option>
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
                      <option value={-1}>----</option>
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
                      placeholder="Enter year"
                      defaultValue={formYear}
                      onChange={(e) => setFormYear(e.target.value)}
                      min={1990}
                      max={6969}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="disabledSelect">City</Form.Label>
                    <Form.Select
                      value={formCity}
                      onChange={(e) => setFormCity(e.target.value)}
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
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="disabledSelect">Venue</Form.Label>
                    <Form.Select
                      value={formVenue}
                      onChange={(e) => setFormVenue(e.target.value)}
                      id="disabledSelect"
                    >
                      <option value={-1}>----</option>
                      {venue.map((v) => (
                        <option value={v.id} key={v.id}>
                          {v.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={12} md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="disabledSelect">Event set</Form.Label>
                    <Form.Select
                      value={formEventSet}
                      onChange={(e) => setFormEventSet(e.target.value)}
                      id="disabledSelect"
                    >
                      <option value={-1}>----</option>
                      {eventSets.map((e) => (
                        <option value={e.id} key={e.id}>
                          {e.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={12} md={3} className='d-flex align-items-center'>
                  <Form.Group className="" controlId="formBasicEmail">
                    {/* <Form.Label>To be announced</Form.Label> */}
                    <Form.Check
                      type={'checkbox'}
                      id={`formBasicEmail`}
                      label={`to be announced`}
                      checked={formToBeAnnounced}
                      onChange={e => setFormToBeAnnounced(e.target.checked)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={2}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledSelect">Brands</Form.Label>
                <Form.Select
                  className="multiple-select"
                  multiple
                  value={formBrands}
                  onChange={(e) => {
                    setFormBrands(
                      Array.from(e.target.selectedOptions).map((v) => v.value),
                    );
                  }
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
          <Row>
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
            <Col xs={12} className='mb-5'>
              <label className='form-label'>Galleries</label>
              <Tab.Container id="left-tabs-example" defaultActiveKey="looks">
                <Row>
                  <Col sm={2}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="looks">Looks</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="closeups">Close-Ups</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="vibes">Vibes</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="backstage">Backstage</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="firstlooks">First Looks</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="people">People</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={10}>
                    <Tab.Content>
                      <Tab.Pane eventKey="looks">
                        <Display gallery={looks} type={'Looks'} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="closeups">
                        <Display gallery={closeUps} type={'Close-Ups'} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="vibes">
                        <Display gallery={vibes} type={'Vibes'} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="backstage">
                        <Display gallery={backstage} type={'Backstage'} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="firstlooks">
                        <Display gallery={firstLooks} type={'First Looks'} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="people">
                        <Display gallery={people} type={'People'} />
                      </Tab.Pane>

                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className='mb-5'>
              <div className="text-end">
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
          </Row>
        </Form>
      }
    </>
  )
}
