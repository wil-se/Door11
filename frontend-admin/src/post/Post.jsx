import { useEffect, useState } from 'react'
import { fetchWrapper } from '_helpers'
import { useParams } from 'react-router-dom'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { parseDateTime, parseYear } from '_helpers'

export { Post }

function Post() {
  const [post, setPost] = useState(undefined)
  let { id } = useParams()
  const fetchPost = async () => {
    const baseUrl = `${process.env.REACT_APP_API_URL}`
    let post = await fetchWrapper.get(`${baseUrl}/backend/post/?id=${id}`)
    setPost(post)
  }

  useEffect(() => {
    // dispatch(postActions.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchPost()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {post && (
        <Form>
          <Row>
            <Col xs={12}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  defaultValue={post.title}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledSelect">Type</Form.Label>
                <Form.Select id="disabledSelect">
                  <option>Event</option>
                  <option>Article</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter date"
                  defaultValue={parseDateTime(post.date)}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledSelect">Brand</Form.Label>
                <Form.Select id="disabledSelect">
                  <option>Gucci</option>
                  <option>Armani</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledSelect">Collection</Form.Label>
                <Form.Select id="disabledSelect">
                  <option>Test collection</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledSelect">Season</Form.Label>
                <Form.Select id="disabledSelect">
                  <option>Winter</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter date"
                  defaultValue={parseYear(post.year)}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledSelect">Season</Form.Label>
                <Form.Select id="disabledSelect">
                  <option>City</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledSelect">Venue</Form.Label>
                <Form.Select id="disabledSelect">
                  <option>Mega Location</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  placeholder="Enter content"
                  defaultValue={post.content}
                />
              </Form.Group>
            </Col>
            <Row className="text-center">
              <Col>
                <Button variant="primary" type="submit">
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
