import { useEffect, useState } from "react"
import { Button, Col, Container, Form, Navbar, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { changeSearchStatus, searchPokemon } from "../slices/pokemonSlice"
import { Link, useNavigate } from "react-router-dom"
import { primerLetraMayuscula } from "../helpers/funciones"
import Swal from "sweetalert2"
import { startSpinner, stopSpinner } from "../slices/loadingSlice"

const Menu = () => {
  const [searchPoke, setSearchPoke] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const state = useSelector((state) => state.pokemon)

  const handleSearchPokemon = (e) => {
    e.preventDefault()    
    dispatch(searchPokemon(searchPoke))
  }

  useEffect(() => {
    if(state.searchStatus !== "") {
      dispatch(startSpinner())
      if(state.searchStatus === "Exitoso") {
        dispatch(changeSearchStatus(''))
        navigate(`/detalle/${primerLetraMayuscula(searchPoke)}`)
        dispatch(stopSpinner())
        setSearchPoke('')
      } else if (state.searchStatus === "Rechazado") {
        dispatch(stopSpinner())
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No existe ese pokemon!",
        });
        setSearchPoke('')
      }
    }
  }, [state.searchStatus])

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