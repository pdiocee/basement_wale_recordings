import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import ShabadAudioPlayer from '../components/ShabadAudioPlayer';
import firebaseApp from './firebaseConfig';

import { Card, CardContent, Typography, List, Button, Container, Box, TextField, ButtonBase } from '@mui/material';

const FirestoreData = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedAudio, setSelectedAudio] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTrackName, setSelectedTrackName] = useState('');
  const [selectedRaag, setSelectedRaag] = useState('');
  const [selectedTaal, setSelectedTaal] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedLeadKirtan, setSelectedLeadKirtan] = useState('');
  const [selectedLeadTabla, setSelectedLeadTabla] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' for most recent, 'asc' for oldest

  const handleCardClick = (audioPath, trackName, raag, taal, date, type, leadKirtan, leadTabla) => {
    setSelectedAudio(audioPath);
    setSelectedTrackName(trackName);
    setSelectedRaag(raag);
    setSelectedTaal(taal);
    setSelectedDate(date);
    setSelectedType(type);
    setSelectedLeadKirtan(leadKirtan);
    setSelectedLeadTabla(leadTabla);
    setIsPlaying(true);
  };

  const handlePlaybackChange = (newState) => {
    setIsPlaying(newState === 'play');
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    const sortedResults = sortData(filteredData, order);
    setFilteredData(sortedResults);
  };

  const sortData = (dataToSort, order) => {
    return dataToSort.sort((a, b) =>
      order === 'desc' ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore(firebaseApp);
        const collectionRef = collection(db, 'shabads');
        const querySnapshot = await getDocs(collectionRef);
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          shabadName: doc.data().shabad_name,
          ...doc.data(),
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

  useEffect(() => {
    const filteredResults = data.filter((item) =>
      item.shabadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.raag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.taal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.lead_kirtan && item.lead_kirtan.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.lead_tabla && item.lead_tabla.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    const sortedResults = sortData(filteredResults, sortOrder);
    setFilteredData(sortedResults);
  }, [data, searchQuery, sortOrder]);

  return (
    <div>
      <TextField
        label="Search Shabad, Raag, Taal, Date, or Performance Type"
        variant="filled"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        sx={{
          marginBottom: '1rem',
          background: '#f2f2f2',
          borderRadius: '0.5rem',
          '& input': {
            color: '#0a3269',
          },
          "& label.Mui-focused": {
            color: "#0a3269",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#0a3269",
            },
          },
        }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <Button
          variant="contained"
          color="tertiary"
          onClick={() => handleSort('desc')}
          sx={{ marginRight: '1rem' }}
        >
          Newest
        </Button>
        <Button
          variant="contained"
          color="fourth"
          onClick={() => handleSort('asc')}
        >
          Oldest
        </Button>
      </Box>

      <List sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', flexDirection: { sm: "column", md: "column", lg: "column", xl: "column" } }}>
        {filteredData.map((item) => (
          <div key={`${item.id}-${item.date}`} style={{ flexBasis: '40%' }}>
          <Card
            onClick={() =>
              handleCardClick(item.audio_url, item.shabadName, item.raag, item.taal, item.date, item.type, item.leadKirtan, item.leadTabla)
            }
            style={{ 
              cursor: 'pointer',
              backgroundColor: item.type === 'Stage' ? '#3F5794' : '#aa6e39',
            }}
            sx={{ margin: '1rem', }}
          >
            <CardContent>
              <Box>
                <Box>
                  <Typography sx={{ paddingBottom: '1rem', textAlign: 'center' }} variant="h5">
                    {item.shabadName}
                  </Typography>
                  <Container sx={{ textAlign: 'center' }}>
                    <Button sx={{ margin: '0.5rem' }} variant="contained">{item.raag}</Button>
                    <Button sx={{ margin: '0.5rem' }} variant="contained" color="secondary">
                      {item.taal}
                    </Button>
                    <Button sx={{ margin: '0.5rem' }} variant="contained" color="success">
                      {item.date}
                    </Button>
                    <Button sx={{ margin: '0.5rem' }} variant="contained" color="info">
                      {item.type}
                    </Button>
                    {item.lead_kirtan && (
                    <Button sx={{ margin: '0.5rem' }} variant="contained" color="error">
                      {item.lead_kirtan} & {item.lead_tabla}
                    </Button>
                    )}
                  </Container>
                </Box>
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
          raag={selectedRaag}
          taal={selectedTaal}
          date={selectedDate}
          type={selectedType}
          playbackState={isPlaying ? 'play' : 'pause'}
          onPlaybackChange={handlePlaybackChange}
        />
      )}
    </div>
  );
};

export default FirestoreData;
