// // /* eslint-disable */

// // import React from "react";
// // import CustomCard from "../../container/CustomCard";
// // import { Col, Image } from "react-bootstrap";
// // import Style from "../../css/Allprojects.module.css";
// // import { Link } from "react-router-dom";
// // import { ThemeContext } from "../../utils/ThemeContext";
// // import DateIcons from "../../assets/icons/date.png";

// // const allDeviceData = (props) => {
// //   // console.log("props", props);

// //   const { theme } = React.useContext(ThemeContext);
// //   let newDate = props.data.createdAt.split("T")[0];
// //   let year = newDate.split("-")[0];
// //   let month = newDate.split("-")[1];
// //   let day = newDate.split("-")[2];
// //   newDate = `${day}-${month}-${year}`;

// //   return (
// //     <>
// //       <ThemeContext.Consumer> 
// //         {(value) => (
// //           <>
// //             <Col xl={4} lg={4} md={6} sm={6} className="mt-4">
// //               <CustomCard
// //                 padding="15px"
// //                 height="200px"
// //                 boxShadow="0px 0px 3px 1px rgba(192,192,192,0.90)"
// //               >
// //                 <Link
// //                   to={`/registerdevice?code=${props.data.code}&name=${props.data.name
// //                     }&page-name=logpage&projectType=${props.data &&
// //                     props.data.device_types &&
// //                     props.data.device_types[0] &&
// //                     props.data.device_types[0].typeCode
// //                     }`}
// //                   style={{ textDecoration: "none" }}
// //                 >
// //                   <section className={Style.Outer_InfoRow}>
// //                     <section className={Style.InfoColumn}>
// //                       <h5
// //                         className="cpactiveText mb-1"
// //                         style={{ fontWeight: "600" }}
// //                       >
// //                         {props.data.deviceID}
// //                       </h5>
// //                       <p
// //                         className={
// //                           theme == "light-theme" ? null : "darkModeColor"
// //                         }
// //                       >
// //                         {props.data.IMEINo && props.data.IMEINo}
// //                       </p>
// //                     </section>
// //                     <section className={Style.InfoDetails}>
// //                       <Image src={DateIcons} style={{ filter: theme == "light-theme" ? "" : "invert(1)" }} />
// //                       <p
// //                         className="darkModeColor"
// //                         style={{
// //                           opacity: "70%",
// //                         }}
// //                       >
// //                         {newDate}
// //                       </p>
// //                     </section>
// //                   </section>
// //                 </Link>
// //               </CustomCard>
// //             </Col>
// //           </>
// //         )}
// //       </ThemeContext.Consumer>
// //     </>
// //   );
// // };

// // export default allDeviceData;
// /* eslint-disable */
// // import React, { useRef, useEffect, useReducer, useMemo, useState } from 'react';
// // import {
// //   faCaretDown,
// //   faDatabase,
// //   faDownload,
// //   faSortDown,
// //   faSortUp,
// // } from '@fortawesome/free-solid-svg-icons';
// // import { Link } from 'react-router-dom';
// // import { useNavigate } from "react-router-dom";
// // import { Container, Row, Col,Button} from 'react-bootstrap';
// // import Style from '../../css/device.module.css';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { useDispatch, useSelector } from 'react-redux';
// // import LogICon from '../../assets/icons/log.png';
// // import AlarmIcon from '../../assets/images/AlarmIcon.png';
// // import SpinnerCustom from '../../container/SpinnerCustom';
// // import TableCard from '../../container/TableCard';
// // import { deviceAction } from '../../store/action/DeviceAction';
// // import { Navbar } from '../../utils/NavBar';
// // import SideBar from '../../utils/Sidebar';
// // import { ThemeContext } from '../../utils/ThemeContext';
// // import { deviceDataReducer } from './store/Reducer';
// // import AddDeviceModal from './model/addDeviceModal';
// // import {
// //   ALL_ROW_SELECTED,
// //   DATE_DROPDOWN,
// //   DIFF_DATE,
// //   SEARCH_FIELD,
// //   SORT_ICONS,
// // } from './store/Types';
// // import Pagination from '../../common/Pagination';

// // export default function DeviceTable(){
// //   const { theme } = React.useContext(ThemeContext);

  
// //   const getModelCodeReducer = useSelector((state) => state.getModelCodeReducer);
// //   const { data: projectType } = getModelCodeReducer;
// //   console.log('firstget',getModelCodeReducer)

// //   const deviceReducer = useSelector((state) =>state.deviceReducer);
// //   // console.log("first",deviceReducer)
// //   const {loading,data} = deviceReducer;
// //   // console.log(loading)
// //   // console.log(data)

// //   const dispatch = useDispatch();

// //   const initialState = {
// //     tableDataState :{},
// //     disableButton: false,
// //     dateDropDown: false,
// //     showTableField: false,

// //     record: localStorage.getItem('selected_record')
// //     ? JSON.parse(localStorage.getItem('selected_record'))
// //     : 25,

// //     projectCode: localStorage.getItem('project_type')
// //     ? JSON.parse(localStorage.getItem('project_type')).typeCode
// //     : projectType &&
// //       projectType.modelList[0] &&
// //       projectType.modelList[0].typeCode,

// //     searchField: '',
// //  /**
// //      * @objectKey DI: Device Id,
// //      * @objectKey LOC: Device Location-------------,
// //      * @objectKey St: Error Type--------------,
// //      */
// //     sortIcons: {
// //       DI: false,
// //       LOC: false,
// //       St: false,
// //     },
// //     singleRowSelect: false,
// //     allRowSelect: false,
// //   };
// //   let navigate = useNavigate(); 
// //   const routeChange = () =>{ 
// //     let path = `/DeviceData?code=${code}&name=${projectName}`; 
// //     navigate(path);
// //   }

// //   const [currentStateDevices,dispatchDeviceData] = useReducer(
// //     deviceDataReducer,
// //     initialState
// //   );

// //   const [currentPage,setCurrentPage] = useState(1); //current page set to 1
// //   const[isCheckAll,setIsCheckAll] = useState(false);
// //   const[isCheck,setIsCheck] = useState([]);
// //   const [checkedLogs,setCheckedLogs] = useState([]);
// //   const [modalShow,setModalShow] = useState(false);

// //   const handleSelectAll = (e) =>{
// //     setIsCheckAll(!isCheckAll);
// //     setIsCheck(data?.data?.data.map((data)=>data._id));
// //     setCheckedLogs(data?.data?.data);
// //     if(isCheckAll){
// //       setIsCheck([]);
// //       setCheckedLogs([]);
// //     }
// //   };
// // // console.log((data?.data?.data.map((data)=>data._id)))

// // const handleClick = e => {
// //   const { id, checked, name } = e.target;
// //   setIsCheck([...isCheck, id]);
// //   setCheckedLogs([...checkedLogs, JSON.parse(name)]);
// //   if (!checked) {
// //     setIsCheck(isCheck.filter((item) => item !== id));
// //     setCheckedLogs(
// //       checkedLogs.filter((item) => {
// //         return item._id !== id;
// //       })
// //     );
// //   }
// // };

// // useMemo(()=>{
// //   const firstPageIndex = (currentPage - 1) * currentStateDevices.record;
// //   const lastPageIndex = firstPageIndex + currentStateDevices.record;
// //   return(
// //     data && data.data && data.data.data.slice(firstPageIndex,lastPageIndex)
// //   );
// // },[currentPage]);


// // const ref = useRef();

// // const queryString = window.location.search;
// // const urlParams = new URLSearchParams(queryString);
// // const code = urlParams.get('code');
// // const projectName = urlParams.get('name');
// // const DeviceId = urlParams.get('DeviceID')

// // // const DateFilter = () => {
// // //   dispatchDeviceData({
// // //     type: DATE_DROPDOWN,
// // //     data: !currentStateDevices.dateDropDown,
// // //   });
// // // };
// //  //Navigation bar ==================================
// // const navigation_details = {
// //   name: projectName,
// //   dashName: projectName,
// //   link1: {
// //     iconName: faDatabase,
// //     linkName: 'Logs',
// //     link: `/log_table?code=${code}&name=${projectName}`,
// //   },
// //   link2: {
// //     iconName: faDatabase,
// //     linkName: 'Settings',
// //   },
// //   link3:{
// //     iconName:faDatabase,
// //     linkName:"Alarms"
// //   },
// //   link4:{
// //     iconName:faDatabase,
// //     linkName:"Events"
// //   }
// // };

// // const sidebar_details = {
// //   name: projectName,
// //   dashName: projectName,
// //   link1: {
// //     iconName: LogICon,
// //     linkName: 'Logs',
// //     link: `/log_table?code=${code}&name=${projectName}`,
// //   },
// //   link2: {
// //     iconName: AlarmIcon,
// //     linkName: 'Settings',
// //     link: `/settings?code=${code}&name=${projectName}`,
// //   },
// //   link3: {
// //     iconName: AlarmIcon,
// //     linkName: 'alarm',
// //     link: `/alarm?code=${code}&name=${projectName}`,
// //   },
// //   link4: {
// //     iconName: `/assets/images/AlarmIcon.png`,
// //     linkName: "Events",
// //     link: `/events?code=${code}&name=${projectName}`, //to do   
// //   },
// // };

// //  // @@ SEARCH MECHANISMS IMPLEMENTATION  STARTS HERE -----
// //  const handleSearchFunc = (event) => {
// //   dispatchDeviceData({
// //     type: SEARCH_FIELD,
// //     data: event.target.value,
// //   });
// // };
// // let deviceFilter = data && data.data && data.data.data;
// // // console.log('df',deviceFilter)

// // let search =
// //     (currentStateDevices.searchField &&
// //       currentStateDevices.searchField.trim() &&
// //       currentStateDevices.searchField.trim().toLowerCase()) ||
// //     '';

