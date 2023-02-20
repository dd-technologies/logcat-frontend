import React, { useRef, useEffect, useReducer, useMemo, useState } from 'react';
import {
  faCaretDown,
  faDatabase,
  faDownload,
  faSortDown,
  faSortUp,
} from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from "react-router-dom";
import { Container, Row, Col,Button} from 'react-bootstrap';
import Style from '../../css/device.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import LogICon from '../../assets/icons/log.png';
import AlarmIcon from '../../assets/images/AlarmIcon.png';
import SpinnerCustom from '../../container/SpinnerCustom';
import TableCard from '../../container/TableCard';
import { deviceAction } from '../../store/action/DeviceAction';
import { Navbar } from '../../utils/NavBar';
import SideBar from '../../utils/Sidebar';
import { ThemeContext } from '../../utils/ThemeContext';
import { deviceDataReducer } from './store/Reducer';
import EditDetailsModal from './model/EditDetailsModal';
import {
  ALL_ROW_SELECTED,
  DATE_DROPDOWN,
  DIFF_DATE,
  SEARCH_FIELD,
  SORT_ICONS,
} from './store/Types';
import Pagination from '../../common/Pagination';

export default function DeviceTable(){
  const {theme} = React.useContext(ThemeContext);

  const getModelCodeReducer = useSelector((state) => state.getModelCodeReducer);
  const { data: projectType } = getModelCodeReducer;
  // console.log('firstget',getModelCodeReducer)

  const deviceReducer = useSelector((state)=>state.deviceReducer);
  const {loading,data} = deviceReducer;
  console.log('deviceReducer',deviceReducer);

  const dispatch = useDispatch();

  const initialState = {
    tableDataState :{},
    disableButton: false,
    dateDropDown: false,
    showTableField: false,

    record: localStorage.getItem('selected_record')
    ? JSON.parse(localStorage.getItem('selected_record'))
    : 25,

    code: localStorage.getItem('project_type')
      ? JSON.parse(localStorage.getItem('project_type')).typeCode
      : projectTypeCode,

    searchField: '',
 /**
     * @objectKey DI: Device Id,
     * @objectKey LOC: Device Location-------------,
     * @objectKey St: Error Type--------------,
     */
    sortIcons: {
      DI: false,
      LOC: false,
      St: false,
    },
    singleRowSelect: false,
    allRowSelect: false,
  };
  console.log(initialState.code);

  const [currentStateDevices,dispatchDeviceData] = useReducer(
    deviceDataReducer,
    initialState
  );

  const [currentPage,setCurrentPage] = useState(1); //current page set to 1
  const[isCheckAll,setIsCheckAll] = useState(false);
  const[isCheck,setIsCheck] = useState([]);
  const [checkedLogs,setCheckedLogs] = useState([]);
  const [modalShow,setModalShow] = useState(false);
  const [modalData,setModalData] = useState(null);

  const handleSelectAll = (e) =>{
    setIsCheckAll(!isCheckAll);
    setIsCheck(data?.data?.data.map((data)=>data._id));
    setCheckedLogs(data?.data?.data);
    if(isCheckAll){
      setIsCheck([]);
      setCheckedLogs([]);
    }
  };

  const handleClick = e => {
    const { id, checked, name } = e.target;
    setIsCheck([...isCheck, id]);
    setCheckedLogs([...checkedLogs, JSON.parse(name)]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
      setCheckedLogs(
        checkedLogs.filter((item) => {
          return item._id !== id;
        })
      );
    }
  };

  // useMemo(()=>{
  //   const firstPageIndex = (currentPage - 1) * currentStateDevices.record;
  //   const lastPageIndex = firstPageIndex + currentStateDevices.record;
  //   return(
  //     data && data.data && data.data.data.slice(firstPageIndex,lastPageIndex)
  //   );
  // },[currentPage]);
  

  const ref = useRef();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('code');
  console.log('code',code)
  const projectName = urlParams.get('name');
  const projectTypeCode = urlParams.get('projectType');
  console.log('projectTypeCode',projectTypeCode)

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
    // link4:{
    //   iconName:faDatabase,
    //   linkName:"Events"
    // }
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
    // link4: {
    //   iconName: `/assets/images/AlarmIcon.png`,
    //   linkName: "Events",
    //   link: `/events?code=${code}&name=${projectName}`, //to do   
    // },
  };

  let deviceFilter = data && data.data && data.data.data;
  console.log('df',deviceFilter)

  useEffect(()=>{
    dispatch(
      deviceAction(
        code,
        currentStateDevices.projectCode
      )
    );
  },([dispatch,currentStateDevices.projectCode]))

  return(
    <div>
      
    </div>
  )
}