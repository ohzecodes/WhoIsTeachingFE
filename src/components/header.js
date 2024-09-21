
import React from "react";
import logo from "../assets/logo.png"
import { connect } from "react-redux";
import {TransitionButton} from "concept-ui";
const toTitleCase=(str)=>  str?.charAt(0)?.toUpperCase() + str?.substring(1).toLowerCase();

const HambugerIcon=()=>(
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
</svg>
)

const FetchInfo=({lastfetch,semester})=>{


  return<>
       <table id="fetch">
       <thead  >
       <tr>
       <th colspan={2} >
       Fetched on
       </th>
       </tr>
        </thead>
       <tbody>
      {  Object.entries(lastfetch||{}).map(([key, value]) => 
      {   
        if (key.includes("taken")) return null; 
      
       return  <tr key={key}><th>{key.split("_")[0]}</th> 
         <td>{value?.toString().replace(/\.[0-9]+/, " ")}</td></tr>
     
      })}
      <tr ><th> Semester</th> <td> {toTitleCase(semester)}</td></tr>
      </tbody>
      </table></>
      }
     


const Header=({ lastfetch, semester,setShowSideBar }) => (
    <header style={{justifyContent:"space-between"}}>
    <section style={{display:"flex"}}>
      <img src={logo} alt="logo" height="100" />
      <FetchInfo semester={semester} lastfetch={lastfetch}/>
      </section>
          <TransitionButton
      type="draw"
       color="white"
  hoverColor="#60daaa"
  style={{
    padding: "20px",
    height: "fit-content",
}}
      onClick={()=>setShowSideBar(true)}
>
{HambugerIcon()}
</TransitionButton>
      
    </header>
  );


const 
mapStateToProps = (state) => {
  return {
    lastfetch: state.ProfReducer.data.fetch,
    semester:state.ProfReducer.data.semester
  };
};
export default connect(mapStateToProps)(Header);