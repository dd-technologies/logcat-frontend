import React, { useEffect, useState } from 'react';
import {
  faDatabase,
} from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from 'react-bootstrap';
import Style from '../../css/device.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

export default function DeviceLogs(props) {
  const { theme } = React.useContext(ThemeContext);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('code');
  console.log('code', code)
  const projectName = urlParams.get('projectName');
  console.log(projectName)
  const did = urlParams.get('DeviceId')
  console.log('did', did);

  // const getRegisteredDetailsReducer = useSelector((state)=>state.getRegisteredDetailsReducer);
  // const {data12} = getRegisteredDetailsReducer;
  // console.log('first',data12)



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
  const [eventsbtn, setEventsbtn] = useState("btn text-white")
  const [alarmsbtn, setAlarmsbtn] = useState()
  const [logsbtn, setLogsbtn] = useState()
  const [trendsbtn, setTrendsbtn] = useState()
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
    if (tabIndex == 0) {
      setEventsbtn("btn text-white")
    }
    else {
      setEventsbtn("btn-light")
    }
    if (tabIndex == 1) {
      setAlarmsbtn('btn text-white')
    }
    else {
      setAlarmsbtn('btn-light')
    }
    if (tabIndex == 2) {
      setLogsbtn('btn text-white')
    }
    else {
      setLogsbtn('btn-light')
    }
    if (tabIndex == 3) {
      setTrendsbtn('btn text-white')
    }
    else {
      setTrendsbtn('btn-light')
    }
  };
  const item = localStorage.getItem('Status');
  console.log('first', item)
  // const alias = (JSON.parse(localStorage.getItem('AliasName')))
  // alert("alias",JSON.parse(alias))
  return (
    <div>
      <Row className='rowSection'>
        <Col xl={2} lg={2} md={2} sm={2} className='noSidebar colSection'>
          <SideBar
            sidebar_details={sidebar_details}
            className={Style.SideBarColume}
          />
        </Col>
        <Col
          xl={10}
          lg={10}
          md={10}
          sm={10}
          className={`${Style.NavbarColumn} colSection`}
        >
          <Navbar navigation_details={navigation_details} />
          <div className='container' style={{ marginTop: "5rem" }}>
            <div className='d-flex' style={{ gap: "10px" }}>
              {/* <div><h6 style={{ fontSize: "1.5rem", paddingLeft: "5px", paddingTop: "2rem", color: "#21969d", paddingBottom: "20px" }}>Alias Name :{JSON.parse(localStorage.getItem('AliasName'))}</h6></div> */}
              <div class="shadow p-3 mb-2 " style={{ width: "14rem", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.5)" }}>
                <div class="card-header">
                  Alias Name
                </div>
                <div style={{ padding: "0.8rem 0rem 0rem 0rem" }}>
                  {JSON.parse(localStorage.getItem('AliasName'))}
                </div>
              </div>
              <div class="shadow p-3 mb-2 " style={{ width: "14rem", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.5)" }}>
                <div class="card-header">
                  Hospital Name
                </div>
                <div style={{ padding: "0.8rem 0rem 0rem 0rem" }}>
                  {JSON.parse(localStorage.getItem('Hospital_Name'))}
                </div>
              </div>
              <div class="shadow p-3 mb-2 " style={{ width: "14rem", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.5)" }}>
                <div class="card-header">
                  Doctor Name
                </div>
                <div style={{ padding: "0.8rem 0rem 0rem 0rem" }}>
                  {JSON.parse(localStorage.getItem('Doctor_Name'))}
                </div>
              </div>
              <div class="shadow p-3 mb-2 " style={{ width: "14rem", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.5)" }}>
                <div class="card-header">
                Ward Number
                </div>
                <div style={{ padding: "0.8rem 0rem 0rem 0rem" }}>
                  {JSON.parse(localStorage.getItem('Ward_No'))}
                </div>
              </div>
              <div class="shadow p-3 mb-2 " style={{ width: "14rem", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.5)" }}>
                <div class="card-header">
                IMEI Number
                </div>
                <div style={{ padding: "0.8rem 0rem 0rem 0rem" }}>
                  {JSON.parse(localStorage.getItem('IMEI_NO'))}
                </div>
              </div>
              <div class="shadow p-3 mb-2 " style={{ width: "14rem", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.5)" }}>
               
                <div class="card-header">
                Ventilator Operator
                </div>
                <div style={{ padding: "0.8rem 0rem 0rem 0rem" }}>
                  {JSON.parse(localStorage.getItem('Ventilator_Operator'))}
                </div>
              </div>
            </div>
            <Row className='mt-3'>
              <Col>
                <TableCard1 borderRadius="10px" style={{ boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)" }}>
                  <>
                    <section className={`${Style.Tabs} `}>
                      <button className={eventsbtn} onClick={() => handleTabClick(0)} style={{ border: 'none', padding: "6px" }} defaultChecked>Events</button>
                      <button className={alarmsbtn} onClick={() => handleTabClick(1)} style={{ padding: "6px", border: 'none' }}>Alarms</button>
                      <button className={logsbtn} onClick={() => handleTabClick(2)} style={{ padding: "6px", border: 'none' }}>Logs</button>
                      <button className={trendsbtn} onClick={() => handleTabClick(3)} style={{ padding: "6px", border: 'none' }}>Trends</button>
                    </section>

                    <section className={`${Style.tableHeader}`}>
                      {activeTab === 0 && <Events />}
                      {activeTab === 1 && < Alarms />}
                      {activeTab === 2 && <Logs />}
                      {activeTab === 3 && <Trends />}
                    </section>
                  </>
                </TableCard1>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>

  )
}  