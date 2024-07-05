import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
function CardPokemon({ key, name, img }) {
  return (
    <Card key={key}>
      <Card.Img variant="top" src={img ? img : '/'} />
      <Card.Body>
        <Card.Title>{ name ? name : 'Nombre por defecto'}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">+ info</Button>
      </Card.Body>
    </Card>
  )
}

export default CardPokemon