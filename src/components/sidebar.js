import React from "react";
import { connect } from "react-redux";
import { removeCourse } from "../store/actions/ChosenActions";
import { toast } from "react-toastify";

import {TransitionButton} from "concept-ui";
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16"><path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/></svg>;
const copyIcon=()=><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-copy" viewBox="0 0 16 16"><path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/></svg>
const Sidebar = ({ addedCoursesList,removeCourse,setShowSideBar }) => {
 
  const copyCrn=(crn)=> {
    navigator.clipboard.writeText(crn);
    toast.success(`${crn} copied to clipboard`);
  }
  
  
  return (
  <div id="crn" className="sidebar">
  <div className="closebtn" id="closeSidebar">

  <TransitionButton type="spin" className="closebtn" onClick={()=>setShowSideBar(false)} color="#818181" hoverColor="#60daaa" style={{boxShadow:"none",width:"2em",height:"2em",margin:0,padding:0}} >X</TransitionButton>
  </div>
    <h2>SideBar</h2>
    <ul>
      {addedCoursesList?.map((e, key) => 
        <li key={key}
        style={{display:"flex",justifyContent:"space-between"}}
        >
      <ol className="sidebar-inner">
         <li>{e.instructor}</li>
         <li>{ e.subject+" "+e.courseNumber}</li> 
         <li style={{fontSize:"12px",paddingTop:0}}>crn: {e.crn}</li> 
        
         </ol>
          <button className="copy"  onClick={() => {copyCrn(e.crn)
          }}>
           {copyIcon()}
          </button>
        <button  
        className="remove"  onClick={() => {
            removeCourse(e);
          }}>
           {TrashIcon()}
          </button>
        </li>
      )}
    </ul>
  </div>)};

const
mapStateToProps = (state) => {
  return {
    addedCoursesList: state.chosenReducer.data
  };
};
const 
mapDispatchToProps = (dispatch) => {
  return {

    removeCourse: (course) => dispatch(removeCourse(course))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);