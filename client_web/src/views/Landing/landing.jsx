import {ReactComponent as Logo} from '../../components/logo.svg';
import React, { useEffect } from 'react';
import {ReactComponent as Text1} from '../../components/text1.svg';
import {ReactComponent as Text2} from '../../components/text2.svg';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Fond1 from '../../assets/fond1.png';
import SigninText from '../../components/signin';
import SignupText from '../../components/signup';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { AppBar, Toolbar} from '@material-ui/core';
import { Grid } from '@material-ui/core';
import {ReactComponent as Text} from '../../components/text3.svg';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height : 510,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    backgroundColor: 'white',
    borderRadius: '28px',
  };

export default function LandingPage() {
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const handleOpenSignin = () => setOpen(true);
    const handleOpenSignup = () => setOpen2(true);
    const handleClose = () => setOpen(false);
    const handleClose2 = () => setOpen2(false);
    useEffect(() => {
        document.body.style.backgroundColor = '#222222';
    }, []);
    return (      
         
        <div>
            <AppBar position="static" style={{ backgroundColor: '#222222' }}>
        <Toolbar>
          <Logo />
          <div style={{ fontFamily: "Solid" }}>
            <Text/>
        </div>
          <Grid container justify="flex-end">
            <Button style={{color: "white", borderRadius:"50px" }} onClick={handleOpenSignin} >Sign In</Button>
            <Button style={{ backgroundColor: "white", color: "black", borderRadius:"50px"}} onClick={handleOpenSignup} >Sign up</Button>

          </Grid>
        </Toolbar>
      </AppBar>
            <div>
            <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          <img src={Fond1} style={{ position: 'absolute', right: '0px', top: '50%', transform: 'translateY(-50%)'}} alt="fond" />
            <div style={{marginLeft: "15%"}}>
            <SigninText/>
            </div>
            <div style={{marginTop: "10%"}}>
            <AccountCircleIcon style={{ fontSize: 20, color: '#222222', marginTop: "4%"}} />
            <TextField style={{ width: '40%', marginLeft: "2%" }} label="Username or E-mail" variant="standard" />
            </div>
            <div>
            <LockIcon style={{ fontSize: 20, color: '#222222', marginTop: "4%"}} />
            <TextField style={{ width: '40%', marginLeft: "2%" }} label="Password" variant="standard" />
            </div>
            <div style={{marginTop: "10%"}}>
            <Button style={{ backgroundColor: "black", color: "white", borderRadius:"50px", width:"50%" }} >Sign In</Button>
            </div>
            <div style={{marginTop: "2%", marginLeft: "25%"}}>
                or
            </div>
            <div style={{marginTop: "2%"}}>
            <Button style={{ backgroundColor: "black", color: "white", borderRadius:"50px", width:"50%" }} >Sign in with google</Button>
            </div>
            <div style={{marginTop: "1%"}}>
            <Button style={{ backgroundColor: "black", color: "white", borderRadius:"50px", width:"50%" }} >Sign in with github</Button>
            </div>
          </Box>
        </Modal>
            </div>
            <div>
            <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          <img src={Fond1} style={{ position: 'absolute', right: '0px', top: '50%', transform: 'translateY(-50%)'}} alt="fond" />
            <div style={{marginLeft: "15%"}}>
            <SignupText/>
            </div>
            <div style={{marginTop: "10%"}}>
            <AccountCircleIcon style={{ fontSize: 20, color: '#222222', marginTop: "4%"}} />
            <TextField style={{ width: '40%', marginLeft: "2%" }} label="Username" variant="standard" />
            </div>
            <div style={{marginTop: "2%"}}>
            <AlternateEmailIcon style={{ fontSize: 20, color: '#222222', marginTop: "4%"}} />
            <TextField style={{ width: '40%', marginLeft: "2%" }} label="Email" variant="standard" />
            </div>
            <div style={{marginTop: "2%"}}>
            <LockIcon style={{ fontSize: 20, color: '#222222', marginTop: "4%"}} />
            <TextField style={{ width: '40%', marginLeft: "2%" }} label="Password" variant="standard" />
            </div>
            <div style={{marginTop: "2%"}}>
            <LockIcon style={{ fontSize: 20, color: '#222222', marginTop: "4%"}} />
            <TextField style={{ width: '40%', marginLeft: "2%" }} label="Confirm Password" variant="standard" />
            </div>
            <div style={{marginTop: "10%"}}>
            <Button style={{ backgroundColor: "black", color: "white", borderRadius:"50px", width:"50%" }} >Sign Up</Button>
            </div>
          </Box>
        </Modal>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column'}}>
                <div style={{ fontFamily: "Inter", color: 'white', fontSize: '4rem'}}>
                    <Text1 />
                </div>
                <div style={{ fontFamily: "Solid", color: 'white', fontSize: '2rem', marginTop: '1rem'}}>
                    <Text2 />
                </div>
                <Logo style={{ width: '100px', height: '100px'}} />
            </div>
        </div>
        
    );
}

