import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

import Ruler from '../../images/ruler.png'
import Scales from '../../images/scales.png'
import Home from '../../images/home-icon.png'
import KnifeFork from '../../images/knife-fork.png'
import Lifespan from '../../images/lifespan.png'
import Extinct from '../../images/extinct.png'
import ExtinctWild from '../../images/extinct-wild.png'
import CritEndang from '../../images/critically-endangered.png'
import Endangered from '../../images/endangered.png'
import Vulnerable from '../../images/vulnerable.png'
import NearThreat from '../../images/near-threatened.png'
import LeastConcern from '../../images/least-concern.png'
import DataDef from '../../images/data-def.png'


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

  const handlePage = (e) => {
    e.preventDefault()
    if (e.target.className === 'arrow-left' && page === 1) return
    if (e.target.className === 'arrow-left' && page === 2) {
      setPage(1)
    }
    if (e.target.className === 'arrow-right' && page === 2) return
    if (e.target.className === 'arrow-right' && page === 1) {
      setPage(2)
    }
  }

  return (
    <>{animal ?
      page === 1 ?
        <section className='page1'>
          <section className='page1-animal'>
            <div className='animal-wrapper'>
              <img className='img-1' src={animal.img_1} />
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
                      <img className='icon' src={Ruler} alt='ruler' />
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
                      <img className='icon' src={Scales} alt='scales' />
                      <p>~{animal.avg_weight} kg</p>
                    </div>
                  }
                  <div className='habitat'>
                    <img className='icon' src={Home} alt='house' />
                    <p>{animal.habitat}</p>
                  </div>
                  <div className='diet'>
                    <img className='icon' src={KnifeFork} alt='knife-fork' />
                    <p>{animal.diet}</p>
                  </div>
                  {animal.life_span &&
                    <div className='lifespan'>
                      <img className='icon' src={Lifespan} alt='lifespan-icon' />
                      <p>{animal.life_span}</p>
                    </div>
                  }
                  {animal.con_status === 1 &&
                    <div className='con-status'>
                      <img className='icon' src={Extinct} />
                      <p>Extinct</p>
                    </div>
                  }
                  {animal.con_status === 2 &&
                    <div className='con-status'>
                      <img className='icon' src={ExtinctWild} />
                      <p>Extinct in the wild</p>
                    </div>
                  }
                  {animal.con_status === 3 &&
                    <div className='con-status'>
                      <img className='icon' src={CritEndang} />
                      <p>Critically Endangered</p>
                    </div>
                  }
                  {animal.con_status === 4 &&
                    <div className='con-status'>
                      <img className='icon' src={Endangered} />
                      <p>Endangered</p>
                    </div>
                  }
                  {animal.con_status === 5 &&
                    <div className='con-status'>
                      <img className='icon' src={Vulnerable} />
                      <p>Vulnerable</p>
                    </div>
                  }
                  {animal.con_status === 6 &&
                    <div className='con-status'>
                      <img className='icon' src={NearThreat} />
                      <p>Near Threatened</p>
                    </div>
                  }
                  {animal.con_status === 7 &&
                    <div className='con-status'>
                      <img className='icon' src={LeastConcern} />
                      <p>Least Concern</p>
                    </div>
                  }
                  {animal.con_status === 8 &&
                    <div className='con-status'>
                      <img className='icon' src={DataDef} />
                      <p>Data Deficient</p>
                    </div>
                  }
                </div>
                <Link to='/map'>View on map</Link>
              </div>
            </div>
            <div className='arrow-buttons'>
              <button className='arrow-left' onClick={handlePage}></button>
              <button className='arrow-right' onClick={handlePage}></button>
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
          <div className='arrow-buttons'>
            <button className='arrow-left' onClick={handlePage}></button>
            <button className='arrow-right' onClick={handlePage}></button>
          </div>
        </section>
      :
      <h2>{errors && 'Sorry, we had trouble retrieving the data'}</h2>
    }
    </>

  )
}

export default AnimalDetail