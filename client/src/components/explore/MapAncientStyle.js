export const MapAncientStyle = {
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
}