// //   if (search.length > 0) {
// //     deviceFilter = deviceFilter.filter((item) => {
// //       return (
// //         item.did.toLowerCase().includes(search) ||
// //         item.ack.msg.toLowerCase().includes(search) ||
// //         item.createdAt.toLowerCase().includes(search)
// //       );
// //     });
// //   }
// //   const callbackfnDispatchGetAllData = (sortType) => {
// //     dispatch(
// //       deviceAction(
// //         code,
// //         localStorage.getItem('project_type') &&
// //           JSON.parse(localStorage.getItem('project_type')).typeCode,
// //         currentStateDevices.diffDate,
// //         currentStateDevices.page,
// //         currentStateDevices.record,
// //         sortType
// //       )
// //     );
// //   };
// //   // SORTING FUNCTION
// //   // multple dispatch function for sorting
// //   const multpleDispatchSort = (type, data) => {
// //     return dispatchDeviceData({
// //       type: type,
// //       data: data,
// //     });
// //   };
// //   const sortTableFnDI = (callbackDispatchAllData) => {
// //     //Device Id Sorting
// //     if (currentStateDevices.sortIcons.DI) {
// //       return callbackDispatchAllData('-did');
// //     } else if (!currentStateDevices.sortIcons.DI) {
// //       multpleDispatchSort(SORT_ICONS, {
// //         DI: true,
// //         LOC: false,
// //         St: false,
// //       });
      
// //       return callbackDispatchAllData('did');
// //     }
// //   };
// //   const sortTableFnLOC = (callbackDispatchAllData) => {
// //     // Device Location
// //     if (currentStateDevices.sortIcons.LOC) {
// //       return callbackDispatchAllData('-ack.code');
// //     } else if (!currentStateDevices.sortIcons.LOC) {
// //       multpleDispatchSort(SORT_ICONS, {
// //         DI: false,
// //         LOC: true,
// //         St: false,
// //       });
// //       return callbackDispatchAllData('ack.code');
// //     }
// //   };
  
// //   const sortTableFnSt = (callbackDispatchAllData) => {
// //     // Device Status
// //     if (currentStateDevices.sortIcons.St) {
// //       return callbackDispatchAllData('-ack.msg');
// //     } else if (!currentStateDevices.sortIcons.St) {
// //       multpleDispatchSort(SORT_ICONS, {
// //         DI: false,
// //         LOC:false,
// //         St: true,
// //       });
// //       return callbackDispatchAllData('ack.msg');
// //     }
// //   };


// // useEffect(()=>{
// //   dispatch(
// //     deviceAction(
// //       code,
// //       currentStateDevices.projectCode
// //     )
// //   );
// // },([dispatch,currentStateDevices.projectCode]))
// // return (
// //   <div>
// //     <Row className="rowSection">
// //       <Col xl={2} lg={2} md={2} sm={2} className="noSidebar colSection">
// //         <SideBar
// //           sidebar_details={sidebar_details}
// //           className={Style.SideBarColume}
// //         />
// //       </Col>
// //       <Col
// //         xl={10}
// //         lg={10}
// //         md={10}
// //         sm={10}
// //         className={`${Style.NavbarColumn} colSection`}
// //       >
// //         <Navbar navigation_details={navigation_details} />
// //         <h1 className=" darkModeColor">Device Summary</h1>
// //         <Container style={{marginTop:'0px'}}>
// //         <Button 
// //                      style={{ backgroundColor: "#1a83ff", marginLeft: "87%",marginTop:"5%",marginBottom:"0%", position:'relative'} }          
// //                     >
// //                       <section
// //                       onClick={()=>setModalShow(true)}
// //                       >
// //                         Register New Device
// //                       </section>
// //                     </Button>
// //                     <AddDeviceModal
// //                     show={modalShow}
// //                     onHide={()=>setModalShow(false)}
// //                     />
// //           <Row className="mt-4">
                  
// //             {/* <Col xl={10} md={9} sm={9}>
// //               <TypeDropDown
// //                 tableDataState={currentStateDevices.tableDataState}
// //                 diffDate={currentStateDevices.diffDate}
// //                 codeReducer={getModelCodeReducer}
// //               />
// //             </Col> */}

// //             {/* DATE FILTER */}
// //             {/* <Col xl={2} md={3} sm={3} className={Style.filterWithDate}>
// //               <section className={Style.filterwithDate} ref={ref}>
// //                 <section className={Style.datafilter} onClick={DateFilter}>
// //                   <Image
// //                     src={DateIcons}
// //                     width="20px"
// //                     style={{
// //                       filter:
// //                         'invert(45%) sepia(99%) saturate(341%) hue-rotate(135deg) brightness(91%) contrast(91%)',
// //                     }}
// //                   />
// //                   <p
// //                     style={{
// //                       fontSize: '.9rem',
// //                     }}
// //                     className="m-2 darkModeColor"
// //                   >
// //                     {currentStateDevices.diffDate == 10
// //                       ? `last 10 days`
// //                       : currentStateDevices.diffDate == 7
// //                       ? `last 7 days`
// //                       : currentStateDevices.diffDate == 15
// //                       ? `last 15 days`
// //                       : currentStateDevices.diffDate == 30
// //                       ? `last 30 days`
// //                       : currentStateDevices.diffDate == 45
// //                       ? `last 45 days`
// //                       : currentStateDevices.diffDate == 60
// //                       ? `last 60 days`
// //                       : currentStateDevices.diffDate == 90
// //                       ? `last 90 days`
// //                       : null}
// //                   </p>
// //                   <FontAwesomeIcon
// //                     icon={faCaretDown}
// //                     color="#2A9AA4"
// //                     style={{
// //                       width: '10px',
// //                       height: '20px',
// //                       marginBottom: '2px',
// //                     }}
// //                   />
// //                 </section>

// //                 <section>
// //                   {currentStateDevices.dateDropDown ? (
// //                     <CustomeDropDown width="100%" zIndex="8">
// //                       <p
// //                         style={{ fontSize: '.8rem' }}
// //                         className={`${Style.productVersion} mt-1 darkModeColor `}
// //                         onClick={() => {
// //                           dispatchAlertsData({
// //                             type: DIFF_DATE,
// //                             data: 7,
// //                           });
// //                           localStorage.setItem(
// //                             'diffDate',
// //                             currentStateDevices.diffDate
// //                           );
// //                           dispatchAlertsData({
// //                             type: DATE_DROPDOWN,
// //                             data: false,
// //                           });
// //                         }}
// //                       >
// //                         7 days
// //                       </p>
// //                       <p
// //                         style={{ fontSize: '.8rem' }}
// //                         className={`${Style.productVersion} mt-1 darkModeColor`}
// //                         onClick={() => {
// //                           dispatchAlertsData({
// //                             type: DIFF_DATE,
// //                             data: 15,
// //                           });
// //                           localStorage.setItem(
// //                             'diffDate',
// //                             currentStateDevices.diffDate
// //                           );
// //                           dispatchAlertsData({
// //                             type: DATE_DROPDOWN,
// //                             data: false,
// //                           });
// //                         }}
// //                       >
// //                         15 days
// //                       </p>

// //                       <p
// //                         style={{ fontSize: '.8rem' }}
// //                         className={`${Style.productVersion} mt-1 darkModeColor`}
// //                         onClick={() => {
// //                           dispatchAlertsData({
// //                             type: DIFF_DATE,
// //                             data: 30,
// //                           });
// //                           localStorage.setItem(
// //                             'diffDate',
// //                             currentStateDevices.diffDate
// //                           );
// //                           dispatchAlertsData({
// //                             type: DATE_DROPDOWN,
// //                             data: false,
// //                           });
// //                         }}
// //                       >
// //                         30 days
// //                       </p>
// //                       <p
// //                         style={{ fontSize: '.8rem' }}
// //                         className={`${Style.productVersion} mt-1 darkModeColor`}
// //                         onClick={() => {
// //                           dispatchAlertsData({
// //                             type: DIFF_DATE,
// //                             data: 45,
// //                           });
// //                           localStorage.setItem(
// //                             'diffDate',
// //                             currentStateDevices.diffDate
// //                           );
// //                           dispatchAlertsData({
// //                             type: DATE_DROPDOWN,
// //                             data: false,
// //                           });
// //                         }}
// //                       >
// //                         45 days
// //                       </p>
// //                       <p
// //                         style={{ fontSize: '.8rem' }}
// //                         className={`${Style.productVersion} mt-1 darkModeColor`}
// //                         onClick={() => {
// //                           dispatchAlertsData({
// //                             type: DIFF_DATE,
// //                             data: 60,
// //                           });
// //                           localStorage.setItem(
// //                             'diffDate',
// //                             currentStateDevices.diffDate
// //                           );
// //                           dispatchAlertsData({
// //                             type: DATE_DROPDOWN,
// //                             data: false,
// //                           });
// //                         }}
// //                       >
// //                         60 days
// //                       </p>
// //                       <p
// //                         style={{ fontSize: '.8rem' }}
// //                         className={`${Style.productVersion} mt-1 darkModeColor`}
// //                         onClick={() => {
// //                           dispatchAlertsData({
// //                             type: DIFF_DATE,
// //                             data: 90,
// //                           });
// //                           localStorage.setItem(
// //                             'diffDate',
// //                             currentStateDevices.diffDate
// //                           );
// //                           dispatchAlertsData({
// //                             type: DATE_DROPDOWN,
// //                             data: false,
// //                           });
// //                         }}
// //                       >
// //                         90 days
// //                       </p>
// //                     </CustomeDropDown>
// //                   ) : null}
// //                 </section>
// //               </section>
// //             </Col>  */}
// //           </Row>
// //           {/* Events  */}
// //           <Row className="mt-0">
// //             <Col>
// //               <TableCard borderRadius="10px">
// //                 {data && data.data && data.data.data.length > 0 && (
// //                   <>
// //                     <section className={`${Style.OuterTable} `}>
// //                       <section className={Style.searchSection}>
// //                         <input
// //                           type="text"
// //                           placeholder="Search..."
// //                           value={currentStateDevices.searchField}
// //                           onChange={handleSearchFunc}
// //                         />
// //                         <section
// //                           id="download_button"
// //                           disabled={checkedLogs?.length ? null : 'disabled'}
// //                           style={{
// //                             border: 'none',
// //                             opacity: checkedLogs?.length ? '100%' : '40%',
// //                           }}
// //                           onClick={() =>
// //                             downloadCSVFun({
// //                               data: checkedLogs,
// //                               fileName: `${code}-${
// //                                 new Date().getDay() +
// //                                 '-' +
// //                                 new Date().getMonth() +
// //                                 '-' +
// //                                 new Date().getFullYear()
// //                               }.csv`,
// //                               fileType: 'text/csv;charset=utf-8;',
// //                             })
// //                           }
// //                         >
// //                           <section className={Style.filterGraphFirstSection}>
// //                             <FontAwesomeIcon
// //                               color="#0099a4"
// //                               style={{ cursor: 'pointer' }}
// //                               icon={faDownload}
// //                             />
// //                           </section>
// //                         </section>
// //                       </section>

