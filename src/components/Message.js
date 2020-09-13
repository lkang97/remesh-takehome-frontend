import React, { useState, useEffect } from "react";
import { apiBaseUrl } from "../config";
import Thoughts from "./Thoughts";

import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Message = ({ message }) => {
  const [newThought, setNewThought] = useState(null);
  const [open, setOpen] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createNewThought = async (event) => {
    event.preventDefault();
    const dateTime = new Date();
    const text = newThought;
    const response = await fetch(
      `${apiBaseUrl}/messages/${message.id}/thoughts`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, dateTime }),
      }
    );

    if (response.ok) {
      setNewThought("");
      setIsUpdated(!isUpdated);
    }
  };

  const updateNewThought = (e) => setNewThought(e.target.value);

  if (!message) return null;

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <ListItem>
          <ListItemText>
            <div>{message.text}</div>
            <div>{message.dateTime}</div>
          </ListItemText>
        </ListItem>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={createNewThought}>
          <DialogTitle id="form-dialog-title">Thoughts</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Thoughts message={message} isUpdated={isUpdated} />
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={newThought}
              onChange={updateNewThought}
              label="Add new thought"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Enter
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default Message;
