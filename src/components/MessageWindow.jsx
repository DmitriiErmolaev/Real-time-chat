import React from "react";
import Message from "./Message";

const MessageWindow = ({authorizedUserId, selectMode, snapshot, array, setArray}) => {

  let messages = [];

  const  toggleIsSelected = (docId) =>  {
    if(array.length === 0) {
      setArray([docId]);
      return;
    } 

    let did = false;
    array.forEach( (elem,index) => {
      if (elem === docId) {
        setArray([...array.slice(0,index),...array.slice(index+1)])
        did = true;
      }
    })

    if(!did){
      setArray([...array,docId]);
    }
  }

  const isMessageFromAuthorizedUser = (senderId) => {
    if (authorizedUserId === senderId){
      return true;
    }
    return false;
  }


 
  snapshot.forEach(docSnapshot => {
    const doc = docSnapshot.data();
    let messageClass = "message-container ";
    const messageFromAuthorizedUser = isMessageFromAuthorizedUser(doc.uid);

    if (!messageFromAuthorizedUser){
      messageClass += "companion"
    }
    if(array.length > 0) {
      array.forEach( docId => {
        if(docId === docSnapshot.id) {
          messageClass += "selected"
        }
      })
    }
    
    messages.push(<Message key={docSnapshot.id} doc={doc} docId={docSnapshot.id} messageClass={messageClass} selectMode={selectMode} toggleIsSelected={toggleIsSelected} messageFromAuthorizedUser={messageFromAuthorizedUser}/>)
  })

  return (
    <div className="message-window" style={{width: "80%", height: "70vh", border:"1px solid gray", overflowY:"auto"   }}>
      {messages}
    </div>
  )
}

export default MessageWindow;