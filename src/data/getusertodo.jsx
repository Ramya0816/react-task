import React from 'react'
import { useEffect, useState } from "react"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Card, LinearProgress, Dialog, IconButton, DialogTitle } from '@mui/material';
import { Addtodo } from '../manipulation/addtodo';
import Axiosinstance from './axiosinstance';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useParams } from 'react-router-dom'

export const Getusertodo = () => {
  const id = useParams();
  console.log("todo", id.id)
  const [data, setdata] = useState([]);
  const [addtodo, setAddtodo] = useState(false);
  const [progress, setProgress] = useState(false)

  const Handleaddtodo = () => {
    setAddtodo(true)
  }

  const handle = () => {
    setAddtodo(false);
    getTodo()
  };

  const getTodo = () => {
    Axiosinstance.get(`users/${id.id}/todos`)
      .then(res => { setdata(res.data); setProgress(false) })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    setProgress(true)
    getTodo()
  }, [id.id]);

  return (
    <div className='postbg'>
      <div className='header'>
        <span style={{ fontSize: "22px", }}>Todos</span>
        <IconButton onClick={Handleaddtodo} style={{ padding: "5px", backgroundColor: "", borderRadius: "1px", fontSize: "18px" }} >
          <AddCircleOutlineIcon className='Add' />
          <span> AddTodo</span>
        </IconButton>
      </div>
      <hr style={{marginBottom:"0px"}}/>
      {
        progress ? <LinearProgress />
      : 
      <Card style={{ padding: "50px" }}>
        {
          data.length == 0 ? " No todos" : data.map(item => {
            return (
              <div>
                <h3>todo:</h3>
                <p ><b>Id:</b>{item.id}</p>
                <p><b>Title:</b>{item.title}</p>
                <p><b>Due_on:</b>{item.due_on}</p>
                <p><b>Status:</b>{item.status}</p><br />
                <hr />
              </div>
            )
          })
        }
      </Card>
}
      {
        addtodo &&
        <Dialog className="dailogposition" open={addtodo} >
          <DialogTitle style={{ display: "flex", justifyContent: 'space-between', backgroundColor: '#d3eff8' }}> Add Todo Details
            <IconButton onClick={() => { setAddtodo(false) }} >
              < CancelOutlinedIcon style={{fontSize:'20px'}}/>
            </IconButton>
          </DialogTitle>
          <Addtodo userid={id.id} close={handle} />
        </Dialog>
      }
    </div>
  )
}