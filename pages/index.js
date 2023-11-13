import Head from 'next/head';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

import ShabadCard from '../components/ShabadCard';

export default function Page() {
  return (
    <div>
      <Head>
        <title>Basement Wale</title>
        <meta name="description" content="For recordings of the Basement Wale." />
        <link rel="icon" href="khanda.png" sizes="any"/>
      </Head>
      <main>
        <Typography variant="h2" component="h2" sx={{ padding: '1rem', textAlign: 'center' }}>Basement Wale</Typography>
        <Typography variant="body1" sx={{ padding: '1rem', textAlign: 'center' }}>Click on a shabad card and press play to listen!</Typography>
        <Container sx={{ paddingBottom: '15rem' }}>
            <ShabadCard />
        </Container>
      </main>

    </div>
  )
}
