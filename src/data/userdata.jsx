import React from 'react'
import { useEffect, useState, } from "react"
import { Table, TableBody, TableCell, TableContainer, TableRow, TableHead } from '@mui/material';
import { Box, Collapse, ButtonGroup, Button, IconButton, Paper, Dialog, LinearProgress, DialogTitle, DialogContentText, DialogActions } from '@mui/material';
import { Adduser } from '../manipulation/adduser';
import { Statusdialog } from '../manipulation/statusdailog';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import Axiosinstance from './axiosinstance';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import SearchIcon from '@mui/icons-material/Search'
import { Link } from 'react-router-dom';



export const Userdata = () => {
    const [confirm, setConfirm] = useState()
    const [deleteuser, setDeleteuser]= useState()
    const [progress, setProgress] = useState(false)
    const [data, setdata] = useState([]);
    const [searchinput, setSearchinput] = useState()
    const [adduser, setAdduser] = useState()
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(0)
    const [status, setstatus] = useState(false);
    const [edituser, setedituser] = useState({
        id: '',
        name: '',
        email: '',
        gender: '',
        status: ''
    })

    const handleAdduser = (item) => {
        setAdduser(true)
        setedituser(item)
    }

    const handlesearch = (e) => {
        setSearchinput(e.target.value)
    }

    const handleDeleteuser = (item) => {
            Axiosinstance.delete(`users/${item}`)
                .then(response => {
                    setstatus(true)
                    setConfirm(false)
                    console.log(response);
                })
                .catch(err => console.log(err))
    }

    const getUsers = () => {
        setstatus(false)
        Axiosinstance.get("users")
            .then(res => { setdata(res.data); setProgress(false) })
            .catch(err => console.log(err))
    }

    const handle = () => {
        setAdduser(false);
        getUsers()
    };

    const handleOpen = (itemID) => {
        setId(itemID === id ? itemID + 222 : itemID)
        setOpen(itemID === id ? false : true)
    }

    useEffect(() => {
        setProgress(true)
        getUsers()

    }, []);

    const handleDelete = (item) => {
        setConfirm(true)
        setDeleteuser(item)
    }

    return (
        <div>
            <div className='header'>
                <span style={{ fontSize: "30px" }}>UsersData</span>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                    <SearchIcon />
                    <input type="search" placeholder='Search' value={searchinput} onChange={handlesearch} className='search' />
                    <IconButton onClick={handleAdduser} style={{ padding: "5px", backgroundColor: "", borderRadius: "1px", fontSize: "20px" }}>
                        <AddCircleOutlineIcon className='Add' />
                        <span>AddUser</span>
                    </IconButton>
                </span>
            </div>
            <hr />
            <div>
                <TableContainer component={Paper} sx={{ height: 550, tableLayout: 'fixed' }}>
                    <Table stickyHeader >
                        <TableHead >
                            <TableRow >
                                <TableCell align="left"><b>ID</b></TableCell>
                                <TableCell align="left"><b>Name</b></TableCell>
                                <TableCell align="left"><b>Email</b></TableCell>
                                <TableCell align="left"><b>Gender</b></TableCell>
                                <TableCell align="left"><b>Status</b></TableCell>
                                <TableCell align='left'></TableCell>
                            </TableRow>
                            <TableCell colSpan={6} style={{ padding: '0px' }}>
                                {
                                    progress && <LinearProgress />
                                }
                            </TableCell>
                        </TableHead>
                        <TableBody>
                            {
                                data.filter(name => (name.name.toLowerCase()).includes(!!searchinput ? searchinput.toLowerCase() : "")).map(item => {
                                    return (
                                        <>
                                            <TableRow >
                                                <TableCell align="left">
                                                    <IconButton size="small" onClick={() => handleOpen(item.id)}>
                                                        {open && id === item.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                    </IconButton>
                                                    {item.id}
                                                </TableCell>
                                                <TableCell align="left">{item.name}</TableCell>
                                                <TableCell align="left">{item.email}</TableCell>
                                                <TableCell align="left">{item.gender}</TableCell>
                                                <TableCell align="left">{item.status}</TableCell>
                                                <TableCell>
                                                    <IconButton onClick={() => handleAdduser(item)} style={{ color: "blue" }}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton onClick={() => handleDelete(item.id)}>
                                                        <RemoveCircleOutlineIcon className='error' />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <Collapse in={open && id === item.id} timeout="auto" >
                                                    <Box sx={{ margin: 1 }}>
                                                        <Table size="small">
                                                            <TableBody>
                                                                <ButtonGroup variant="text" aria-label="text button group">
                                                                    <Link to={`/getusertodo/${item.id}`}>
                                                                        <Button ><b>Todos</b></Button>
                                                                    </Link>
                                                                    <Link to={`/getuserpost/${item.id}`}>
                                                                        <Button ><b>Posts</b></Button>
                                                                    </Link>
                                                                </ButtonGroup>
                                                            </TableBody>
                                                        </Table>
                                                    </Box>
                                                </Collapse>
                                            </TableRow>
                                        </>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <div >
                    {
                        confirm &&  
                         <Dialog open={confirm} classes={{ paper: "dailogclass" }} >
                            <DialogTitle style={{ padding: '16px 0px' }}>Confirm</DialogTitle>
                            <DialogContentText>
                                Do you want to delete the user?
                            </DialogContentText>
                            <DialogActions>
                                <Button onClick={() => handleDeleteuser(deleteuser)}>delete</Button>
                                <Button onClick={()=>setConfirm(false)}>Cancel</Button>
                            </DialogActions>
                        </Dialog>
                    }

                    {

                        adduser &&
                        <Dialog className="dailogposition" open={adduser} >
                            <DialogTitle style={{ display: "flex", justifyContent: 'space-between', backgroundColor: '#d3eff8' }}>
                                {!!edituser.id ? "Edit User" : "Add User "}
                                <IconButton onClick={() => { setAdduser(false) }}>
                                    <CancelOutlinedIcon style={{ fontSize: '20px' }} />
                                </IconButton>
                            </DialogTitle>
                            <Adduser id={edituser} close={handle} />
                        </Dialog>
                    }

                    {
                        status && <Statusdialog status=" User deleted successfully" close={getUsers} />
                    }
                </div>
            </div>
        </div >
    )
}