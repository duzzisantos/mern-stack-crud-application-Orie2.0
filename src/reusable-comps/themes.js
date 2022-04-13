import React from "react";
import { useContext } from "react";
import "../App.css";
import { Link } from "react-router-dom";

//Four important factors: 
//themes, themecontexts, react component, themecontext provider(as toolbar)

const themes = {
  red: {
    color: "whitesmoke",
    background: "#dc3545",
    width: "calc(450px / 2)",
    border: "none",
    padding: "4px",
    height: "100%",
  },
  dark: {
    color: "whitesmoke",
    background: "rgb(99,34,34)",
    width: "calc(450px / 2)",
    border: "none",
    padding: "4px",
    height: "100%",
  },
};

const ThemeContext1 = React.createContext(themes.dark);
const ThemeContext2 = React.createContext(themes.red);

export const ToolBar1 = (props) => {
  return (
    <>
      <ThemeContext1.Provider value={themes.dark}>
        <ThemedButton1 />
      </ThemeContext1.Provider>
    </>
  );
};

export const ToolBar2 = (props) => {
  return (
    <>
      <ThemeContext2.Provider value={themes.red}>
        <ThemedButton2 />
      </ThemeContext2.Provider>
    </>
  );
};
const ThemedButton1 = () => {
  const theme = useContext(ThemeContext1);
  return (
    <>
      <button
        id="users-link-btn1"
        style={{
          color: theme.color,
          background: theme.background,
          width: theme.width,
          border: theme.border,
          padding: theme.padding,
          height: themes.height,
        }}
        type="button"
      >
        <Link to="account" className="link">
          Sign Up
        </Link>
      </button>
    </>
  );
};

const ThemedButton2 = () => {
  const theme = useContext(ThemeContext2);
  return (
    <>
      <button
        id="users-link-btn2"
        style={{
          color: theme.color,
          background: theme.background,
          width: theme.width,
          border: theme.border,
          padding: theme.padding,
          height: themes.height,
        }}
        type="button"
      >
        <Link to="login" className="link">
          Login
        </Link>
      </button>
    </>
  );
};
