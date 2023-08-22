import React, { useEffect, useState } from 'react';
import {
  faDatabase,
} from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from 'react-bootstrap';
import Style from '../../css/device.module.css';
import { useDispatch, useSelector } from 'react-redux';
import LogICon from '../../assets/icons/log.png';
import AlarmIcon from '../../assets/images/AlarmIcon.png';
import TableCard1 from '../../container/TableCard1';
import { getDeviceEventsById } from '../../store/action/DeviceAction';
import { Navbar } from '../../utils/NavBar';
import SideBar from '../../utils/Sidebar';
import { ThemeContext } from '../../utils/ThemeContext';
import Events from './components/table/Events';
import Logs from './components/table/Logs';
import Alarms from './components/table/Alarms';
import Trends from './components/table/Trends';
import back from "../../assets/images/back.png"
import { Link } from 'react-router-dom';
import Calibration from "../device/components/table/Calibration"
// import download from "../../assets/images/download.png"

export default function DeviceLogs() {
  const { theme } = React.useContext(ThemeContext);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('code');
  // console.log('code', code)
  const projectName = urlParams.get('projectName');
  // console.log(projectName)
  const did = urlParams.get('DeviceId')
  //Navigation bar ==================================
  const navigation_details = {
    name: projectName,
    dashName: projectName,
    link1: {
      iconName: faDatabase,
      linkName: 'Logs',
      link: `/log_table?code=${code}&name=${projectName}`,
    },
    link2: {
      iconName: faDatabase,
      linkName: 'Settings',
    },
    link3: {
      iconName: faDatabase,
      linkName: "Alarms"
    },
    link4: {
      iconName: faDatabase,
      linkName: "Events"
    }
  };

  const sidebar_details = {
    name: projectName,
    dashName: projectName,
    link1: {
      iconName: LogICon,
      linkName: 'Logs',
      link: `/log_table?code=${code}&name=${projectName}`,
    },
    link2: {
      iconName: AlarmIcon,
      linkName: 'Settings',
      link: `/settings?code=${code}&name=${projectName}`,
    },
    link3: {
      iconName: AlarmIcon,
      linkName: 'alarm',
      link: `/alarm?code=${code}&name=${projectName}`,
    },
    link4: {
      iconName: `/assets/images/AlarmIcon.png`,
      linkName: "Events",
      link: `/events?code=${code}&name=${projectName}`, //to do   
    },
  };
  // localStorage.getItem('Status')
  // console.log('item',localStorage.Status)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getDeviceEventsById(
        code,
      )
    );
  }, ([]))
  const [eventsbtn, setEventsbtn] = useState("btn text-black")
  const [alarmsbtn, setAlarmsbtn] = useState()
  const [logsbtn, setLogsbtn] = useState()
  const [trendsbtn, setTrendsbtn] = useState()
  const [calibrationbtn, setCaliberationbtn] = useState()
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
    if (tabIndex == 0) {
      setEventsbtn("btn text-black")
    }
    else {
      setEventsbtn("btn-light")
    }
    if (tabIndex == 1) {
      setAlarmsbtn('btn text-black')
    }
    else {
      setAlarmsbtn('btn-light')
    }
    if (tabIndex == 2) {
      setLogsbtn('btn text-black')
    }
    else {
      setLogsbtn('btn-light')
    }
    if (tabIndex == 3) {
      setTrendsbtn('btn text-black')
    }
    else {
      setTrendsbtn('btn-light')
    }
    if (tabIndex == 4) {
      setCaliberationbtn('btn text-black')
    }
    else {
      setCaliberationbtn('btn-light')
    }
  };
  const item = localStorage.getItem('Status');
  // console.log('first', item)
  // const alias = (JSON.parse(localStorage.getItem('AliasName')))
  // alert("alias",JSON.parse(alias))
  const goBack=()=>{
    window.history.go(-1)
  }
  return (
    <div>
      <Navbar/>
      <Row className='rowSection'>
        <Col xl={2} lg={2} md={2} sm={2} className='noSidebar colSection'>
          <SideBar
            sidebar_details={sidebar_details}
            className={Style.SideBarColume}
          />
        </Col>
        <div
          xl={10}
          lg={10}
          md={10}
          sm={10}
          className={`${Style.NavbarColumn} colSection`}
        >
          <div className='d-flex rohan' style={{justifyContent:"center"}}>
          <div style={{ margin: "3rem",width:"90%",left:"4%", position:"absolute", top:"2rem"}}>
            <div className='d-flex' style={{ gap: "10px" }}>
              <div class="d-flex" style={{ width: "4rem" }}>
                <div class="card-header" style={{display:"flex",alignItems:"center"}}>
                  <Link onClick={goBack}>
                  <img src={back}style={{width:"4rem"}}/>
                  </Link>
                </div>
              </div>
              <div class="shadow p-3 mb-2 " style={{ width: "12rem", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.5)" }}>
                <div class="card-header">
                  Status
                </div>
                <div style={{ padding: "0.8rem 0rem 0rem 0rem" }}>
                {JSON.parse(localStorage.getItem('message'))}
                </div>
              </div>
              <div class="shadow p-3 mb-2 " style={{ width: "12rem", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.5)" }}>
                <div class="card-header">
                  Department
                </div>
                <div style={{ padding: "0.8rem 0rem 0rem 0rem" }}>
                  {JSON.parse(localStorage.getItem('Department_Name'))}
                </div>
              </div>
              <div class="shadow p-3 mb-2 " style={{ width: "12rem", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.5)" }}>
                <div class="card-header">
                  Hospital Name
                </div>
                <div style={{ padding: "0.8rem 0rem 0rem 0rem" }}>
                  {JSON.parse(localStorage.getItem('Hospital_Name'))}
                </div>
              </div>
              <div class="shadow p-3 mb-2 " style={{ width: "12rem", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.5)" }}>
                <div class="card-header">
                  Doctor
                </div>
                <div style={{ padding: "0.8rem 0rem 0rem 0rem" }}>
                  {JSON.parse(localStorage.getItem('Doctor_Name'))}
                </div>
              </div>
              <div class="shadow p-3 mb-2 " style={{ width: "12rem", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.5)" }}>
                <div class="card-header">
                  Ward Number
                </div>
                <div style={{ padding: "0.8rem 0rem 0rem 0rem" }}>
                  {JSON.parse(localStorage.getItem('Ward_No'))}
                </div>
              </div>
              <div class="shadow p-3 mb-2 " style={{ width: "12rem", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.5)" }}>

                <div class="card-header">
                 Bio-Med
                </div>
                <div style={{ padding: "0.8rem 0rem 0rem 0rem" }}>
                  {JSON.parse(localStorage.getItem('Bio_Med'))}
                </div>
              </div>
            </div>
            <Row className='mt-3'>
              <Col>
                <TableCard1 borderRadius="20px 20px 20px 20px" style={{ boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)" }}>
                  <>
                    <div className={`${Style.Tabs} `}>
                      <div>
                      <button className={eventsbtn} onClick={() => handleTabClick(0)} style={{width:"6rem", border: 'none', padding: "6px" ,color:"#fff"}} defaultChecked>Events</button>
                      <button className={alarmsbtn} onClick={() => handleTabClick(1)} style={{ width:"6rem",padding: "6px", border: 'none' ,color:"#fff"}}>Alarms</button>
                      <button className={logsbtn} onClick={() => handleTabClick(2)} style={{ width:"7rem",padding: "6px", border: 'none' ,color:"#fff"}}>Crash Logs</button>
                      <button className={trendsbtn} onClick={() => handleTabClick(3)} style={{ width:"6rem",padding: "6px", border: 'none' ,color:"#fff"}}>Trends</button>
                      <button className={calibrationbtn} onClick={() => handleTabClick(4)} style={{ width:"7rem",padding: "6px", border: 'none' ,color:"#fff"}}>Calibration</button>
                      </div>
                      {/* <img
                                  src={download}
                                  style={{ width: "2.3rem",height:"2rem" }}
                                /> */}
                    </div>

                    <section className={`${Style.tableHeader}`}>
                      {activeTab === 0 && <Events />}
                      {activeTab === 1 && < Alarms />}
                      {activeTab === 2 && <Logs />}
                      {activeTab === 3 && <Trends />}
                      {activeTab === 4 && <Calibration />}
                    </section>
                  </>
                </TableCard1>
              </Col>
            </Row>
          </div>
          </div>
        </div>
      </Row>
    </div>

  )
}  