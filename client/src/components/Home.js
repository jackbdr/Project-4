import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Home = () => {

  return (
    <section className='home-page'>
      <div className='home-text'>
        <div className='title'>
          <h1>What_On_Earth</h1>
        </div>
        <div className='intro'>
          <h2>Search the planet and discover all the strangest animals the Earth has to offer.</h2>
        </div>
        <Link to={'/map'}><h3>Explore</h3></Link>
      </div>
    </section>
  )
}

export default Home 