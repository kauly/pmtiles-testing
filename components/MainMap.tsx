'use client';
import Map, { MapboxStyle } from 'react-map-gl';
import maplibreGl from 'maplibre-gl';
import * as pmtiles from 'pmtiles';
import layers from 'protomaps-themes-base';

const protocol = new pmtiles.Protocol();

maplibreGl.addProtocol('pmtiles', protocol.tile);

const mapStyle: MapboxStyle = {
  version: 8,
  glyphs: 'https://cdn.protomaps.com/fonts/pbf/{fontstack}/{range}.pbf',
  sources: {
    protomaps: {
      type: 'vector',
      url: 'pmtiles://http://127.0.0.1:8080/gpolis.pmtiles',
    },
  },
  layers: layers('protomaps', 'debug'),
};

export default function MainMap() {
  return (
    <Map
      mapLib={maplibreGl}
      initialViewState={{
        longitude: -69.7292625,
        latitude: -13.6562901,
        zoom: 4,
      }}
      style={{ width: '100vw', height: '100vh' }}
      mapStyle={mapStyle}
      attributionControl={false}
    />
  );
}
