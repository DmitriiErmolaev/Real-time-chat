import React, {useContext} from "react";
import {useAuthState} from "react-firebase-hooks/auth"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";
import { Context } from "..";
 
const Navbar = () => {
  const {auth} = useContext(Context);
  const [user] = useAuthState(auth);

  return (
    <AppBar color="secondary" position="static">
      <Toolbar variant="dense">
        <Grid container justifyContent="flex-end">
          {user ? 
            <Button color="primary" variant={"outlined"} onClick={() => auth.signOut()}>Выйти</Button>
            :
            <NavLink to={LOGIN_ROUTE}>
              <Button color="primary" variant={"outlined"}>Логин</Button>
            </NavLink>
          }
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;