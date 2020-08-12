import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import cookie from "../../images/cookie.png";
import errorIcon from "../../images/errorIcon.png";
import "./submitModal.styles.css";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    textAlign: "center",
    padding: theme.spacing(2, 4, 3),
  },
}));

const SubmitModal = ({ solution }) => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#04786B",
      },
    },
  });

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id='simple-modal-title'>
        {solution ? "YOU GOT A COOKIE!" : "OOPS! TRY AGAIN!"}
      </h2>
      <p id='simple-modal-description'>
        {solution
          ? "Solution is Right! Head to the new challenge!"
          : "There's some mistake in your code!"}
      </p>
      <img
        src={solution ? cookie : errorIcon}
        alt={solution ? "cookie" : "error-icon"}
      />
      <br />
      <Button variant='contained' color={solution ? "primary" : "secondary"}>
        {solution ? "Next Challenge" : "Try Again!"}
      </Button>
    </div>
  );

  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <Modal
          open={true}
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
        >
          {body}
        </Modal>
      </div>
    </MuiThemeProvider>
  );
};

export default SubmitModal;