// //                       {/* TABLE HERE */}

// //                       <section className={Style.deviceTable}>
// //                         <section className={Style.tableHeader}>
// //                           <section
// //                             style={{
// //                               color: theme == 'light-theme' ? '#000' : '#fff',
// //                             }}
// //                           >
// //                             <input
// //                               type="checkbox"
// //                               onChange={handleSelectAll}
// //                               checked={isCheckAll}
// //                               id="selectAll"
// //                             />
// //                           </section>
// //                           <section className={Style.innerHeader}>
// //                             <p
// //                               style={{
// //                                 marginRight: '10px',
// //                                 color:
// //                                   theme == 'light-theme' ? '#000' : '#fff',
// //                                 fontWeight: '600',
// //                                 fontSize: '.9rem',
// //                               }}
// //                             >
// //                               Device Id
// //                             </p>
// //                             <FontAwesomeIcon
// //                               color="#0099a4"
// //                               style={{ cursor: 'pointer' ,display:'none'}}
// //                               icon={
// //                                 currentStateDevices.sortIcons.DI
// //                                   ? faSortDown
// //                                   : faSortUp
// //                               }
// //                               onClick={() => {
// //                                 dispatchDeviceData({
// //                                   type: SORT_ICONS,
// //                                   data: {
// //                                     ...currentStateDevices.sortIcons,
// //                                     DI: !currentStateDevices.sortIcons.DI,
// //                                   },
// //                                 });
// //                                 sortTableFnDI(callbackfnDispatchGetAllData);
// //                               }}
// //                             />
// //                           </section>
// //                           <section className={Style.innerHeader}>
// //                             <p
// //                               style={{
// //                                 marginRight: '20px',
// //                                 color:
// //                                   theme == 'light-theme' ? '#000' : '#fff',
// //                                 fontWeight: '600',
// //                                 fontSize: '.9rem',
// //                               }}
// //                             >
// //                               Alias Name
// //                             </p>
// //                           </section>
// //                           <section className={Style.innerHeader}>
// //                             <p
// //                               style={{
// //                                 marginRight: '10px',
// //                                 color:
// //                                   theme == 'light-theme' ? '#000' : '#fff',
// //                                 fontWeight: '600',
// //                                 fontSize: '.9rem',
// //                               }}
// //                             >
// //                               Hospital Name
// //                             </p>
// //                           </section>

// //                           <section className={Style.innerHeader}>
// //                             <p
// //                               style={{
// //                                 marginRight: '10px',
// //                                 color:
// //                                   theme == 'light-theme' ? '#000' : '#fff',
// //                                 fontWeight: '600',
// //                                 fontSize: '.9rem',
// //                               }}
// //                             >
// //                               Hospital Name
// //                             </p>
// //                           </section>
                        
// //                         </section>
            
// //                         {deviceFilter.map((item, index) => {
// //                           return (
// //                             <React.Fragment key={item._id}>
// //                               <section className={Style.tableBody}>
                                
// //                                 <section>
// //                                   <input
// //                                     type="checkbox"
// //                                     id={item._id}
// //                                     name={JSON.stringify(item)}
// //                                     onChange={handleClick}
// //                                     checked={isCheck.includes(item._id)}
// //                                   />
// //                                 </section>
// //                                 <section
// //                                   style={{
// //                                     color:
// //                                       theme == 'light-theme' ? '' : '#fff',
// //                                       display:""
                                      
// //                                   }}
// //                                 >
// //                                   <Link to={`/DeviceData/${item.DeviceId}`}>{item.DeviceId}</Link>
// //                                 {/* <button onClick={(routeChange)} style={{border:'none',backgroundColor:'white',fontWeight:'400'}}>{item.DeviceId}</button> */}
// //                                 </section>
// //                                 <section
// //                                   style={{
// //                                     color:
// //                                       theme == 'light-theme' ? '' : '#fff',
// //                                   }}
// //                                 >
// //                                   {item.AliasName}
// //                                 </section>
// //                               </section>
// //                                 <section
// //                                   style={{
// //                                     color:
// //                                       theme == 'light-theme' ? '' : '#fff',
// //                                   }}
// //                                 >
// //                                   {item.St}
// //                                 </section>
// //                             </React.Fragment>
// //                           );
// //                         })}
// //                       </section>
                      
// //                     </section>
// //                     <section className="p-2">
// //                       <Pagination
// //                         code={code}
// //                         projectType={currentStateDevices.projectCode}
// //                         currentPage={currentPage}
// //                         totalCount={data?.data?.count ? data?.data?.count : 0}
// //                         pageSize={currentStateDevices.record}
// //                         onPageChange={(page) => setCurrentPage(page)}
// //                       />
// //                     </section>
// //                   </>
// //                 )}

// //                 {data && data.data && data.data.data.length == 0 && (
// //                   <section className={Style.noDataFound}>
// //                     <p
// //                       style={{
// //                         color: theme == 'light-theme' ? `#000` : `#fff`,
// //                       }}                     
// //                     >
// //                       No Data Found
// //                     </p>
// //                   </section>
// //                 )}
// //                 {loading && <SpinnerCustom />}
// //               </TableCard>
// //             </Col>
// //           </Row>
// //         </Container>
// //       </Col>
// //     </Row>
// //   </div>
// // );

// // }
// /* eslint-disable */
// import React, { useRef, useEffect, useReducer, useMemo, useState } from 'react';
// import {
//   faCaretDown,
//   faDatabase,
//   faDownload,
//   faSortDown,
//   faSortUp,
// } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from "react-router-dom";
// import { Container, Row, Col,Button} from 'react-bootstrap';
// import Style from '../../css/device.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useDispatch, useSelector } from 'react-redux';
// import LogICon from '../../assets/icons/log.png';
// import AlarmIcon from '../../assets/images/AlarmIcon.png';
// import SpinnerCustom from '../../container/SpinnerCustom';
// import TableCard from '../../container/TableCard';
// import { deviceAction } from '../../store/action/DeviceAction';
// import { Navbar } from '../../utils/NavBar';
// import SideBar from '../../utils/Sidebar';
// import { ThemeContext } from '../../utils/ThemeContext';
// import { deviceDataReducer } from './store/Reducer';
// import AddDeviceModal from './model/addDeviceModal';
// import {
//   ALL_ROW_SELECTED,
//   DATE_DROPDOWN,
//   DIFF_DATE,
//   SEARCH_FIELD,
//   SORT_ICONS,
// } from './store/Types';
// import Pagination from '../../common/Pagination';

// export default function DeviceTable(){
//   const { theme } = React.useContext(ThemeContext);

  
//   const getModelCodeReducer = useSelector((state) => state.getModelCodeReducer);
//   const { data: projectType } = getModelCodeReducer;
//   console.log('firstget',getModelCodeReducer)

//   const deviceReducer = useSelector((state) =>state.deviceReducer);
//   // console.log("first",deviceReducer)
//   const {loading,data} = deviceReducer;
//   // console.log(loading)
//   // console.log(data)

//   const dispatch = useDispatch();

//   const initialState = {
//     tableDataState :{},
//     disableButton: false,
//     dateDropDown: false,
//     showTableField: false,

//     record: localStorage.getItem('selected_record')
//     ? JSON.parse(localStorage.getItem('selected_record'))
//     : 25,

//     projectCode: localStorage.getItem('project_type')
//     ? JSON.parse(localStorage.getItem('project_type')).typeCode
//     : projectType &&
//       projectType.modelList[0] &&
//       projectType.modelList[0].typeCode,

//     searchField: '',
//  /**
//      * @objectKey DI: Device Id,
//      * @objectKey LOC: Device Location-------------,
//      * @objectKey St: Error Type--------------,
//      */
//     sortIcons: {
//       DI: false,
//       LOC: false,
//       St: false,
//     },
//     singleRowSelect: false,
//     allRowSelect: false,
//   };
//   let navigate = useNavigate(); 
//   const routeChange = () =>{ 
//     let path = `/DeviceData?code=${code}&name=${projectName}`; 
//     navigate(path);
//   }

//   const [currentStateDevices,dispatchDeviceData] = useReducer(
//     deviceDataReducer,
//     initialState
//   );

//   const [currentPage,setCurrentPage] = useState(1); //current page set to 1
//   const[isCheckAll,setIsCheckAll] = useState(false);
//   const[isCheck,setIsCheck] = useState([]);
//   const [checkedLogs,setCheckedLogs] = useState([]);
//   const [modalShow,setModalShow] = useState(false);

//   const handleSelectAll = (e) =>{
//     setIsCheckAll(!isCheckAll);
//     setIsCheck(data?.data?.data.map((data)=>data._id));
//     setCheckedLogs(data?.data?.data);
//     if(isCheckAll){
//       setIsCheck([]);
//       setCheckedLogs([]);
//     }
//   };
// // console.log((data?.data?.data.map((data)=>data._id)))

// const handleClick = e => {
//   const { id, checked, name } = e.target;
//   setIsCheck([...isCheck, id]);
//   setCheckedLogs([...checkedLogs, JSON.parse(name)]);
//   if (!checked) {
//     setIsCheck(isCheck.filter((item) => item !== id));
//     setCheckedLogs(
//       checkedLogs.filter((item) => {
//         return item._id !== id;
//       })
//     );
//   }
// };

