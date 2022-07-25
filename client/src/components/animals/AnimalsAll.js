/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import axios from 'axios'


const AnimalsAll = () => {

  const [animals, setAnimals] = useState([])

  const [errors, setErrors] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAnimals = async () => {
      try {
        const { data } = await axios.get('/api/animals/')
        console.log(data)
        setAnimals(data)
        setLoading(false)
      } catch (err) {
        console.log(err)
        setLoading(false)
        setErrors(true)
      }
    }
    getAnimals()
  }, [])


  return (
    <>
      <h1>AnimalsAll</h1>
      <section className='animals'>
        {loading ?
          <p>loading...</p>
          :
          errors ?
            <p>Sorry, we had trouble fetching the data!</p>
            :
            <div className='cards-container'>
              {animals.map(animal => {
                const { id, name, sci_name, img_1 } = animal
                return (
                  <div className='card' key={id}>
                    <img src={img_1} />
                    <p>{name}</p>
                    <p>{sci_name}</p>
                  </div>
                )
              })}
            </div>
        }
      </section>
    </>
  )
}

export default AnimalsAll