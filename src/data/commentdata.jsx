import React from 'react'
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, LinearProgress } from '@mui/material';
import Axiosinstance from './axiosinstance';


export const Commentdata = () => {
  const [progress, setProgress] = useState(false)
  const [data, setdata] = useState([]);

  useEffect(() => {
    setProgress(true)
    Axiosinstance.get("comments")
      .then(res => { setdata(res.data); setProgress(false) })
      .catch(err => console.log(err))
  }, []);

  return (
    <div>
      <span style={{ fontSize: "30px" }}>Comment Data</span>
      <hr />
      <TableContainer component={Paper} sx={{ height: 550, tableLayout: 'fixed' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell><b>ID</b></TableCell>
              <TableCell align="left"><b>Post_ID</b></TableCell>
              <TableCell align="left"><b>Name</b></TableCell>
              <TableCell align="left"><b>Email</b></TableCell>
              <TableCell align="left"><b>Body</b></TableCell>
            </TableRow>
            <TableCell colSpan={5} style={{ padding: '0px' }}>
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
                    <TableCell align="left"> {item.post_id}</TableCell>
                    <TableCell align="left">{item.name}</TableCell>
                    <TableCell align="left">{item.email}</TableCell>
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