// useMemo(()=>{
//   const firstPageIndex = (currentPage - 1) * currentStateDevices.record;
//   const lastPageIndex = firstPageIndex + currentStateDevices.record;
//   return(
//     data && data.data && data.data.data.slice(firstPageIndex,lastPageIndex)
//   );
// },[currentPage]);


// const ref = useRef();

// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const code = urlParams.get('code');
// const projectName = urlParams.get('name');

// // const DateFilter = () => {
// //   dispatchDeviceData({
// //     type: DATE_DROPDOWN,
// //     data: !currentStateDevices.dateDropDown,
// //   });
// // };
//  //Navigation bar ==================================
// const navigation_details = {
//   name: projectName,
//   dashName: projectName,
//   link1: {
//     iconName: faDatabase,
//     linkName: 'Logs',
//     link: `/log_table?code=${code}&name=${projectName}`,
//   },
//   link2: {
//     iconName: faDatabase,
//     linkName: 'Settings',
//   },
//   link3:{
//     iconName:faDatabase,
//     linkName:"Alarms"
//   },
//   link4:{
//     iconName:faDatabase,
//     linkName:"Events"
//   }
// };

// const sidebar_details = {
//   name: projectName,
//   dashName: projectName,
//   link1: {
//     iconName: LogICon,
//     linkName: 'Logs',
//     link: `/log_table?code=${code}&name=${projectName}`,
//   },
//   link2: {
//     iconName: AlarmIcon,
//     linkName: 'Settings',
//     link: `/settings?code=${code}&name=${projectName}`,
//   },
//   link3: {
//     iconName: AlarmIcon,
//     linkName: 'alarm',
//     link: `/alarm?code=${code}&name=${projectName}`,
//   },
//   link4: {
//     iconName: `/assets/images/AlarmIcon.png`,
//     linkName: "Events",
//     link: `/events?code=${code}&name=${projectName}`, //to do   
//   },
// };

//  // @@ SEARCH MECHANISMS IMPLEMENTATION  STARTS HERE -----
//  const handleSearchFunc = (event) => {
//   dispatchDeviceData({
//     type: SEARCH_FIELD,
//     data: event.target.value,
//   });
// };
// let deviceFilter = data && data.data && data.data.data;
// console.log('df',deviceFilter)

// let search =
//     (currentStateDevices.searchField &&
//       currentStateDevices.searchField.trim() &&
//       currentStateDevices.searchField.trim().toLowerCase()) ||
//     '';

//   if (search.length > 0) {
//     deviceFilter = deviceFilter.filter((item) => {
//       return (
//         item.did.toLowerCase().includes(search) ||
//         item.ack.msg.toLowerCase().includes(search) ||
//         item.createdAt.toLowerCase().includes(search)
//       );
//     });
//   }
//   const callbackfnDispatchGetAllData = (sortType) => {
//     dispatch(
//       deviceAction(
//         code,
//         localStorage.getItem('project_type') &&
//           JSON.parse(localStorage.getItem('project_type')).typeCode,
//         currentStateDevices.diffDate,
//         currentStateDevices.page,
//         currentStateDevices.record,
//         sortType
//       )
//     );
//   };
//   // SORTING FUNCTION
//   // multple dispatch function for sorting
//   const multpleDispatchSort = (type, data) => {
//     return dispatchDeviceData({
//       type: type,
//       data: data,
//     });
//   };
//   const sortTableFnDI = (callbackDispatchAllData) => {
//     //Device Id Sorting
//     if (currentStateDevices.sortIcons.DI) {
//       return callbackDispatchAllData('-did');
//     } else if (!currentStateDevices.sortIcons.DI) {
//       multpleDispatchSort(SORT_ICONS, {
//         DI: true,
//         LOC: false,
//         St: false,
//       });
      
//       return callbackDispatchAllData('did');
//     }
//   };
//   const sortTableFnLOC = (callbackDispatchAllData) => {
//     // Device Location
//     if (currentStateDevices.sortIcons.LOC) {
//       return callbackDispatchAllData('-ack.code');
//     } else if (!currentStateDevices.sortIcons.LOC) {
//       multpleDispatchSort(SORT_ICONS, {
//         DI: false,
//         LOC: true,
//         St: false,
//       });
//       return callbackDispatchAllData('ack.code');
//     }
//   };
  
//   const sortTableFnSt = (callbackDispatchAllData) => {
//     // Device Status
//     if (currentStateDevices.sortIcons.St) {
//       return callbackDispatchAllData('-ack.msg');
//     } else if (!currentStateDevices.sortIcons.St) {
//       multpleDispatchSort(SORT_ICONS, {
//         DI: false,
//         LOC:false,
//         St: true,
//       });
//       return callbackDispatchAllData('ack.msg');
//     }
//   };


// useEffect(()=>{
//   dispatch(
//     deviceAction(
//       code,
//       currentStateDevices.projectCode
//     )
//   );
// },([dispatch,currentStateDevices.projectCode]))
// return (
//   <div>
//     <Row className="rowSection">
//       <Col xl={2} lg={2} md={2} sm={2} className="noSidebar colSection">
//         <SideBar
//           sidebar_details={sidebar_details}
//           className={Style.SideBarColume}
//         />
//       </Col>
//       <Col
//         xl={10}
//         lg={10}
//         md={10}
//         sm={10}
//         className={`${Style.NavbarColumn} colSection`}
//       >
//         <Navbar navigation_details={navigation_details} />
//         <h1 className=" darkModeColor">Device Summary</h1>
//         <Container style={{marginTop:'0px'}}>
//         <Button 
//                      style={{ backgroundColor: "#1a83ff", marginLeft: "87%",marginTop:"5%",marginBottom:"0%", position:'relative'} }          
//                     >
//                       <section
//                       onClick={()=>setModalShow(true)}
//                       >
//                         Register New Device
//                       </section>
//                     </Button>
//                     <AddDeviceModal
//                     show={modalShow}
//                     onHide={()=>setModalShow(false)}
//                     />
//           <Row className="mt-4">
                  
//             {/* <Col xl={10} md={9} sm={9}>
//               <TypeDropDown
//                 tableDataState={currentStateDevices.tableDataState}
//                 diffDate={currentStateDevices.diffDate}
//                 codeReducer={getModelCodeReducer}
//               />
//             </Col> */}

//             {/* DATE FILTER */}
//             {/* <Col xl={2} md={3} sm={3} className={Style.filterWithDate}>
//               <section className={Style.filterwithDate} ref={ref}>
//                 <section className={Style.datafilter} onClick={DateFilter}>
//                   <Image
//                     src={DateIcons}
//                     width="20px"
//                     style={{
//                       filter:
//                         'invert(45%) sepia(99%) saturate(341%) hue-rotate(135deg) brightness(91%) contrast(91%)',
//                     }}
//                   />
//                   <p
//                     style={{
//                       fontSize: '.9rem',
//                     }}
//                     className="m-2 darkModeColor"
//                   >
//                     {currentStateDevices.diffDate == 10
//                       ? `last 10 days`
//                       : currentStateDevices.diffDate == 7
//                       ? `last 7 days`
//                       : currentStateDevices.diffDate == 15
//                       ? `last 15 days`
//                       : currentStateDevices.diffDate == 30
//                       ? `last 30 days`
//                       : currentStateDevices.diffDate == 45
//                       ? `last 45 days`
//                       : currentStateDevices.diffDate == 60
//                       ? `last 60 days`
//                       : currentStateDevices.diffDate == 90
//                       ? `last 90 days`
//                       : null}
//                   </p>
//                   <FontAwesomeIcon
//                     icon={faCaretDown}
//                     color="#2A9AA4"
//                     style={{
//                       width: '10px',
//                       height: '20px',
//                       marginBottom: '2px',
//                     }}
//                   />
//                 </section>

//                 <section>
//                   {currentStateDevices.dateDropDown ? (
//                     <CustomeDropDown width="100%" zIndex="8">
//                       <p
//                         style={{ fontSize: '.8rem' }}
//                         className={`${Style.productVersion} mt-1 darkModeColor `}
//                         onClick={() => {
//                           dispatchAlertsData({
//                             type: DIFF_DATE,
//                             data: 7,
//                           });
//                           localStorage.setItem(
//                             'diffDate',
//                             currentStateDevices.diffDate
//                           );
//                           dispatchAlertsData({
//                             type: DATE_DROPDOWN,
//                             data: false,
//                           });
//                         }}
//                       >
//                         7 days
//                       </p>
//                       <p
//                         style={{ fontSize: '.8rem' }}
//                         className={`${Style.productVersion} mt-1 darkModeColor`}
//                         onClick={() => {
//                           dispatchAlertsData({
//                             type: DIFF_DATE,
//                             data: 15,
//                           });
//                           localStorage.setItem(
//                             'diffDate',
//                             currentStateDevices.diffDate
//                           );
//                           dispatchAlertsData({
//                             type: DATE_DROPDOWN,
//                             data: false,
//                           });
//                         }}
//                       >
//                         15 days
//                       </p>

