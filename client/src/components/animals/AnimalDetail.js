import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import { getToken, isUserAuth, isUserOwner, isUserCommentOwner } from '../helpers/Auth'

import Arrow from '../../images/arrow-down.png'
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

  const handleLogout = () => {
    window.localStorage.removeItem('WOE-user-token')
    navigate('/')
  }

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

  // const handlePage = (e) => {
  //   e.preventDefault()
  //   if (e.target.className === 'arrow-left' && page === 1) return
  //   if (e.target.className === 'arrow-left' && page === 2) {
  //     setPage(1)
  //   }
  //   if (e.target.className === 'arrow-right' && page === 2) return
  //   if (e.target.className === 'arrow-right' && page === 1) {
  //     setPage(2)
  //   }
  // }

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
      <section className='all-pages'>
        <section className='animal-page1'>
          <div className='div-navbar'>
            <Link className='back-to-map' to={'/map'}>Back to map</Link>
            {isUserAuth() &&
              <p className='logout-btn' onClick={handleLogout}>Log out</p>
            }
          </div>
          <div className='page1-no-nav'>
            <div className='animal-wrapper'>
              <img className='img-1' src={animal.img_1} />
              <div className='animal-info'>
                <div className='animal-header'>
                  <div className='an-header-left'>
                    <h1>{animal.name === 'Giant Shark' ? 'The Meg' : animal.name}</h1>
                    <h4>{animal.sci_name}</h4>
                    <p>{animal.an_group}</p>
                  </div>
                  {isUserAuth() &&
                    <div className='an-header-right'>
                      {/* <p className='add-comment-btn' onClick={handleCommentShow}>Add comment</p> */}
                      <Modal className='comment-modal' show={commentShow} onHide={handleCommentClose}>
                        <Modal.Header closeButton>
                          <Modal.Title className="comment-title">Impressed? Share your thoughts!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form className='comment-form'>
                            <div className='wow-rating'>
                              <label htmlFor='rating'>WOW rating</label>
                              <select name='rating' onChange={handleChange}>
                                <option disabled selected>---</option>
                                <option value={1}>1 (meh)</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5 (WOW)</option>
                              </select>
                            </div>
                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlTextarea1">
                              <Form.Label className='comment-label'>Comment</Form.Label>
                              <Form.Control className='text-detail' as="textarea" rows={3} onChange={handleChange} name='text' />
                            </Form.Group>
                          </Form>
                        </Modal.Body>
                        <Modal.Footer>
                          <button className='done-comment-btn' onClick={handlePostComment}>DONE</button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  }
                </div>
                <p className='description text-detail'>{animal.description}</p>
                <div className='icon-info'>
                  <div className='size category'>
                    <img className='icon' src={Ruler} alt='ruler' />
                    {animal.height ?
                      <p className='text-detail'>{animal.height} (height)</p>
                      :
                      <p className='text-detail'>{animal.length} (length)</p>
                    }
                  </div>
                  {animal.avg_weight &&
                    <div className='weight category'>
                      <img className='icon' src={Scales} alt='scales' />
                      <p className='text-detail'>~{animal.avg_weight} kg</p>
                    </div>
                  }
                  <div className='habitat category'>
                    <img className='icon' src={Home} alt='house' />
                    <p className='text-detail'>{animal.habitat}</p>
                  </div>
                  <div className='diet category'>
                    <img className='icon' src={KnifeFork} alt='knife-fork' />
                    <p className='text-detail'>{animal.diet}</p>
                  </div>
                  {animal.life_span &&
                    <div className='lifespan category'>
                      <img className='icon' src={Lifespan} alt='lifespan-icon' />
                      <p className='text-detail'>{animal.life_span}</p>
                    </div>
                  }
                  {animal.con_status === 1 &&
                    <div className='con-status category'>
                      <img className='icon' src={Extinct} />
                      <p className='text-detail'>Extinct</p>
                    </div>
                  }
                  {animal.con_status === 2 &&
                    <div className='con-status category'>
                      <img className='icon' src={ExtinctWild} />
                      <p className='text-detail'>Extinct in the wild</p>
                    </div>
                  }
                  {animal.con_status === 3 &&
                    <div className='con-status category'>
                      <img className='icon' src={CritEndang} />
                      <p className='text-detail'>Critically Endangered</p>
                    </div>
                  }
                  {animal.con_status === 4 &&
                    <div className='con-status category'>
                      <img className='icon' src={Endangered} />
                      <p className='text-detail'>Endangered</p>
                    </div>
                  }
                  {animal.con_status === 5 &&
                    <div className='con-status category'>
                      <img className='icon' src={Vulnerable} />
                      <p className='text-detail'>Vulnerable</p>
                    </div>
                  }
                  {animal.con_status === 6 &&
                    <div className='con-status category'>
                      <img className='icon' src={NearThreat} />
                      <p className='text-detail'>Near Threatened</p>
                    </div>
                  }
                  {animal.con_status === 7 &&
                    <div className='con-status category'>
                      <img className='icon' src={LeastConcern} />
                      <p className='text-detail'>Least Concern</p>
                    </div>
                  }
                  {animal.con_status === 8 &&
                    <div className='con-status category'>
                      <img className='icon' src={DataDef} />
                      <p className='text-detail'>Data Deficient</p>
                    </div>
                  }
                </div>
                {(isUserOwner(animal) && isUserAuth()) &&
                  <div className='owner-buttons'>
                    <Link className='edit-btn' to={`/animals/${animal.id}/edit`}>Edit</Link>
                    <button className='delete-btn' onClick={handleDeleteShow}>Delete</button>
                    <Modal className='delete-modal' show={deleteShow} onHide={handleDeleteClose}>
                      <Modal.Header closeButton></Modal.Header>
                      <Modal.Body>
                        Are you sure you want to delete your animal?
                      </Modal.Body>
                      <Modal.Footer>
                        <button className='delete-btn' onClick={deleteAnimal}>Delete</button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                }
              </div>
            </div>
            <img className='arrow-down-left' src={Arrow} alt='arrow' />
            <img className='arrow-down-right' src={Arrow} alt='arrow' />
          </div>
        </section>
        <section className='animal-page2'>
          <div className='content-page2'>
            <h4 className='text-detail fact'>{animal.fact}</h4>
            <img className='img-2' src={animal.img_2} />
          </div>
          {/* <div className='arrow-btns2'>
            <img className='arrow-down-left2' src={Arrow} alt='arrow' />
            <img className='arrow-down-right2' src={Arrow} alt='arrow' />
          </div> */}
          <div className='add-comments'>
            {isUserAuth() ?
              <p className='add-comment-btn' onClick={handleCommentShow}>Add comment</p>
              :
              <Link className='add-comment-btn' to={'/login'}>Log in to comment!</Link>
            }
            <div className='comments'>
              {animal.comments.length > 0 ?
                animal.comments.map(comment => {
                  return (
                    !isUserCommentOwner(comment) ?
                      <div className='comment' key={comment.id}>
                        <div className='comment-header'>
                          <h4>{comment.added_by.username}</h4>
                          <h4 className='user-rating'>WOW rating {comment.rating}</h4>
                        </div>
                        <p className='text-detail'>{comment.text}</p>
                      </div>
                      :
                      <div className='comment' key={comment.id}>
                        <div className='comment-header'>
                          <h4>{comment.added_by.username}</h4>
                          <h4 className='user-rating'>WOW rating {comment.rating}</h4>
                        </div>
                        <div className='comment-with-delete'>
                          <p className='text-detail'>{comment.text}</p>
                          <p className='delete-comment-btn' onClick={(e) => handleDeleteComment(e, comment.id)}>Delete</p>
                        </div>
                      </div>
                  )
                })
                :
                <h5>No comments yet!</h5>
              }
            </div>
          </div>
        </section>
      </section>
      :
      <h2>{errors && 'Sorry, we had trouble retrieving the data'}</h2>
    }
    </>

  )
}

export default AnimalDetail


