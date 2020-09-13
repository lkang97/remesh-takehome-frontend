import React, { useState, useEffect } from "react";
import { apiBaseUrl } from "../config";
import Message from "./Message";
import "../index.css";

// Material UI Components
import TextField from "@material-ui/core/TextField";
import { List } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const MessageContainer = ({ selected }) => {
  // State
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  // Load all messages for a single conversation
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

  // Sends a new message
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
    <div id="messages-container">
      <Typography id="messages-container-title">{selected.title}</Typography>
      <List id="messages-list">
        {messages.map((message) => {
          return <Message key={message.id} message={message} />;
        })}
      </List>
      <form id="send-message" onSubmit={createNewMessage}>
        <TextField
          id="send-message-field"
          multiline
          fullWidth
          placeholder="Send a new message"
          value={newMessage}
          onChange={updateNewMessage}
        />
        <Button color="primary" variant="contained" type="submit">
          Send
        </Button>
      </form>
    </div>
  );
};

export default MessageContainer;
