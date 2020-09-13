import React, { useState, useEffect } from "react";
import { apiBaseUrl } from "../config";

// Material UI Components
import { makeStyles } from "@material-ui/core/styles";
import { List } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

// Material UI Styling
const useStyles = makeStyles((theme) => ({
  thoughtTime: {
    color: "gray",
    fontSize: 11,
  },
  thoughtContent: {
    color: "black",
  },
}));

const Thoughts = ({ message, isUpdated }) => {
  const classes = useStyles();

  // State
  const [thoughts, setThoughts] = useState([]);

  // Load all the thoughts for a single message
  useEffect(() => {
    const getThoughts = async () => {
      const response = await fetch(
        `${apiBaseUrl}/messages/${message.id}/thoughts`
      );
      if (response.ok) {
        const { thoughts } = await response.json();
        setThoughts(thoughts);
      }
    };
    getThoughts();
  }, [isUpdated, message.id]);

  if (!thoughts) return null;

  return (
    <div>
      <List>
        {thoughts.map((thought) => {
          return (
            <ListItem key={thought.id}>
              <ListItemText>
                <div
                  className={classes.thoughtContent}
                >{`Thought: ${thought.text}`}</div>
                <div
                  className={classes.thoughtTime}
                >{`Time: ${thought.dateTime}`}</div>
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default Thoughts;