//                       <p
//                         style={{ fontSize: '.8rem' }}
//                         className={`${Style.productVersion} mt-1 darkModeColor`}
//                         onClick={() => {
//                           dispatchAlertsData({
//                             type: DIFF_DATE,
//                             data: 30,
//                           });
//                           localStorage.setItem(
//                             'diffDate',
//                             currentStateDevices.diffDate
//                           );
//                           dispatchAlertsData({
//                             type: DATE_DROPDOWN,
//                             data: false,
//                           });
//                         }}
//                       >
//                         30 days
//                       </p>
//                       <p
//                         style={{ fontSize: '.8rem' }}
//                         className={`${Style.productVersion} mt-1 darkModeColor`}
//                         onClick={() => {
//                           dispatchAlertsData({
//                             type: DIFF_DATE,
//                             data: 45,
//                           });
//                           localStorage.setItem(
//                             'diffDate',
//                             currentStateDevices.diffDate
//                           );
//                           dispatchAlertsData({
//                             type: DATE_DROPDOWN,
//                             data: false,
//                           });
//                         }}
//                       >
//                         45 days
//                       </p>
//                       <p
//                         style={{ fontSize: '.8rem' }}
//                         className={`${Style.productVersion} mt-1 darkModeColor`}
//                         onClick={() => {
//                           dispatchAlertsData({
//                             type: DIFF_DATE,
//                             data: 60,
//                           });
//                           localStorage.setItem(
//                             'diffDate',
//                             currentStateDevices.diffDate
//                           );
//                           dispatchAlertsData({
//                             type: DATE_DROPDOWN,
//                             data: false,
//                           });
//                         }}
//                       >
//                         60 days
//                       </p>
//                       <p
//                         style={{ fontSize: '.8rem' }}
//                         className={`${Style.productVersion} mt-1 darkModeColor`}
//                         onClick={() => {
//                           dispatchAlertsData({
//                             type: DIFF_DATE,
//                             data: 90,
//                           });
//                           localStorage.setItem(
//                             'diffDate',
//                             currentStateDevices.diffDate
//                           );
//                           dispatchAlertsData({
//                             type: DATE_DROPDOWN,
//                             data: false,
//                           });
//                         }}
//                       >
//                         90 days
//                       </p>
//                     </CustomeDropDown>
//                   ) : null}
//                 </section>
//               </section>
//             </Col>  */}
//           </Row>
//           {/* Events  */}
//           <Row className="mt-0">
//             <Col>
//               <TableCard borderRadius="10px">
//                 {data && data.data && data.data.data.length > 0 && (
//                   <>
//                     <section className={`${Style.OuterTable} `}>
//                       <section className={Style.searchSection}>
//                         <input
//                           type="text"
//                           placeholder="Search..."
//                           value={currentStateDevices.searchField}
//                           onChange={handleSearchFunc}
//                         />
//                         <section
//                           id="download_button"
//                           disabled={checkedLogs?.length ? null : 'disabled'}
//                           style={{
//                             border: 'none',
//                             opacity: checkedLogs?.length ? '100%' : '40%',
//                           }}
//                           onClick={() =>
//                             downloadCSVFun({
//                               data: checkedLogs,
//                               fileName: `${code}-${
//                                 new Date().getDay() +
//                                 '-' +
//                                 new Date().getMonth() +
//                                 '-' +
//                                 new Date().getFullYear()
//                               }.csv`,
//                               fileType: 'text/csv;charset=utf-8;',
//                             })
//                           }
//                         >
//                           <section className={Style.filterGraphFirstSection}>
//                             <FontAwesomeIcon
//                               color="#0099a4"
//                               style={{ cursor: 'pointer' }}
//                               icon={faDownload}
//                             />
//                           </section>
//                         </section>
//                       </section>

//                       {/* TABLE HERE */}

//                       <section className={Style.alertTable}>
//                         <section className={Style.tableHeader}>
//                           <section
//                             style={{
//                               color: theme == 'light-theme' ? '#000' : '#fff',
//                             }}
//                           >
//                             <input
//                               type="checkbox"
//                               onChange={handleSelectAll}
//                               checked={isCheckAll}
//                               id="selectAll"
//                             />
//                           </section>
//                           <section className={Style.innerHeader}>
//                             <p
//                               style={{
//                                 marginRight: '10px',
//                                 color:
//                                   theme == 'light-theme' ? '#000' : '#fff',
//                                 fontWeight: '600',
//                                 fontSize: '.9rem',
//                               }}
//                             >
//                               Device Id
//                             </p>
//                             <FontAwesomeIcon
//                               color="#0099a4"
//                               style={{ cursor: 'pointer' ,display:'none'}}
//                               icon={
//                                 currentStateDevices.sortIcons.DI
//                                   ? faSortDown
//                                   : faSortUp
//                               }
//                               onClick={() => {
//                                 dispatchDeviceData({
//                                   type: SORT_ICONS,
//                                   data: {
//                                     ...currentStateDevices.sortIcons,
//                                     DI: !currentStateDevices.sortIcons.DI,
//                                   },
//                                 });
//                                 sortTableFnDI(callbackfnDispatchGetAllData);
//                               }}
//                             />
//                           </section>
        
//                           <section className={Style.innerHeader}>
//                             <p
//                               style={{
//                                 marginRight: '10px',
//                                 color:
//                                   theme == 'light-theme' ? '#000' : '#fff',
//                                 fontWeight: '600',
//                                 fontSize: '.9rem',
//                               }}
//                             >
//                               Alias Name
//                             </p>

//                             {/* <FontAwesomeIcon
//                               color="#0099a4"
//                               style={{ cursor: 'pointer' }}
//                               icon={
//                                 currentStateDevices.sortIcons.St
//                                   ? faSortDown
//                                   : faSortUp
//                               }
//                               onClick={() => {
//                                 dispatchDeviceData({
//                                   type: SORT_ICONS,
//                                   data: {
//                                     ...currentStateDevices.sortIcons,
//                                     St: !currentStateDevices.sortIcons.St,
//                                   },
//                                 });
//                                 sortTableFnSt(callbackfnDispatchGetAllData);
//                               }}
//                             /> */}
//                           </section>

//                           <section className={Style.innerHeader}>
//                             <p
//                               style={{
//                                 marginRight: '10px',
//                                 color:
//                                   theme == 'light-theme' ? '#000' : '#fff',
//                                 fontWeight: '600',
//                                 fontSize: '.9rem',
//                               }}
//                             >
//                               Hospital Name
//                             </p>

//                             {/* <FontAwesomeIcon
//                               color="#0099a4"
//                               style={{ cursor: 'pointer' }}
//                               icon={
//                                 currentStateDevices.sortIcons.St
//                                   ? faSortDown
//                                   : faSortUp
//                               }
//                               onClick={() => {
//                                 dispatchDeviceData({
//                                   type: SORT_ICONS,
//                                   data: {
//                                     ...currentStateDevices.sortIcons,
//                                     St: !currentStateDevices.sortIcons.St,
//                                   },
//                                 });
//                                 sortTableFnSt(callbackfnDispatchGetAllData);
//                               }}
//                             /> */}
//                           </section>
//                           <section className={Style.innerHeader}>
//                             <p
//                               style={{
//                                 marginRight: '10px',
//                                 color:
//                                   theme == 'light-theme' ? '#000' : '#fff',
//                                 fontWeight: '600',
//                                 fontSize: '.9rem',
//                               }}
//                             >
//                               Doctor Name
//                             </p>

//                             {/* <FontAwesomeIcon
//                               color="#0099a4"
//                               style={{ cursor: 'pointer' }}
//                               icon={
//                                 currentStateDevices.sortIcons.St
//                                   ? faSortDown
//                                   : faSortUp
//                               }
//                               onClick={() => {
//                                 dispatchDeviceData({
//                                   type: SORT_ICONS,
//                                   data: {
//                                     ...currentStateDevices.sortIcons,
//                                     St: !currentStateDevices.sortIcons.St,
//                                   },
//                                 });
//                                 sortTableFnSt(callbackfnDispatchGetAllData);
//                               }}
//                             /> */}
//                           </section>
//                           <section className={Style.innerHeader}>
//                             <p
//                               style={{
//                                 marginRight: '10px',
//                                 color:
//                                   theme == 'light-theme' ? '#000' : '#fff',
//                                 fontWeight: '600',
//                                 fontSize: '.9rem',
//                               }}
//                             >
//                               Ward Number
//                             </p>

//                             {/* <FontAwesomeIcon
//                               color="#0099a4"
//                               style={{ cursor: 'pointer' }}
//                               icon={
//                                 currentStateDevices.sortIcons.St
//                                   ? faSortDown
//                                   : faSortUp
//                               }
//                               onClick={() => {
//                                 dispatchDeviceData({
//                                   type: SORT_ICONS,
//                                   data: {
//                                     ...currentStateDevices.sortIcons,
//                                     St: !currentStateDevices.sortIcons.St,
//                                   },
//                                 });
//                                 sortTableFnSt(callbackfnDispatchGetAllData);
//                               }}
//                             /> */}
//                           </section>

//                           <section className={Style.innerHeader}>
//                             <p
//                               style={{
//                                 marginRight: '10px',
//                                 color:
//                                   theme == 'light-theme' ? '#000' : '#fff',
//                                 fontWeight: '600',
//                                 fontSize: '.9rem',
//                               }}
//                             >
//                               IMEI Number
//                             </p>

//                             {/* <FontAwesomeIcon
//                               color="#0099a4"
//                               style={{ cursor: 'pointer' }}
//                               icon={
//                                 currentStateDevices.sortIcons.St
//                                   ? faSortDown
//                                   : faSortUp
//                               }
//                               onClick={() => {
//                                 dispatchDeviceData({
//                                   type: SORT_ICONS,
//                                   data: {
//                                     ...currentStateDevices.sortIcons,
//                                     St: !currentStateDevices.sortIcons.St,
//                                   },
//                                 });
//                                 sortTableFnSt(callbackfnDispatchGetAllData);
//                               }}
//                             /> */}
//                           </section>
                          
//                           <section className={Style.innerHeader}>
//                             <p
//                               style={{
//                                 marginRight: '10px',
//                                 color:
//                                   theme == 'light-theme' ? '#000' : '#fff',
//                                 fontWeight: '600',
//                                 fontSize: '.9rem',
//                               }}
//                             >
//                               Ventilator Operator
//                             </p>

//                             {/* <FontAwesomeIcon
//                               color="#0099a4"
//                               style={{ cursor: 'pointer' }}
//                               icon={
//                                 currentStateDevices.sortIcons.St
//                                   ? faSortDown
//                                   : faSortUp
//                               }
//                               onClick={() => {
//                                 dispatchDeviceData({
//                                   type: SORT_ICONS,
//                                   data: {
//                                     ...currentStateDevices.sortIcons,
//                                     St: !currentStateDevices.sortIcons.St,
//                                   },
//                                 });
//                                 sortTableFnSt(callbackfnDispatchGetAllData);
//                               }}
//                             /> */}
//                           </section>
                          
                          
                          
                        
//                         </section>
            
