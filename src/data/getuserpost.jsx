import React from 'react'
import { useEffect, useState } from "react"
import { Getusercomment } from './getusercomment';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Addpost } from '../manipulation/addpost';
import { Card, Dialog, Button, IconButton, LinearProgress,DialogTitle} from '@mui/material';
import Axiosinstance from './axiosinstance';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import {useParams} from 'react-router-dom'



export const Getuserpost = () => {
  const id = useParams();
  const [data, setdata] = useState([]);
  const [openaddpost, setOpenaddpost] = useState(false);
  const [comment, setComment] = useState(false);
  const [progess, setProgess] = useState(false)
  const [selectedId, setSelectedId] = useState("")

  const Handleopenaddpost = () => {
    setOpenaddpost(true)
  }

  const handle = () => {
    setOpenaddpost(false)
    getPost()
  }

  const getPost = () => {
    Axiosinstance.get(`users/${id.id}/posts`)
      .then(res => { setdata(res.data); setProgess(false) })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    setProgess(true)
    getPost()
  }, [id.id]);

  const ShowCommentes = (id) => {
    setComment(true)
    setSelectedId(id)
  }

  return (
    <div className='postbg'>
      <div className='header'>
        <span style={{ fontSize: "25px" }}>UserPosts</span>
        <IconButton onClick={Handleopenaddpost} style={{ padding: "5px", backgroundColor: "", borderRadius: "1px",fontSize:"18px" }} >
          <AddCircleOutlineIcon className='Add' />
          <span> AddPost</span>
        </IconButton>
      </div>
      <hr style={{marginBottom:"0px"}}/>
      {
        progess? <LinearProgress />
      :
        data.length == 0 ? "  No Posts" : data.map(item => {
          return (
            <div>
              <Card style={{padding:"50px"}}>
                <h3>Post:</h3>
                <p><b>Id:</b>{item.id}</p>
                <p><b>User_id:</b>{item.user_id}</p>
                <p><b>Title:</b>{item.title}</p>
                <p><b>Body:</b>{item.body}</p>
                <Button onClick={() => { ShowCommentes(item.id) }}  style={{width:"150px"}}><b>comments</b></Button>
                <div>
                  {
                    comment && item.id == selectedId && <Getusercomment id={selectedId} />
                  }
                </div>
              </Card>
              <br />
            </div>
          )
        })
      
    }
      {
        openaddpost &&
        <Dialog className="dailogposition" open={openaddpost} >
           <DialogTitle style={{ display: "flex", justifyContent:'space-between',backgroundColor:'#d3eff8'}}> Add Post 
          <IconButton onClick={() => { setOpenaddpost(false) }}>
            < CancelOutlinedIcon style={{fontSize:'20px'}} />
          </IconButton>
          </DialogTitle>
          <Addpost userid={id.id}  close={handle}/>
        </Dialog>
      }
    </div>
  )
  
}