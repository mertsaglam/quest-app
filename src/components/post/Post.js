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
  const { title, text, userName, userId,postId } = props;
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const firstLetter = userName.charAt(0).toUpperCase();
  const isInitialMount = useRef(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
    console.log(commentList);
  };
  const handleLikeClick = () => {
    setLiked(!liked);
  };

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
  useEffect(() => {
    if(isInitialMount.current){
      isInitialMount.current = false;
    }else{
    refreshComments();
    }
  }, [commentList]);
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
          sx={{ color: liked ? red[500] : "inherit" }}
          aria-label="add to favorites"
        >
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
        <CardContent>
          burası açılıp kapanan kısım. burası açılıp kapanan kısım. burası
          açılıp kapanan kısım.
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Post;