//                         {deviceFilter.map((item, index) => {
//                           return (
//                             <React.Fragment key={item._id}>
//                               <section className={Style.tableBody}>
                                
//                                 <section>
//                                   <input
//                                     type="checkbox"
//                                     id={item._id}
//                                     name={JSON.stringify(item)}
//                                     onChange={handleClick}
//                                     checked={isCheck.includes(item._id)}
//                                   />
//                                 </section>
//                                 <section
//                                   style={{
//                                     color:
//                                       theme == 'light-theme' ? '' : '#fff',
                                      
//                                   }}
//                                 >
//                                 {item.DeviceId}
//                                 </section>
//                                 <section
//                                   style={{
//                                     color:
//                                       theme == 'light-theme' ? '' : '#fff',
//                                   }}
//                                 >
//                                   {item.AliasName}
//                                 </section>
//                                 <section
//                                   style={{
//                                     color:
//                                       theme == 'light-theme' ? '' : '#fff',
//                                   }}
//                                 >
//                                   {item.Hospital_Name}
//                                 </section>
//                                 <section
//                                   style={{
//                                     color:
//                                       theme == 'light-theme' ? '' : '#fff',
//                                   }}
//                                 >
//                                   {item.Doctor_Name}
//                                 </section>
//                                 <section
//                                   style={{
//                                     color:
//                                       theme == 'light-theme' ? '' : '#fff',
//                                   }}
//                                 >
//                                   {item.Ward_No}
//                                 </section>
//                                 <section
//                                   style={{
//                                     color:
//                                       theme == 'light-theme' ? '' : '#fff',
//                                   }}
//                                 >
//                                   {item.IMEI_NO}
//                                 </section>
//                                 <section
//                                   style={{
//                                     color:
//                                       theme == 'light-theme' ? '' : '#fff',
//                                   }}
//                                 >
//                                   {item.Ventilator_Operator}
//                                 </section>
//                               </section>
//                             </React.Fragment>
//                           );
//                         })}
//                       </section>
//                     </section>
//                     <section className="p-2">
//                       <Pagination
//                         code={code}
//                         projectType={currentStateDevices.projectCode}
//                         currentPage={currentPage}
//                         totalCount={data?.data?.count ? data?.data?.count : 0}
//                         pageSize={currentStateDevices.record}
//                         onPageChange={(page) => setCurrentPage(page)}
//                       />
//                     </section>
//                   </>
//                 )}

//                 {data && data.data && data.data.data.length == 0 && (
//                   <section className={Style.noDataFound}>
//                     <p
//                       style={{
//                         color: theme == 'light-theme' ? `#000` : `#fff`,
//                       }}                     
//                     >
//                       No Data Found
//                     </p>
//                   </section>
//                 )}
//                 {loading && <SpinnerCustom />}
//               </TableCard>
//             </Col>
//           </Row>
//         </Container>
//       </Col>
//     </Row>
//   </div>
// );

// }


// import React, { useRef, useEffect, useReducer, useMemo, useState } from 'react';
// import {
//   faCaretDown,
//   faDatabase,
//   faDownload,
//   faSortDown,
//   faSortUp,
// } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from "react-router-dom";
// import { Container, Row, Col,Button} from 'react-bootstrap';
// import Style from '../../css/device.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useDispatch, useSelector } from 'react-redux';
// import LogICon from '../../assets/icons/log.png';
// import AlarmIcon from '../../assets/images/AlarmIcon.png';
// import SpinnerCustom from '../../container/SpinnerCustom';
// import TableCard from '../../container/TableCard';
// import { deviceAction } from '../../store/action/DeviceAction';
// import { Navbar } from '../../utils/NavBar';
// import SideBar from '../../utils/Sidebar';
// import { ThemeContext } from '../../utils/ThemeContext';
// import { deviceDataReducer } from './store/Reducer';
// import AddDeviceModal from './model/addDeviceModal';
// import {
//   ALL_ROW_SELECTED,
//   DATE_DROPDOWN,
//   DIFF_DATE,
//   SEARCH_FIELD,
//   SORT_ICONS,
// } from './store/Types';
// import Pagination from '../../common/Pagination';

// export default function DeviceTable(){
//   const { theme } = React.useContext(ThemeContext);

  
//   const getModelCodeReducer = useSelector((state) => state.getModelCodeReducer);
//   const { data: projectType } = getModelCodeReducer;
//   console.log('firstget',getModelCodeReducer)

//   const deviceReducer = useSelector((state) =>state.deviceReducer);
//   // console.log("first",deviceReducer)
//   const {loading,data} = deviceReducer;
//   // console.log(loading)
//   // console.log(data)

//   const dispatch = useDispatch();

//   const initialState = {
//     tableDataState :{},
//     disableButton: false,
//     dateDropDown: false,
//     showTableField: false,

//     record: localStorage.getItem('selected_record')
//     ? JSON.parse(localStorage.getItem('selected_record'))
//     : 25,

//     projectCode: localStorage.getItem('project_type')
//     ? JSON.parse(localStorage.getItem('project_type')).typeCode
//     : projectType &&
//       projectType.modelList[0] &&
//       projectType.modelList[0].typeCode,

//     searchField: '',
//  /**
//      * @objectKey DI: Device Id,
//      * @objectKey LOC: Device Location-------------,
//      * @objectKey St: Error Type--------------,
//      */
//     sortIcons: {
//       DI: false,
//       LOC: false,
//       St: false,
//     },
//     singleRowSelect: false,
//     allRowSelect: false,
//   };
//   let navigate = useNavigate(); 
//   const routeChange = () =>{ 
//     let path = `/DeviceData?code=${code}&name=${projectName}`; 
//     navigate(path);
//   }

//   const [currentStateDevices,dispatchDeviceData] = useReducer(
//     deviceDataReducer,
//     initialState
//   );

//   const [currentPage,setCurrentPage] = useState(1); //current page set to 1
//   const[isCheckAll,setIsCheckAll] = useState(false);
//   const[isCheck,setIsCheck] = useState([]);
//   const [checkedLogs,setCheckedLogs] = useState([]);
//   const [modalShow,setModalShow] = useState(false);


//   const handleSelectAll = (e) =>{
//     setIsCheckAll(!isCheckAll);
//     setIsCheck(data?.data?.data.map((data)=>data._id));
//     setCheckedLogs(data?.data?.data);
//     if(isCheckAll){
//       setIsCheck([]);
//       setCheckedLogs([]);
//     }
//   };
// // console.log((data?.data?.data.map((data)=>data._id)))

// const handleClick = e => {
//   const { id, checked, name } = e.target;
//   setIsCheck([...isCheck, id]);
//   setCheckedLogs([...checkedLogs, JSON.parse(name)]);
//   if (!checked) {
//     setIsCheck(isCheck.filter((item) => item !== id));
//     setCheckedLogs(
//       checkedLogs.filter((item) => {
//         return item._id !== id;
//       })
//     );
//   }
// };

// useMemo(()=>{
//   const firstPageIndex = (currentPage - 1) * currentStateDevices.record;
//   const lastPageIndex = firstPageIndex + currentStateDevices.record;
//   return(
//     data && data.data && data.data.data.slice(firstPageIndex,lastPageIndex)
//   );
// },[currentPage]);


// const ref = useRef();

// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const code = urlParams.get('code');
// const projectName = urlParams.get('name');

// // const DateFilter = () => {
// //   dispatchDeviceData({
// //     type: DATE_DROPDOWN,
// //     data: !currentStateDevices.dateDropDown,
// //   });
// // };
//  //Navigation bar ==================================
// const navigation_details = {
//   name: projectName,
//   dashName: projectName,
//   link1: {
//     iconName: faDatabase,
//     linkName: 'Logs',
//     link: `/log_table?code=${code}&name=${projectName}`,
//   },
//   link2: {
//     iconName: faDatabase,
//     linkName: 'Settings',
//   },
//   link3:{
//     iconName:faDatabase,
//     linkName:"Alarms"
//   },
//   link4:{
//     iconName:faDatabase,
//     linkName:"Events"
//   }
// };

// const sidebar_details = {
//   name: projectName,
//   dashName: projectName,
//   link1: {
//     iconName: LogICon,
//     linkName: 'Logs',
//     link: `/log_table?code=${code}&name=${projectName}`,
//   },
//   link2: {
//     iconName: AlarmIcon,
//     linkName: 'Settings',
//     link: `/settings?code=${code}&name=${projectName}`,
//   },
//   link3: {
//     iconName: AlarmIcon,
//     linkName: 'alarm',
//     link: `/alarm?code=${code}&name=${projectName}`,
//   },
//   link4: {
//     iconName: `/assets/images/AlarmIcon.png`,
//     linkName: "Events",
//     link: `/events?code=${code}&name=${projectName}`, //to do   
//   },
// };

//  // @@ SEARCH MECHANISMS IMPLEMENTATION  STARTS HERE -----
//  const handleSearchFunc = (event) => {
//   dispatchDeviceData({
//     type: SEARCH_FIELD,
//     data: event.target.value,
//   });
// };
// let deviceFilter = data && data.data && data.data.data;
// console.log('df',deviceFilter)

// let search =
//     (currentStateDevices.searchField &&
//       currentStateDevices.searchField.trim() &&
//       currentStateDevices.searchField.trim().toLowerCase()) ||
//     '';

//   if (search.length > 0) {
//     deviceFilter = deviceFilter.filter((item) => {
//       return (
//         item.did.toLowerCase().includes(search) ||
//         item.ack.msg.toLowerCase().includes(search) ||
//         item.createdAt.toLowerCase().includes(search)
//       );
//     });
//   }
//   const callbackfnDispatchGetAllData = (sortType) => {
//     dispatch(
//       deviceAction(
//         code,
//         localStorage.getItem('project_type') &&
//           JSON.parse(localStorage.getItem('project_type')).typeCode,
//         currentStateDevices.diffDate,
//         currentStateDevices.page,
//         currentStateDevices.record,
//         sortType
//       )
//     );
//   };
//   // SORTING FUNCTION
//   // multple dispatch function for sorting
//   const multpleDispatchSort = (type, data) => {
//     return dispatchDeviceData({
//       type: type,
//       data: data,
//     });
//   };
//   const sortTableFnDI = (callbackDispatchAllData) => {
//     //Device Id Sorting
//     if (currentStateDevices.sortIcons.DI) {
//       return callbackDispatchAllData('-did');
//     } else if (!currentStateDevices.sortIcons.DI) {
//       multpleDispatchSort(SORT_ICONS, {
//         DI: true,
//         LOC: false,
//         St: false,
//       });
      
