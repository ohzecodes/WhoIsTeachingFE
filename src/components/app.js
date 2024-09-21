import Search from "./search";
import Header from "./header";

import SideBar from "./sidebar";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
 const [showSideBar,setShowSideBar]= useState(true);

  return (
    <>
      <Header setShowSideBar={setShowSideBar} />
      {(showSideBar)&& <SideBar setShowSideBar={setShowSideBar}  />}
      <section style={{ display: "flex", height: "70vh" }}>
        <Search />
       
      </section>
   
      <footer>
        <h3 className="whitetext">
          @ {"  "}
          <a className="whitetext" href="https://github.com/ohzecodes">
            Ohzecodes
          </a>
        </h3>
      </footer>
      <ToastContainer />
    </>
  );
};

export default App;

