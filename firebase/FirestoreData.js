import React, { useEffect, useState, useRef } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import ShabadAudioPlayer from '../components/ShabadAudioPlayer';
import firebaseApp from './firebaseConfig';

import NavigationIcon from '@mui/icons-material/Navigation';
import ClearIcon from '@mui/icons-material/Clear';
import { FilterList } from '@mui/icons-material';

import {
  Card,
  CardContent,
  Typography,
  List,
  Button,
  Container,
  Box,
  TextField,
  ButtonBase,
  MenuItem,
  Select,
  Menu,
  IconButton,
  Tooltip,
} from '@mui/material';


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
  const [sortOrder, setSortOrder] = useState('desc');
  const [pageSize, setPageSize] = useState(10);
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);

  const handleFilterIconClick = (event) => {
    setFilterMenuAnchor(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterMenuAnchor(null);
  };

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

  const handleSortAlphabetically = () => {
    const sortedResults = sortDataAlphabetically(filteredData);
    setFilteredData(sortedResults);
    setCurrentPage(1);
    setFilterMenuAnchor(null);
  };
  
  const sortDataAlphabetically = (dataToSort) => {
    return dataToSort.sort((a, b) =>
      a.shabadName.localeCompare(b.shabadName)
    );
  };

  const handleSort = (order) => {
    setSortOrder(order);
    const sortedResults = sortData(filteredData, order);
    setFilteredData(sortedResults);
    setFilterMenuAnchor(null);
  };

  const sortData = (dataToSort, order) => {
    return dataToSort.sort((a, b) =>
      order === 'desc' ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)
    );
  };

  const handlePageSizeChange = (event) => {
    const newSize = event.target.value;
    setPageSize(newSize);
  
    const newPage = Math.min(currentPage, Math.ceil(filteredData.length / newSize));
    setCurrentPage(newPage);
  };

  const getPageCount = () => {
    return Math.ceil(filteredData.length / pageSize);
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  };

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage, event) => {
    if (event) {
      event.preventDefault();
    }
    setCurrentPage(newPage);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    inputRef.current.focus();
  };

  const inputRef = useRef();

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
        setTotalRecords(sortedData.length);
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
    setCurrentPage(1);
  }, [data, searchQuery, sortOrder]);

  const paginatedData = getPaginatedData();

  useEffect(() => {
    const handleScroll = () => {
      const scrollToTopButton = document.getElementById('scrollToTopButton');
      if (scrollToTopButton) {
        scrollToTopButton.style.display = window.scrollY > 100 ? 'block' : 'none';
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <Typography variant="body1" sx={{ padding: '0 1rem 1rem 1rem', textAlign: 'center' }}>Click on a shabad card and press&nbsp;play&nbsp;to&nbsp;listen! Our database currently has <span style={{ fontWeight: 'bold', color: '#c77309' }}>{totalRecords}</span> recordings.</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start' }}>
        <TextField
          label="Search..."
          variant="filled"
          value={searchQuery}
          onChange={handleSearchChange}
          fullWidth
          inputRef={inputRef}
          sx={{
            marginBottom: '1rem',
            background: '#f2f2f2',
            borderRadius: '0.5rem 0 0 0.5rem',
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
        {searchQuery && (
          <Tooltip title="Clear Search">
            <IconButton
              onClick={handleClearSearch}
              sx={{
                color: '#000000',
                backgroundColor: '#0a3269',
                padding: '0.64162rem',
                borderRadius: '0',
                '&:hover': {
                  backgroundColor: '#0a3269',
                },
                '&:active': {
                  backgroundColor: '#0a3269',
                },
              }}
            >
              <ClearIcon fontSize="large" sx={{ color: '#f2f2f2' }} />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Filter">
          <IconButton
            onClick={handleFilterIconClick}
            sx={{
              color: '#0a3269',
              backgroundColor: '#c77309',
              borderRadius: '0 0.5rem 0.5rem 0',
              padding: '0.6417rem',
              '&:hover': {
                backgroundColor: '#0a3269',
              },
              '&:active': {
                backgroundColor: '#0a3269',
              },
            }}
          >
            <FilterList fontSize="large" sx={{ color: 'white' }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={filterMenuAnchor}
        open={Boolean(filterMenuAnchor)}
        onClose={handleFilterMenuClose}
        PaperProps={{
          sx: {
            backgroundColor: '#0a3269',
          },
        }}
      >
        <MenuItem sx={{ backgroundColor: '#0a3269', marginTop: '0.5rem', '&:hover': {backgroundColor: '#c77309',}, }} onClick={() => handleSort('desc')}>Newest</MenuItem>
        <MenuItem sx={{ backgroundColor: '#0a3269', marginTop: '0.5rem', '&:hover': {backgroundColor: '#c77309',}, }} onClick={() => handleSort('asc')}>Oldest</MenuItem>
        <MenuItem sx={{ backgroundColor: '#0a3269', marginTop: '0.5rem', '&:hover': {backgroundColor: '#c77309',}, }} onClick={() => handleSortAlphabetically()}>A - Z</MenuItem>
        <MenuItem sx={{ marginTop: '0.5rem' }}>
          <Typography variant="body1" sx={{ marginRight: '1rem' }}>
            Display:
          </Typography>
          <Select
            value={pageSize}
            onChange={handlePageSizeChange}
            sx={{
              backgroundColor: '#c77309',
              borderRadius: '0.5rem',
              '&:focus': {
                backgroundColor: '#c77309',
              },
            }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={filteredData.length}>All</MenuItem>
          </Select>
        </MenuItem>
      </Menu>

      <Box
        id="scrollToTopButton"
        onClick={handleScrollToTop}
        sx={{
          display: 'none',
          position: 'fixed',
          zIndex: 1000,
          bottom: '18rem',
          right: '1rem',
          backgroundColor: '#0a3269',
          color: 'white',
          borderRadius: '50%',
          padding: '0.5rem',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: '#c77309',
          },
        }}
      >
        <NavigationIcon fontSize="large" />
      </Box>
      <List sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', flexDirection: { sm: "column", md: "column", lg: "column", xl: "column" } }}>
        {paginatedData.map((item) => (
          <div key={`${item.id}-${item.date}`} style={{ flexBasis: '40%' }}>
            <Card
              onClick={() =>
                handleCardClick(
                  item.audio_url,
                  item.shabadName,
                  item.raag,
                  item.taal,
                  item.date,
                  item.type,
                  item.leadKirtan,
                  item.leadTabla
                )
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
                      <Button sx={{ margin: '0.5rem' }} variant="contained">
                        {item.raag}
                      </Button>
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

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        {[...Array(getPageCount()).keys()].map((page) => (
          <Typography
            key={page}
            onClick={() => handlePageChange(page + 1)}
            variant="body1"
            sx={{
              margin: '0.5rem',
              backgroundColor: currentPage === page + 1 ? '#0a3269' : 'transparent',
              color: currentPage === page + 1 ? 'white' : 'white',
              border: '1px solid',
              borderColor: '#0a3269',
              borderRadius: '4px',
              padding: '6px 16px',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: currentPage === page + 1 ? '#0a3269' : '#c77309',
              },
            }}
          >
            {page + 1}
          </Typography>
        ))}
      </Box>
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
