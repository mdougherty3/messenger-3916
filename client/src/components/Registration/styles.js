import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
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
  leftTextContainer: {
    position: "absolute",
    top: "27%",
    width: "100%",
  },
  topContextMenuContainer: {
    padding: theme.spacing(4),
  },
  leftContainerHeading: {
    marginTop: theme.spacing(5),
    color: "#FFF",
  },
  bgImage: {
    zIndex: -1,
    position: "relative",
    widgth: "100%",
  },
  largeBtn: {
    width: "170px",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  registerBtn: {
    backgroundColor: "#FFF",
    marginLeft: theme.spacing(3),
    color: theme.palette.primary.main,
  },
  loginFormContainer: {
    position: "absolute",
    top: "24%",
    maxWidth: "400px",
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    left: "50%",
    transform: "translate(-50%)",
  },
  loginBtn: {
    marginTop: theme.spacing(5),
  },
  formHeading: {
    fontWeight: "bold",
    marginRight: "auto",
    marginBottom: theme.spacing(2),
  },
  forgotPassLink: {
    fontWeight: "bold",
  },
}));
