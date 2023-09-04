import React from 'react'
import { useState } from 'react';
import { Dialog, DialogTitle, DialogActions, DialogContentText , Button } from '@mui/material';


export const Statusdialog=(props)=>{
    const [status, setstatus] = useState(true);
    const handle = ()=>{
        setstatus(false); 
        props?.close()
    }
    return(
         <Dialog open={status}  classes={{paper:"dailogclass"}} >
                <DialogTitle style={{padding:'16px 0px'}}>Status</DialogTitle>
                <DialogContentText>
                   {props.status}
                </DialogContentText>
                <DialogActions>
                    <Button onClick={handle}>ok</Button>
                </DialogActions>
            </Dialog>
    )
}