//       return callbackDispatchAllData('did');
//     }
//   };
//   const sortTableFnLOC = (callbackDispatchAllData) => {
//     // Device Location
//     if (currentStateDevices.sortIcons.LOC) {
//       return callbackDispatchAllData('-ack.code');
//     } else if (!currentStateDevices.sortIcons.LOC) {
//       multpleDispatchSort(SORT_ICONS, {
//         DI: false,
//         LOC: true,
//         St: false,
//       });
//       return callbackDispatchAllData('ack.code');
//     }
//   };
  
//   const sortTableFnSt = (callbackDispatchAllData) => {
//     // Device Status
//     if (currentStateDevices.sortIcons.St) {
//       return callbackDispatchAllData('-ack.msg');
//     } else if (!currentStateDevices.sortIcons.St) {
//       multpleDispatchSort(SORT_ICONS, {
//         DI: false,
//         LOC:false,
//         St: true,
//       });
//       return callbackDispatchAllData('ack.msg');
//     }
//   };


// useEffect(()=>{
//   dispatch(
//     deviceAction(
//       code,
//       currentStateDevices.projectCode
//     )
//   );
// },([dispatch,currentStateDevices.projectCode]))


// return (
//   <div>
//     <Row className="rowSection">
//       <Col xl={2} lg={2} md={2} sm={2} className="noSidebar colSection">
//         <SideBar
//           sidebar_details={sidebar_details}
//           className={Style.SideBarColume}
//         />
//       </Col>
//       <Col
//         xl={10}
//         lg={10}
//         md={10}
//         sm={10}
//         className={`${Style.NavbarColumn} colSection`}
//       >
//         <Navbar navigation_details={navigation_details} />
//         <h1 className=" darkModeColor">Device Summary</h1>
//         <Container style={{marginTop:'0px'}}>
//         {/* <Button 
//                      style={{ backgroundColor: "#1a83ff", marginLeft: "87%",marginTop:"5%",marginBottom:"0%", position:'relative'} }          
//                     >
//                       <section
//                       onClick={()=>setModalShow(true)}
//                       >
//                         Register New Device
//                       </section>
//                     </Button>
//                     <AddDeviceModal
//                     show={modalShow}
//                     onHide={()=>setModalShow(false)}
//                     /> */}
//           <Row className="mt-4">
                  
//             {/* <Col xl={10} md={9} sm={9}>
//               <TypeDropDown
//                 tableDataState={currentStateDevices.tableDataState}
//                 diffDate={currentStateDevices.diffDate}
//                 codeReducer={getModelCodeReducer}
//               />
//             </Col> */}

//             {/* DATE FILTER */}
//             {/* <Col xl={2} md={3} sm={3} className={Style.filterWithDate}>
//               <section className={Style.filterwithDate} ref={ref}>
//                 <section className={Style.datafilter} onClick={DateFilter}>
//                   <Image
//                     src={DateIcons}
//                     width="20px"
//                     style={{
//                       filter:
//                         'invert(45%) sepia(99%) saturate(341%) hue-rotate(135deg) brightness(91%) contrast(91%)',
//                     }}
//                   />
//                   <p
//                     style={{
//                       fontSize: '.9rem',
//                     }}
//                     className="m-2 darkModeColor"
//                   >
//                     {currentStateDevices.diffDate == 10
//                       ? `last 10 days`
//                       : currentStateDevices.diffDate == 7
//                       ? `last 7 days`
//                       : currentStateDevices.diffDate == 15
//                       ? `last 15 days`
//                       : currentStateDevices.diffDate == 30
//                       ? `last 30 days`
//                       : currentStateDevices.diffDate == 45
//                       ? `last 45 days`
//                       : currentStateDevices.diffDate == 60
//                       ? `last 60 days`
//                       : currentStateDevices.diffDate == 90
//                       ? `last 90 days`
//                       : null}
//                   </p>
//                   <FontAwesomeIcon
//                     icon={faCaretDown}
//                     color="#2A9AA4"
//                     style={{
//                       width: '10px',
//                       height: '20px',
//                       marginBottom: '2px',
//                     }}
//                   />
//                 </section>

//                 <section>
//                   {currentStateDevices.dateDropDown ? (
//                     <CustomeDropDown width="100%" zIndex="8">
//                       <p
//                         style={{ fontSize: '.8rem' }}
//                         className={`${Style.productVersion} mt-1 darkModeColor `}
//                         onClick={() => {
//                           dispatchAlertsData({
//                             type: DIFF_DATE,
//                             data: 7,
//                           });
//                           localStorage.setItem(
//                             'diffDate',
//                             currentStateDevices.diffDate
//                           );
//                           dispatchAlertsData({
//                             type: DATE_DROPDOWN,
//                             data: false,
//                           });
//                         }}
//                       >
//                         7 days
//                       </p>
//                       <p
//                         style={{ fontSize: '.8rem' }}
//                         className={`${Style.productVersion} mt-1 darkModeColor`}
//                         onClick={() => {
//                           dispatchAlertsData({
//                             type: DIFF_DATE,
//                             data: 15,
//                           });
//                           localStorage.setItem(
//                             'diffDate',
//                             currentStateDevices.diffDate
//                           );
//                           dispatchAlertsData({
//                             type: DATE_DROPDOWN,
//                             data: false,
//                           });
//                         }}
//                       >
//                         15 days
//                       </p>

//                       <p
//                         style={{ fontSize: '.8rem' }}
//                         className={`${Style.productVersion} mt-1 darkModeColor`}
//                         onClick={() => {
//                           dispatchAlertsData({
//                             type: DIFF_DATE,
//                             data: 30,
//                           });
//                           localStorage.setItem(
//                             'diffDate',
//                             currentStateDevices.diffDate
//                           );
//                           dispatchAlertsData({
//                             type: DATE_DROPDOWN,
//                             data: false,
//                           });
//                         }}
//                       >
//                         30 days
//                       </p>
//                       <p
//                         style={{ fontSize: '.8rem' }}
//                         className={`${Style.productVersion} mt-1 darkModeColor`}
//                         onClick={() => {
//                           dispatchAlertsData({
//                             type: DIFF_DATE,
//                             data: 45,
//                           });
//                           localStorage.setItem(
//                             'diffDate',
//                             currentStateDevices.diffDate
//                           );
//                           dispatchAlertsData({
//                             type: DATE_DROPDOWN,
//                             data: false,
//                           });
//                         }}
//                       >
//                         45 days
//                       </p>
//                       <p
//                         style={{ fontSize: '.8rem' }}
//                         className={`${Style.productVersion} mt-1 darkModeColor`}
//                         onClick={() => {
//                           dispatchAlertsData({
//                             type: DIFF_DATE,
//                             data: 60,
//                           });
//                           localStorage.setItem(
//                             'diffDate',
//                             currentStateDevices.diffDate
//                           );
//                           dispatchAlertsData({
//                             type: DATE_DROPDOWN,
//                             data: false,
//                           });
//                         }}
//                       >
//                         60 days
//                       </p>
//                       <p
//                         style={{ fontSize: '.8rem' }}
//                         className={`${Style.productVersion} mt-1 darkModeColor`}
//                         onClick={() => {
//                           dispatchAlertsData({
//                             type: DIFF_DATE,
//                             data: 90,
//                           });
//                           localStorage.setItem(
//                             'diffDate',
//                             currentStateDevices.diffDate
//                           );
//                           dispatchAlertsData({
//                             type: DATE_DROPDOWN,
//                             data: false,
//                           });
//                         }}
//                       >
//                         90 days
//                       </p>
//                     </CustomeDropDown>
//                   ) : null}
//                 </section>
//               </section>
//             </Col>  */}
//           </Row>
//           {/* Events  */}
//           <Row className="mt-0">
//             <Col>
//               <TableCard borderRadius="10px">
//                 {data && data.data && data.data.data.length > 0 && (
//                   <>
//                     <section className={`${Style.OuterTable} `}>
//                       <section className={Style.searchSection}>
//                         <input
//                           type="text"
//                           placeholder="Search..."
//                           value={currentStateDevices.searchField}
//                           onChange={handleSearchFunc}
//                         />
//                         <section
//                           id="download_button"
//                           disabled={checkedLogs?.length ? null : 'disabled'}
//                           style={{
//                             border: 'none',
//                             opacity: checkedLogs?.length ? '100%' : '40%',
//                           }}
//                           onClick={() =>
//                             downloadCSVFun({
//                               data: checkedLogs,
//                               fileName: `${code}-${
//                                 new Date().getDay() +
//                                 '-' +
//                                 new Date().getMonth() +
//                                 '-' +
//                                 new Date().getFullYear()
//                               }.csv`,
//                               fileType: 'text/csv;charset=utf-8;',
//                             })
//                           }
//                         >
//                           <section className={Style.filterGraphFirstSection}>
//                             <FontAwesomeIcon
//                               color="#0099a4"
//                               style={{ cursor: 'pointer' }}
//                               icon={faDownload}
//                             />
//                           </section>
//                         </section>
//                       </section>

//                       {/* TABLE HERE */}

