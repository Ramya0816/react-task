import React from 'react'
import Data from './data.jsx'
import './App.css';
import Display from './display.jsx';
import AppBar from '@mui/material/AppBar';
import {IconButton,Toolbar, MenuItem, Menu } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useState } from 'react';

function App() {
  const [showmenu , setShowmenu] = useState(true);
  const [showprofile, setShowprofile] = useState(null);

  const handleMenu = (event) => {
    setShowprofile (event.currentTarget);
  };

  const handleClose = () => {
    setShowprofile(null);
    setShowmenu(false)

  };
  const handle=()=> {
    showmenu? setShowmenu(false):setShowmenu(true)
  }

  return (
    <div >
      <AppBar position='sticky'  >
        <Toolbar>
          <IconButton color="inherit" sx={{ mr: 160 }} onClick={handle}  style={{padding:"5px",borderRadius:"1px",fontSize:"23px"}}>
            <MenuIcon />
            <span>View Data</span> 
          </IconButton>
          {
            <div>
              <IconButton size="large" onClick={handleMenu} color="inherit" >
                <AccountCircle size="large" />
              </IconButton>
              <Menu anchorEl={showprofile} open={Boolean(showprofile)} onClose={handleClose}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>
      <div className='main'>
        <div className='right '>
          {
            showmenu && <Data />
          }
        </div>
        <div className='left'>
          <Display />
        </div>
      </div>
    </div>
  );
}

export default App;
