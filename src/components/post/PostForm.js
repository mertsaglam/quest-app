import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { Button, InputAdornment, OutlinedInput } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function PostForm(props) {
  const { userName, userId, refreshPosts } = props;
  const firstLetter = userName.charAt(0).toUpperCase();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [isSent, setIsSent] = useState(false);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSent(false);
  };

  const savePost = async () => {
    const response = await fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("tokenKey"),
      },
      body: JSON.stringify({
        userId: userId,
        title: title,
        text: text,
      }),
    });
    if (response.ok) {
      const newPost = await response.json();
      return newPost;
    } else {
      // Handle errors here
      return null;
    }
  };

  const handleSubmit = async () => {
    const newPost = await savePost();
    if (newPost) {
      setIsSent(true);
      setTitle("");
      setText("");
      refreshPosts();
    }
  };

  return (
    <div>
      <Snackbar open={isSent} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Post sent!
        </Alert>
      </Snackbar>

      <Card sx={{ maxWidth: 800, width: "800px", margin: "20px auto" }}>
        <CardHeader
          sx={{ textAlign: "left" }}
          avatar={
            <Link
              to={{ pathname: "/users/" + userId }}
              style={{ textDecoration: "none" }}
            >
              <Avatar sx={{ bgcolor: "#2196f3" }} aria-label="recipe">
                {firstLetter}
              </Avatar>
            </Link>
          }
          titleTypographyProps={{ variant: "h6", fontWeight: "bold" }}
          title={
            <OutlinedInput
              multiline
              placeholder="Title"
              inputProps={{ maxLength: 25 }}
              fullWidth
              value={title}
              onChange={(i) => setTitle(i.target.value)}
            />
          }
        />
        <CardContent>
          <OutlinedInput
            multiline
            placeholder="Text"
            inputProps={{ maxLength: 250 }}
            fullWidth
            value={text}
            onChange={(i) => setText(i.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  sx={{
                    bgcolor: "#434fde",
                    "&:hover": {
                      bgcolor: "#4893c2",
                    },
                  }}
                >
                  Post
                </Button>
              </InputAdornment>
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default PostForm;
