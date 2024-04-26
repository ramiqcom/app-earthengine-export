import { useContext, useState } from 'react';
import formatsData from '../data/format.json';
import loadGeojson from '../module/geodata';
import { AppContext } from '../module/store';

export default function Region() {
  const [inputData, setInputData] = useState('upload');
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

function Url({ formats }: { formats: string[] }) {
  const [url, setUrl] = useState<string>();
  const [urlLoadDisabled, setUrlLoadDisabled] = useState(true);
  const [urlStatus, setUrlStatus] = useState<string>();
  const [format, setFormat] = useState<string>();

  return (
    <>
      <input
        type='text'
        value={url}
        onChange={(e) => {
          const url = e.target.value;
          setUrl(url);

          if (!url) {
            setUrlStatus('The url is empty');
            setUrlLoadDisabled(true);
            return;
          }

          const fileFormat = url.split('.').at(-1);
          if (formats.filter((format) => format == fileFormat).length) {
            setUrlLoadDisabled(false);
            setFormat(fileFormat);
          } else {
            setUrlLoadDisabled(true);
            setUrlStatus('File format not supported');
          }
        }}
        placeholder='Paste your data url here!'
      />
      <button
        disabled={urlLoadDisabled}
        onClick={async () => {
          const res = await fetch('/geodata', {
            method: 'POST',
            body: JSON.stringify({ url }),
            headers: { 'Content-Type': 'application/json' },
          });
        }}
      >
        Load
      </button>
      <div className='status'>{urlStatus || undefined}</div>
    </>
  );
}
