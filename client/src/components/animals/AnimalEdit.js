import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'

import ImageUpload from '../helpers/ImageUpload'
import { getToken } from '../helpers/Auth'

const AnimalEdit = () => {

  const navigate = useNavigate()

  const { id } = useParams()

  const [animal, setAnimal] = useState(null)
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
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const getAnimal = async () => {
      try {
        const { data } = await axios.get(`/api/animals/${id}`)
        setAnimal(data)
        setFormData(data)
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    getAnimal()
  }, [id])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(`/api/animals/${id}/`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      navigate(`/animals/${data.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className='edit-animal-page'>
      <form onSubmit={(handleSubmit)}>
        <label htmlFor='is_ancient'>Has your animal lived in the last 100,000 years?</label>
        <select id='isit-ancient' name='is_ancient' onChange={handleChange}>
          <option value={0} selected disabled>---</option>
          <option className='input' value={'True'}>Yes</option>
          <option className='input' value={'False'}>No</option>
        </select>
        <label htmlFor='name'>* Name</label>
        <input className='input' type='text' name='name' placeholder='Name...' onChange={handleChange} value={formData.name}></input>
        <label htmlFor='sci_name'>* Scientific name</label>
        <input className='input' type='text' name='sci_name' placeholder='Scientific name...' onChange={handleChange} value={formData.sci_name}></input>
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
        <label htmlFor='description'>* Short description</label>
        <textarea className='input' type='text' name='description' placeholder='Description...' onChange={handleChange} maxLength={1000} value={formData.description}></textarea>
        <label htmlFor='fact'>* Weird fact</label>
        <textarea className='input' name='fact' placeholder='Fact...' onChange={handleChange} maxLength={1000} value={formData.fact}></textarea>
        <label htmlFor='height'>Height</label>
        <input className='input' type='text' name='height' placeholder="e.g. '1 - 1.5 metres'" onChange={handleChange} value={formData.height}></input>
        <label htmlFor='length'>Length</label>
        <input className='input' type='text' name='length' placeholder="e.g. '2.5 - 3 metres', '10 - 15 cm'" onChange={handleChange} value={formData.length} ></input>
        <label htmlFor='avg_weight'>Weight (kg)</label>
        <input className='input' type='number' name='avg_weight' placeholder="e.g. '40', '0.2'" onChange={handleChange} value={formData.avg_weight}></input>
        <label htmlFor='habitat'>* Habitat</label>
        <input className='input' type='text' name='habitat' placeholder="e.g. 'Rainforest', 'Grassland'" onChange={handleChange} value={formData.habitat}></input>
        <label htmlFor='diet'>Diet</label>
        <input className='input' type='text' name='diet' placeholder="e.g. 'Carnivorous', 'Herbivorous'" onChange={handleChange} value={formData.diet}></input>
        <label htmlFor='life_span'>Life-span</label>
        <input className='input' type='text' name='life_span' placeholder="e.g. '10 - 12 years'" onChange={handleChange} value={formData.life_span} ></input>
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
        <label htmlFor='lat'>Latitude</label>
        <input className='input' type='text' name='lat' placeholder="e.g. '48.17492'" onChange={handleChange} value={formData.lat}></input>
        <label htmlFor='long'>Longitude</label>
        <input className='input' type='text' name='long' placeholder="e.g. '-23.15692'" onChange={handleChange} value={formData.long}></input>
        <ImageUpload
          formData={formData}
          setFormData={setFormData}
        />
        <label htmlFor='admin_rating'>WOW rating</label>
        <select name='admin_rating' onChange={handleChange}>
          <option disabled selected>---</option>
          <option value={1}>1 (meh)</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5 (WOW)</option>
        </select>
        <button type='submit'>Submit</button>
      </form>
    </section>
  )

}

export default AnimalEdit