export default async function getDatabase() {
  const data = await (await fetch(`${process.env.API_URL}/database`)).json();

  const database = data.map((arr) => {
    arr.operation_started = arr.operation_started.value;
    arr.operation_updated = arr.operation_updated.value;
    return arr;
  });

  return database;
}
