'use client';

import { useContext } from 'react';
import { AppContext } from '../module/store';
import { Select } from './input';
import Region from './roi';

export default function Panel() {
  return (
    <div id='panel' className='flexible vertical gap'>
      <div className='title'>Earth Engine Data Exporting Application</div>

      <Satellite />
      <Region />
      <Dates />
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

function Dates() {
  const { startDate, setStartDate, endDate, setEndDate } = useContext(AppContext);

  return (
    <div className='flexible vertical small-gap'>
      <div className='flexible wide'>
        <div>Start date</div>
        <div>End date</div>
      </div>

      <div className='flexible wide'>
        <input type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>
    </div>
  );
}

function Composite() {
  const { composite, setComposite, composites } = useContext(AppContext);

  return (
    <div className='flexible vertical small-gap'>
      Composite
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
