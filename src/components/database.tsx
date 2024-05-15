import { Grid } from 'gridjs-react';
import { useState } from 'react';
import { getDatabase } from '../module/server';

export default function Database({ database }: { database: Record<string, any>[] }) {
  const [data, setData] = useState(database);
  const [disabledRefresh, setDisabledRefresh] = useState(false);
  const [status, setStatus] = useState<string>();

  const columns = [
    {
      name: 'operation_name',
      width: '20%',
    },
    {
      name: 'operation_type',
      width: '20%',
    },
    {
      name: 'operation_state',
      width: '20%',
    },
    {
      name: 'operation_started',
      width: '20%',
    },
    {
      name: 'operation_updated',
      width: '20%',
    },
    {
      name: 'result_url',
      width: '20%',
    },
  ];

  return (
    <div
      style={{
        width: '20vw',
        padding: '2vh',
        fontSize: 'smaller',
        overflowX: 'auto',
        overflowY: 'auto',
      }}
      className='flexible vertical gap'
    >
      <div className='flexible center1 gap' style={{ width: '100%' }}>
        <button
          disabled={disabledRefresh}
          onClick={async () => {
            try {
              setStatus('Updating table...');
              setDisabledRefresh(true);
              const database = await getDatabase();
              setData(database);
              setStatus('Success');
            } catch ({ message }) {
              setStatus(message);
            } finally {
              setDisabledRefresh(false);
            }
          }}
        >
          Refresh
        </button>
        {status}
      </div>

      <Grid columns={columns} data={data} />
    </div>
  );
}
