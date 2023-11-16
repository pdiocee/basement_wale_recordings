import React, { useEffect, useState, useRef } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import styled from '@emotion/styled';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import LinearProgress from '@mui/material/LinearProgress';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StyledAudioPlayer = styled(AudioPlayer)`
  && {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #000080; /* Dark Blue Background Color */

    .rhap_container {
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .rhap_controls-section {
      display: flex;
      flex-direction: column;
      align-items: center;

      button {
        color: #c77309;
      }
    }

    .rhap_current-time,
    .rhap_total-time {
      font-family: 'Poppins';
      color: #c77309;
    }

    .track-name {
      margin-top: 5px;
      text-align: center;
      color: orange;
    }

    transition: all 0.1s ease-in-out;
  }
`;

const ShabadAudioPlayer = ({
  audioPath,
  trackName,
  raag,
  taal,
  date,
  type,
  onPlaybackChange,
}) => {
  const [audioUrl, setAudioUrl] = useState('');
  const [currentTrackName, setCurrentTrackName] = useState('');
  const [currentRaag, setCurrentRaag] = useState('');
  const [currentTaal, setCurrentTaal] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentType, setCurrentType] = useState('');
  const audioPlayerRef = useRef(null);
  const [isLooping, setIsLooping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    setCurrentTrackName(trackName);
    setCurrentRaag(raag);
    setCurrentTaal(taal);
    setCurrentDate(date);
    setCurrentType(type);
  }, [trackName, raag, taal, date, type]);

  useEffect(() => {
    const loadAudio = async () => {
      try {
        const storage = getStorage();
        const audioRef = ref(storage, audioPath);
        const url = await getDownloadURL(audioRef);
        setAudioUrl(url);
      } catch (error) {
        console.error('Error loading audio:', error);
      }
    };

    if (audioPath) {
      loadAudio();
    }

    return () => {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.audio.current.pause();
      }
    };
  }, [audioPath]);

  const handlePlay = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.audio.current.play();
      onPlaybackChange('play');
    }

    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: currentTrackName,
        artist: 'Basement Wale',
      });
    }
  };

  const handlePause = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.audio.current.pause();
      onPlaybackChange('pause');
    }
  };

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      <Collapse in={isExpanded}>
        <StyledAudioPlayer
          ref={audioPlayerRef}
          src={audioUrl}
          autoPlayAfterSrcChange={false}
          onPlay={handlePlay}
          onPause={handlePause}
          customControlsSection={[
            'MAIN_CONTROLS',
            <Button
                key="loop"
                sx={{
                  position: 'absolute',
                  top: '2.4rem',
                  right: '1rem',
                 
                  color: isLooping ? '#000' : '#fff',
                  backgroundColor: isLooping ? '#fff' : 'transparent',
                  border: isLooping ? '1px solid #fff' : '1px solid #c77309',
                  borderRadius: '0.5rem',
                  '&:hover': {
                    backgroundColor: isLooping ? '#fff' : 'transparent',
                  },
                }}
                onClick={() => {
                  if (audioPlayerRef.current) {
                    const audioElement = audioPlayerRef.current.audio.current;
                    audioElement.loop = !audioElement.loop;
                    setIsLooping(audioElement.loop);
                  }
                }}
              >
                Loop
              </Button>,
            // 'VOLUME_CONTROLS',
            'ADDITIONAL_CONTROLS',
          ]}
          style={{
            height: isExpanded ? 'auto' : '85px',
            overflow: isExpanded ? 'visible' : 'hidden',
            transition: 'none',
            visibility: isExpanded ? 'visible' : 'visible',
          }}
          customAdditionalControls={[
            <Box sx={{ textAlign: 'center' }}>
              <Typography key="track-name" className="track-name" variant="body2" color="primary">
                {currentTrackName}
              </Typography>
              <Typography key="raag" variant="body1" color="secondary">
                {currentRaag}
              </Typography>
              <Typography key="taal" variant="body1" color="green">
                {currentTaal}
              </Typography>
              <Typography key="date" variant="body1" color="white">
                {currentDate}
              </Typography>
              <Typography key="type" variant="body1" color="pink">
                {currentType}
              </Typography>
            </Box>,
          ]}
        />
      </Collapse>

      <IconButton
  onClick={handleToggleExpand}
  sx={{
    position: 'fixed', // Change position to absolute
    bottom: '0.4rem', // Position from the top
    left: '0.5rem', // Position from the left
    zIndex: '1', // Ensure it's above the audio player
    color: '#c77309',
    backgroundColor: '#000080',
    borderRadius: '0',
    transition: 'bottom 0.1s ease',
    '&:hover': {
      color: '#c77309',
      backgroundColor: '#000080',
    },
  }}
>
  {isExpanded ? (
    <ExpandMoreIcon sx={{ fontSize: '2rem' }} />
  ) : (
    <ExpandLessIcon sx={{ fontSize: '2rem' }} />
  )}
</IconButton>
    </>
  );
};

export default ShabadAudioPlayer;
