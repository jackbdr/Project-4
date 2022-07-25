import React, { useRef, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import ReactMapGL, { Marker, Source, Layer, Popup, attributionControl } from 'react-map-gl'

import { MapAncientStyle } from './MapAncientStyle'

import { isUserAuth } from '../helpers/Auth'

import Pin from '../../images/pinkpin.png'

const DisplayMap = () => {

  const navigate = useNavigate()

  const [style, setStyle] = useState(MapAncientStyle)
  const [animals, setAnimals] = useState([])
  const [filteredAnimals, setFilteredAnimals] = useState([])
  const [isAncient, setIsAncient] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(0)

  const accessToken = 'pk.eyJ1IjoiamFja2JkciIsImEiOiJjbDQ4azk2djMwMm5qM2NtaWF3YTBiOHRqIn0.B_CRBzLyOuY5KAV0quy-Hg'
  const MapModernStyle = 'mapbox://styles/jackbdr/cl4cypbf6000t15mk3jy6tx18'

  const handleLogout = () => {
    window.localStorage.removeItem('WOE-user-token')
    navigate('/')
  }

  useEffect(() => {
    const getAnimals = async () => {
      try {
        const { data } = await axios.get('/api/animals')
        setAnimals(data)
        setIsAncient(true)
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    getAnimals()
  }, [])

  // const ancientAnimals = animals.filter(animal => {
  //   return animal.is_ancient
  // })
  // const modernAnimals = animals.filter(animal => {
  //   return !animal.is_ancient
  // })


  useEffect(() => {
    if (isAncient) {
      setFilteredAnimals(animals.filter(animal => {
        return animal.is_ancient
      }))
    } else if (!isAncient) {
      setFilteredAnimals(animals.filter(animal => {
        return !animal.is_ancient
      }))
    }
  }, [isAncient])


  const [popup, setPopup] = useState(null)
  const [selectedMarker, setSelectedMarker] = useState(null)

  const openPopup = (animal, id) => {
    setPopup(animal)
    setSelectedMarker(id)
  }

  const handleButtons = (e) => {
    e.preventDefault()
    if (e.target.className === 'ancient-button map-btn target map-btn-not-selected' && style !== MapAncientStyle) {
      setStyle(MapAncientStyle)
      setIsAncient(true)
    }
    if (e.target.className === 'modern-button map-btn target' && style !== MapModernStyle) {
      setStyle(MapModernStyle)
      setIsAncient(false)
    }
  }

  return (
    <div className='map-page-container'>
      {/* <Link to='/' className='header-title'><p>What On Earth</p></Link> */}
      <div className='div-navbar'>
        <Link className='back-to-map' to={'/'}>Back to home</Link>
        {isUserAuth() &&
          <p className='logout-btn' onClick={handleLogout}>Log out</p>
        }
      </div>
      {style === MapAncientStyle ?
        <div className='map-buttons'>
          <button className='ancient-button map-btn target map-btn-selected' onClick={handleButtons}>Ancient</button>
          <button className='modern-button map-btn target' onClick={handleButtons}>Current</button>
        </div>
        :
        <div className='map-buttons'>
          <button className='ancient-button map-btn target map-btn-not-selected' onClick={handleButtons}>Ancient</button>
          <button className='modern-button map-btn target map-btn-selected' onClick={handleButtons}>Current</button>
        </div>
      }
      <div className='map-container'>
        <ReactMapGL
          mapboxAccessToken={accessToken}
          initialViewState={{
            longitude: 11.87,
            latitude: 28.91,
            zoom: 1.2,
            minZoom: 1,
          }}
          mapStyle={style}
          attributionControl={false}
          onZoom={(e) => {
            setZoomLevel(e.viewState.zoom)
            // console.log(e.viewState.zoom)
          }}
        >
          {animals.length > 0 &&
            filteredAnimals.map(animal => {
              const { id, long, lat } = animal
              return (
                <div key={id} className='marker-popup'>
                  {/* {zoomLevel > 0.9 && */}
                  <Marker className='marker' longitude={long} latitude={lat} popupOff>
                    <img className='marker-img' src={Pin} onClick={() => openPopup(animal, id)} />
                  </Marker>
                  {/* // } */}
                  {(popup && selectedMarker === id) &&
                    <Link to={`/animals/${id}`}>
                      <Popup
                        className='popup'
                        longitude={long}
                        latitude={lat}
                        onClose={() => setPopup(null)}
                        closeButton={true}
                        closeOnClick={false}
                        closeOnMove={true}
                        // offsetTop={-30}
                        anchor={undefined}
                      >
                        <div className='popup-div'>
                          <img className='popup-img' src={popup.img_1} alt={`${popup.name}`} />
                          <p className='show'>{popup.name === 'Giant Shark' ? 'The Meg' : popup.name}</p>
                        </div>

                      </Popup>
                    </Link>
                  }
                </div>
              )
            })
          }
        </ReactMapGL>
      </div>
      {isUserAuth() ?
        <Link className='add-animal-btn' to={'/animals/add'}><p>Add Animal</p></Link>
        :
        <div className='login-todo'>
          <p>Log in to add your own animals to the map!</p>
          <Link className='login-btn map-btn' to={'/login'}><h3>Log in</h3></Link>
        </div>
      }
    </div>
  )

}

export default DisplayMap

