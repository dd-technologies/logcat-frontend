import React from 'react'
import { Navbar } from '../../utils/NavBar'
import SideBar from '../../utils/Sidebar'
import back from "../../assets/images/back.png";
import { Link } from "react-router-dom";
import { getAboutSectionById } from '../../../src/store/action/DeviceAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function About() {
  const getAllAboutByDeviceIdReducer = useSelector((state)=>state.getAllAboutByDeviceIdReducer);
  const {data} = getAllAboutByDeviceIdReducer;
  console.log('getAllAboutByDeviceIdReducer',getAllAboutByDeviceIdReducer)
// console.log("data",JSON.stringify(data))
  const aboutFilter = data && data.data
  // console.log(alarmsFilter)

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const did = urlParams.get('DeviceId')
  const projectName = urlParams.get('projectName');
  const code = urlParams.get('code');
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(
      getAboutSectionById(
      code,
      )
    )
  },([]))
  return (
    <>
    <Navbar/>
    <SideBar/>
    <div
        className="main-overview"
        style={{ position: "absolute", top: "5rem", left: "8rem" ,width:"40%"}}
      >
        <div
          className="inside-overview"
          style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        >
            {/* Heading  */}
          <div
            className=""
            style={{ display: "flex", alignItems: "center", gap: "1rem", color:"#707070"}}
          >
            <Link  to={`/deviceOverview?code=${code}&projectName=${projectName}&DeviceId=${did}`}>
              <img src={back}style={{width:"4rem"}}/>
            </Link>
            <h4>About</h4>
          </div>
          {/* Details */}
          <div className="container" style={{display:"flex",flexDirection:"row",gap:"8rem",background: "#FFFFFF 0% 0% no-repeat padding-box",boxShadow: "0px 0px 50px #00000029", borderRadius:"15px",padding: "2rem", marginLeft:"0px"}}>
            <div className="d-flex" style={{gap:"1.5rem",flexDirection:"column",color:"#4B4B4B"}}>
                <h5 style={{fontSize:"1rem"}}>Product</h5>
                <h5 style={{fontSize:"1rem"}}>Model</h5>
                <h5 style={{fontSize:"1rem"}}>Delivery Date</h5>
                <h5 style={{fontSize:"1rem"}}>Batch No.</h5>
                <h5 style={{fontSize:"1rem"}}>Date of Warranty</h5>
                <h5 style={{fontSize:"1rem"}}>Last Service</h5>
            </div>
            <div className="d-flex" style={{gap:"1.5rem",flexDirection:"column",textAlign:"center",color:"#4B4B4B"}}>
            {aboutFilter && aboutFilter.map((item,_id)=>{
              return(
              <>
                <h5 style={{fontSize:"1rem"}}>{!item.product?<h5>----</h5>:item.product}</h5>
                <h5 style={{fontSize:"1rem"}}>{!item.model?"----":item.model}</h5> 
                <h5 style={{fontSize:"1rem"}}>{!item.delivery_date?"----":item.delivery_date}</h5>
                <h5 style={{fontSize:"1rem"}}>{!item.batch_no?"----":item.batch_no}</h5>
                <h5 style={{fontSize:"1rem"}}>{!item.date_of_warranty?"----":item.date_of_warranty}</h5>
                <h5 style={{fontSize:"1rem"}}>{!item.last_service?"----":item.last_service}</h5>
                </>
              )
              })}
               
            </div>
          </div>
          </div>
          </div>
    </>
  )
}

export default About