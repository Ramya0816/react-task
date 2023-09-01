import React from 'react'
import { useEffect, useState } from "react"
import { Addcomment } from '../manipulation/addcomment';
import {Card, Dialog, DialogTitle, IconButton, LinearProgress } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Axiosinstance from './axiosinstance';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export const Getusercomment = (props) => {
    const [data, setdata] = useState([]);
    const [addcomment, setAddcomment] = useState(false);
    const [progress, setProgress] = useState(false)

    const Handleaddcomment = () => {
        setAddcomment(true)
    }

    const handle = () => {
        setAddcomment(false)
        getComment()
    }

    const getComment = () => {
        Axiosinstance.get(`posts/${props.id}/comments`)
            .then(res => { setdata(res.data); setProgress(false) })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setProgress(true)
        getComment()
    }, [props.id]);

    return (
        <div>
            <div className='header'>
                <span style={{ fontSize: "20px" }}>Comments:</span>
                <IconButton onClick={Handleaddcomment} style={{padding:"5px",backgroundColor:"",borderRadius:"1px",fontSize:"18px"}} >
                    <AddCircleOutlineIcon className='Add' />
                    <span> AddComment</span>
                </IconButton>
            </div>
            <hr style={{marginBottom:"0px"}}/>
            {
                progress ? <LinearProgress/>
               :
                data.length == 0 ?" No Comments" :data.map(item => {
                    return (
                        <div>
                            <p><b>Post_Id:</b>{item.post_id}</p>
                            <p><b>Name:</b>{item.name}</p>
                            <p><b>Email:</b>{item.email}</p>
                            <p><b>Body:</b>{item.body}</p>
                            <hr />
                        </div>
                    )
                }) 
            }
            {
                addcomment &&
                <Dialog className="dailogposition" open={addcomment} >
                    <DialogTitle style={{ display: "flex", justifyContent: 'space-between', backgroundColor: '#d3eff8' }}> Add comment Details
                                <IconButton onClick={() => { setAddcomment(false) }}>
                                    < CancelOutlinedIcon style={{fontSize:'20px'}} />
                                </IconButton>
                            </DialogTitle>
                    <Addcomment postid={props.id} close={handle} />
                </Dialog>
            }
        </div>
    )
}