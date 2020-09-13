import React, { useState, useEffect } from "react";
import { apiBaseUrl } from "../config";
import Messages from "./Messages";

import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import { List } from "@material-ui/core";

const MessageContainer = ({ selected }) => {
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const getMessages = async () => {
      const response = await fetch(
        `${apiBaseUrl}/conversations/${selected.id}/messages`
      );
      if (response.ok) {
        const { messages } = await response.json();
        setMessages(messages);
      }
    };
    getMessages();
  }, [selected]);

  if (!messages) return null;

  return (
    <div>
      <List>
        {messages.map((message) => {
          return (
            <>
              <Messages key={message.id} message={message} />
            </>
          );
        })}
      </List>
    </div>
  );
};

export default MessageContainer;
