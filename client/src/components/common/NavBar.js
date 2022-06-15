import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

import { isUserAuth } from '../helpers/Auth'

const NavBar = () => {

  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('WOE-user-token')
    navigate('/')
  }

  return (
  // <Navbar bg='dark' expand='sm'>
  //   <Container>
  //     <Navbar.Brand as={Link} to='/'>🦥</Navbar.Brand>
  //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
  //     <Navbar.Collapse id="basic-navbar-nav">
  //       {isUserAuth() ?
  //         <>
  //           <Nav.Link className='text-white' as={Link} to='/animals/add'>Explore</Nav.Link>
  //           <Nav.Link className='text-white' onClick={handleLogout}>Log out</Nav.Link>
  //         </>

    //         :
    //         <>
    //           <Nav.Link className='text-white' as={Link} to='/login'>Log in</Nav.Link>
    //         </>
    //       }
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
    <></>
  )

}

export default NavBar

