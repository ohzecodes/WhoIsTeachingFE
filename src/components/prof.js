import React from "react";
import { Rating } from "@mui/material";
import { connect } from "react-redux";
import { addCourse, removeCourse } from "../store/actions/ChosenActions";
import { TimeRange,twoTimeRangesOverlap } from "./timerange.ts";
import { toast } from "react-toastify";

const dayformat = (day) => day//.replaceAll("-", "").split("").toString();

const Prof = (props) => {
  const {
    quality_rating: rating,
    instructor: inst,
    num_ratings: totalRating,
    tid,
  
    URL,
    seatsAvailable: seats,
    waitlist: waitList
  } = props.obj;
  console.log();
  const course = props.obj.subject + props.obj.courseNumber;

  const { days, time,type} = props.obj;
  const { ranges } = props;

  const handleADD = () => {
    const tr = createTimeRange(days, time);
    console.log("ranges", ranges);
    console.log("tr", tr);
    const timeconf = twoTimeRangesOverlap( tr, ranges);
    console.log("time conflict",timeconf);

    if (timeconf) {
      toast.error("Time Conflict");
      return;
    }

    props.addCourse(props.obj);
  };
  const FirstName = inst.split(" ")[0];
  let RMP_URL = `https://www.ratemyprofessors.com/search/professors/4018?q=${FirstName}`;

  if (URL!==""){
    RMP_URL=URL;
  }

  return (
    <div className="prof">
      <div style={{ flexBasis: 0, marginRight: "40px" }}>
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
              Based on: {rating != null ? totalRating : "N/A"}
            </p>
            <a href={RMP_URL}>Rate My Prof</a>
          </li>
        </ul>
      </div>

      <div>
        <h2>{inst}</h2>
        <div style={{ display: "flex", width:"unset" }}>
          <ul className="r">
            <li>Subject: {course}</li>
            <li>CRN:{props.obj.crn}</li>
            <li>
              <p component="legend">
                Seats:
                {seats}
              </p>
            </li>
            {waitList && (
              <li>
                <p component="legend">WaitList: {waitList}</p>
              </li>
            )}
          </ul>
          <ol id="type" style={{ width: "fit-content", marginRight: "10px" }}>
            {type.map((e, key) => (
              <li key={key}>{e}</li>
            ))}
          </ol>
          <ol id="days" style={{ width: "fit-content", marginRight: "10px" }}>
            {days.map((e, key) => (
              <li key={key}>{dayformat(e)}</li>
            ))}
          </ol>
          <ol id="time">
            {time.map((e, key) => (
              <li key={key}>{e}</li>
            ))}
          </ol>
        </div>
      </div>

      <button className="addButton" onClick={() => handleADD()}>
        ADD
      </button>
    </div>
  );
};

const createTimeRange = (days, time) => {
  const tr = [];
  for (let i = 0; i < days.length; i++) {
    let start = time[i].split("-")[0];
    let end = time[i].split("-")[1];

    days[i].split("-").forEach((e) => {
      e.split("").forEach((e) => {
        tr.push(new TimeRange(e, start, end));
      });
    });
  }

  return tr;
};
const mapStateToProps = (state) => {
  const ranges = state?.chosenReducer?.data.flatMap((e) => e.tr);
  return {
    ranges
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addCourse: (course) => {
      const tr = createTimeRange(course.days, course.time);
      dispatch(addCourse({ tr, ...course }));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Prof);
