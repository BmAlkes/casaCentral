import React, { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css'

import *  as ELG from 'esri-leaflet-geocoder'




const GeoCoderMarker = ({address}) => {

  const map = useMap();
  const [position, setPosition] = useState([60, 19]);

  useEffect(()=>{
    ELG.geocode().text(address).run((err, results, response)=>{
        if(results.results.length > 0){
            const {lat, lng} = results.results[0].latlng
            setPosition([lat, lng])
            map.flyTo([lat,lng],6)
        }
    })
  },[address]) 
  return (
    <Marker position={position}>
      <Popup>
        {address}
      </Popup>
    </Marker>
  );
};

export default GeoCoderMarker;
