import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
// import Ruler from '../../../public/images/ruler.png'

const AnimalDetail = () => {

  const { id } = useParams()
  const [animal, setAnimal] = useState()
  const [errors, setErrors] = useState(false)

  const [page, setPage] = useState(1)

  useEffect(() => {
    const getAnimal = async () => {
      try {
        const { data } = await axios.get(`/api/animals/${id}`)
        setAnimal(data)
        console.log(data.comments)
      } catch (err) {
        setErrors(true)
      }
    }
    getAnimal()
  }, [id])

  return (
    <>{animal ?
      page === 1 ?
        <section className='page1'>
          <section className='page1-animal'>
            <img src={animal.img_1} />
            <div className='animal-info'>
              <div className='animal-header'>
                <div className='an-header-left'>
                  <h1>{animal.name}</h1>
                  <h2>{animal.sci_name}</h2>
                  <p>{animal.an_group}</p>
                </div>
                <div className='an-header-right'>
                  <p>rating/comment/favourite</p>
                </div>
              </div>
              <p className='description'>{animal.description}</p>
              <div className='icon-info'>
                {animal.height || animal.length &&
                  <div className='size'>
                    <img className='icon' src='/images/ruler.png' alt='ruler' />
                    {animal.height &&
                      <p>{animal.height} (height)</p>
                    }
                    {animal.length &&
                      <p>{animal.length} (length)</p>
                    }
                  </div>
                }
                {animal.avg_weight &&
                  <div className='weight'>
                    <img className='icon' src='/images/scales.png' alt='scales' />
                    <p>~{animal.avg_weight} kg</p>
                  </div>
                }
                <div className='habitat'>
                  <img className='icon' src='/images/home-icon.png' alt='house' />
                  <p>{animal.habitat}</p>
                </div>
                <div className='diet'>
                  <img className='icon' src='/images/knife-fork.png' alt='knife-fork' />
                  <p>{animal.diet}</p>
                </div>
                {animal.life_span &&
                  <div className='lifespan'>
                    <img className='icon' src='/images/lifespan.png' alt='lifespan-icon' />
                    <p>{animal.life_span}</p>
                  </div>
                }
                {animal.con_status === 1 &&
                  <div className='con-status'>
                    <img className='icon' src='/images/extinct.png' />
                    <p>Extinct</p>
                  </div>
                }
                {animal.con_status === 2 &&
                  <div className='con-status'>
                    <img className='icon' src='/images/extinct-wild.png' />
                    <p>Extinct in the wild</p>
                  </div>
                }
                {animal.con_status === 3 &&
                  <div className='con-status'>
                    <img className='icon' src='/images/critically-endangered.png' />
                    <p>Critically Endangered</p>
                  </div>
                }
                {animal.con_status === 4 &&
                  <div className='con-status'>
                    <img className='icon' src='/images/endangered.png' />
                    <p>Endangered</p>
                  </div>
                }
                {animal.con_status === 5 &&
                  <div className='con-status'>
                    <img className='icon' src='/images/vulnerable.png' />
                    <p>Vulnerable</p>
                  </div>
                }
                {animal.con_status === 6 &&
                  <div className='con-status'>
                    <img className='icon' src='/images/near-threatened.png' />
                    <p>Near Threatened</p>
                  </div>
                }
                {animal.con_status === 7 &&
                  <div className='con-status'>
                    <img className='icon' src='/images/least-concern.png' />
                    <p>Least Concern</p>
                  </div>
                }
                {animal.con_status === 8 &&
                  <div className='con-status'>
                    <img className='icon' src='/images/data-def.png' />
                    <p>Data Deficient</p>
                  </div>
                }
              </div>
              <Link to='/map'>View on map</Link>
            </div>
          </section>
          <section className='comments'>
            {animal.comments.map(comment => {
              return (
                <div className='comment' key={comment.id}>
                  <div className='comment-header'>
                    <h4>{comment.added_by.username}</h4>
                  </div>
                  <p>{comment.text}</p>
                </div>
              )
            })}
          </section>
        </section>
        :
        <section className='page2'>
          <h4>{animal.fact}</h4>
          <img src={animal.img_2} />
        </section>
      :
      <h2>{errors && 'Sorry, we had trouble retrieving the data'}</h2>
    }
    </>

  )
}

export default AnimalDetail