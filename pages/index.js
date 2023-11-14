import Head from 'next/head';

import React, { useState } from 'react';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link'

import Login from '../components/Login';
import ShabadCard from '../components/ShabadCard';

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Head>
        <title>Basement Wale</title>
        <meta name="description" content="For recordings of the Basement Wale." />
        <link rel="icon" href="khanda.png" sizes="any"/>
      </Head>
      <main>
      {isLoggedIn ? (
          <>
            <Link href='/'>
              <img src='bwj-banner.webp' alt='A Basement Wale Banner' href='/' style={{ display: 'block', margin: 'auto', maxWidth: '90%', borderRadius: '1rem', marginTop: '2rem' }}/>
            </Link>
            <Typography variant="h4" sx={{ padding: '1rem', textAlign: 'center', }}>Welcome to the Basement&nbsp;Wale Database</Typography>
            <Typography variant="body1" sx={{ padding: '0 1rem 1rem 1rem', textAlign: 'center' }}>Click on a shabad card and press&nbsp;play&nbsp;to&nbsp;listen!</Typography>
            <Container sx={{ paddingBottom: '15rem' }}>
              <ShabadCard />
            </Container>
          </>
        ) : (
          <Login onLogin={() => setIsLoggedIn(true)} />
        )}
      </main>

    </div>
  )
}
