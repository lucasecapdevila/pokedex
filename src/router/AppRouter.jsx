import { BrowserRouter, Route, Routes } from "react-router-dom"
import Menu from "../common/Menu"
import PokemonPage from "../pages/PokemonPage"
import Footer from "../common/Footer"
import Home from "../pages/Home"

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/detalle/:name" element={<PokemonPage/>}></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default AppRouter