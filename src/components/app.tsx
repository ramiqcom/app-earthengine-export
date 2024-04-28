'use client';

import { FeatureCollection } from '@turf/turf';
import { useState } from 'react';
import MapCanvas from '../components/map';
import Panel from '../components/panel';
import collection from '../data/collection.json';
import compositeList from '../data/composite.json';
import { AppContext } from '../module/store';
import { Option, Options, VisObject } from '../module/type';
import { getDateString } from '../module/util';

export default function App() {
  // Satellite option state
  const satellites = collection;
  const [satellite, setSatellite] = useState(satellites[0]);

  // Visualization option state
  const visualizations: Options = satellite.property.visualization.map(
    (vis) => new Object({ value: vis, label: vis }) as Option,
  );
  const [visualization, setVisualization] = useState(visualizations[0]);

  // Composite option state
  const composites: Options = compositeList.map(
    (comp) => new Object({ value: comp, label: comp }) as Option,
  );
  const [composite, setComposite] = useState(composites[1]);

  // Dates state
  const time = new Date();
  const [endDate, setEndDate] = useState(getDateString(time));
  const timeMillis = time.getTime();
  const oldTimeMillis = timeMillis - 7_889_400_000;
  const [startDate, setStartDate] = useState(getDateString(new Date(oldTimeMillis)));

  // Geojson data
  const [geojson, setGeojson] = useState<FeatureCollection<any>>();

  // Geometry geojson
  const [geojsonBounds, setGeojsonBounds] = useState<FeatureCollection<any>>();

  // Raster url
  const [rasterUrl, setRasterUrl] = useState<string>();

  // Visualization parameter
  const [vis, setVis] = useState<VisObject>();

  // Max zoom
  const [maxZoom, setMaxZoom] = useState(16);

  const states = {
    satellite,
    setSatellite,
    satellites,
    visualizations,
    visualization,
    setVisualization,
    composites,
    composite,
    setComposite,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    geojson,
    setGeojson,
    rasterUrl,
    setRasterUrl,
    vis,
    setVis,
    maxZoom,
    setMaxZoom,
    geojsonBounds,
    setGeojsonBounds,
  };

  return (
    <>
      <AppContext.Provider value={states}>
        <MapCanvas />
        <Panel />
      </AppContext.Provider>
    </>
  );
}
