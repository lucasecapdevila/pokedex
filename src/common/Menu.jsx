import { useState } from "react"
import { Button, Col, Container, Form, InputGroup, Navbar, Row } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { searchPokemon } from "../slices/pokemonSlice"
import { Link } from "react-router-dom"

const Menu = () => {
  const [searchPoke, setSearchPoke] = useState('')

  const dispatch = useDispatch

  const handleSearchPokemon = (e) => {
    e.preventDefault()
    /* 
      Esta es la funcionalidad que se va a hacer con el botón de buscar, que es para buscar un pokemon específico
      Ya está funcionando esto con el reducer; solo falta hacer la página específica,  se puede reutilizar la de arriba eso lo hacen con lo del
      react-router-dom y todo eso... 
    */
    dispatch(searchPokemon(searchPoke))
  }

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to='/'>
          <img
            src="/public/pokeball.png"
            width="45"
            height="45"
            className="d-inline-block align-top"
            alt="pokeball logo"
          />
        </Navbar.Brand>
        <Form onSubmit={(e) => handleSearchPokemon(e)}>
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Buscar pokemon..."
                value={searchPoke}
                onChange={(e) => { setSearchPoke(e.target.value)}}
                className="mr-sm-2"
              />
            </Col>
            <Col xs="auto">
              <Button type="submit">Buscar</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Navbar>
  )
}

export default Menu