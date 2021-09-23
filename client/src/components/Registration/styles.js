import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
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
    padding: "2rem",
  },
  topContextMenuText: {
    color: "#9CADC8",
    fontSize: "0.9rem",
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
    paddingTop: "16px",
    paddingBottom: "16px",
  },
  registerBtn: {
    backgroundColor: "#ffffff",
    marginLeft: "1.5rem",
    color: "#3A8DFF",
  },
  loginFormContainer: {
    position: "absolute",
    top: "24%",
    maxWidth: "400px",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    left: "50%",
    transform: "translate(-50%)",
  },
  loginBtn: {
    marginTop: "2.5rem",
  },
  formHeading: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginRight: "auto",
    marginBottom: "1rem",
  },
  forgotPassLink: {
    fontSize: "0.8rem",
    fontWeight: "bold",
  },
}));
