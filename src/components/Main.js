import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Conversations from "./Conversations";
import { apiBaseUrl } from "../config";

import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import Popper from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
    borderRight: "1px solid black",
  },
  inline: {
    display: "inline",
  },
}));

const Main = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [title, setTitle] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const getConversations = async () => {
      const response = await fetch(`${apiBaseUrl}/conversations`);
      if (response.ok) {
        const { conversations } = await response.json();
        setConversations(conversations);
      }
    };
    getConversations();
  }, [isUpdated]);

  const showForm = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const createConversation = async (event) => {
    event.preventDefault();
    const startDate = new Date().toDateString();
    const response = await fetch(`${apiBaseUrl}/conversations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, startDate }),
    });

    if (response.ok) {
      setIsUpdated(!isUpdated);
    }
  };

  const updateTitle = (e) => setTitle(e.target.value);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <div>
      <div>
        <Button aria-describedby={id} onClick={showForm}>
          Create New Conversation
        </Button>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <div className={classes.paper}>
            <form onSubmit={createConversation}>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={updateTitle}
              />
              <button type="submit">Create</button>
            </form>
          </div>
        </Popper>
      </div>
      <List className={classes.root}>
        {conversations.map((conversation) => {
          return (
            <>
              <Conversations
                key={conversation.id}
                conversation={conversation}
              />
              <Divider />
            </>
          );
        })}
      </List>
    </div>
  );
};

export default Main;
