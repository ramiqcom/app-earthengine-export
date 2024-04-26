'use client';

import { useContext } from 'react';
import { AppContext } from '../module/store';
import { Select } from './input';

export default function Panel() {
  return (
    <div id='panel' className='flexible vertical gap'>
      <div className='title'>Earth Engine Data Exporting Application</div>

      <Satellite />
      <Composite />
      <Visualization />
    </div>
  );
}

function Satellite() {
  const { satellite, setSatellite, satellites } = useContext(AppContext);

  return (
    <div className='flexible vertical small-gap'>
      Satellite
      <Select options={satellites} value={satellite} onChange={(option) => setSatellite(option)} />
    </div>
  );
}

function Composite() {
  const { composite, setComposite, composites } = useContext(AppContext);

  return (
    <div className='flexible vertical small-gap'>
      Satellite
      <Select options={composites} value={composite} onChange={(option) => setComposite(option)} />
    </div>
  );
}

function Visualization() {
  const { visualization, visualizations, setVisualization } = useContext(AppContext);

  return (
    <div className='flexible vertical small-gap'>
      Visualization
      <Select
        options={visualizations}
        value={visualization}
        onChange={(option) => setVisualization(option)}
      />
    </div>
  );
}
