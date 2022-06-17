import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

import ImageUpload from '../helpers/ImageUpload'

import { getToken, isUserAuth } from '../helpers/Auth'

const AnimalAdd = () => {

  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    sci_name: '',
    is_ancient: '',
    description: '',
    fact: '',
    an_group: '',
    habitat: '',
    con_status: '',
    diet: '',
    height: '',
    length: '',
    life_span: '',
    avg_weight: '',
    lat: '',
    long: '',
    img_1: '',
    img_2: '',
    admin_rating: '',
  })

  const handleNext = (e) => {
    e.preventDefault()
    setStep(step + 1)
  }

  const handleBack = (e) => {
    e.preventDefault()
    setStep(step - 1)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
    console.log(e.target.value)
    console.log('Form data -->', formData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/animals/', formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      navigate(`/animals/${data.id}`)
    } catch (err) {
      setErrors(err.response.data)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('WOE-user-token')
    navigate('/')
  }

  return (
    <section className='add-animal-page'>
      <div className='div-navbar-add'>
        <Link className='back-to-map-add' to={'/map'}>Back to map</Link>
        {isUserAuth() &&
          <p className='logout-btn-add' onClick={handleLogout}>Log out</p>
        }
      </div>
      <div className='form-no-nav'>
        <form className='add-animal-form' onSubmit={handleSubmit}>
          {step === 1 &&
            <div className='step-1 form-step'>
              <div className='form-content'>
                <label htmlFor='is_ancient'>Has your animal lived in the last 100,000 years?</label>
                <select id='isit-ancient' name='is_ancient' onChange={handleChange}>
                  <option value={0} selected disabled>---</option>
                  <option className='input' value={'True'}>Yes</option>
                  <option className='input' value={'False'}>No</option>
                </select>
              </div>
              <div className='next-btn-container'>
                <p className='next-btn' onClick={handleNext}>Next</p>
              </div>
            </div>
          }
          {step === 2 &&
            <div className='step-2 form-step'>
              <div className='form-content'>
                <div className='multi-input'>
                  <label htmlFor='name'>* Name</label>
                  <input className='input' type='text' name='name' placeholder='Name...' onChange={handleChange}></input>
                  <label htmlFor='sci_name'>* Scientific name</label>
                  <input className='input' type='text' name='sci_name' placeholder='Scientific name...' onChange={handleChange}></input>
                  <label htmlFor='an_group'>* Animal group</label>
                  <select name='an_group' onChange={handleChange}>
                    <option selected disabled>---</option>
                    <option className='input' value='Mammal'>Mammal</option>
                    <option className='input' value='Reptile'>Reptile</option>
                    <option className='input' value='Inverebrate'>Invertebrate</option>
                    <option className='input' value='Amphibian'>Amphibian</option>
                    <option className='input' value='Bird'>Bird</option>
                    <option className='input' value='Fish'>Fish</option>
                  </select>
                </div>
              </div>
              <div className='add-btns'>
                <p className='back-btn' onClick={handleBack}>Back</p>
                <p className='next-btn' onClick={handleNext}>Next</p>
              </div>
            </div>
          }
          {step === 3 &&
            <div className='step-3 form-step'>
              <div className='form-content'>
                <div className='multi-input'>
                  <label htmlFor='description'>* Short description</label>
                  <textarea className='input' type='text' name='description' placeholder='Description...' onChange={handleChange}></textarea>
                </div>
              </div>
              <div className='add-btns'>
                <p className='back-btn' onClick={handleBack}>Back</p>
                <p className='next-btn' onClick={handleNext}>Next</p>
              </div>
            </div>
          }
          {step === 4 &&
            <div className='step-4 form-step'>
              <div className='form-content'>
                <div className='multi-input'>
                  <label htmlFor='fact'>* Fact</label>
                  <textarea className='input' name='fact' placeholder='Fact...' onChange={handleChange} maxLength='1000'></textarea>
                </div>
              </div>
              <div className='add-btns'>
                <p className='back-btn' onClick={handleBack}>Back</p>
                <p className='next-btn' onClick={handleNext}>Next</p>
              </div>
            </div>
          }
          {step === 5 &&
            <div className='step-5 form-step'>
              <div className='form-content'>
                <div className='multi-input'>
                  <label htmlFor='height'>Height</label>
                  <input className='input' type='text' name='height' placeholder="e.g. '1 - 1.5 metres'" onChange={handleChange}></input>
                  <label htmlFor='length'>Length</label>
                  <input className='input' type='text' name='length' placeholder="e.g. '2.5 - 3 metres', '10 - 15 cm'" onChange={handleChange}></input>
                  <label htmlFor='avg_weight'>Weight (kg)</label>
                  <input className='input' type='number' name='avg_weight' placeholder="e.g. '40', '0.2'" onChange={handleChange}></input>
                  <label htmlFor='habitat'>* Habitat</label>
                  <input className='input' type='text' name='habitat' placeholder="e.g. '1 - 1.5 metres'" onChange={handleChange}></input>
                  <label htmlFor='diet'>Diet</label>
                  <input className='input' type='text' name='diet' placeholder="e.g. 'Carnivorous', 'Herbivorous'" onChange={handleChange}></input>
                  <label htmlFor='life_span'>Life-span</label>
                  <input className='input' type='text' name='life_span' placeholder="e.g. '10 - 12 years'" onChange={handleChange}></input>
                  <label htmlFor='con_status'>Conservation status</label>
                  <select name='con_status' onChange={handleChange}>
                    <option disabled selected>---</option>
                    <option value={7}>Least concern</option>
                    <option value={6}>Near threatened</option>
                    <option value={5}>Vulnerable</option>
                    <option value={4}>Endangered</option>
                    <option value={3}>Critically Endangered</option>
                    <option value={2}>Extinct in the wild</option>
                    <option value={1}>Extinct</option>
                    <option value={8}>Data deficient</option>
                  </select>
                </div>
              </div>
              <div className='add-btns'>
                <p className='back-btn' onClick={handleBack}>Back</p>
                <p className='next-btn' onClick={handleNext}>Next</p>
              </div>
            </div>
          }
          {step === 6 &&
            <div className='step-6 form-step'>
              <div className='form-content'>
                <div className='multi-input'>
                  <label htmlFor='lat'>Latitude</label>
                  <input className='input' type='text' name='lat' placeholder="e.g. '48.17492'" onChange={handleChange}></input>
                  <label htmlFor='long'>Longitude</label>
                  <input className='input' type='text' name='long' placeholder="e.g. '-23.15692'" onChange={handleChange}></input>
                </div>
              </div>
              <div className='add-btns'>
                <p className='back-btn' onClick={handleBack}>Back</p>
                <p className='next-btn' onClick={handleNext}>Next</p>
              </div>
            </div>
          }
          {step === 7 &&
            <div className='step-7 form-step'>
              <ImageUpload
                formData={formData}
                setFormData={setFormData}
              />
              <div className='add-btns'>
                <p className='back-btn' onClick={handleBack}>Back</p>
                <p className='next-btn' onClick={handleNext}>Next</p>
              </div>
            </div>
          }
          {step === 8 &&
            <div className='step-8 form-step'>
              <div className='form-content'>
                <label htmlFor='admin_rating'>WOW rating</label>
                <select name='admin_rating' onChange={handleChange}>
                  <option disabled selected>---</option>
                  <option value={1}>1 (meh)</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5 (WOW)</option>
                </select>
              </div>
              <div className='add-btns'>
                <p className='back-btn' onClick={handleBack}>Back</p>
                <button className='submit-btn' type='submit'>Submit</button>
              </div>
            </div>
          }
        </form>
      </div>
    </section>
  )
}

export default AnimalAdd