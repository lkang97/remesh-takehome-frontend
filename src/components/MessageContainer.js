import React, { useState, useEffect } from "react";
import { apiBaseUrl } from "../config";
import Message from "./Message";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { List } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const MessageContainer = ({ selected }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

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
  }, [selected, isUpdated]);

  const createNewMessage = async (event) => {
    event.preventDefault();
    const dateTime = new Date();
    const text = newMessage;
    const response = await fetch(
      `${apiBaseUrl}/conversations/${selected.id}/messages`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, dateTime }),
      }
    );

    if (response.ok) {
      setNewMessage("");
      setIsUpdated(!isUpdated);
    }
  };
  const updateNewMessage = (e) => setNewMessage(e.target.value);

  if (!messages) return null;

  return (
    <div>
      <List>
        {messages.map((message) => {
          return (
            <>
              <Message key={message.id} message={message} />
            </>
          );
        })}
      </List>
      <div>
        <form onSubmit={createNewMessage}>
          <TextField
            multiline
            fullWidth
            placeholder="Send new message"
            value={newMessage}
            onChange={updateNewMessage}
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  );
};

export default MessageContainer;
