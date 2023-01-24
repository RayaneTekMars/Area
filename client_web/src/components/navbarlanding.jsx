import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import {ReactComponent as Logo} from './logo.svg';
import { Grid } from '@material-ui/core';
import {ReactComponent as Text} from './text3.svg';

const Navbar = () => {
    return (
      <AppBar position="static" style={{ backgroundColor: '#222222' }}>
        <Toolbar>
          <Logo />
          <div style={{ fontFamily: "Solid" }}>
            <Text/>
        </div>
          <Grid container justify="flex-end">
            <Button style={{color: "white", borderRadius:"50px" }} >Sign In</Button>
            <Button style={{ backgroundColor: "white", color: "black", borderRadius:"50px"}} >Sign up</Button>

          </Grid>
        </Toolbar>
      </AppBar>
    );
  };
  


export default Navbar;