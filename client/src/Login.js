import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "./store/utils/thunkCreators";
import bgImage from "./assets/images/bg-img.png";
import bubble from "./assets/images/bubble.svg";

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
  },
  leftContainer: {
    position: "relative",
    background:
      "content-box linear-gradient(to bottom, rgba(58, 141, 255, 0.8), rgba(58, 141, 255, 1))",
  },
  rightContainer: {
    position: "relative",
    flexGrow: 1,
  },
  loginFormContainer: {
    position: "absolute",
    top: "27%",
    width: "375px",
    left: "50%",
    transform: "translate(-50%)",
  },
  leftTextContainer: {
    position: "absolute",
    top: "27%",
    width: "100%",
  },
  topContextMenuContainer: {
    padding: "2rem",
  },
  topContextMenuText: {
    color: "#9CADC8",
  },
  leftContainerHeading: {
    marginTop: "2.5rem",
    color: "white",
    fontSize: "2rem",
  },
  bgImage: {
    zIndex: -1,
    position: "relative",
    widgth: "100%",
  },
  largeBtn: {
    width: "170px",
    margin: "0 12px 0 12px",
    paddingTop: "16px",
    paddingBottom: "16px",
  },
  registerBtn: {
    backgroundColor: "#ffffff",
    marginLeft: "1.5rem",
    color: "#3A8DFF",
  },
  loginBtn: {

  },
  welcomeBackText: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginRight: "auto",
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container className={classes.root}>
      <Box
        item
        sx={{ display: { xs: "none", md: "block" } }}
        md={4}
        className={classes.leftContainer}
      >
        <Box className={classes.leftTextContainer} sx={{ textAlign: "center" }}>
          <img src={bubble} alt="Chat Bubble" />
          <Typography className={classes.leftContainerHeading}>
            Converse with anyone <br />
            with any language
          </Typography>
        </Box>
        <img src={bgImage} className={classes.bgImage} alt="Login Background" />
      </Box>

      <Box
        item
        xs={12}
        md={8}
        className={classes.rightContainer}
        justifyContent="center"
        container
      >
        <Grid
          container
          justifyContent="flex-end"
          alignItems="center"
          className={classes.topContextMenuContainer}
        >
          <Typography className={classes.topContextMenuText}>
            Don't have an account?
          </Typography>
          <Button
            onClick={() => history.push("/register")}
            variant="contained"
            className={`${classes.registerBtn} ${classes.largeBtn}`}
          >
            Create account
          </Button>
        </Grid>

        <form onSubmit={handleLogin}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            className={classes.loginFormContainer}
          >
            <Typography item className={classes.welcomeBackText}>
              Welcome Back!
            </Typography>
            <TextField
              aria-label="username"
              label="Username"
              name="username"
              type="text"
              variant="standard"
              margin="normal"
              required
              fullWidth
            />

            <TextField
              label="Password"
              aria-label="password"
              type="password"
              name="password"
              variant="standard"
              margin="normal"
              required
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              className={`${classes.loginBtn} ${classes.largeBtn}`}
            >
              Login
            </Button>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
