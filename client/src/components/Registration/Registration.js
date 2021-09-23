import React from "react";
import { connect } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { Grid, Box, Typography, Button } from "@material-ui/core";
import bgImage from "../../assets/images/bg-img.png";
import bubble from "../../assets/images/bubble.svg";
import { Form } from "./index";
import useSharedClasses from "./styles";

const Registration = (props) => {
  const { signupPage, user } = props;

  const classes = useSharedClasses();
  const history = useHistory();

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container className={classes.root}>
      <Box
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

      <Box xs={12} md={8} className={classes.rightContainer}>
        <Grid
          container
          justifyContent="flex-end"
          alignItems="center"
          className={classes.topContextMenuContainer}
        >
          {(signupPage && (
            <>
              <Typography className={classes.topContextMenuText}>
                Already have an account?
              </Typography>
              <Button
                onClick={() => history.push("/login")}
                variant="contained"
                className={`${classes.registerBtn} ${classes.largeBtn}`}
              >
                Login
              </Button>
            </>
          )) || (
            <>
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
            </>
          )}
        </Grid>

        <Form signupPage={signupPage} />
      </Box>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(Registration);
