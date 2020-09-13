import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Button } from "@material-ui/core";
import "../styles/conversations.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  conversationItem: {
    display: "flex",
    flexDirection: "row",
  },
  conversationDate: {
    color: "gray",
    fontSize: "11px",
  },
  conversationCreateBtn: {
    width: "100%",
  },
}));

export default function Conversations({ conversation, setSelected }) {
  const classes = useStyles();

  const handleSelect = () => {
    setSelected(conversation);
  };

  return (
    <Button className={classes.conversationCreateBtn} onClick={handleSelect}>
      <ListItem className={classes.root}>
        <ListItemText className={classes.conversationItem}>
          <div>{conversation.title}</div>
          <div className={classes.conversationDate}>
            {conversation.startDate}
          </div>
        </ListItemText>
      </ListItem>
    </Button>
  );
}
