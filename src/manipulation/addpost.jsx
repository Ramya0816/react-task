import React from 'react'
import { useState } from "react"
import { Card, Grid } from "@mui/material";
import { Statusdialog } from '../manipulation/statusdailog';
import Axiosinstance from '../data/axiosinstance';

export const Addpost = (props) => {
    const [disable, setDisable] = useState(true)
    const [status, setstatus] = useState(false);
    const [input, setinput] = useState({
        userid: props.userid,
        title: '',
        body: '',
    })
    const [error, seterror] = useState({
        title: '',
        body: '',
    })
    const Createpost = (e) => {
        const user = { ...input, [e.target.name]: e.target.value }
        const dataToSend = {
            userid: user.userid,
            title: user.title,
            body: user.body
        };
        console.log(dataToSend);
        Axiosinstance.post(`users/${props.userid}/posts`, dataToSend)
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

            case "body":
                if (newuser.body === "") {
                    newError.body = "please enter post body"
                }
                else {
                    newError.body = ""
                }
                break;
        }
        seterror(newError)
        !newuser.title == "" && !newuser.body == "" && (newError.title == "" && newError.body == "") ? setDisable(false) : setDisable(true);

    }
    const Handleaddpost = () => {
        props.close(false)
    }
    return (
        <div className='main'>
            <Card className='card'>
                <Grid margin={'10px'}>
                    <span>Provide Posts Details</span>
                    <hr />
                </Grid>
                    <Grid container direction={"column"}  spacing={1} margin={"20px"}>
                        <Grid item>
                            <div>user_id:</div>
                            <input type="text" name="userid" value={input.userid} disabled={props.userid !== undefined} />
                        </Grid>
                        <Grid item>
                            <div>Title:</div>
                            <input type="text" name="title" value={input.title} onChange={handle} />
                            <div className="error">{error.title}</div>
                        </Grid>
                        <Grid item>
                            <div>Body:</div>
                            <textarea type="text" name="body" value={input.body} onChange={handle} style={{height:'60px',width:'250px'}}></textarea>
                            <div className="error">{error.body}</div>
                        </Grid>
                    </Grid>
                    <Grid margin={'40px'} >
                        <button  onClick={Handleaddpost} className='cancel'>Cancel</button>
                        <button id="button" onClick={Createpost} disabled={disable} className={`${disable ? "disable" : "active"}`}>Submit</button>
                    </Grid>
            </Card>
            {
                status && <Statusdialog status="Posted Successfully" close={props.close} />
            }
        </div>
    )
}