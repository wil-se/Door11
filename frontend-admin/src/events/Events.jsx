import { useEffect, useState } from 'react'
import { fetchWrapper } from '_helpers'
import PostPreview from '_components/PostPreview'
import { Row, Col, Button } from 'react-bootstrap'
import Pages from '_components/Pages'
import Form from 'react-bootstrap/Form'

export { Events }

function Events() {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')

  const fetchPosts = async () => {
    const baseUrl = `${process.env.REACT_APP_API_URL}`
    let posts = await fetchWrapper.get(
      `${baseUrl}/backend/post/?page=${currentPage}&type=event`,
    )
    setPosts(posts)
  }

  const handleSearch = async () => {
    const baseUrl = `${process.env.REACT_APP_API_URL}`
    let posts = await fetchWrapper.get(
      `${baseUrl}/backend/post/?type=article&title=${search}`,
    )
    setPosts(posts)
    setCurrentPage(1)
  }

  useEffect(() => {
    // dispatch(postActions.getAll());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchPosts()
    // eslint-disable-next-line
  }, [currentPage])

  return (
    <div>
      <h2>Events</h2>
      <Row className='d-flex justify-content-end'>
        <Col xs={12} md={4}>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={e => setSearch(e.target.value)}
            />
            <Button onClick={handleSearch} variant="primary">Search</Button>
          </Form>
        </Col>
      </Row>
      <Row>
        {posts.results &&
          posts.results.map((post) => {
            return (
              <Col key={post.id} xs={12} md={6}>
                <PostPreview key={post.id} post={post} />
              </Col>
            )
          })}
      </Row>
      <div className="d-flex justify-content-center">
        <Pages
          total={posts.total_pages}
          current={posts.current_page_number}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  )
}
