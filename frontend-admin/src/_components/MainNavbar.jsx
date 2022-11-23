import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '_store'
import { Nav, Navbar, Container, NavDropdown, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export { MainNavbar }

function MainNavbar() {
  const authUser = useSelector((x) => x.auth.user)
  const dispatch = useDispatch()
  const logout = () => dispatch(authActions.logout())

  // only show nav when logged in
  if (!authUser) return null

  return (
    <Navbar
      responsive
      expand="md"
      className="d-flex justify-content-between"
    >
      <Link to={'/'}><Navbar.Brand><h1>Door11</h1></Navbar.Brand></Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav d-flex" className="justify-content-end">
        <Nav>
            <NavDropdown title="Create" id="navbarScrollingDropdown">
              <Nav.Link className="dropdown-item" href={'/post/event'}>
                Event
              </Nav.Link>
              <Nav.Link className="dropdown-item" href={'/post/article'}>
                Article
              </Nav.Link>
              <NavDropdown.Divider />
              <Link className="dropdown-item" to={'/brand'}>
                Brand
              </Link>
              <Link className="dropdown-item" to={'/collection'}>
                Collection
              </Link>
              <Link className="dropdown-item" to={'/season'}>
                Season
              </Link>
              <Link className="dropdown-item" to={'/city'}>
                City
              </Link>
              <Link className="dropdown-item" to={'/venue'}>
                Venue
              </Link>
            </NavDropdown>
            <Link className="mx-md-2" to={'/events'}>
            <Navbar.Text>Events</Navbar.Text>
            </Link>
            <Link className="mx-md-2" to={'/articles'}>
            <Navbar.Text>Articles</Navbar.Text>
            </Link>
            <Link className="mx-md-2" to={'/brands'}>
            <Navbar.Text>Brands</Navbar.Text>
            </Link>
            <Link className="mx-md-2" to={'/collections'}>
            <Navbar.Text>Collections</Navbar.Text>
            </Link>
            <Link className="mx-md-2" to={'/seasons'}>
            <Navbar.Text>Seasons</Navbar.Text>
            </Link>
            <Link className="mx-md-2" to={'/cities'}>
            <Navbar.Text>Cities</Navbar.Text>
            </Link>
            <Link className="mx-md-2" to={'/venues'}>
            <Navbar.Text>Venues</Navbar.Text>
            </Link>
            <Link className="mx-md-2" to={'/'} onClick={logout}>
            <Navbar.Text>Logout</Navbar.Text>
            </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
