import React from 'react'
import { useState } from "react"
import { Card, Grid } from "@mui/material";
import { Statusdialog } from './statusdailog';
import Axiosinstance from '../data/axiosinstance';



export const Addtodo = (props) => {

    const [disable, setDisable] = useState(true)
    const [status, setstatus] = useState(false);
    const [input, setinput] = useState({
        user_id: props.userid,
        title: '',
        due_on: new Date(),
        status: '',
    })
    const [error, seterror] = useState({
        title: '',
        due_on: '',
        status: '',
    })
    const Createpost = (e) => {
        const user = { ...input, [e.target.name]: e.target.value }
        const dataToSend = {
            user_id: user.user_id,
            title: user.title,
            due_on: user.due_on,
            status: user.status
        };
        Axiosinstance.post(`users/${props.userid}/todos`, dataToSend)
            .then(response => { setstatus(true) })
            .catch(err => console.log(err))
    }
    const handle = (e) => {
        const newuser = { ...input, [e.target.name]: e.target.value }
        setinput(newuser)
        const newError = { ...error }
        switch (e.target.name) {
            case "title":
                if (newuser.title === "") {
                    newError.title = "title cannot be blank"
                }
                else if (newuser.title.length > 30) {
                    newError.title = "cannot be more than 20 characters"
                }
                else {
                    newError.title = ""
                }
                break;
        }
        seterror(newError)
        !newuser.title == "" && !newuser.status == "" && (newError.title == "" ) ? setDisable(false) : setDisable(true);

    }
    const Handleaddtodo = () => {
        props.close(false)
    }
    return (
        <div className='main'>
            <Card className='card'>
                <Grid margin={'10px'}>
                    <span>Provide Todo Details</span>
                    <hr />
                </Grid>
                    <Grid  container direction={"column"} spacing={1.5} margin={"20px"}>
                    <Grid item>
                        <div>user_id:</div>
                        <input type="text" name="user_id" value={props.userid} disabled={props.userid !== undefined} />
                    </Grid>
                    <Grid item>
                        <div> Title:</div>
                        <input type="text" name="title" value={input.title} onChange={handle} />
                        <div className="error">{error.title}</div>
                    </Grid> 
                    <Grid item>
                        <div>status:</div>
                        <select name="status"onChange={handle} >
                                <option hidden ></option>
                                <option value="completed" >Completed</option>
                                <option value="pending">Pending</option>
                            </select>
                    </Grid>
                    </Grid>

                    <Grid margin={"40px"}>
                        <button onClick={Handleaddtodo} className='cancel'>Cancel</button>
                        <button id="button" onClick={Createpost} disabled={disable} className={`${disable ? "disable" : "active"}`}>Submit</button>
                    </Grid>
               
            </Card>
            {
                status && <Statusdialog status="Added Todo Successfully" close={props.close} />
            }
        </div>
    )
}
 {/* <Grid container direction={'row'} rowGap={4} margin={"50px"}> */}
                 {/* <Grid  container direction={"column"} md={4} spacing={5} >
                        <Grid item> <b>user_id:</b></Grid>
                        <Grid item><b>Title:</b></Grid>
                        <Grid item><b>status:</b></Grid>
                    </Grid> */}
                     {/* </Grid> */}