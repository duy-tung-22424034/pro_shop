import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
  const overText = {
    minHeight: "40px",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
  const overImg = {
    minHeight: "176px",
    position: "relative"
  }
  const imgInner = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
  return (
    <Card className='my-3 p-3 rounded '>
      <Link to={`/product/${product._id}`} style={overImg}>
        <Card.Img src={product.image} variant='top' style={imgInner}/>
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div' style={overText}>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
          <Card.Text as='div'>Category: {product.category}</Card.Text>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        
        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
