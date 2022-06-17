import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState(false)

  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('WOE-user-token', token)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', formData)
      console.log(formData)
      setTokenToLocalStorage(data.token)
      //console.log(data.token)
      console.log({ data })
      // window.localStorage.setItem('WOE-username', data.username)
      navigate('/map')
    } catch (error) {
      setErrors(true)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors(false)
  }

  return (
    <section className='form-page'>
      <div className='content-container'>
        <form className='form-detail' onSubmit={handleSubmit}>
          <div className='no-button'>
            <h1>Log In</h1>
            {/* Email */}
            <label htmlFor='email'></label>
            <input type='email' name='email' className='input' placeholder='Email' value={formData.email} onChange={handleChange} />
            {/* Password */}
            <label htmlFor='password'></label>
            <input type='password' name='password' className='input' placeholder='Password' value={formData.password} onChange={handleChange} />
            {errors && <p className='denied-text'>Please enter the correct login details</p>}
            {/* Submit */}
          </div>
          <button className='sign-in-btn' type='submit'>Enter</button>
        </form>
        <section className='new-user'>
          <h6>New here?</h6>
          <Link className='sign-up-btn' to={'/register'}>
            <p>Sign up</p>
          </Link>
        </section>
      </div>
    </section>
  )
}

export default Login