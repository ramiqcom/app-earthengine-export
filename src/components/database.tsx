import { Grid } from 'gridjs-react';

export default function Database() {
  const columns = [
    {
      name: 'operation_name',
      width: '25%',
    },
    {
      name: 'operation_type',
      width: '25%',
    },
    {
      name: 'operation_state',
      width: '25%',
    },
    {
      name: 'operation_updated',
      width: '25%',
    },
  ];

  return (
    <div
      style={{
        width: '25vw',
        padding: '2vh',
        fontSize: 'smaller',
        borderRight: 'thin solid whitesmoke',
        overflowX: 'auto',
        overflowY: 'auto',
      }}
    >
      <Grid
        columns={columns}
        server={{
          url: '/database',
          then: (data) => {
            const newData = data.map((obj) => {
              obj.operation_updated = obj.operation_updated.value;
              return obj;
            });

            return newData;
          },
          handle: (res) => res.json(),
        }}
      />
    </div>
  );
}
