'use client';
import Map, { MapboxStyle, NavigationControl } from 'react-map-gl';
import maplibreGl from 'maplibre-gl';
import * as pmtiles from 'pmtiles';
import getBbox from '@turf/bbox';

import gFpolisGeojson from '@/public/gfpolis.json';

const bbox = getBbox(gFpolisGeojson);
const protocol = new pmtiles.Protocol();

maplibreGl.addProtocol('pmtiles', protocol.tile);

const mapStyle: MapboxStyle = {
  version: 8,
  glyphs: 'https://cdn.protomaps.com/fonts/pbf/{fontstack}/{range}.pbf',
  sources: {
    protomaps: {
      type: 'vector',
      url: 'pmtiles://http://127.0.0.1:8080/gfpolis.pmtiles',
      attribution: '<a href="https://protomaps.com">Protomaps</a> ©',
    },
  },
  layers: [
    {
      id: 'gfpolis',
      source: 'protomaps',
      'source-layer': 'gfpolis',
      type: 'line',
      paint: {
        'line-width': 1,
      },
    },
  ],
};

export default function MainMap() {
  return (
    <Map
      mapLib={maplibreGl}
      initialViewState={{
        bounds: bbox,
        zoom: 6,
      }}
      style={{ width: '100vw', height: '100vh' }}
      mapStyle={mapStyle}
    >
      <NavigationControl />
    </Map>
  );
}
