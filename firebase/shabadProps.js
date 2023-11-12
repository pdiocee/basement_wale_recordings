import { fetchShabadsData } from './firebaseData';

export async function getStaticProps({ params }) {
  const data = await fetchShabadsData();
  const shabad = data.find((item) => item.id === params.id);

  return {
    props: {
      shabad,
    },
  };
}
