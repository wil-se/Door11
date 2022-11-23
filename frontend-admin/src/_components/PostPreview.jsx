import React from 'react'
import { Card } from 'react-bootstrap'
import { parseDateTime, parseYear } from '_helpers'
import { Link } from 'react-router-dom'

export default function PostPreview(props) {
  return (
    <Link to={`/post/${props.post.id}`}>
      <Card className='my-2 preview'>
        <Card.Header className='text-center preview'>
          <h4>{props.post.title}</h4>
        </Card.Header>
        {/* <Card.Body>
          {props.post.status}
          <br />
          {parseDateTime(props.post.date)}
          <br />
          {props.post.brand[0].name}
          <br />
          {props.post.collection.name}
          <br />
          {props.post.season.name}
          <br />
          {parseYear(props.post.year)}
          <br />
          {props.post.city.name}
          <br />
          {props.post.venue.name}
          <br />
        </Card.Body> */}
      </Card>
    </Link>
  )
}
