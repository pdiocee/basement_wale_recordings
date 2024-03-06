import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { Card, CardContent, Typography, List, Box, Button, Container } from '@mui/material';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import ShabadAudioPlayer from '../components/ShabadAudioPlayer';
import { firebaseApp } from '../firebase/firebaseConfig';

const PodcastsData = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedAudio, setSelectedAudio] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTrackName, setSelectedTrackName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleCardClick = (audioPath, podcastName, date) => {
    setSelectedAudio(audioPath);
    setSelectedTrackName(podcastName);
    setSelectedDate(date);
    setIsPlaying(true);
  };

  const handleDownload = async (audioUrl, podcastName) => {
    try {
      const storage = getStorage(firebaseApp);
      const storageRef = ref(storage, audioUrl);
      const downloadUrl = await getDownloadURL(storageRef);
  
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.target= '_blank'
      a.download = `${podcastName}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error handling download:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore(firebaseApp);
        const collectionRef = collection(db, 'podcasts');
        const querySnapshot = await getDocs(collectionRef);
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          podcastName: doc.data().podcast_name,
          date: doc.data().date,
          audio_url: doc.data().audio_url, // Adjust this based on your data structure
        }));

        const sortedData = sortData(fetchedData, sortOrder);
        setData(sortedData);
        setFilteredData(sortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [sortOrder]);

  const sortData = (dataToSort, order) => {
    return dataToSort.sort((a, b) => (order === 'desc' ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)));
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  };

  useEffect(() => {
    const paginatedData = getPaginatedData();
    // Do something with paginatedData if needed
  }, [currentPage, pageSize, filteredData]);

  return (
    <div>
      <Typography variant="body1" sx={{ padding: '0 1rem 1rem 1rem', textAlign: 'center' }}>
        Click on a podcast card and press&nbsp;play&nbsp;to&nbsp;listen!
      </Typography>
      <List
        sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', flexDirection: { sm: "column", md: "column", lg: "column", xl: "column" } }}
      >
        {getPaginatedData().map((item) => (
          <div key={`${item.id}-${item.date}`} style={{ flexBasis: '40%' }}>
            <Card
              onClick={() => handleCardClick(item.audio_url, item.podcastName, item.date)}
              style={{
                cursor: 'pointer',
                backgroundColor: 'rebeccapurple',
              }}
              sx={{ margin: '1rem'}}
            >
              <CardContent sx={{ '&:last-child': { padding: '0.5rem' } }}>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography sx={{ padding: '0.5rem 0', textAlign: 'center' }} variant="h5">
                      {item.podcastName}
                    </Typography>
                    <DownloadForOfflineIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(item.audio_url, item.podcastName);
                      }}
                      sx={{
                        fontSize: '1.5rem',
                        color: '#0a3269',
                        cursor: 'pointer',
                        '&:hover': {
                          color: 'white',
                        },
                      }}
                    />
                  </Box>
                  {showFilters && (
                    <Container sx={{ textAlign: 'center' }}>
                      <Button sx={{ margin: '0.5rem' }} variant="contained">
                        {item.date}
                      </Button>
                    </Container>
                  )}
                </Box>
              </CardContent>
            </Card>
          </div>
        ))}
      </List>
      {selectedAudio && (
        <ShabadAudioPlayer
          audioPath={selectedAudio}
          trackName={selectedTrackName}
          playbackState={isPlaying ? 'play' : 'pause'}
          onPlaybackChange={(newState) => setIsPlaying(newState === 'play')}
        />
      )}
    </div>
  );
};

export default PodcastsData;
