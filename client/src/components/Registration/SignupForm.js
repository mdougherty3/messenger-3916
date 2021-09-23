import React, { useState } from "react";
import { connect } from "react-redux";
import { Grid, Button, TextField, Typography } from "@material-ui/core";
import { register } from "../../store/utils/thunkCreators";
import useSharedClasses from "./styles";

const SignupForm = (props) => {
  const classes = useSharedClasses();

  const { register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  return (
    <form onSubmit={handleRegister}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className={classes.loginFormContainer}
      >
        <Typography className={classes.formHeading}>Create an account.</Typography>
        <TextField
          aria-label="username"
          label="Username"
          name="username"
          type="text"
          margin="normal"
          required
          fullWidth
        />

        <TextField
          label="E-mail address"
          aria-label="e-mail address"
          type="email"
          name="email"
          margin="normal"
          required
          fullWidth
        />

        <TextField
          aria-label="password"
          label="Password"
          type="password"
          inputProps={{ minLength: 6 }}
          error={!!formErrorMessage.confirmPassword}
          helperText={formErrorMessage.confirmPassword}
          name="password"
          margin="normal"
          required
          fullWidth
        />

        <TextField
          label="Confirm Password"
          aria-label="confirm password"
          type="password"
          inputProps={{ minLength: 6 }}
          error={!!formErrorMessage.confirmPassword}
          helperText={formErrorMessage.confirmPassword}
          name="confirmPassword"
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
          Create
        </Button>
      </Grid>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(null, mapDispatchToProps)(SignupForm);
