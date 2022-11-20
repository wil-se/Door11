import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'

import { history } from '_helpers'
import { authActions } from '_store'

import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'

export { Login }

function Login() {
  const dispatch = useDispatch()
  const authUser = useSelector((x) => x.auth.user)
  const authError = useSelector((x) => x.auth.error)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const updateForm = (event, property) => {
    event.preventDefault()
    setFormData((prevState) => ({
      ...prevState,
      [property]: event.target.value,
    }))
  }

  const submitForm = () => {
    let email = formData.email
    let password = formData.password
    return dispatch(authActions.login({ email, password }))
  }

  useEffect(() => {
    if (authUser) history.navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container style={{ height: '100vh' }} className="d-flex">
      <Row className="my-auto w-100 justify-content-center">
        <Col xs={12} md={4}>
          <Card className='w-100'>
            <Card.Header className="text-center">
              <h4>Authentication</h4>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    onChange={(e) => updateForm(e, 'email')}
                    value={formData.email}
                    type="email"
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    onChange={(e) => updateForm(e, 'password')}
                    value={formData.password}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>
                <Row>
                  <Col className="text-center">
                    <Button onClick={() => submitForm()} variant="primary">
                      Login
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
