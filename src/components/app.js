import Search from "./search";
import Header from "./header";

import SideBar from "./sidebar";
import React from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Header />
      <section style={{ display: "flex", height: "70vh" }}>
        <Search />
        <SideBar />
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

