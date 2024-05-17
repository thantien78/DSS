import React, { useState } from 'react';
import '../styles/MapComponent.css';
import Loader from './Loader';
import Dashboard from './Dashboard';
import { MapContainer, TileLayer, Marker, GeoJSON, LayersControl, FeatureGroup, Popup, ZoomControl } from 'react-leaflet';
import { useEffect } from 'react';
import { fetchUserData, fetchDrains, fetchWaterLevel, fetchRains } from '../redux/action/';
import { useDispatch, useSelector } from 'react-redux'

import { drainIcon, waterlevelIcon, rainIcon } from './Icons';
// Modules ES
import * as ReactDOMServer from 'react-dom/server';
//load data
import drainData from '../data/cong.json' 
import waterlevelData from '../data/trammucnuoc.json'
import rainData from '../data/trammua.json'

const MapComponent = () => {

    const dispatch = useDispatch()
    const VIN_ANGELES_CENTER = [10.254260,105.972298]//Vĩnh Long
    const [latitude, setLatitude] = useState(0) //10.254260
    const [longitude, setLongitude] = useState(0) //105.972298

    //const [bikeLat, setBikeLat] = useState(null)
    //const [bikeLong, setBikeLong] = useState(null)

    const [checkCords, setCheckCords] = useState(false)

    //const countryCode = useSelector((state) => state.countryCode)

    //const isLightMode = useSelector((state) => state.isLightMode)
    const showDrains = useSelector((state) => state.showDrains)
    const showWaterLevel = useSelector((state) => state.showWaterLevel)
    const showRains = useSelector((state) => state.showRains)

    const onEachFeature = (feature, layer) => {
      const popupContent = ReactDOMServer.renderToString(
        <Popup feature={feature} />
      );
      layer.bindPopup(popupContent);
    };
    
    const Popup = ({ feature }) => {
      let popupContent;
      if (feature.properties && feature.properties.ID) {
        popupContent = feature.properties.popupContent;
      }
    
      return (
        <div className='popupContent'>
          <div className='popupHeader'>THÔNG TIN TRẠM</div>
          <div>
              <p><b>ID:</b> {feature.properties.ID}</p>                  
          </div>
          <div>
              <p><b>LAT:</b> {feature.properties.LAT}</p>                  
          </div>
          <div>
              <p><b>LONG:</b> {feature.properties.LONG}</p>                  
          </div>
        </div>       
      );
    };

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
       //await dispatch(fetchNetworks())
       //await dispatch(fetchDrains())
       //await dispatch(fetchWaterLevel())
       //await dispatch(fetchRains())
    }, [])

  return (
      !checkCords ? <Loader /> :
    <MapContainer preferCanvas center={VIN_ANGELES_CENTER} zoom={16} zoomControl={false}>
      <Dashboard latitude={VIN_ANGELES_CENTER.latitude} longitude={VIN_ANGELES_CENTER.longitude} />
      <LayersControl position="topright">        
        <LayersControl.BaseLayer checked name="GoogleMap">
          <TileLayer
              url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
              subdomains={["mt1", "mt2", "mt3"]}
            />
        </LayersControl.BaseLayer>      
        <LayersControl.BaseLayer name="OpenStreetMap">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay name="Trạm cống" checked={showDrains}>
          <GeoJSON data={drainData} onEachFeature={onEachFeature}/>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Trạm mực nước" checked={showWaterLevel}>
          <GeoJSON data={waterlevelData} onEachFeature={onEachFeature}/>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Trạm mưa" checked={showRains}>
          <GeoJSON data={rainData} onEachFeature={onEachFeature}/>
        </LayersControl.Overlay>
      </LayersControl>
      
      <ZoomControl position='topright'/>
      
    </MapContainer>
  
  )
}

export default MapComponent