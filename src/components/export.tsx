import { useContext, useEffect, useState } from 'react';
import { exportGeotiff, exportTile } from '../module/server';
import { AppContext } from '../module/store';

export default function ExportPanel() {
  const {
    rasterUrl,
    satellite,
    visualization,
    endDate,
    startDate,
    composite,
    maxZoom,
    setMaxZoom,
    geojsonBounds,
  } = useContext(AppContext);

  // Bucket and filenameprefix
  const [bucket, setBucket] = useState<string>();
  const [fileNamePrefix, setFileNamePrefix] = useState<string>();

  // Export button disabled
  const [exportButtonDisabled, setExportButtonDisabled] = useState(true);

  useEffect(() => {
    setExportButtonDisabled(rasterUrl && bucket && fileNamePrefix ? false : true);
  }, [bucket, fileNamePrefix, rasterUrl]);

  // Status
  const [status, setStatus] = useState<string>();

  return (
    <>
      <div>
        Google Cloud Storage Bucket
        <input type='text' value={bucket} onChange={(e) => setBucket(e.target.value)} />
      </div>

      <div>
        File name prefix or file path name
        <input
          type='text'
          value={fileNamePrefix}
          onChange={(e) => setFileNamePrefix(e.target.value)}
        />
      </div>

      <button
        onClick={async () => {
          setExportButtonDisabled(true);
          setStatus('Create export task...');
          try {
            const body = {
              satellite: satellite.value,
              visualization: visualization.value,
              date: [startDate, endDate],
              geojson: geojsonBounds,
              composite: composite.value,
              bucket,
              fileNamePrefix,
            };

            const { name, message } = await exportGeotiff(body);

            if (message) {
              throw new Error(message);
            }

            // Export task status
            setStatus(`Export task success\nThe operation name is ${name}`);
          } catch ({ message }) {
            // Show error
            setStatus(message);
          }
          setExportButtonDisabled(false);
        }}
        disabled={exportButtonDisabled}
      >
        Export Cloud Optimized GeoTIFF
      </button>

      <div>
        Maximum zoom of the tile map
        <input
          type='number'
          max={24}
          min={0}
          value={maxZoom}
          onChange={(e) => {
            let value = Number(e.target.value);
            if (value > 24) {
              value = 24;
            } else if (value < 0) {
              value = 0;
            }
            setMaxZoom(value);
          }}
        />
      </div>

      <button
        disabled={exportButtonDisabled}
        onClick={async () => {
          setExportButtonDisabled(true);
          setStatus('Create export task...');
          try {
            const body = {
              satellite: satellite.value,
              visualization: visualization.value,
              date: [startDate, endDate],
              geojson: geojsonBounds,
              composite: composite.value,
              bucket,
              fileNamePrefix,
              maxZoom,
            };

            const { name, message } = await exportTile(body);

            if (message) {
              throw new Error(message);
            }

            // Export task status
            setStatus(`Export task success\nThe operation name is ${name}`);
          } catch ({ message }) {
            // Show error
            setStatus(message);
          }
          setExportButtonDisabled(false);
        }}
      >
        Export Map Tile
      </button>

      <div className='status'>{status}</div>
    </>
  );
}
