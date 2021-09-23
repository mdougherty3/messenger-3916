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
import { login, register } from "../../store/utils/thunkCreators";
import useSharedClasses from "./styles";

const Form = (props) => {
  const classes = useSharedClasses();
  const { login, register, signupPage } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.emailAddress.value;
    const password = event.target.password.value;
    await login({ username, password });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.emailAddress.value;
    const password = event.target.password.value;

    await register({ username, email, password });
  };

  return (
    <form onSubmit={signupPage ? handleRegister : handleLogin}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className={classes.loginFormContainer}
      >
        <Typography className={classes.formHeading}>
          {(signupPage && "Create an account.") || "Welcome Back!"}
        </Typography>

        {signupPage && (
          <TextField
            aria-label="username"
            label="Username"
            name="username"
            type="text"
            margin="normal"
            required
            fullWidth
          />
        )}

        <TextField
          aria-label="emailAddress"
          label="E-mail address"
          name="emailAddress"
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
            endAdornment:
              (!signupPage && (
                <InputAdornment position="end">
                  <Link href="#" className={classes.forgotPassLink}>
                    Forgot?
                  </Link>
                </InputAdornment>
              )) ||
              null,
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          className={`${classes.loginBtn} ${classes.largeBtn}`}
        >
          {(signupPage && "Create") || "Login"}
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(null, mapDispatchToProps)(Form);
