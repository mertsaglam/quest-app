import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Button, InputAdornment, OutlinedInput } from '@mui/material';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function PostForm(props) {
  const { userName, userId ,refreshPosts} = props;
  const firstLetter = userName.charAt(0).toUpperCase();
  const [text, SetText] = useState("");
  const [title, setTitle] = useState("");
  const [isSent, setIsSent] = useState(false);
  
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSent(false);
  };

  const savePost = () => {
    fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: userId,
        title: title,
        text: text
      })
    })
    
  }

  const handleSubmit = () => {
    savePost();
    setIsSent(true);
    setTitle("");
    SetText("");
    refreshPosts();
  };
  const handleTitle = (value) => {
    setTitle(value);
    setIsSent(false);
  }
  const handleText = (value) => {
    SetText(value);
    setIsSent(false);
  }

  return (
    <div>
      <Snackbar open={isSent} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Post sent!
        </Alert>
      </Snackbar>

    <Card sx={{ maxWidth: 800, width: '800px', margin: "20px auto" }}>
      <CardHeader sx={{ textAlign: "left" }}

        avatar={<Link to={{ pathname: '/users/' + userId }} style={{ textDecoration: "none" }}><Avatar sx={{ bgcolor: "#2196f3" }} aria-label="recipe">
          {firstLetter}
        </Avatar></Link>

        }
        titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
        title={<OutlinedInput id='outlined-adornment-amount'
          multiline placeholder='Title' inputProps={{ maxLength: 25 }} fullWidth value={title} onChange={(i) => handleTitle(i.target.value)}></OutlinedInput>}
      />


      <CardContent>
        <Typography>{<OutlinedInput id='outlined-adornment-amount'
          multiline placeholder='Text' inputProps={{ maxLength: 250 }} fullWidth value={text} onChange={(i) => handleText(i.target.value)} endAdornment={<InputAdornment position='end'>
            <Button onClick={handleSubmit} variant='contained' sx={{
              bgcolor: "#434fde",
              '&:hover': {
                bgcolor: "#4893c2",
              }
            }} >Post</Button>
          </InputAdornment>}></OutlinedInput>}   </Typography>

      </CardContent>
    </Card>
    </div>

  );
}

export default PostForm;