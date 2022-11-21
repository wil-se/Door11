import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export default function Preview(props) {
    console.log(props)
  return (
    <Link to={`/${props.category}/${props.content.id}`}>
      <Card>
        <Card.Header className='text-center'>
          <h4>{props.content.name}</h4>
        </Card.Header>
      </Card>
    </Link>
  )
}
