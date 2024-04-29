export async function GET() {
  const res = await fetch(`${process.env.API}/database`);
  return res;
}
