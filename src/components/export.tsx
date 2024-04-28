import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../module/store';

export default function ExportPanel() {
  const { rasterUrl } = useContext(AppContext);

  const [bucket, setBucket] = useState<string>();
  const [fileNamePrefix, setFileNamePrefix] = useState<string>();

  const [exportButtonDisabled, setExportButtonDisabled] = useState(true);

  useEffect(() => {
    setExportButtonDisabled(rasterUrl && bucket && fileNamePrefix ? false : true);
  }, [bucket, fileNamePrefix, rasterUrl]);

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

      <button disabled={exportButtonDisabled}>Export GeoTIFF</button>
      <button disabled={exportButtonDisabled}>Export Tile</button>
    </>
  );
}
