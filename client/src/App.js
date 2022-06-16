/* eslint-disable quotes */
import { Route, Routes, BrowserRouter } from "react-router-dom"
import React, { useEffect, useState } from 'react'

import Home from "./components/Home"
import Header from "./components/common/Header"
import NavBar from "./components/common/NavBar"
import AnimalsAll from "./components/animals/AnimalsAll"
import DisplayMap from "./components/explore/MapPage"
import AnimalDetail from "./components/animals/AnimalDetail"
import AnimalAdd from "./components/animals/AnimalAdd"
import AnimalEdit from "./components/animals/AnimalEdit"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"


const App = () => {

  console.log(window.location.href)
  console.log('pathname -> ', location.pathname)

  const [userLocation, setUserLocation] = useState('/')

  useEffect(() => {
    setUserLocation(location.pathname)
  }, [userLocation])

  return (
    <main className="site-wrapper">
      <BrowserRouter>
        {/* {userLocation !== '/' &&  */}
        {/* <NavBar /> */}
        {/* <Header /> */}
        {/* } */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<DisplayMap />} />
          <Route path="/animals" element={<AnimalsAll />} />
          <Route path="/animals/:animalId" element={<AnimalDetail />} />
          <Route path="/animals/add" element={<AnimalAdd />} />
          <Route path="/animals/:id/edit" element={<AnimalEdit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
