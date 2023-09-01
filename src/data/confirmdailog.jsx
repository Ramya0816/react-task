import React from 'react'
import { useState } from 'react';
import { Dialog, DialogTitle, DialogActions, DialogContentText , Button } from '@mui/material';


export const Confirmdailog=(props)=>{
    
    const [status, setstatus] = useState(true);
    const handle = ()=>{
        setstatus(false); 
        // props?.close()
    }
    return(
         <Dialog open={status}  classes={{paper:"dailogclass"}} >
                <DialogTitle style={{padding:'16px 0px'}}>Status</DialogTitle>
                <DialogContentText>
                   "Do you want to delete the user"
                </DialogContentText>
                <DialogActions>
                    <Button onClick={handle}>cancel</Button>
                    <Button onClick={handle}>confirm</Button>
                </DialogActions>
            </Dialog>
    )