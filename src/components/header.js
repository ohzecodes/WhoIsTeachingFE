
import React from "react";
import logo from "../assets/logo.png"
import { connect } from "react-redux";

const toTitleCase=(str)=>  str?.charAt(0)?.toUpperCase() + str?.substring(1).toLowerCase();

function Header({ lastfetch, semester }) {
  return (
    <header>
      <img src={logo} alt="logo" height="100" />
      <div id="fetch">
        <p>Fetched on:</p>
       {  Object.entries(lastfetch||{}).map(([key, value]) => (

          <p key={key}>{key?.split("_")[0]}: {value.split(".")[0]+" "+value?.match(/[a-zA-Z]/g).join("")}</p>
       ))}
      </div>
      <p id="fetch1">
        Semester:{" " + toTitleCase(semester)}
      </p>
    </header>
  );
}

const 
mapStateToProps = (state) => {
  return {
    lastfetch: state.ProfReducer.data.fetch,
    semester:state.ProfReducer.data.semester
  };
};
export default connect(mapStateToProps)(Header);