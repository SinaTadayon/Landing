import React from 'react';
import partner from './../../img/map.png';
import HeaderCard from './HeaderCard';
import partnerMobile from './../../img/mobile-map.svg';

const MapSection = () => (
  <div className="partner-part">
    <HeaderCard />
    <div className="map show-desktop">
      <img src={partner} alt="map" />
    </div>
    <div className="map show-mobile">
      <img src={partnerMobile} alt="map" />
    </div>
  </div>
);

export default MapSection;
