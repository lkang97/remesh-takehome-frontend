import React, { useState, useEffect } from "react";
import { apiBaseUrl } from "../config";

import { List } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const Thoughts = ({ message, isUpdated }) => {
  const [thoughts, setThoughts] = useState([]);

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
  }, [isUpdated]);

  if (!thoughts) return <div>No thoughts yet</div>;

  return (
    <div>
      <List>
        {thoughts.map((thought) => {
          return (
            <ListItem key={thought.id}>
              <ListItemText>
                <div>{thought.text}</div>
                <div>{thought.dateTime}</div>
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default Thoughts;
