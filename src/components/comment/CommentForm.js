import React, { useState } from "react";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Button, InputAdornment, OutlinedInput } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function CommentForm(props) {
  const { userName, userId, postId, refreshComments } = props;
  const firstLetter = userName.charAt(0).toUpperCase();
  const [text, setText] = useState("");
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

  const saveComment = () => {
    fetch("/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":  localStorage.getItem("tokenKey"),
      },
      body: JSON.stringify({
        userId: userId,
        postId: postId,
        text: text,
      }),
    })
      .then(() => {
        setIsSent(true);
        setText("");
        refreshComments();
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
      });
  };

  const handleSubmit = () => {
    saveComment();
  };

  return (
    <div>
      <Snackbar open={isSent} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Comment sent!
        </Alert>
      </Snackbar>

      <CardContent>
        <Typography>
          <OutlinedInput
            id="outlined-adornment-amount"
            multiline
            placeholder="Add a comment..."
            inputProps={{ maxLength: 250 }}
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <Button onClick={handleSubmit} variant="contained">
                  Comment
                </Button>
              </InputAdornment>
            }
          />
        </Typography>
      </CardContent>
    </div>
  );
}

export default CommentForm;
