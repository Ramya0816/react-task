import React from 'react'
import { useState } from "react"
import { Card, Grid } from "@mui/material";
import { Statusdialog } from './statusdailog';
import Axiosinstance from '../data/axiosinstance';

export const Addcomment = (props) => {

    const [status, setstatus] = useState(false);
    const [disable, setDisable] = useState(true)
    const [input, setinput] = useState({
        post_id: props.postid,
        name: '',
        email: '',
        body: '',
    })
    const [error, seterror] = useState({
        name: '',
        email: '',
        body: '',
    })
    const Createpost = (e) => {
        const user = { ...input, [e.target.name]: e.target.value }
        const dataToSend = {
            post_id: user.post_id,
            name: user.name,
            email: user.email,
            body: user.body,
        };
        Axiosinstance.post(`posts/${props.postid}/comments`, dataToSend)
            .then(response => { setstatus(true) })
            .catch(err => console.log(err))
    }
    const handle = (e) => {
        const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        const newuser = { ...input, [e.target.name]: e.target.value }
        setinput(newuser)
        const newError = { ...error }
        switch (e.target.name) {
            case "name":
                if (newuser.name === "") {
                    newError.name = "username cannot be blank"
                }
                else if (newuser.name.length > 20) {
                    newError.name = "cannot be more than 20 characters"
                }
                else {
                    newError.name = ""
                }
                break;
            case "email":
                if (newuser.email === "") {
                    newError.email = "cannot be blank"
                }
                else if (!regex.test(newuser.email)) {
                    newError.email = "email is invalid"
                }
                else {
                    newError.email = ""
                }
                break;
            case "body":
                if (newuser.body === "") {
                    newError.body = "please enter  body"
                }
                else {
                    newError.body = ""
                }
                break;
        }
        seterror(newError)
        !newuser.email == "" && !newuser.name == "" && !newuser.body == "" && (newError.email == "" && newError.name == "" && newError.body == "") ? setDisable(false) : setDisable(true);

    }
    const HandleaddComment = () => {
        props.close(false)
    }
    return (
        <div className='main'>
            <Card className='card'>
                <Grid margin={'10px'}>
                    <span> Comment Here</span>
                    <hr />
                </Grid>
                    <Grid container direction={"column"} spacing={1.5} margin={'20px'} >
                    <Grid item>
                        <div>post_id:</div>
                        <input type="text" name="post_id" value={props.postid} disabled={props.postid !== undefined} onChange={handle} />
                    </Grid>
                    <Grid item>
                        <div>Name:</div>
                       <input type="text" name="name" value={input.name} onChange={handle} />
                        <div className="error">{error.name}</div>
                    </Grid>
                    <Grid item>
                        <div>Email:</div>
                        <input type="text" name="email" value={input.email} onChange={handle} />
                        <div className="error">{error.email}</div>
                    </Grid>
                    <Grid item>
                        <div>Body:</div>
                        <textarea type="text" name="body" value={input.body} onChange={handle}  style={{height:'50px',width:'250px'}}></textarea>
                        <div className="error">{error.body}</div>
                    </Grid>
                    </Grid>
                    <Grid margin={'30px'}>
                        <button  onClick={HandleaddComment} className='cancel'>Cancel</button>
                        <button id="button" onClick={Createpost} disabled={disable} className={`${disable ? "disable" : "active"}`}>Submit</button>
                    </Grid>
            </Card>
            {
                status && <Statusdialog status="Comment Added Successfully" close={props.close} />
            }
        </div>
    )
}