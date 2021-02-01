import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { auth } from "./Firebase";

const styles = {
  root: {
    "& label": {
      color: "white",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
        color: "white",
      },
    },
    "&:hover fieldset": {
      borderColor: "white",
      color: "white",
    },
    "&.fieldset": {
      borderColor: "white",
      color: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
      color: "black",
    },
  },
  input: {
    color: "white",
  },
  button: {
    borderRadius: "2px",
    border: "solid 1px white",
    color: "white",
  },
};

const SignIn = ({ classes }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();

    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);
    });
  };

  return (
    <div className="sign-in-container">
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoFocus
          InputProps={{ className: classes.input }}
          className={classes.root}
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          InputProps={{ className: classes.input }}
          className={classes.root}
        />
        <hr style={{ margin: "2rem 0" }} />
        <Button
          onClick={signIn}
          type="submit"
          fullWidth
          className={classes.button}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default withStyles(styles)(SignIn);
