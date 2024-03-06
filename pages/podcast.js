import Head from 'next/head';

import React, { useState } from 'react';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link'

import Login from '../components/Login';
import PodcastCard from '../components/PodcastCard';
import Navbar from '../components/Navbar';

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
            <Navbar/>
            <Typography variant="h4" sx={{ padding: '1rem', textAlign: 'center', }}>The Basement&nbsp;Wale Podcast</Typography>
            <Container sx={{ paddingBottom: '20rem' }}>
              <PodcastCard />
            </Container>
          </>
        ) : (
          <Login onLogin={() => setIsLoggedIn(true)} />
        )}
      </main>

    </div>
  )
}
