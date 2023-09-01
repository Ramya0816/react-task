import React from 'react';
import { Routes, Route } from "react-router-dom"
import { Userdata } from './data/userdata.jsx';
import { Tododata } from './data/tododata.jsx';
import { Postdata } from './data/postdata.jsx';
import { Commentdata } from './data/commentdata.jsx';
import { Getusertodo } from './data/getusertodo.jsx';
import { Getuserpost } from './data/getuserpost.jsx';

export default function Display() {

    return (
      <div >
        <Routes>
          <Route path="/Userdata" Component={Userdata} />
          <Route path="/Tododata" Component={Tododata}/>
          <Route path="/Postdata" Component={Postdata}/>
          <Route path="/Commentdata" Component={Commentdata} />
          <Route path ='/getusertodo/:id' Component={Getusertodo} />
          <Route path='/getuserpost/:id' Component={Getuserpost}/>
       </Routes>
      </div> 
    )
  }