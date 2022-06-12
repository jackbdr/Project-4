import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoiamFja2JkciIsImEiOiJjbDQ4azk2djMwMm5qM2NtaWF3YTBiOHRqIn0.B_CRBzLyOuY5KAV0quy-Hg'

const DisplayMap = () => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(11.78)
  const [lat, setLat] = useState(28.91)
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: {
        'version': 8,
        'sources': {
          'raster-tiles': {
            'type': 'raster',
            'tiles': [
              'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg'
            ],
            'tileSize': 256,
          },
        },
        'layers': [
          {
            'id': 'simple-tiles',
            'type': 'raster',
            'source': 'raster-tiles',
            'minzoom': 0,
            'maxzoom': 22,
          }
        ],
      },
      center: [lng, lat],
      zoom: zoom,
      minZoom: 1,
    })
  })

  useEffect(() => {
    if (!map.current) return // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4))
      setLat(map.current.getCenter().lat.toFixed(4))
      setZoom(map.current.getZoom().toFixed(2))
    })
  })

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  )

}

export default DisplayMap

