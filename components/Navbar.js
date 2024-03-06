import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const NavbarContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1rem',
});

const MobileNavbarContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
  '& .menu-icon': {
    transition: 'transform 0.3s ease',
  },
});

const LinkContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const Link = styled(Button)({
  margin: '0 1rem',
  padding: '0.5rem 0.8rem',
  // if the horizontal padding is more than 0.8rem the nav starts to break around the medium breakpoint
  fontFamily: 'Poppins'
});

const Icon = styled('img')({
  width: '8rem',
  padding: '0'
});

const MobileMenu = styled('div')({
  position: 'absolute',
  top: '7.3rem',
  left: 0,
  right: 0,
  background: '#d9e2b5',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'start',
  zIndex: 999,
});

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  return (
    <AppBar position="static">

      {/* ----------------------- DESKTOP MENU ------------------------- */}

      <NavbarContainer>
        <LinkContainer>
          <Link href='/' color="inherit" disableRipple sx={{
            ':hover, :active, :focus': {
              bgcolor: 'secondary.main',
              color: '#ffffff',
            },
          }}
          >Home</Link>
          <Link href='/gallery' color="inherit" disableRipple sx={{
            ':hover, :active, :focus': {
              bgcolor: 'secondary.main',
              color: '#ffffff',
            },
          }}>Gallery</Link>
          <Link href='/podcast' color="inherit" disableRipple sx={{
            ':hover, :active, :focus': {
              bgcolor: 'secondary.main',
              color: '#ffffff',
            },
          }}>Podcasts</Link>
        </LinkContainer>
      </NavbarContainer>
    </AppBar>
  );
};

export default Navbar;
