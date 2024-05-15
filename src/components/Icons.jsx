import L from 'leaflet'
import '../styles/Icon.css'
import bikePointer from "../assets/images/bikePointer.png"
import personPointer from "../assets/images/personPointer.png"
import stationPointer from '../assets/images/stationPointer.png'

const bikeNetwork = new L.Icon({
    iconUrl: bikePointer,
    iconSize: [50, 50],
    popupAnchor:  [1, -10],
})

const person = new L.Icon({
    iconUrl: personPointer,
    iconSize: [40, 40],
    popupAnchor:  [-3, -76]
})

const stationIcon = new L.Icon({
    iconUrl: stationPointer,
    iconSize: [17, 17],
    className: 'pulse circle',
}) 
export { bikeNetwork, person, stationIcon }