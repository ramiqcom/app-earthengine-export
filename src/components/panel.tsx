'use client';

import { bbox, bboxPolygon } from '@turf/turf';
import { useContext, useState } from 'react';
import { AppContext } from '../module/store';
import { VisObject } from '../module/type';
import { Select } from './input';
import Region from './roi';

export default function Panel() {
  const { geojson, satellite, startDate, endDate, composite, visualization, setRasterUrl, setVis } =
    useContext(AppContext);

  const [status, setStatus] = useState<string>();

  return (
    <div id='panel' className='flexible vertical gap'>
      <div className='title'>Earth Engine Data Exporting Application</div>

      <Satellite />
      <Region />
      <Dates />
      <Composite />
      <Visualization />

      <button
        disabled={geojson ? false : true}
        onClick={async () => {
          try {
            setStatus('Processesing...');
            const bounds = bbox(geojson);
            const polygon = bboxPolygon(bounds);

            const body = {
              satellite: satellite.value,
              date: [startDate, endDate],
              composite: composite.value,
              visualization: visualization.value,
              geojson: polygon,
            };

            const res = await fetch('/preview', {
              method: 'POST',
              body: JSON.stringify(body),
              headers: {
                'Content-Type': 'application/json',
              },
            });

            const { url, vis }: { url: string; vis: VisObject } = await res.json();
            setRasterUrl(url);
            setVis(vis);

            setStatus(undefined);
          } catch ({ message }) {
            setStatus(message);
          }
        }}
      >
        Preview image
      </button>
      <div className='status'>{status}</div>
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
