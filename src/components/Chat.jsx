import React, {useContext, useState} from "react";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {collection, addDoc, serverTimestamp, orderBy, query, deleteDoc} from "firebase/firestore";
import { Container, Grid, Button, TextField } from "@mui/material";
import Loader from "./Loader";
import MessageWindow from "./MessageWindow";

const Chat = () => { 
  
  const {auth, firestore} = useContext(Context);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState("");
  const [selectMode, setSelectMode] = useState(false)
  const [array, setArray] = useState([])
  const [docs, loading, error, snapshot] = useCollectionData(
    query(collection(firestore,"messages"),orderBy("createAt"))
  )

  if (selectMode === false && array.length !== 0) {
    setArray([])
  }

  const toggleSelectingMode = () => {
    setSelectMode(!selectMode);
    
  }

  const sendMessage = async () => {
    if (!value.trim()) {
      return;
    }

    await addDoc(collection(firestore,"messages"),{
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      isSelected:false,
      createAt: serverTimestamp(),
    })

    setValue("")
  }

  const deleteSelectedMessages = (messageIds) => {
    snapshot.forEach(docSnapshot => {
      messageIds.forEach(messageId => {
        if (docSnapshot.id === messageId) {
          deleteDoc(docSnapshot.ref);
        }
      })
    })
    setSelectMode(false);
  }
  

  if(loading) {
    return <Loader/>
  }

  return (
    <Container maxWidth="lg" disableGutters 
      // style={{border:"1px solid red"}} 
    > 
      <Grid 
        xs={12}
        container 
        style={{height: window.innerHeight - 50, marginTop: "20px"}}
        justifyContent="center"
      >
        {/* <Grid
          container
          xs={2}  
        >
          <div style={{border: "1px solid red", width:"100%"}}></div>
        </Grid> */}
        <MessageWindow docs={docs} snapshot={snapshot} authorizedUserId={user.uid} selectMode={selectMode} array={array} setArray={setArray}/>
        <Grid 
            container
            direction="column"
            alignItems="flex-end"
            style={{width:"80%"}}
          >
            { array.length > 0 ? <Button variant="outlined" onClick={() => deleteSelectedMessages(array)}>Удалить</Button> : null}
            <TextField 
              fullWidth 
              variant="outlined"
              maxRows="2"
              value={value} 
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e)=> {
                if (e.key === "Enter" ) {
                  sendMessage();
                }
              }}
            />
            <Grid
              container
              justifyContent="flex-end"
            >
              <Button variant="outlined" onClick={toggleSelectingMode} >Выделить</Button>
              <Button variant="outlined" onClick={sendMessage} >Отправить</Button>
            </Grid>
          </Grid>
      </Grid>
    </Container>
  )
}

export default Chat;



