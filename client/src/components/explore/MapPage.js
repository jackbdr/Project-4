import React, { useRef, useEffect, useState } from 'react'
import axios from 'axios'
import mapboxgl, { accessToken } from 'mapbox-gl'
import ReactMapGL, { Marker, Source, Layer, Popup } from 'react-map-gl'

import { MapAncientStyle } from './MapAncientStyle'
import { MapModernStyle } from './MapModernStyle'

import Pin from '../../images/pinkpin.png'

const DisplayMap = () => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(11.78)
  const [lat, setLat] = useState(28.91)
  const [zoom, setZoom] = useState(1)
  const [style, setStyle] = useState(MapAncientStyle)
  const [animals, setAnimals] = useState([])
  const [isAncient, setIsAncient] = useState(true)

  const accessToken = 'pk.eyJ1IjoiamFja2JkciIsImEiOiJjbDQ4azk2djMwMm5qM2NtaWF3YTBiOHRqIn0.B_CRBzLyOuY5KAV0quy-Hg'


  useEffect(() => {
    const getAnimals = async () => {
      try {
        const { data } = await axios.get('/api/animals')
        setAnimals(data)
      } catch (err) {
        console.log(err)
      }
    }
    getAnimals()
  }, [])

  const [popup, setPopup] = useState(null)
  const [selectedMarker, setSelectedMarker] = useState(null)

  const openPopup = (animal, id) => {
    setPopup(animal)
    setSelectedMarker(id)
  }

  const handleButtons = (e) => {
    e.preventDefault()
    if (e.target.className === 'ancient-button' && map.current.style.stylesheet === MapAncientStyle) return
    if (e.target.className === 'ancient-button' && map.current.style.stylesheet !== MapAncientStyle) {
      setStyle(MapAncientStyle)
    }
    if (e.target.className === 'modern-button' && map.current.style.stylesheet === MapModernStyle) return
    if (e.target.className === 'modern-button' && map.current.style.stylesheet !== MapModernStyle) {
      setStyle(MapModernStyle)
    }
    // console.log(style)
    console.log(map.current.style.stylesheet)
  }

  return (
    <div>
      <button className='ancient-button' onClick={handleButtons}>Ancient</button>
      <button className='modern-button' onClick={handleButtons}>Modern</button>
      {/* <div ref={mapContainer} className="map-container" /> */}
      <ReactMapGL
        mapboxAccessToken={accessToken}
        initialViewState={{
          longitude: 11.87,
          latitude: 28.91,
          zoom: 1,
          minZoom: 1,
        }}
        mapStyle='mapbox://styles/jackbdr/cl4cypbf6000t15mk3jy6tx18'
      >
        {animals.length > 0 &&
          animals.map(animal => {
            const { id, long, lat } = animal
            console.log(lat, long)
            return (
              <>
                <Marker key={id} longitude={long} latitude={lat} scale='0.1'>
                  <img className='pin' src={Pin} onClick={() => openPopup(animal, id)} />
                </Marker>
                {(popup && selectedMarker === id) &&
                  <Popup
                    key={id}
                    longitude={long}
                    latitude={lat}
                    onClose={() => setPopup(null)}
                    closeButton={true}
                    closeOnClick={false}
                    offsetTop={-30}
                  >
                    <img src={popup.img_1} />
                  </Popup>
                }
              </>
            )
          })
        }
      </ReactMapGL>
    </div>
  )

}

export default DisplayMap

