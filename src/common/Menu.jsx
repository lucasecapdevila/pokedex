import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Navbar, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { changeSearchStatus, searchPokemon } from "../slices/pokemonSlice"
import { Link, useNavigate } from "react-router-dom"
import { primerLetraMayuscula } from "../helpers/funciones"
import Swal from "sweetalert2"

const Menu = () => {
  const [searchPoke, setSearchPoke] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const state = useSelector((state) => state.pokemon)

  const handleSearchPokemon = (e) => {
    e.preventDefault()
    /* 
      Esta es la funcionalidad que se va a hacer con el botón de buscar, que es para buscar un pokemon específico
      Ya está funcionando esto con el reducer; solo falta hacer la página específica,  se puede reutilizar la de arriba eso lo hacen con lo del
      react-router-dom y todo eso... 
    */
    dispatch(searchPokemon(searchPoke))
  }

  useEffect(() => {
    if(state.searchStatus !== "") {
        if(state.searchStatus === "Exitoso") {
          dispatch(changeSearchStatus(''))
          navigate(`/detalle/${primerLetraMayuscula(searchPoke)}`)
          setSearchPoke('')
        } else if (state.searchStatus === "Rechazado") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No existe ese pokemon!",
          });
          setSearchPoke('')
        } else {
          console.log("Cargando...")
          /* 
            Estaría interesante poner un loading, pero ni idea
            como se hace, habría que preguntar a alejo 
          */
        }
    }
  }, [state.searchStatus])

  return (
    <Navbar bg="dark" data-bs-theme="dark" className="robotoFont fw-light">
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