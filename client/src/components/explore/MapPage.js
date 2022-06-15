import React, { useRef, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactMapGL, { Marker, Source, Layer, Popup } from 'react-map-gl'

import { MapAncientStyle } from './MapAncientStyle'

import Pin from '../../images/pinkpin.png'

const DisplayMap = () => {

  const [style, setStyle] = useState(MapAncientStyle)
  const [animals, setAnimals] = useState([])
  const [filteredAnimals, setFilteredAnimals] = useState([])
  const [isAncient, setIsAncient] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(0)

  const accessToken = 'pk.eyJ1IjoiamFja2JkciIsImEiOiJjbDQ4azk2djMwMm5qM2NtaWF3YTBiOHRqIn0.B_CRBzLyOuY5KAV0quy-Hg'
  const MapModernStyle = 'mapbox://styles/jackbdr/cl4cypbf6000t15mk3jy6tx18'


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

  const ancientAnimals = animals.filter(animal => {
    return animal.is_ancient
  })
  const modernAnimals = animals.filter(animal => {
    return !animal.is_ancient
  })


  useEffect(() => {
    if (isAncient) {
      setFilteredAnimals(ancientAnimals)
    } else if (!isAncient) {
      setFilteredAnimals(modernAnimals)
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
    if (e.target.className === 'ancient-button' && style !== MapAncientStyle) {
      setStyle(MapAncientStyle)
      setIsAncient(true)
    }
    if (e.target.className === 'modern-button' && style !== MapModernStyle) {
      setStyle(MapModernStyle)
      setIsAncient(false)
    }
  }

  return (
    <div className='map-page-container'>
      <div className='map-buttons'>
        <button className='ancient-button' onClick={handleButtons}>Ancient</button>
        <button className='modern-button' onClick={handleButtons}>Modern</button>
      </div>
      <div className='map-container'>
        <ReactMapGL
          mapboxAccessToken={accessToken}
          initialViewState={{
            longitude: 11.87,
            latitude: 28.91,
            zoom: 1,
            minZoom: 1,
          }}
          mapStyle={style}
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
                  {zoomLevel > 0 &&
                    <Marker longitude={long} latitude={lat} popupOff>
                      <img className='marker-img' src={Pin} onClick={() => openPopup(animal, id)} />
                    </Marker>
                  }
                  {(popup && selectedMarker === id) &&
                    <Link to={`/animals/${id}`}>
                      <Popup
                        longitude={long}
                        latitude={lat}
                        onClose={() => setPopup(null)}
                        closeButton={true}
                        closeOnClick={false}
                        closeOnMove={true}
                        // offsetTop={-30}
                        anchor={undefined}
                      >
                        <div className='popup'>
                          <img className='popup-img' src={popup.img_1} />
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
      <Link to={'/animals/add'}>Add Animal</Link>
    </div>
  )

}

export default DisplayMap

