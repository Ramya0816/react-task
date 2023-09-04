import React from 'react'
import { Card, Grid } from "@mui/material";
import { useState, useEffect } from 'react';
import { Statusdialog } from '../manipulation/statusdailog';
import Axiosinstance from '../data/axiosinstance';
import Radio from '@mui/material/Radio';

export const Adduser = (props) => {
    const [input, setinput] = useState({
        name: props.id.name,
        email: props.id.email,
        gender: props.id.gender,
        status: props.id.status,
    })
    const [error, seterror] = useState({
        name: '',
        email: '',
        gender: '',
        status: '',
    })
    useEffect(() => {
        seterror(error)
        console.log(error);
    }, [error.email]);

    const [disable, setDisable] = useState(true)
    const [status, setstatus] = useState(false);
    const Createuser = (e) => {
        const user = { ...input, [e.target.name]: e.target.value }
        const dataToSend = {
            name: user.name,
            email: user.email,
            gender: user.gender,
            status: user.status,
        };

        props.id.id == undefined ? Axiosinstance.post("users", dataToSend)
            .then(response => { setstatus(true) })
            .catch(err => {
                if (!!err) {
                    seterror({ ...error, email: err.response.data.map(item => item.field + " " + item.message) })
                    setDisable(true)
                }
            })
            : Axiosinstance.put(`users/${props.id.id}`, dataToSend)
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

        }
        seterror(newError)
        !newuser.email == "" && !newuser.name == "" && !newuser.gender == "" && !newuser.status == "" && (newError.email == "" && newError.name == "" && newError.gender == "" && newError.status == "") ? setDisable(false) : setDisable(true);

    }
    const Handleadduser = () => {
        props.close(false)
    }
    return (
        <div className='main'>
            <Card className='card'>
                <Grid margin={'10px'}>
                    <span> {props.id.id ? "Edit user details" : "Provide User details"}</span>
                    <hr />
                </Grid>
                <Grid container direction={"column"} spacing={1} margin={"20px"} >
                    <Grid item>
                        <div>Name:</div>
                        <input type="text" name="name" value={input.name} onChange={handle} />
                        <div className="error">{error.name}</div>
                    </Grid>
                    <Grid item>
                        <div>Email:</div>
                        <input type="text" name="email" value={input.email} disabled={props.id.id !== undefined} onChange={handle} />
                        <div className="error">{error.email}</div>
                    </Grid>
                    <Grid item>
                        Gender:
                        <Radio id="male" name="gender"  value= "male" onChange={handle} checked={input.gender == "male"} />Male
                        <Radio id="female" name="gender" value="female" onChange={handle} checked={input.gender == "female"} />Female
                        <div className="error">{error.gender}</div>
                    </Grid>
                    <Grid item direction={'column'}>
                        <div>Status:</div>
                        <select name="status" onChange={handle} value={input.status} >
                            <option hidden selected></option>
                            <option value="active" >active</option>
                            <option value="inactive">inactive</option>
                        </select>
                        <div className="error">{error.status}</div>
                    </Grid>
                </Grid>
                <Grid item margin={"40px"} >
                    <button onClick={Handleadduser} className='cancel'>Cancel</button>
                    <button id="button" onClick={Createuser} disabled={disable} className={`${disable ? "disable" : "active"}`}>Submit</button>
                </Grid>
            </Card>
            {props.id.id ?
                status && <Statusdialog status=" User Edited Successfully" close={props.close} /> : status && <Statusdialog status=" User Added Successfully" close={props.close} />
            }
        </div>
    )
}