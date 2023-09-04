import React from 'react'
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, LinearProgress } from '@mui/material';
import Axiosinstance from './axiosinstance';

export const Postdata = () => {

  const [progress, setProgress] = useState(false)
  const [data, setdata] = useState([]);
  
  useEffect(() => {
    setProgress(true)
    Axiosinstance.get("posts")
      .then(res => { setdata(res.data); setProgress(false) })
      .catch(err => console.log(err))
  }, []);

  return (
    <div>
      <span style={{ fontSize: "30px" }}>PostsData</span>
      <hr />
      <TableContainer component={Paper} sx={{ height: 550, tableLayout: 'fixed' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell><b>ID</b></TableCell>
              <TableCell align="left"><b>User_ID</b></TableCell>
              <TableCell align="left"><b>Title</b></TableCell>
              <TableCell align="left"><b>Body</b></TableCell>
            </TableRow>
            <TableCell colSpan={4} style={{ padding: '0px' }}>
              {
                progress && <LinearProgress />
              }
            </TableCell>
          </TableHead>
          <TableBody>
            {
              data.map(item => {
                return (
                  <TableRow>
                    <TableCell align="left">{item.id}</TableCell>
                    <TableCell align="left"> {item.user_id}</TableCell>
                    <TableCell align="left">{item.title}</TableCell>
                    <TableCell align="left">{item.body}</TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )

}