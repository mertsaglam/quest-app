import {
  Avatar,
  CardContent,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { Link } from "react-router-dom";

const Comment = (props) => {
  const { text, userId, userName } = props;

  return (
    <CardContent
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <OutlinedInput
        disabled
        id="outlined-adornment-amount"
        multiline
        inputProps={{ maxLength: 25 }}
        fullWidth
        value={text}
        startAdornment={
          <InputAdornment position="start">
            <Link
              to={{ pathname: "/users/" + userId }}
              sx={{
                textDecoration: "none",
                boxShadow: "none",
                color: "white",
              }}
            >
              <Avatar
                aria-label="recipe"
                sx={{
                  width: (theme) => theme.spacing(3),
                  height: (theme) => theme.spacing(3),
                }}
              >
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          </InputAdornment>
        }
        sx={{ color: "black", backgroundColor: "white" }}
      ></OutlinedInput>
    </CardContent>
  );
};

export default Comment;
