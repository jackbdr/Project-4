import React from 'react'
import { createRoot } from 'react-dom/client'
import './components/styles/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import App from './App'

createRoot(document.getElementById('root')).render(<App />)