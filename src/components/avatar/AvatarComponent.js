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

const AvatarComponent = () => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [currentAvatar, setCurrentAvatar] = useState("/Avatars/avatar1.png"); // New state variable

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (value) => {
    setSelectedValue(value);
    setCurrentAvatar(`/Avatars/avatar${value}.png`); // Update currentAvatar
  };

  return (
    <div>
      <Card sx={{ maxWidth: 345, marginLeft: 10 }}>
        <CardMedia
          component="img"
          image={currentAvatar} // Use currentAvatar here
          title="avatar"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {localStorage.getItem("username")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species.
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleOpen} sx={{ margin: "auto" }} size="small">
            Change Avatar
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
