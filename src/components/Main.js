import React, { useEffect, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Conversations from "./Conversations";
import MessageContainer from "./MessageContainer";
import { apiBaseUrl } from "../config";
import "../index.css";

import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import Popper from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
    borderRight: "1px solid black",
    overflowY: "scroll",
  },
  inline: {
    display: "inline",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Main = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [title, setTitle] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [searchContent, setSearchContent] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
  const updateSearch = (e) => setSearchContent(e.target.value);

  useEffect(() => {
    const search = () => {
      const filtered = conversations.filter((convo) => {
        return convo.title.toLowerCase().includes(searchContent);
      });
      setSearchResults(filtered);
    };
    search();
  }, [searchContent]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <div id="main-container">
      <div id="main-conversations">
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
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => updateSearch(e)}
          />
        </div>
        <List>
          {searchResults.map((result) => {
            return (
              <Conversations
                key={result.id}
                conversation={result}
                setSelected={setSelected}
              />
            );
          })}
        </List>
        <List className={classes.root}>
          {conversations.map((conversation) => {
            return (
              <>
                <Conversations
                  key={conversation.id}
                  conversation={conversation}
                  setSelected={setSelected}
                />
                <Divider />
              </>
            );
          })}
        </List>
      </div>
      {selected ? <MessageContainer selected={selected} /> : <div></div>}
    </div>
  );
};

export default Main;
