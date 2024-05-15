import App from '../components/app';
import getDatabase from '../module/getDatabase';

export default async function Home() {
  return (
    <>
      <App defaultStates={{ database: await getDatabase() }} />
    </>
  );
}
