'use client';

import { useState } from 'react';
import MapCanvas from '../components/map';
import Panel from '../components/panel';
import collection from '../data/collection.json';
import compositeList from '../data/composite.json';
import { AppContext } from '../module/store';

export default function App() {
  const satellites = collection;
  const [satellite, setSatellite] = useState(satellites[0]);

  const visualizations = satellite.property.visualization.map(
    (vis) => new Object({ value: vis, label: vis }),
  );
  const [visualization, setVisualization] = useState(visualizations[0]);

  const composites = compositeList.map((comp) => new Object({ value: comp, label: comp }));
  const [composite, seComposite] = useState(composites[1]);

  const states = {
    satellite,
    setSatellite,
    satellites,
    visualizations,
    visualization,
    setVisualization,
    composites,
    composite,
    seComposite,
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
