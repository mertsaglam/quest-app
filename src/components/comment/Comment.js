import { Avatar, CardContent, InputAdornment, OutlinedInput } from "@mui/material";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles({
    comment: {
        backgroundColor: "#dfe8f7",
        margin: "10px",
        padding: "10px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
        width: "100%"
    }
})

const Comment = (props) => {
    const { text, userId, userName } = props;
    const classes = useStyles();
  return (
    <CardContent className={classes.comment}>
        <OutlinedInput disabled
        id="outlined-adornment-amount"
        multiline
        inputProps={{ maxLength: 25 }}
        fullWidth
        value={text}
        startAdornment={
            <InputAdornment position="start">
                <Link className={classes.link} to={{pathname:'/users/' + userId}}>
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {userName.charAt(0).toUpperCase()}
                    </Avatar>

                </Link>
            </InputAdornment>
        }
        >

        </OutlinedInput>
    </CardContent>
  )
}
export default Comment