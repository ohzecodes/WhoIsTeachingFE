import { Typography } from "@mui/material";

import { useEffect, useState } from "react";
import React from "react";
import Prof from "./prof";
import SideBar from "./sidebar";


import { fetchData } from "../store/actions/ProfActions";
import { connect } from "react-redux";

const SearchIcon = () =>  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16" ><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" /></svg>

const isEqualName = (str1, str2) => 
   str1.toUpperCase().trim() === str2.toUpperCase().trim();


const Search = (props) => {
  const [list, SetList] = useState([]);
  useEffect(() => {
    props.fetchData();
  }, []);

  const handleBlur = (event) => {
    SetList([]);
    if (event.target.value.length === 0) return;
    const firstLetter = event.target.value[0].toUpperCase();
    const index = firstLetter.charCodeAt(0) - "A".charCodeAt(0);

    const filter = props?.data[index]?.filter((val) => {
      const str1 = val?.subject;
      const str2 = event.target.value;
      return isEqualName(str1, str2);
    });
    SetList([...filter]);
  };

  const boxHieght = list.length >= 1 ? "500px" : "unset";

  return (
    <main>
      <div id="Searchbox">
        {SearchIcon()}
        <input
          placeholder="Search by CourseName...[CPSC]"
          type="text"
          onBlur={handleBlur}
          onKeyDown={(e) => (e.key === "Enter" ? handleBlur(e) : null)}
        />
      </div>
      <div id="results" style={{ height: boxHieght }}>
        {list?.map((x, k) => (
          <Prof obj={x} key={k} />
        ))}
      </div>
    </main>
  );
};


const mapStateToProps = (state) => ({ data: state.ProfReducer.data.items });


const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
