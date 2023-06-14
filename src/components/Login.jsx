import React, {useContext} from "react";
import {Context} from "../index";
import { GoogleAuthProvider, signInWithPopup} from "firebase/auth";

import { Container, Grid, Box } from "@mui/material";
import Button from '@mui/material/Button';

const Login =  () => {
  const {auth} = useContext(Context)

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
  }

  return (
    <Container>
      <Grid 
        container 
        style={{height: window.innerHeight - 50}}
        alignItems="center"
        justifyContent="center"
      >
        <Grid 
          style={{width:400, background: "lightgray"}} 
          container         
          alignItems="center"
          direction="column"
        >
          <Box p={5}>
            <Button variant="outlined" onClick={login}>Войти с помощью Google</Button>
          </Box>
        </Grid> 
      </Grid>
    </Container>
  )
}

export default Login;