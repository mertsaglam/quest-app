import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Radio,
  ListItemSecondaryAction,
} from "@mui/material";

const AvatarComponent = (props) => {
  const { avatarId } = props;
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(avatarId);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSaveAvatar = (avatarId) => {
  const userId = localStorage.getItem("currentUser");
  console.log("userId", userId);
  // Assuming you have userId in localStorage

  fetch(`/users/${userId}/${avatarId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("tokenKey"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data here
      console.log("Avatar updated:", data);
    })
    .catch((error) => {
      console.error("Error updating avatar:", error);
    });
};

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <div>
      <Card sx={{ maxWidth: 345, marginLeft: 10 }}>
        <CardMedia
          component="img"
          image={`/Avatars/avatar${selectedValue}.png`} // Use currentAvatar here
          title="avatar"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {localStorage.getItem("username")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            User Info
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleOpen} sx={{ margin: "auto" }} size="small">
            Change Avatar
          </Button>
          <Button
            onClick={() =>handleSaveAvatar(selectedValue)}
            sx={{ margin: "auto" }}
            size="small"
          >
            Save Avatar
          </Button>
        </CardActions>
      </Card>
      <Modal
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <List
            dense
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {[1, 2, 3, 4, 5, 6].map((value) => {
              const labelId = `checkbox-list-secondary-label-${value}`;
              return (
                <ListItem key={value} disablePadding>
                  <ListItemAvatar>
                    <img
                      alt={`Avatar n°${value}`}
                      src={`/Avatars/avatar${value}.png`}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemText id={labelId} primary={`Avatar ${value}`} />
                  <ListItemSecondaryAction>
                    <Radio
                      value={value}
                      checked={selectedValue === value}
                      onChange={() => handleChange(value)}
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </div>
      </Modal>
    </div>
  );
};

export default AvatarComponent;
