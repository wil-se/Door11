import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export default function Preview(props) {
  return (
    <Link to={`/${props.category}/${props.content.id}`}>
      <Card className='my-2 preview'>
        <Card.Header className='text-center preview'>
          <h4>{props.content.name}</h4>
        </Card.Header>
      </Card>
    </Link>
  )
}
