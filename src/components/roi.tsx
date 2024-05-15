import { useContext, useState } from 'react';
import formatsData from '../data/format.json';
import loadGeojson from '../module/geodata';
import { AppContext } from '../module/store';

export default function Region() {
  const formats = Object.keys(formatsData);

  return (
    <div className='flexible vertical small-gap'>
      Region of Interest
      <div style={{ fontSize: 'small' }}>Only support GeoJSON, KML, and Shapefile in ZIP</div>
      <div className='flexible wide'></div>
      <Upload formats={formats} />
    </div>
  );
}

function Upload({ formats }: { formats: string[] }) {
  const { setGeojson } = useContext(AppContext);
  const fileFormats = formats.map((format) => `.${format}`).join(',');
  const [status, setStatus] = useState<string>();

  return (
    <>
      <input
        type='file'
        accept={fileFormats}
        onChange={async (e) => {
          try {
            setStatus('Processing data');
            const file = e.target.files[0];
            const name = file.name;
            const format = name.split('.').at(-1);
            const geojson = await loadGeojson(file, format);
            setGeojson(geojson);
            setStatus(undefined);
          } catch ({ message }) {
            setStatus(message);
          }
        }}
      />
      <div className='status'>{status}</div>
    </>
  );
}
