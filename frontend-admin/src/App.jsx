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
import { Countries } from 'countries/Countries'
import { Country } from 'country/Country'
import { Eventsets } from 'eventsets/Eventsets'
import { Eventset } from 'eventset/Eventset'

import { Container } from 'react-bootstrap'

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
            path="/post/article"
            element={
              <PrivateRoute>
                <Post blank={true} type={'Article'} />
              </PrivateRoute>
            }
          />
          <Route
            path="/post/event"
            element={
              <PrivateRoute>
                <Post blank={true} type={'Event'} />
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
            path="/brand"
            element={
              <PrivateRoute>
                <Brand blank={true} />
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
            path="/collection"
            element={
              <PrivateRoute>
                <Collection blank={true} />
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
            path="/season"
            element={
              <PrivateRoute>
                <Season blank={true} />
              </PrivateRoute>
            }
          />
          <Route
            path="/countries"
            element={
              <PrivateRoute>
                <Countries />
              </PrivateRoute>
            }
          />
          <Route
            path="/countries/:id"
            element={
              <PrivateRoute>
                <Country />
              </PrivateRoute>
            }
          />
          <Route
            path="/country"
            element={
              <PrivateRoute>
                <Country blank={true} />
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
            path="/city"
            element={
              <PrivateRoute>
                <City blank={true} />
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
          <Route
            path="/venue"
            element={
              <PrivateRoute>
                <Venue blank={true} />
              </PrivateRoute>
            }
          />
          <Route
            path="/eventsets"
            element={
              <PrivateRoute>
                <Eventsets />
              </PrivateRoute>
            }
          />
          <Route
            path="/eventsets/:id"
            element={
              <PrivateRoute>
                <Eventset />
              </PrivateRoute>
            }
          />
          <Route
            path="/eventset"
            element={
              <PrivateRoute>
                <Eventset blank={true} />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/events" />} />
        </Routes>
    </Container>
  )
}
