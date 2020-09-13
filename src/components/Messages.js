import React, { useState, useEffect } from "react";
import { apiBaseUrl } from "../config";

import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import { List } from "@material-ui/core";

const Messages = ({ message }) => {
  //   const [messages, setMessages] = useState([]);
  //   const [open, setOpen] = useState(true);

  //   useEffect(() => {
  //     const getMessages = async () => {
  //       const response = await fetch(
  //         `${apiBaseUrl}/conversations/${selected.id}/messages`
  //       );
  //       if (response.ok) {
  //         const { messages } = await response.json();
  //         setMessages(messages);
  //       }
  //     };
  //     getMessages();
  //   }, [selected]);

  //   const handleClick = () => {
  //     setOpen(!open);
  //   };

  if (!message) return null;

  return (
    <div>
      <ListItem>
        <ListItemText>
          <div>{message.text}</div>
          <div>{message.dateTime}</div>
        </ListItemText>
      </ListItem>
    </div>
  );
};

export default Messages;
