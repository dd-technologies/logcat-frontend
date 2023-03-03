import React, { useEffect, useState } from 'react';
import {
  faDatabase,
} from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col} from 'react-bootstrap';
import Style from '../../css/device.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import LogICon from '../../assets/icons/log.png';
import AlarmIcon from '../../assets/images/AlarmIcon.png';
import TableCard from '../../container/TableCard';
import { getDeviceEventsById } from '../../store/action/DeviceAction';
import { Navbar } from '../../utils/NavBar';
import SideBar from '../../utils/Sidebar';
import { ThemeContext } from '../../utils/ThemeContext';
import Events from './components/table/Events';
import Logs from './components/table/Logs';
import Alarms from './components/table/Alarms';

export default function DeviceLogs(props){
    const {theme} = React.useContext(ThemeContext);
  
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');
    console.log('code',code)
    const projectName = urlParams.get('name');
    console.log(projectName)
    const did = urlParams.get('DeviceId')
    console.log('did',did);
    

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
  link3:{
    iconName:faDatabase,
    linkName:"Alarms"
  },
  link4:{
    iconName:faDatabase,
    linkName:"Events"
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
useEffect(()=>{
  dispatch(
    getDeviceEventsById(
      code,
    )
  );
},([]))
  const[activeTab,setActiveTab]=useState(0);
 const handleTabClick = (tabIndex) => {
  setActiveTab(tabIndex);
};
const item = localStorage.getItem('Status');
console.log('first',item)

    return(
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
        <h1>Device Logs</h1>
        <Container style={{marginTop:'0px'}}>
        <h6 style={{paddingLeft:"5px",paddingTop:"200px",color:"black"}}>Active DeviceId:{did}</h6>
        <h6 style={{paddingLeft:"5px",color:"black"}}>Status:{item}</h6>
        <Row className='mt-0'>
          <Col>
          <TableCard borderRadius="10px">
            <>
            <section className={`${Style.Tabs} `}>
            <button onClick={() => handleTabClick(0)} style={{marginLeft:"2px",marginRight:"15px",border:'none'}}>Events /</button>
            <button onClick={() => handleTabClick(1)} style={{marginRight:"15px",border:'none'}}>Alarms /</button>
            <button onClick={() => handleTabClick(2)} style={{marginRight:"12px",border:'none'}}>Logs</button>
            </section>

            <section className={`${Style.tableHeader}`}>
               {activeTab === 0 && <Events/>} 
               {activeTab === 1 && < Alarms/>}
               {activeTab === 2 && <Logs/>}
            </section>
            </>
          </TableCard>
          </Col>
        </Row>
      </Container>
      </Col>
      </Row>
      </div>

    )
}  