import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Post from "../post/Post";
import { makeStyles } from "@mui/styles";
import { forwardRef } from "react";
import { useState } from "react";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: 2,
    flex: 1,
  },
});

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PopUp(props) {
  const classes = useStyles();
  const { isOpen, postId, setIsOpen } = props;
  const [open, setOpen] = useState(isOpen);
  const [post, setPost] = useState();

  const getPost = () => {
    fetch("/posts/" + postId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("tokenKey"),
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setPost(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const handleClose = () => {
    setOpen(false);
    setIsOpen(false);
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    getPost();
  }, [postId]);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Close
          </Typography>
        </Toolbar>
      </AppBar>
      {post ? (
        <Post
          likes={post.postLikes}
          postId={post.id}
          userId={post.userId}
          userName={post.userName}
          title={post.title}
          text={post.text}
        ></Post>
      ) : (
        "loading"
      )}
    </Dialog>
  );
}

function UserActivity(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rows, setRows] = useState([]);
  const userId = localStorage.getItem("currentUser");
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState();
  const [selectedPost, setSelectedPost] = useState();

  const handleNotification = (postId) => {
    setSelectedPost(postId);
    setIsOpen(true);
  };

  const getActivity = () => {
    fetch("/users/activity/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("tokenKey"),
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          console.log(result);
          setRows(result);
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    getActivity();
  }, []);

  return (
    <div>
      {isOpen ? (
        <PopUp isOpen={isOpen} postId={selectedPost} setIsOpen={setIsOpen} />
      ) : (
        ""
      )}
      <Paper sx={{ width: "50%", overflow: "hidden" }}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>User Activity</TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <Button >
                    <TableRow
                    onClick={() => handleNotification(row[1])}
                      sx={{ borderBottom: "1px solid grey" }}
                      style={{ cursor: "pointer" }}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {row[3] + " " + row[0] + " your post"}
                    </TableRow>
                  </Button>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default UserActivity;
