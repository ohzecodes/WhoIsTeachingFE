import React from "react";
import { Rating } from "@mui/material";
import { connect } from "react-redux";
import { addCourse, removeCourse } from "../store/actions/ChosenActions";
import {TimeRange} from "./timerange.ts";
import { toast } from "react-toastify";

const dayformat = (day) =>  day.replaceAll("-", "").split("").toString();

const Prof=(props)=> {
  const { quality_rating:rating, instructor:inst,num_ratings:totalRating,tid,seatsAvailable:seats,waitlist:waitList, } = props.obj;
  const course = props.obj.subject+props.obj.courseNumber;

  const {days,time} = props.obj;
  const {ranges} = props; 


  const handleADD=()=>{
    const tr= createTimeRange(days,time);
    console.log("ranges",ranges)
    console.log("tr",tr)
    const timeconf = ranges.filter((e) => e.overlapArray(tr));
    console.log(timeconf)
    if (timeconf?.length>0){
     toast.error("Time Conflict");

      return;
    }

    props.addCourse(props.obj)
  }

  return (
    <div className="prof">
      <div
        style={{ flexBasis: 0, marginRight: "40px" }}
        
        
        
        
        
      >
        <ul>
          <li>
            <Rating
              name="read-only"
              value={Number(rating)}
              readOnly
              precision={0.5}
              className="rating"
            />
          </li>
          <li>
            {" "}
            <p component="legend">
              Rating:
              {rating != null ? rating : "N/A"}
            </p>
            <p component="legend">
              Based on:{" "}
              {rating != null ? totalRating : "N/A"}
            </p>
          </li>
        </ul>
      </div>

      <div >
        <h2>{inst}</h2>
        <div style={{ display: "flex" }}>
          <ul className="r">
            <li>Subject: {course}</li>
            <li>CRN:{props.obj.crn}</li>
            <li>
              <p component="legend">
                Seats Available:
                {seats}
              </p>
            </li>
            {waitList&&
            <li>
              <p component="legend">
                waitList:{" "}
                {waitList}
              </p>
            </li>}
          
          </ul>
       
                    <ol id="days" style={{ width: "fit-content", marginRight: "10px" }}>
            {days.map((e, key)=>(<li key={key }>{dayformat(e)}</li>))}
          </ol>
          <ol id="time">{time.map((e, key)=>(<li key={key }>{(e)}</li>))}</ol> 
        </div>
  
        </div>
       

        <button className="addButton" onClick={()=>handleADD()}>ADD</button>
    </div>
  );
}


const createTimeRange=(days,time)=>{
 const  tr = [];
  for (let i = 0; i < days.length; i++) {
    let start = time[i].split("-")[0];
    let end = time[i].split("-")[1];

    days[i]
      .split("-")
      .forEach((e) => {
        e.split("").forEach((e) => {
        tr.push(new TimeRange(e, start, end))
      });
      });
   
  }
  
  return tr;
}
const mapStateToProps = (state) => {
 const ranges= state?.chosenReducer?.data.flatMap((e) => e.tr)
  return {
    ranges,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addCourse: (course) => {
      const tr = createTimeRange(course.days,course.time)  
      dispatch(addCourse({tr,...course}))},

  };
}
export default connect (mapStateToProps,mapDispatchToProps)(Prof);
