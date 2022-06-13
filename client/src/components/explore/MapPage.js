import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'

import { MapAncientStyle } from './MapAncientStyle'
import { MapModernStyle } from './MapModernStyle'

mapboxgl.accessToken = 'pk.eyJ1IjoiamFja2JkciIsImEiOiJjbDQ4azk2djMwMm5qM2NtaWF3YTBiOHRqIn0.B_CRBzLyOuY5KAV0quy-Hg'

const DisplayMap = () => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(11.78)
  const [lat, setLat] = useState(28.91)
  const [zoom, setZoom] = useState(1)
  const [style, setStyle] = useState(MapModernStyle)
  const [isAncient, setIsAncient] = useState(true)

  useEffect(() => {
    if (map.current && style === map.current.style.stylesheet) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: style,
      center: [lng, lat],
      zoom: zoom,
      minZoom: 1,
      attributionControl: false,
    })
  }, [style])

  useEffect(() => {
    if (!map.current) return // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4))
      setLat(map.current.getCenter().lat.toFixed(4))
      setZoom(map.current.getZoom().toFixed(2))
    })
  })

  const handleToggle = (e) => {
    e.preventDefault()
    if (map.current.style.stylesheet === MapAncientStyle) {
      setStyle(MapModernStyle)
    } else {
      setStyle(MapAncientStyle)
    }
    // console.log(style)
    console.log(map.current.style.stylesheet)
  }

  return (
    <div>
      <button onClick={handleToggle}>Toggle map</button>
      <div ref={mapContainer} className="map-container" />
    </div>
  )

}

export default DisplayMap

