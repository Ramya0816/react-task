import React from 'react'
import { Divider, List } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

export default function Data() {
  

  return (
    <div>
          <List  >
            <Link to="Userdata" className='link'>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Users" />
              </ListItemButton>
            </Link>
            <Divider />
          </List>
          <List  >
            <Link to="Tododata" className='link'>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="todos" />
              </ListItemButton>
              <Divider />
            </Link>
          </List>
          <List  >
            <Link to="Postdata" className='link'>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="posts" />
              </ListItemButton>
              <Divider />
            </Link>
          </List>
          <List >
            <Link to="Commentdata" className='link'>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="comments" />
            </ListItemButton>
           </Link>
      </List>

            
        </div >

    )
}
