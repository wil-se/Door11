import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '_store'
import { Navbar, Nav } from 'react-bootstrap'


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
        <Nav.Link href="/events">Events</Nav.Link>
        <Nav.Link href="/articles">Articles</Nav.Link>
        <Nav.Link onClick={logout}>Logout</Nav.Link>
      </Nav>
    </Navbar>
  )
}