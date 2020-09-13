import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function Conversations({ conversation, handleListItemClick }) {
  const classes = useStyles();

  return (
    <ListItem className={classes.root}>
      <ListItemText>
        <div>{conversation.title}</div>
        <div>{conversation.startDate}</div>
      </ListItemText>
    </ListItem>
  );
}
