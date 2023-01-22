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
              <Button color="inherit">Sign In</Button>
              <Button color="inherit">Sign Up</Button>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  };
  


export default Navbar;