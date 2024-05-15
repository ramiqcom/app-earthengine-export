import { Grid } from 'gridjs-react';
import { useState } from 'react';
import { getDatabase } from '../module/server';

export default function Database({ database }: { database: Record<string, any>[] }) {
  const [data, setData] = useState(database);

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
      <button
        onClick={async () => {
          const database = await getDatabase();
          setData(database);
        }}
      >
        Refresh
      </button>

      <Grid columns={columns} data={data} />
    </div>
  );
}
