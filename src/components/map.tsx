'use client';

import { bbox } from '@turf/turf';
import { GeoJSONSource, LngLatBoundsLike, Map, RasterTileSource } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../module/store';

export default function MapCanvas() {
  const { geojson, rasterUrl } = useContext(AppContext);

  const [map, setMap] = useState<Map>();

  const mapIdId = 'map';
  const keyStadia = process.env.NEXT_PUBLIC_STADIA_KEY;
  const style = `https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json?api_key=${keyStadia}`;

  const vectorId = 'vector';
  const rasterId = 'raster';

  useEffect(() => {
    const map = new Map({
      container: mapIdId,
      zoom: 4,
      center: [119, 0],
      style,
    });
    setMap(map);
  }, []);

  useEffect(() => {
    if (map && geojson) {
      if (map.getSource(vectorId)) {
        const source = map.getSource(vectorId) as GeoJSONSource;
        source.setData(geojson);
      } else {
        map.addSource(vectorId, {
          type: 'geojson',
          data: geojson,
        });
        map.addLayer({
          source: vectorId,
          id: vectorId,
          type: 'line',
          paint: {
            'line-color': 'cyan',
            'line-width': 4,
          },
        });
      }
      const bounds = bbox(geojson) as LngLatBoundsLike;
      map.fitBounds(bounds, { padding: 5 });
    }
  }, [map, geojson]);

  useEffect(() => {
    if (map && rasterUrl) {
      if (map.getSource(rasterId)) {
        const source = map.getSource(rasterId) as RasterTileSource;
        source.setTiles([rasterUrl]);
      } else {
        map.addSource(rasterId, {
          type: 'raster',
          tiles: [rasterUrl],
          tileSize: 128,
        });
        map.addLayer({
          source: rasterId,
          id: rasterId,
          type: 'raster',
          maxzoom: 22,
          minzoom: 0,
        });
      }
    }
  }, [map, rasterUrl]);

  return <div id={mapIdId}></div>;
}