//                       <section className={Style.alertTable}>
//                         <section className={Style.tableHeader}>
//                           <section
//                             style={{
//                               color: theme == 'light-theme' ? '#000' : '#fff',
//                             }}
//                           >
//                             <input
//                               type="checkbox"
//                               onChange={handleSelectAll}
//                               checked={isCheckAll}
//                               id="selectAll"
//                             />
//                           </section>
//                           <section className={Style.innerHeader}>
//                             <p
//                               style={{
//                                 marginRight: '10px',
//                                 color:
//                                   theme == 'light-theme' ? '#000' : '#fff',
//                                 fontWeight: '600',
//                                 fontSize: '.9rem',
//                               }}
//                             >
//                               Device Id
//                             </p>
//                             <FontAwesomeIcon
//                               color="#0099a4"
//                               style={{ cursor: 'pointer' ,display:'none'}}
//                               icon={
//                                 currentStateDevices.sortIcons.DI
//                                   ? faSortDown
//                                   : faSortUp
//                               }
//                               onClick={() => {
//                                 dispatchDeviceData({
//                                   type: SORT_ICONS,
//                                   data: {
//                                     ...currentStateDevices.sortIcons,
//                                     DI: !currentStateDevices.sortIcons.DI,
//                                   },
//                                 });
//                                 sortTableFnDI(callbackfnDispatchGetAllData);
//                               }}
//                             />
//                           </section>
        
//                           <section className={Style.innerHeader}>
//                             <p
//                               style={{
//                                 marginRight: '10px',
//                                 color:
//                                   theme == 'light-theme' ? '#000' : '#fff',
//                                 fontWeight: '600',
//                                 fontSize: '.9rem',
//                               }}
//                             >
//                               Alias Name
//                             </p>

//                             {/* <FontAwesomeIcon
//                               color="#0099a4"
//                               style={{ cursor: 'pointer' }}
//                               icon={
//                                 currentStateDevices.sortIcons.St
//                                   ? faSortDown
//                                   : faSortUp
//                               }
//                               onClick={() => {
//                                 dispatchDeviceData({
//                                   type: SORT_ICONS,
//                                   data: {
//                                     ...currentStateDevices.sortIcons,
//                                     St: !currentStateDevices.sortIcons.St,
//                                   },
//                                 });
//                                 sortTableFnSt(callbackfnDispatchGetAllData);
//                               }}
//                             /> */}
//                           </section>

//                           <section className={Style.innerHeader}>
//                             <p
//                               style={{
//                                 marginRight: '10px',
//                                 color:
//                                   theme == 'light-theme' ? '#000' : '#fff',
//                                 fontWeight: '600',
//                                 fontSize: '.9rem',
//                               }}
//                             >
//                               Hospital Name
//                             </p>

//                             {/* <FontAwesomeIcon
//                               color="#0099a4"
//                               style={{ cursor: 'pointer' }}
//                               icon={
//                                 currentStateDevices.sortIcons.St
//                                   ? faSortDown
//                                   : faSortUp
//                               }
//                               onClick={() => {
//                                 dispatchDeviceData({
//                                   type: SORT_ICONS,
//                                   data: {
//                                     ...currentStateDevices.sortIcons,
//                                     St: !currentStateDevices.sortIcons.St,
//                                   },
//                                 });
//                                 sortTableFnSt(callbackfnDispatchGetAllData);
//                               }}
//                             /> */}
//                           </section>
//                           <section className={Style.innerHeader}>
//                             <p
//                               style={{
//                                 marginRight: '10px',
//                                 color:
//                                   theme == 'light-theme' ? '#000' : '#fff',
//                                 fontWeight: '600',
//                                 fontSize: '.9rem',
//                               }}
//                             >
//                               Doctor Name
//                             </p>

//                             {/* <FontAwesomeIcon
//                               color="#0099a4"
//                               style={{ cursor: 'pointer' }}
//                               icon={
//                                 currentStateDevices.sortIcons.St
//                                   ? faSortDown
//                                   : faSortUp
//                               }
//                               onClick={() => {
//                                 dispatchDeviceData({
//                                   type: SORT_ICONS,
//                                   data: {
//                                     ...currentStateDevices.sortIcons,
//                                     St: !currentStateDevices.sortIcons.St,
//                                   },
//                                 });
//                                 sortTableFnSt(callbackfnDispatchGetAllData);
//                               }}
//                             /> */}
//                           </section>
//                           <section className={Style.innerHeader}>
//                             <p
//                               style={{
//                                 marginRight: '10px',
//                                 color:
//                                   theme == 'light-theme' ? '#000' : '#fff',
//                                 fontWeight: '600',
//                                 fontSize: '.9rem',
//                               }}
//                             >
//                               Ward Number
//                             </p>

//                             {/* <FontAwesomeIcon
//                               color="#0099a4"
//                               style={{ cursor: 'pointer' }}
//                               icon={
//                                 currentStateDevices.sortIcons.St
//                                   ? faSortDown
//                                   : faSortUp
//                               }
//                               onClick={() => {
//                                 dispatchDeviceData({
//                                   type: SORT_ICONS,
//                                   data: {
//                                     ...currentStateDevices.sortIcons,
//                                     St: !currentStateDevices.sortIcons.St,
//                                   },
//                                 });
//                                 sortTableFnSt(callbackfnDispatchGetAllData);
//                               }}
//                             /> */}
//                           </section>

//                           <section className={Style.innerHeader}>
//                             <p
//                               style={{
//                                 marginRight: '10px',
//                                 color:
//                                   theme == 'light-theme' ? '#000' : '#fff',
//                                 fontWeight: '600',
//                                 fontSize: '.9rem',
//                               }}
//                             >
//                               IMEI Number
//                             </p>

//                             {/* <FontAwesomeIcon
//                               color="#0099a4"
//                               style={{ cursor: 'pointer' }}
//                               icon={
//                                 currentStateDevices.sortIcons.St
//                                   ? faSortDown
//                                   : faSortUp
//                               }
//                               onClick={() => {
//                                 dispatchDeviceData({
//                                   type: SORT_ICONS,
//                                   data: {
//                                     ...currentStateDevices.sortIcons,
//                                     St: !currentStateDevices.sortIcons.St,
//                                   },
//                                 });
//                                 sortTableFnSt(callbackfnDispatchGetAllData);
//                               }}
//                             /> */}
//                           </section>
                          
//                           <section className={Style.innerHeader}>
//                             <p
//                               style={{
//                                 marginRight: '10px',
//                                 color:
//                                   theme == 'light-theme' ? '#000' : '#fff',
//                                 fontWeight: '600',
//                                 fontSize: '.9rem',
//                               }}
//                             >
//                               Ventilator Operator
//                             </p>

//                             {/* <FontAwesomeIcon
//                               color="#0099a4"
//                               style={{ cursor: 'pointer' }}
//                               icon={
//                                 currentStateDevices.sortIcons.St
//                                   ? faSortDown
//                                   : faSortUp
//                               }
//                               onClick={() => {
//                                 dispatchDeviceData({
//                                   type: SORT_ICONS,
//                                   data: {
//                                     ...currentStateDevices.sortIcons,
//                                     St: !currentStateDevices.sortIcons.St,
//                                   },
//                                 });
//                                 sortTableFnSt(callbackfnDispatchGetAllData);
//                               }}
//                             /> */}
//                           </section>
                          
                          
                          
                        
//                         </section>
            
//                         {deviceFilter.map((item, index) => {
//                           return (
//                             <React.Fragment key={item._id}>
//                               <section className={Style.tableBody}>
                                
//                                 <section>
//                                   <input
//                                     type="checkbox"
//                                     id={item._id}
//                                     name={JSON.stringify(item)}
//                                     onChange={handleClick}
//                                     checked={isCheck.includes(item._id)}
//                                   />
//                                 </section>
//                                 <section
//                                   style={{
//                                     color:
//                                       theme == 'light-theme' ? '' : '#fff',
                                      
//                                   }}
//                                 >
//                                 {item.DeviceId}
//                                 </section>
//                                 <section
//                                   style={{
//                                     color:
//                                       theme == 'light-theme' ? '' : '#fff',
//                                   }}
//                                 >
//                                   {item.AliasName}
//                                 </section>
//                                 <section
//                                   style={{
//                                     color:
//                                       theme == 'light-theme' ? '' : '#fff',
//                                   }}
//                                 >
//                                   {item.Hospital_Name}
//                                 </section>
//                                 <section
//                                   style={{
//                                     color:
//                                       theme == 'light-theme' ? '' : '#fff',
//                                   }}
//                                 >
//                                   {item.Doctor_Name}
//                                 </section>
//                                 <section
//                                   style={{
//                                     color:
//                                       theme == 'light-theme' ? '' : '#fff',
//                                   }}
//                                 >
//                                   {item.Ward_No}
//                                 </section>
//                                 <section
//                                   style={{
//                                     color:
//                                       theme == 'light-theme' ? '' : '#fff',
//                                   }}
//                                 >
//                                   {item.IMEI_NO}
//                                 </section>
//                                 <section
//                                   style={{
//                                     color:
//                                       theme == 'light-theme' ? '' : '#fff',
//                                   }}
//                                 >
//                                   {item.Ventilator_Operator}
//                                 </section>

//                                 <section
//                                   style={{
//                                     color:
//                                       theme == 'light-theme' ? '' : '#fff',
//                                   }}
//                                 >
//                                   <Button>Edit</Button>
//                                 </section>
                                
//                               </section>
//                             </React.Fragment>
//                           );
//                         })}
//                       </section>
//                     </section>
//                     <section className="p-2">
//                       <Pagination
//                         code={code}
//                         projectType={currentStateDevices.projectCode}
//                         currentPage={currentPage}
//                         totalCount={data?.data?.count ? data?.data?.count : 0}
//                         pageSize={currentStateDevices.record}
//                         onPageChange={(page) => setCurrentPage(page)}
//                       />
//                     </section>
//                   </>
//                 )}

//                 {data && data.data && data.data.data.length == 0 && (
//                   <section className={Style.noDataFound}>
//                     <p
//                       style={{
//                         color: theme == 'light-theme' ? `#000` : `#fff`,
//                       }}                     
//                     >
//                       No Data Found
//                     </p>
//                   </section>
//                 )}
//                 {loading && <SpinnerCustom />}
//               </TableCard>
//             </Col>
//           </Row>
//         </Container>
//       </Col>
//     </Row>
//   </div>
// );

// }