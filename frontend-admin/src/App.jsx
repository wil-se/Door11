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
import { Brands } from 'brands/Brands'
import { Cities } from 'cities/Cities'
import { Collections } from 'collections/Collections'
import { Seasons } from 'seasons'
import { Venues } from 'venues'
import { Brand } from 'brand/Brand'
import { City } from 'city/City'
import { Collection } from 'collection/Collection'
import { Season } from 'season'
import { Venue } from 'venue'


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
          <Route
            path="/brands"
            element={
              <PrivateRoute>
                <Brands />
              </PrivateRoute>
            }
          />
          <Route
            path="/brands/:id"
            element={
              <PrivateRoute>
                <Brand />
              </PrivateRoute>
            }
          />
          <Route
            path="/collections"
            element={
              <PrivateRoute>
                <Collections />
              </PrivateRoute>
            }
          />
          <Route
            path="/collections/:id"
            element={
              <PrivateRoute>
                <Collection />
              </PrivateRoute>
            }
          />
          <Route
            path="/seasons"
            element={
              <PrivateRoute>
                <Seasons />
              </PrivateRoute>
            }
          />
          <Route
            path="/seasons/:id"
            element={
              <PrivateRoute>
                <Season />
              </PrivateRoute>
            }
          />
          <Route
            path="/cities"
            element={
              <PrivateRoute>
                <Cities />
              </PrivateRoute>
            }
          />
          <Route
            path="/cities/:id"
            element={
              <PrivateRoute>
                <City />
              </PrivateRoute>
            }
          />
          <Route
            path="/venues"
            element={
              <PrivateRoute>
                <Venues />
              </PrivateRoute>
            }
          />
          <Route
            path="/venues/:id"
            element={
              <PrivateRoute>
                <Venue />
              </PrivateRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/events" />} />
        </Routes>
    </Container>
  )
}
