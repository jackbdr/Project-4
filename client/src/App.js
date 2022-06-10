/* eslint-disable quotes */
import { Route, Routes, BrowserRouter } from "react-router-dom"
import React from 'react'

import AnimalsAll from "./animals/AnimalsAll"

const App = () => {

  return (
    <main className="site-wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/animals" element={<AnimalsAll />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
