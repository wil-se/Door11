import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '_store'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown';

export { MainNavbar }

function MainNavbar() {
  const authUser = useSelector((x) => x.auth.user)
  const dispatch = useDispatch()
  const logout = () => dispatch(authActions.logout())

  // only show nav when logged in
  if (!authUser) return null

  return (
    <Navbar sticky="top" className="d-flex justify-content-center">
      <Nav className="d-flex justify-content-center">
        <NavDropdown title="Create" id="navbarScrollingDropdown">
        <Link className='dropdown-item' to={'/post'}>Event</Link>
        <Link className='dropdown-item' to={'/post'}>Article</Link>
        <Link className='dropdown-item' to={'/brand'}>Brand</Link>
        <Link className='dropdown-item' to={'/collection'}>Collection</Link>
        <Link className='dropdown-item' to={'/season'}>Season</Link>
        <Link className='dropdown-item' to={'/city'}>City</Link>
        <Link className='dropdown-item' to={'/venue'}>Venue</Link>
          {/* <NavDropdown.Divider />
          <NavDropdown.Item href="#action5">
            Something else here
          </NavDropdown.Item> */}
        </NavDropdown>
        <Link className="mx-2" to={'/events'}>
          Events
        </Link>
        <Link className="mx-2" to={'/articles'}>
          Articles
        </Link>
        <Link className="mx-2" to={'/brands'}>
          Brands
        </Link>
        <Link className="mx-2" to={'/collections'}>
          Collections
        </Link>
        <Link className="mx-2" to={'/seasons'}>
          Seasons
        </Link>
        <Link className="mx-2" to={'/cities'}>
          Cities
        </Link>
        <Link className="mx-2" to={'/venues'}>
          Venues
        </Link>
        <Link className="mx-2" to={'/'} onClick={logout}>
          Logout
        </Link>
      </Nav>
    </Navbar>
  )
}
