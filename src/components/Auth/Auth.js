import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import { useState } from "react";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (value) => {
    setUsername(value);
  };

  const handlePassword = (value) => {
    setPassword(value);
  };

  const handleButton = (path) => {
    sendRequest(path);
    setUsername("");
    setPassword("");
    window.history.go("/auth");
  };

  const sendRequest = (path) => {
    console.log("3");
    fetch("/auth/" + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem("tokenKey", result.message);
        console.log(result.message);
        localStorage.setItem("currentUser", result.userId);
        localStorage.setItem("username", username);
      })
      .catch((err) => console.log(err));
  };

  return (
    <FormControl>
      <InputLabel>Username</InputLabel>
      <Input
        value={username}
        onChange={(e) => handleUsername(e.target.value)}
      />
      <InputLabel style={{ top: 80 }}>Password</InputLabel>
      <Input
        value={password}
        style={{ top: 40 }}
        onChange={(e) => handlePassword(e.target.value)}
      />
      <Button
        variant="contained"
        style={{
          marginTop: 80,
          color: "white",
          background: "linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)",
        }}
        onClick={() => handleButton("register")}
      >
        Register
      </Button>
      <FormHelperText style={{ marginTop: 20 }}>
        Already have an account?
      </FormHelperText>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleButton("login")}
        style={{
          color: "white",
          background: "linear-gradient(45deg,#2196F3 30%,#21CBF3 90%)",
        }}
      >
        Login
      </Button>
    </FormControl>
  );
};

export default Auth;
