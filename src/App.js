import React from "react";
import "./App.css";

import { useAuthState } from "react-firebase-hooks/auth";

import Button from "@material-ui/core/Button";

import { auth } from "./Firebase";
import SignIn from "./SignIn";
import Location from "./Location";

const App = () => {
  const [user] = useAuthState(auth);

  const signOut = () => {
    auth.currentUser &&
      auth.signOut().then(
        () => console.log("Signed Out"),
        (err) => console.log(err)
      );
  };

  return (
    <div className="main">
      {!user ? (
        <SignIn />
      ) : (
        <div>
          <Location />
          <div>
            <Button
              style={{
                marginTop: "6rem",
                borderRadius: "2px",
                border: "solid 1px white",
                color: "white",
                width: "25%",
                height: "25%",
              }}
              className="center"
              onClick={signOut}
            >
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
