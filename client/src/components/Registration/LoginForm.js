import React from "react";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Link,
} from "@material-ui/core";
import { login } from "../../store/utils/thunkCreators";
import useSharedClasses from "./styles";

const LoginForm = (props) => {
  const classes = useSharedClasses();
  const { login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  return (
    <form onSubmit={handleLogin}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className={classes.loginFormContainer}
      >
        <Typography className={classes.formHeading}>Welcome Back!</Typography>

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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Link href="#" className={classes.forgotPassLink}>
                  Forgot?
                </Link>
              </InputAdornment>
            ),
          }}
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
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(null, mapDispatchToProps)(LoginForm);
