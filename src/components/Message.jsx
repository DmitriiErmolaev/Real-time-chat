import React, {useState} from "react";
import "../assets/message.scss"

const Message = ({doc:{text,displayName},docId, messageClass,selectMode, toggleIsSelected, messageFromAuthorizedUser}) => {
  const [checked,setChecked] = useState(false);
  
  if(selectMode === false && checked === true) {
    setChecked(false)
  }

  const handleChange = () => {
    setChecked(!checked) 
    toggleIsSelected(docId)
  }

  // const showContextMenu = (event) => {
  //   if (event.target.key = )
  // }

  let selectBox = null;
  if (selectMode && messageFromAuthorizedUser){
    selectBox = <input className="message__selectBox" type="checkbox" checked={checked} onChange={()=> handleChange()}/>
  }
  return (
    <div className={messageClass} 
      // onKeyDown={(e) => showContextMenu()}
    >
      {selectBox}
      {/* <p className="message__email">{email}</p> */}
      <p className="message__sender-name">{displayName}</p>
      <p className="message__text">{text}</p>
    </div>
  )
}

export default Message;