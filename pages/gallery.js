import Head from 'next/head';

import React, { useState } from 'react';

import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Gallery from 'react-photo-gallery'

import Login from '../components/Login';
import Navbar from '../components/Navbar';

const photos = [
    {
     src: "https://lh3.googleusercontent.com/drive-viewer/AEYmBYTbqqTK2iYkbL0p5BSk-toeMCzBwwMm3uGjrap5_2XzJyEp9_l0uhPC9Cp3Z58sEaFLQBHx5kYA3Gpk0WegTY2zJ_cT0Q=s1600",
     width: 3,
     height: 4
    },
    {
     src: "https://lh3.googleusercontent.com/drive-viewer/AEYmBYTWP74iZ04EylZYdpuqA8jo3rHDhP2UcPlUklg19-KxMplLyGq1B5_eEgwOWe_kN1Tu_EogQBBGikiDyiIbGCgHIGhVQQ=s1600",
     width: 3,
     height: 4
    },
    {
     src: "https://lh3.googleusercontent.com/drive-viewer/AEYmBYS1YtojMtziBKoKTV92qOeeRPLcbZy7yWSdKK4VET-bTQqTiFQhImdBMfhezQ7IT0ObN-s3pUVFzuDNAPhnD_Y5E68X=s1600",
     width: 4,
     height: 3
    },
    {
     src: "https://lh3.googleusercontent.com/drive-viewer/AEYmBYQkC6cw_5fxTn2f5neBwa6FdZ0xQm1oHF4PwYLuebg8HncrvEADMtGPHwoyqwzjoSjgN-4YPmQP7BJah-fqKHPYxVx92Q=s1600",
     width: 3,
     height: 4
    },
    {
     src: "https://lh3.googleusercontent.com/drive-viewer/AEYmBYRlHfGe0M_jEL2APpaq-UsbQoMB9Qq68uonFdiKDAH4krlzzu-rX2ItW8C05qdr814ECTaIcZh6jg89cQhiYDVzHaKwhw=s1600",
     width: 3,
     height: 4
    },
    {
     src: "https://lh3.googleusercontent.com/drive-viewer/AEYmBYSol2XxRIm8oXy4wHB-kFcEAwMnXfS3pEiF0DFDhjdeCsLW2D3Ppkvt7IpMrPPMWqOvnenPbDhMjgFJVBljQI0WkrE1QA=s1600",
     width: 3,
     height: 4
    },
    {
     src: "https://lh3.googleusercontent.com/drive-viewer/AEYmBYRDowjYbE-pW22SRpycYPF5_UlVq5Are1GS9Ml8-CgZcltdqawzodb4h2W8Cm8MAwcdnfHzsQZayOiV4mVs2ux3JN7-hA=s1600",
     width: 3,
     height: 4
    },
    {
     src: "https://lh3.googleusercontent.com/drive-viewer/AEYmBYSnMv86wwZz-0glfJ1ZMVqHEaSmCW7F8n5hEo53gnSSWDise0Tf9TfqoZ-eDPj_3GL3qbiCeVaxxaQDAFqvIbjDhcTOwg=s1600",
     width: 3,
     height: 4
    },
    {
     src: "https://lh3.googleusercontent.com/drive-viewer/AEYmBYSSdHyVllEZdAwaXQ85CAIO0HBZ1zHF0zr5NTZw1-AjoeE0S6XzqjTFD5t1V7xq7iB9KczFGrizE7t_9KuFeDtGNh6Q=s1600",
     width: 4,
     height: 3
    },
    {
     src: "https://lh3.googleusercontent.com/drive-viewer/AEYmBYQwMbDljv8lI0QpZJXG2qQXTaQN4zjn6OpeNpxHK5MkAOWcCcikYpsSEJcKsoq9PSmmzY7whXVkU0HUTfueWeHHyhrS=s1600",
     width: 3,
     height: 4
    },
    {
     src: "https://lh3.googleusercontent.com/drive-viewer/AEYmBYQ3ZzenUiGvfMwc6Kw79FwCFuNVm7sJyNMVqAbpcXGao3aHIycHORWxX-9QAafJV7sPZcEh7m-EDGONvtI9wcoge7F7Ow=s1600",
     width: 4,
     height: 3
    },
    {
     src: "https://lh3.googleusercontent.com/drive-viewer/AEYmBYRVjiMLtVzAmsxTHhqzhBruJDHSgaBoBOIRiJWa2wi48LwYqsg67FCXUO2Q4VF-sAPkC12hI0btrXuhHm89NUB2eq_7xA=s1600",
     width: 3,
     height: 4
    },
    {
     src: "https://lh3.googleusercontent.com/drive-viewer/AEYmBYTbCmRUvauqGFxt8qqftyEgcADJsSuTcY3rNw788IA2YMZ_qrlu-uM8kAWXX1GNHAhhNjm83y6s9GLEJRhqGHNtm3vk2A=s1600",
     width: 3,
     height: 4
    },
    {
     src: "https://lh3.googleusercontent.com/drive-viewer/AEYmBYT0DE65CUCkrLXSD1mPyGumjwg_nTkbKhiSJa4Aqeh5h3J5q4rZYRoD33FbDkSUk5OHQwu8-4V7YhrBpxnK6foj1Oc3cw=s1600",
     width: 3,
     height: 4
    },
    
 ];

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
            <Gallery photos={photos} targetRowHeight={360}/>
          </>
        ) : (
          <Login onLogin={() => setIsLoggedIn(true)} />
        )}
      </main>

    </div>
  )
}
