'use server';

export async function viewImage(body: Record<string, any>) {
  const res = await fetch(`${process.env.API_URL}/view`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
}

export async function exportGeotiff(body: Record<string, any>) {
  const res = await fetch(`${process.env.API_URL}/export/geotiff`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
}

export async function exportTile(body: Record<string, any>) {
  const res = await fetch(`${process.env.API_URL}/export/tile`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
}

export async function getDatabase() {
  const data = await (await fetch(`${process.env.API_URL}/database`)).json();

  const database = data.map((arr) => {
    arr.operation_started = arr.operation_started.value;
    arr.operation_updated = arr.operation_updated.value;
    return arr;
  });

  return database;
}
