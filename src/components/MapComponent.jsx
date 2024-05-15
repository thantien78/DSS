import React, { useState } from 'react';
import '../styles/MapComponent.css';
import Loader from './Loader';
import Dashboard from './Dashboard';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, Tooltip } from 'react-leaflet';
import { useEffect } from 'react';
import { fetchUserData, fetchNetworks, fetchBikeStations } from '../redux/action/';
import { useDispatch, useSelector } from 'react-redux'
import { bikeNetwork, person, stationIcon } from './Icons';
import RoutingMachine from './RoutingMachine';

const MapComponent = () => {

    const dispatch = useDispatch()
    const VIN_ANGELES_CENTER = [10.254260,105.972298]//Vĩnh Long
    const [latitude, setLatitude] = useState(0) //10.254260
    const [longitude, setLongitude] = useState(0) //105.972298

    const [bikeLat, setBikeLat] = useState(null)
    const [bikeLong, setBikeLong] = useState(null)
    const [checkBikeAdress, setCheckBikeAdress] = useState(false)
    const [checkCords, setCheckCords] = useState(false)

    const countryCode = useSelector((state) => state.countryCode)
    const bikeNetworks = useSelector((state) => state.bikeNetworks.networks) || []
    const isLightMode = useSelector((state) => state.isLightMode)
    const getStations = useSelector((state) => state.getStations)
    const stations = useSelector((state) => state.bikeStations.network?.stations)

    const bikes = bikeNetworks.filter((network) => network.location.country === countryCode)

    const setBikeAdress = (station) => {
      setBikeLat(station.latitude)
      setBikeLong(station.longitude)

      setCheckBikeAdress(false)
      setCheckBikeAdress(true)
    }

    useEffect(() => {
      if(navigator.geolocation) {
          navigator.geolocation.watchPosition((position) => {
              setLatitude(position.coords.latitude)
              setLongitude(position.coords.longitude)
              setCheckCords(true)
          })
      }
    }, [])

    useEffect(async () => {
       await dispatch(fetchUserData())
       await dispatch(fetchNetworks())
    }, [])

  return (
      !checkCords ? <Loader /> :
    <MapContainer center={VIN_ANGELES_CENTER} zoom={15} zoomControl={false}>
      <Dashboard latitude={VIN_ANGELES_CENTER.latitude} longitude={VIN_ANGELES_CENTER.longitude} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        className={!isLightMode ? 'default-map' : 'map-tiles'}
      />
      <Marker icon={person} position={[latitude, longitude]}></Marker>

      { 
        bikes.map((bike) => (
          <Marker
          key={bike.id}
          icon={ bikeNetwork }
          position={[bike.location.latitude, bike.location.longitude]}
          eventHandlers={{click: () => dispatch(fetchBikeStations(bike.href))}}
          >
            <Popup>
              {bike.name}
            </Popup>
          </Marker>
    ))
      }
      {!getStations ? console.log('waiting...') :
        stations.map((station) => (
          <Marker
          key={station.id}
          icon={ stationIcon }
          position={[station.latitude, station.longitude]}
          eventHandlers={{click: () => setBikeAdress(station)}}
          >
            <Tooltip>
              <div style={{lineHeight: '3px'}}>
                <p className='font-weight-bold'>{station.name}</p>
                <p>{station.extra.slots} Slots</p>
                <p>{station.free_bikes} Bikes</p>
              </div>
            </Tooltip>
          </Marker>
        ))
      } 
      <ZoomControl position="topright" />
       {
         checkBikeAdress ?   <RoutingMachine userLat={latitude} userLong={longitude} bikeLat={bikeLat} bikeLong={bikeLong}/> : null
       }
        </MapContainer>
  
  )
}

export default MapComponent