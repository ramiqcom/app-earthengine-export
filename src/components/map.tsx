'use client';

import { Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useEffect } from 'react';

export default function MapCanvas() {
  const mapIdId = 'map';
  const keyStadia = process.env.NEXT_PUBLIC_STADIA_KEY;
  const style = `https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json?api_key=${keyStadia}`;

  useEffect(() => {
    const map = new Map({
      container: mapIdId,
      zoom: 4,
      center: [119, 0],
      style,
    });
  }, []);

  return <div id={mapIdId}></div>;
}
