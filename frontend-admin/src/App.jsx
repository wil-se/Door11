import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom'

import { history } from '_helpers'
import { MainNavbar, PrivateRoute } from '_components'
import { Events } from './events'
import { Articles } from 'articles'
import { Login } from 'login'
import { Post } from 'post'
import { Container, Row, Col } from 'react-bootstrap'

export { App }

function App() {
  // init custom history object to allow navigation from
  // anywhere in the react app (inside or outside components)
  history.navigate = useNavigate()
  history.location = useLocation()

  return (
    <Container>
        <MainNavbar />
        <Routes>
          <Route
            path="/events"
            element={
              <PrivateRoute>
                <Events />
              </PrivateRoute>
            }
          />
          <Route
            path="/articles"
            element={
              <PrivateRoute>
                <Articles />
              </PrivateRoute>
            }
          />
          <Route
            path="/post/:id"
            element={
              <PrivateRoute>
                <Post />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/events" />} />
        </Routes>
    </Container>
  )
}
