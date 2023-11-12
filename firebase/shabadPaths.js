import { fetchShabadsData } from './firebaseData';

export async function getStaticPaths() {
  const data = await fetchShabadsData();
  const paths = data.map((item) => ({
    params: { id: item.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}
