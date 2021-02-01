import React from "react";

import { useCollectionData } from "react-firebase-hooks/firestore";

import AddIcon from "@material-ui/icons/Add";
import Clear from "@material-ui/icons/Clear";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import { auth, fieldValue, firestore } from "./Firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      flexGrow: 1,
    },
    color: "white",
    borderColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "0.625rem",
  },
  paper: {
    background: "#2a2a2a",
    color: "white",
    height: "100%",
    fontSize: "0.725rem",
    margin: "1.125rem 0.325rem 0rem 0.325rem",
  },
  list: {
    fontSize: "0.72525rem",
    padding: "0.225rem",
    margin: "0.225rem",
  },
  delete: {
    fontSize: "0.825rem",
    color: "white",
  },
}));

const Location = () => {
  const classes = useStyles();
  const locationRef = firestore.collection("location");
  const query = locationRef.orderBy("order", "asc");
  const [values] = useCollectionData(query, {
    idField: "id",
  });

  // Adds a person to the name array field in the document and if doc id
  // is not Laundry, removes their name from the current name array field
  const addToLocation = async (doc, names, locations) => {
    if (
      auth.currentUser != null &&
      names.indexOf(auth.currentUser.displayName) === -1
    ) {
      await locationRef
        .doc(doc)
        .update({
          name: fieldValue.arrayUnion(auth.currentUser.displayName),
        })
        .catch((err) => console.log(err));

      if (doc !== "Laundry") {
        for (let i = 0; i < locations.length; i++) {
          if (
            locations[i].name.length > 0 &&
            locations[i].id !== "Laundry" &&
            locations[i].name.indexOf(auth.currentUser.displayName) !== -1
          ) {
            removeFromLocations(locations[i].id, auth.currentUser.displayName);

            break;
          }
        }
      }
    }
  };

  // Removes a person from the name array field in a document
  const removeFromLocations = async (doc, currentName) => {
    if (
      auth.currentUser != null &&
      currentName === auth.currentUser.displayName
    ) {
      await locationRef
        .doc(doc)
        .update({
          name: fieldValue.arrayRemove(currentName),
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Grid container direction="row" spacing={1}>
      {values &&
        values.map((location, idx) => {
          return (
            <Grid key={location.id + idx} item xs={6} xl={3} md={3} lg={3}>
              <Paper className={classes.paper}>
                <List key={location.id}>
                  <Typography className={classes.list}>
                    {location.id}
                  </Typography>
                  {location.name.length > 0 &&
                    location.name.map((person) => {
                      return (
                        <ListItem key={person} button dense={false}>
                          <ListItemAvatar>
                            <Avatar alt="avatar" src={`/asset/${person}.png`} />
                          </ListItemAvatar>
                          <Typography className={classes.list}>
                            {person}
                          </Typography>
                          {auth.currentUser.displayName === person &&
                            location.id === "Laundry" && (
                              <ListItemSecondaryAction
                                className={classes.delete}
                                onClick={() =>
                                  removeFromLocations(location.id, person)
                                }
                              >
                                <IconButton edge="end" aria-label="delete">
                                  <Clear className={classes.delete}></Clear>
                                </IconButton>
                              </ListItemSecondaryAction>
                            )}
                        </ListItem>
                      );
                    })}
                  <ListItem>
                    <Button
                      className={classes.root}
                      size="small"
                      onClick={() =>
                        addToLocation(location.id, location.name, values)
                      }
                      aria-label="add location"
                      startIcon={
                        <AddIcon
                          style={{
                            color: "white",
                            fontSize: "0.725rem",
                          }}
                        />
                      }
                    >
                      Check In
                    </Button>
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default Location;
