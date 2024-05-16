import L from 'leaflet'
import '../styles/Icon.css'
import drainPointer from "../assets/images/drainPointer.png"
import waterlevelPointer from "../assets/images/waterlevelPointer.png"
import rainPointer from '../assets/images/rainPointer.png'

const drainIcon = new L.Icon({
    iconUrl: drainPointer,
    iconSize: [50, 50],
    popupAnchor:  [1, -10],
})

const waterlevelIcon = new L.Icon({
    iconUrl: waterlevelPointer,
    iconSize: [40, 40],
    popupAnchor:  [-3, -76]
})

const rainIcon = new L.Icon({
    iconUrl: rainPointer,
    iconSize: [17, 17],
    className: 'pulse circle',
}) 
export { drainIcon, waterlevelIcon, rainIcon }