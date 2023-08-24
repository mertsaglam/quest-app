import React, { useEffect, useState,useRef } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { Link } from "react-router-dom";
import Comment from "../comment/Comment";
import { Container } from "@mui/material";
import CommentForm from "../comment/CommentForm";


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
function Post(props) {
  const { title, text, userName, userId,postId ,likes} = props;
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const firstLetter = userName.charAt(0).toUpperCase();
  const isInitialMount = useRef(true);


  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
    console.log(commentList);
  };
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    if(isLiked){
      setLikeCount(likeCount-1);
      deleteLike(likes.find(like => like.userId == userId ).id);
      
    }else{
      setLikeCount(likeCount+1);
      saveLike();
    }
  };

  const saveLike = () => {
    fetch("/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        userId: userId,
      }),
    });
  };
 //write the function to delete like
  //@DeleteMapping("/{likeId}")
  //public void deleteSingleLike(@PathVariable Long likeId){
  //likeService.deleteSingleLike(likeId);
  //}
  const deleteLike = (likeId) => {
    fetch("/likes/"+likeId, { 
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        likeId: likeId,
      })
    })
  }

  const refreshComments = () => {
    fetch("/comments?postId="+postId)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCommentList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };
  const checkLikes = () => {
    var likeControl =likes.find(like => like.userId == userId )
    if(likeControl != null){
      setIsLiked(true);
  }
}
      
  useEffect(() => {
    if(isInitialMount.current){
      isInitialMount.current = false;
    }else{
    refreshComments();
    }
  }, [commentList]);

  useEffect(() => { checkLikes() }, [])
  return (
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
        title={title}
      />
      <CardContent>
        <Typography>{text} </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          onClick={handleLikeClick}
          sx={{ color: isLiked  ? red[500] : "inherit" }}
          aria-label="add to favorites"
        > {likeCount}
          <FavoriteIcon />
        </IconButton>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show comments"
        >
          <CommentIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Container fixed className="comment-container" >
          {error ? "error" : isLoaded ? commentList.map((comment) => (
            <Comment userId={1} userName={"USER"} text={comment.text} >

            </Comment>
          )) : "loading"
           }
           <CommentForm userName={userName} userId={userId} postId={postId} refreshComments={refreshComments}></CommentForm>
        </Container>
      </Collapse>
    </Card>
  );
}

export default Post;
