import React, { useEffect, useState } from "react";
import Conversations from "./Conversations";
import MessageContainer from "./MessageContainer";
import { apiBaseUrl } from "../config";
import "../index.css";

// Material UI Components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import Popper from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";

// Material UI Styling
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
    backgroundColor: "lightgrey",
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

  // State
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = useState();
  const [title, setTitle] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [searchContent, setSearchContent] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Load all conversations for side bar
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

  // Filter conversations based off of search results
  useEffect(() => {
    const search = () => {
      const filtered = conversations.filter((convo) => {
        return convo.title.toLowerCase().includes(searchContent);
      });
      setSearchResults(filtered);
    };
    search();
  }, [searchContent, conversations]);

  // Create a new conversation
  const createConversation = async (event) => {
    event.preventDefault();
    const startDate = new Date().toDateString();
    const response = await fetch(`${apiBaseUrl}/conversations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, startDate }),
    });

    if (response.ok) {
      setTitle("");
      setIsUpdated(!isUpdated);
    }
  };

  // Display new conversation form
  const showForm = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const updateTitle = (e) => setTitle(e.target.value);
  const updateSearch = (e) => setSearchContent(e.target.value);

  return (
    <div id="main-container">
      <div id="main-conversations">
        <Button
          onClick={showForm("right")}
          id="conversation-create-btn"
          color="primary"
          variant="outlined"
        >
          Create New Conversation
        </Button>
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <form
                  id="create-conversation-form"
                  onSubmit={createConversation}
                >
                  <TextField
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={updateTitle}
                  />
                  <Button color="primary" type="submit">
                    Create
                  </Button>
                </form>
              </Paper>
            </Fade>
          )}
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
        {searchContent ? (
          <List id="search-results">
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
        ) : (
          <div></div>
        )}
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
