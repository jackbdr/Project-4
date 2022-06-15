import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import { getToken, isUserAuth, isUserOwner, isUserCommentOwner } from '../helpers/Auth'

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

  const navigate = useNavigate()

  const { animalId } = useParams()
  const [animal, setAnimal] = useState()
  const [errors, setErrors] = useState(false)

  const [formData, setFormData] = useState({
    text: '',
    rating: '',
    animal: animalId,
  })

  const [page, setPage] = useState(1)

  const [commentShow, setCommentShow] = useState(false)
  const handleCommentClose = () => {
    setCommentShow(false)
    // window.location.reload()
  }
  const handleCommentShow = () => setCommentShow(true)

  const [deleteShow, setDeleteShow] = useState(false)
  const handleDeleteClose = () => {
    setDeleteShow(false)
  }
  const handleDeleteShow = () => setDeleteShow(true)

  useEffect(() => {
    const getAnimal = async () => {
      try {
        const { data } = await axios.get(`/api/animals/${animalId}`)
        setAnimal(data)
        console.log(data.comments)
      } catch (err) {
        setErrors(true)
      }
    }
    getAnimal()
  }, [animalId])

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

  const handlePostComment = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/comments/', formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteComment = async (e, commentId) => {
    e.preventDefault()
    console.log(`Bearer ${getToken()}`)
    try {
      await axios.delete(`/api/comments/${commentId}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
    console.log(e.target.value)
    console.log('Form data -->', formData)
  }

  const deleteAnimal = async (e) => {
    e.preventDefault()
    try {
      await axios.delete(`/api/animals/${animalId}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      navigate('/map')
    } catch (err) {
      console.log(err)
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
                  {isUserAuth() ?
                    <div className='an-header-right'>
                      <button onClick={handleCommentShow}>Add comment</button>
                      <Modal show={commentShow} onHide={handleCommentClose}>
                        <Modal.Header closeButton>
                          <Modal.Title className="comment-title">Impressed? Share your thoughts!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form>
                            <label htmlFor='rating'>WOW rating</label>
                            <select name='rating' onChange={handleChange}>
                              <option disabled selected>---</option>
                              <option value={1}>1 (meh)</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                              <option value={5}>5 (WOW)</option>
                            </select>
                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlTextarea1">
                              <Form.Label>Comment</Form.Label>
                              <Form.Control as="textarea" rows={3} onChange={handleChange} name='text' />
                            </Form.Group>
                          </Form>
                        </Modal.Body>
                        <Modal.Footer>
                          <button className='add-comment-btn' onClick={handlePostComment}>Add comment</button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                    :
                    <Link to={'/login'} className='detail-login-btn'>Log in to comment!</Link>
                  }
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
                {isUserOwner(animal) &&
                  <div className='owner-buttons'>
                    <button className='delete-btn' onClick={handleDeleteShow}>Delete</button>
                    <Link className='edit-btn' to={`/animals/${animal.id}/edit`}>Edit Animal</Link>
                    <Modal show={deleteShow} onHide={handleDeleteClose}>
                      <Modal.Header closeButton></Modal.Header>
                      <Modal.Body>
                        Are you sure you want to delete your animal?
                      </Modal.Body>
                      <Modal.Footer>
                        <button className='delete-btn' onClick={deleteAnimal}>Delete animal</button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                }
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
                !isUserCommentOwner(comment) ?
                  <div className='comment' key={comment.id}>
                    <div className='comment-header'>
                      <h4>{comment.added_by.username}</h4>
                    </div>
                    <p>{comment.text}</p>
                  </div>
                  :
                  <div className='comment' key={comment.id}>
                    <div className='comment-header'>
                      <h4>{comment.added_by.username}</h4>
                    </div>
                    <p>{comment.text}</p>
                    <button className='delete-comment-btn' onClick={(e) => handleDeleteComment(e, comment.id)}></button>
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