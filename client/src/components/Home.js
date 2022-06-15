import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { isUserAuth } from './helpers/Auth'

const Home = () => {

  return (
    <section className='home-page'>
      <div className='home-text'>
        <div className='title'>
          <h1>What On Earth</h1>
          {/* <h1></h1> */}
        </div>
        <div className='intro'>
          <h2 className='intro-text'><span className='changed-by-other'>Search</span> and <span className='changed-by-other'>discover</span> all the strangest animals the Earth has to offer.</h2>
        </div>
        <div className='home-btns'>
          <Link className='explore-btn home-btn' to={'/map'}><h3>Explore</h3></Link>
          {!isUserAuth() &&
            <Link className='login-btn home-btn' to={'/login'}><h3>Log In</h3></Link>
          }
        </div>
      </div>
    </section>
  )
}

export default Home 