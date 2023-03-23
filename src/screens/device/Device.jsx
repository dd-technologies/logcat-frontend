/* eslint-disable */
import React, { useRef, useEffect, useReducer, useMemo, useState } from 'react';
import {
  faCaretDown,
  faDatabase,
  faDownload,
  faSortDown,
  faSortUp,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import {Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Container, Row, Col,Button} from 'react-bootstrap';
import Style from '../../css/DevicePage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import LogICon from '../../assets/icons/log.png';
import AlarmIcon from '../../assets/images/AlarmIcon.png';
import edit from '../../assets/icons/edit.png'; 
import SpinnerCustom from '../../container/SpinnerCustom';
import TableCard1 from '../../container/TableCard1';
import { deviceAction,getRegisteredDetailsById } from '../../store/action/DeviceAction';
import { Navbar } from '../../utils/NavBar';
import SideBar from '../../utils/Sidebar';
import { ThemeContext } from '../../utils/ThemeContext';
import { deviceDataReducer } from './store/Reducer';
import EditDetailsModal from './model/EditDetailsModal';
import UpdateDetailsModal from './model/UpdateDetailsModal';
import {
  ALL_ROW_SELECTED,
  DATE_DROPDOWN,
  DIFF_DATE,
  SEARCH_FIELD,
  SORT_ICONS,
} from './store/Types';
import Pagination from '../../common/Pagination';
import Dropdown from 'react-bootstrap/Dropdown';
import { flushSync } from 'react-dom';

export default function DeviceTable(){
  const { theme } = React.useContext(ThemeContext);

  const getAllDeviceLogsReducer = useSelector((state) => state.getAllDeviceLogsReducer);
  const { data: DeviceId } = getAllDeviceLogsReducer;
  // console.log('firstget',getAllDeviceLogsReducer)

  const deviceReducer = useSelector((state) =>state.deviceReducer);
  // console.log("first",deviceReducer)
  const {loading,data} = deviceReducer;
  // console.log(loading)
  // console.log(data)

  
  const getRegisteredDetailsReducer = useSelector((state)=>state.getRegisteredDetailsReducer);
  const {data12} = getRegisteredDetailsReducer;
  // console.log('first',data12)

  let regDetail = data12 && data12.data;
  // console.log('1212',regDetail)

  let deviceFilter = data && data.data && data.data.data;


  useEffect(()=>{
    dispatch(
      getRegisteredDetailsById(
        code,

      )
    )
  },([]))
  const dispatch = useDispatch();
  // if(data12.data.did == data.data.data.DeviceId){
  //   console.log(data.data.data.AliasName)
  // }

  const initialState = {
    tableDataState :{},
    disableButton: false,
    dateDropDown: false,
    showTableField: false,

    record: localStorage.getItem('selected_record')
    ? JSON.parse(localStorage.getItem('selected_record'))
    : 25,

    DeviceId: localStorage.getItem('DeviceId')
    ? JSON.parse(localStorage.getItem('DeviceId'))
    : DeviceId ,
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
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/deviceLogs?code=${code}&projectName=${projectName}&DeviceId=${item.did}`; 
    navigate(path);
  }

  const [currentStateDevices,dispatchDeviceData] = useReducer(
    deviceDataReducer,
    initialState
  );

  const [currentPage,setCurrentPage] = useState(1); //current page set to 1
  const[isCheckAll,setIsCheckAll] = useState(false);
  const[isCheck,setIsCheck] = useState([]);
  const [checkedLogs,setCheckedLogs] = useState([]);
  const [modalShow,setModalShow] = useState(false);
  const [modalShow1,setModalShow1] = useState(false);


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

useMemo(()=>{
  const firstPageIndex = (currentPage - 1) * currentStateDevices.record;
  const lastPageIndex = firstPageIndex + currentStateDevices.record;
  return(
    data && data.data && data.data.data.slice(firstPageIndex,lastPageIndex)
  );
},[currentPage]);


const ref = useRef();

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const code = urlParams.get('code');
const projectName = urlParams.get('name');
// console.log(projectName)


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

 // @@ SEARCH MECHANISMS IMPLEMENTATION  STARTS HERE -----
 const handleSearchFunc = (event) => {
  dispatchDeviceData({
    type: SEARCH_FIELD,
    data: event.target.value,
  });
};
let search =
    (currentStateDevices.searchField &&
      currentStateDevices.searchField.trim() &&
      currentStateDevices.searchField.trim().toLowerCase()) ||
    '';

  // if (search.length > 0) {
  //   deviceFilter = deviceFilter.filter((item) => {
  //     return (
  //       item.did.toLowerCase().includes(search) ||
  //       item.ack.msg.toLowerCase().includes(search) ||
  //       item.createdAt.toLowerCase().includes(search)
  //     );
  //   });
  // }
  const callbackfnDispatchGetAllData = (sortType) => {
    dispatch(
      deviceAction(
        code,
        localStorage.getItem('project_type') &&
          JSON.parse(localStorage.getItem('project_type')).typeCode,
        currentStateDevices.diffDate,
        currentStateDevices.page,
        currentStateDevices.record,
        sortType
      )
    );
  };

useEffect(()=>{
  dispatch(
    deviceAction(
      code,
      currentStateDevices.projectCode
    )
  );
},([dispatch,currentStateDevices.projectCode]))

return (
  <div>
    <Row className="rowSection">
      <Col xl={2} lg={2} md={2} sm={2} className="noSidebar colSection">
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
        <h4 className={Style.Header} style={{marginLeft:'40px',paddingBottom:"20px"}}>Device Summary</h4>
        <Container className={Style.Container}  style={{marginLeft:'50px',marginTop:'0px'}}>
           
          {/* Events  */}
          <Row className="mt-0">
            <Col>
              <TableCard1 borderRadius="10px">
                {data && data.data && data.data.data.length > 0 && (
                  <>
                    <section className={`${Style.OuterTable} `}>
                      <section className={Style.searchSection}>
                        <input
                          type="text"
                          placeholder="Search..."
                          value={currentStateDevices.searchField}
                          onChange={handleSearchFunc}
                        />
                        <section
                          id="download_button"
                          disabled={checkedLogs?.length ? null : 'disabled'}
                          style={{
                            border: 'none',
                            opacity: checkedLogs?.length ? '100%' : '40%',
                          }}
                          onClick={() =>
                            downloadCSVFun({
                              data: checkedLogs,
                              fileName: `${code}-${
                                new Date().getDay() +
                                '-' +
                                new Date().getMonth() +
                                '-' +
                                new Date().getFullYear()
                              }.csv`,
                              fileType: 'text/csv;charset=utf-8;',
                            })
                          }
                        >
                          <section className={Style.filterGraphFirstSection}>
                            <FontAwesomeIcon
                              color="#0099a4"
                              style={{ cursor: 'pointer' }}
                              icon={faDownload}
                            />
                          </section>
                        </section>
                      </section>

                      {/* TABLE HERE */}

                      <section className={Style.alertTable}>
                        <section className={Style.tableHeader}>
                          <section
                            style={{
                              color: theme == 'light-theme' ? '#000' : '#fff',
                            }}
                          >
                            <input
                              type="checkbox"
                              onChange={handleSelectAll}
                              checked={isCheckAll}
                              id="selectAll"
                            
                            />
                          </section>
                          <section className={Style.innerHeader}>
                            <p
                              style={{
                                marginRight: '10px',
                                color:
                                  theme == 'light-theme' ? '#000' : '#fff',
                                fontWeight: '600',
                                fontSize: '.9rem',
                              }}
                            >
                              Device Id
                            </p>
                            <FontAwesomeIcon
                              color="#0099a4"
                              style={{ cursor: 'pointer' ,display:'none'}}
                              icon={
                                currentStateDevices.sortIcons.DI
                                  ? faSortDown
                                  : faSortUp
                              }
                              onClick={() => {
                                dispatchDeviceData({
                                  type: SORT_ICONS,
                                  data: {
                                    ...currentStateDevices.sortIcons,
                                    DI: !currentStateDevices.sortIcons.DI,
                                  },
                                });
                                sortTableFnDI(callbackfnDispatchGetAllData);
                              }}
                            />
                          </section>
        
                          <section className={Style.innerHeader}>
                            <p
                              style={{
                                marginRight: '10px',
                                color:
                                  theme == 'light-theme' ? '#000' : '#fff',
                                fontWeight: '600',
                                fontSize: '.9rem',
                              }}
                            >
                              Alias Name
                            </p>

                            {/* <FontAwesomeIcon
                              color="#0099a4"
                              style={{ cursor: 'pointer' }}
                              icon={
                                currentStateDevices.sortIcons.St
                                  ? faSortDown
                                  : faSortUp
                              }
                              onClick={() => {
                                dispatchDeviceData({
                                  type: SORT_ICONS,
                                  data: {
                                    ...currentStateDevices.sortIcons,
                                    St: !currentStateDevices.sortIcons.St,
                                  },
                                });
                                sortTableFnSt(callbackfnDispatchGetAllData);
                              }}
                            /> */}
                          </section>

                          <section className={Style.innerHeader}>
                            <p
                              style={{
                                marginRight: '10px',
                                color:
                                  theme == 'light-theme' ? '#000' : '#fff',
                                fontWeight: '600',
                                fontSize: '.9rem',
                              }}
                            >
                              Hospital Name
                            </p>

                            {/* <FontAwesomeIcon
                              color="#0099a4"
                              style={{ cursor: 'pointer' }}
                              icon={
                                currentStateDevices.sortIcons.St
                                  ? faSortDown
                                  : faSortUp
                              }
                              onClick={() => {
                                dispatchDeviceData({
                                  type: SORT_ICONS,
                                  data: {
                                    ...currentStateDevices.sortIcons,
                                    St: !currentStateDevices.sortIcons.St,
                                  },
                                });
                                sortTableFnSt(callbackfnDispatchGetAllData);
                              }}
                            /> */}
                          </section>
                          <section className={Style.innerHeader}>
                            <p
                              style={{
                                marginRight: '10px',
                                color:
                                  theme == 'light-theme' ? '#000' : '#fff',
                                fontWeight: '600',
                                fontSize: '.9rem',
                              }}
                            >
                              Doctor Name
                            </p>

                            {/* <FontAwesomeIcon
                              color="#0099a4"
                              style={{ cursor: 'pointer' }}
                              icon={
                                currentStateDevices.sortIcons.St
                                  ? faSortDown
                                  : faSortUp
                              }
                              onClick={() => {
                                dispatchDeviceData({
                                  type: SORT_ICONS,
                                  data: {
                                    ...currentStateDevices.sortIcons,
                                    St: !currentStateDevices.sortIcons.St,
                                  },
                                });
                                sortTableFnSt(callbackfnDispatchGetAllData);
                              }}
                            /> */}
                          </section>
                          <section className={Style.innerHeader}>
                            <p
                              style={{
                                marginRight: '10px',
                                color:
                                  theme == 'light-theme' ? '#000' : '#fff',
                                fontWeight: '600',
                                fontSize: '.9rem',
                              }}
                            >
                              Ward Number
                            </p>

                            {/* <FontAwesomeIcon
                              color="#0099a4"
                              style={{ cursor: 'pointer' }}
                              icon={
                                currentStateDevices.sortIcons.St
                                  ? faSortDown
                                  : faSortUp
                              }
                              onClick={() => {
                                dispatchDeviceData({
                                  type: SORT_ICONS,
                                  data: {
                                    ...currentStateDevices.sortIcons,
                                    St: !currentStateDevices.sortIcons.St,
                                  },
                                });
                                sortTableFnSt(callbackfnDispatchGetAllData);
                              }}
                            /> */}
                          </section>

                          <section className={Style.innerHeader}>
                            <p
                              style={{
                                marginRight: '10px',
                                color:
                                  theme == 'light-theme' ? '#000' : '#fff',
                                fontWeight: '600',
                                fontSize: '.9rem',
                              }}
                            >
                              IMEI Number
                            </p>

                            {/* <FontAwesomeIcon
                              color="#0099a4"
                              style={{ cursor: 'pointer' }}
                              icon={
                                currentStateDevices.sortIcons.St
                                  ? faSortDown
                                  : faSortUp
                              }
                              onClick={() => {
                                dispatchDeviceData({
                                  type: SORT_ICONS,
                                  data: {
                                    ...currentStateDevices.sortIcons,
                                    St: !currentStateDevices.sortIcons.St,
                                  },
                                });
                                sortTableFnSt(callbackfnDispatchGetAllData);
                              }}
                            /> */}
                          </section>
                          
                          <section className={Style.innerHeader}>
                            <p
                              style={{
                                marginRight: '10px',
                                color:
                                  theme == 'light-theme' ? '#000' : '#fff',
                                fontWeight: '600',
                                fontSize: '.9rem',
                              }}
                            >
                              Ventilator Operator
                            </p>

                            {/* <FontAwesomeIcon
                              color="#0099a4"
                              style={{ cursor: 'pointer' }}
                              icon={
                                currentStateDevices.sortIcons.St
                                  ? faSortDown
                                  : faSortUp
                              }
                              onClick={() => {
                                dispatchDeviceData({
                                  type: SORT_ICONS,
                                  data: {
                                    ...currentStateDevices.sortIcons,
                                    St: !currentStateDevices.sortIcons.St,
                                  },
                                });
                                sortTableFnSt(callbackfnDispatchGetAllData);
                              }}
                            /> */}
                          </section>
                          <section className={Style.innerHeader}>
                            <p
                              style={{
                                marginRight: '10px',
                                color:
                                  theme == 'light-theme' ? '#000' : '#fff',
                                fontWeight: '600',
                                fontSize: '.9rem',
                              }}
                            >
                              Action
                            </p>
                            <p
                              style={{
                                marginRight: '10px',
                                color:
                                  theme == 'light-theme' ? '#000' : '#fff',
                                fontWeight: '600',
                                fontSize: '.9rem',
                              }}
                            >
                            </p>
                            </section>
                        </section>          
                      <div>
                      {/* {console.log('details',{details})} */}
                        {deviceFilter && deviceFilter
                        .filter((item,index)=>
                        deviceFilter.findIndex(obj => obj.did === item.did)===index)
                        .map((item,_id) => {
                          return (
                            <React.Fragment key={_id}>
                              {/* {console.log(item)} */}
                              <section className={Style.tableBody}>
                                
                                <section>
                                  <input
                                    type="checkbox"
                                    id={item._id}
                                    name={JSON.stringify(item)}
                                    onChange={handleClick}
                                    checked={isCheck.includes(item._id)}
                                  />
                                </section>
                                <section
                                  style={{
                                    color:
                                      theme == 'light-theme' ? '' : '#fff',
                                      
                                  }}
                                >
                                  {/* {console.log('key',_id)} */}
                             <Link to={`/deviceEvents?code=${code}&projectName=${projectName}&DeviceId=${item.did}`} onClick={routeChange} style={{textDecoration:"none",color:theme == 'light-theme' ? 'black' : '#fff',}}>{item.did}</Link>
                             {/* {localStorage.setItem('DeviceId',JSON.stringify(item.did))} */}
                                {/* {console.log('did',item.did)} */}
                                </section>
                                {regDetail && regDetail
                                .filter((item1,index)=>
                                regDetail.findIndex(item1 => item.did === item1.DeviceId)===index)
                                .map((item1,_id)=>{
                                  return(
                                   <React.Fragment key={_id}>
                                    <section
                                  style={{
                                    color:
                                      theme == 'light-theme' ? '' : '#fff',
                                  }}
                                >
                                  {item1.AliasName}
                                </section>
                                <section
                                  style={{
                                    color:
                                      theme == 'light-theme' ? '' : '#fff',
                                  }}
                                >
                                  {item1.Hospital_Name}
                                </section>
                                <section
                                  style={{
                                    color:
                                      theme == 'light-theme' ? '' : '#fff',
                                  }}
                                >
                                  {item1.Doctor_Name}
                                </section>
                                <section
                                  style={{
                                    color:
                                      theme == 'light-theme' ? '' : '#fff',
                                  }}
                                >
                                  {item1.Ward_No}
                                </section>
                                <section
                                  style={{
                                    color:
                                      theme == 'light-theme' ? '' : '#fff',
                                  }}
                                >
                                  {item1.IMEI_NO}
                                </section>
                                <section
                                  style={{
                                    color:
                                      theme == 'light-theme' ? '' : '#fff',
                                  }}
                                >
                                  {item1.Ventilator_Operator}
                                </section>    
                                <section className='d-flex' style={{gap:'5px'}}>
         <Button style={{display:'none'}}
            onClick={()=>{
            setModalShow(true);
           // setModalData(item);
           {item}                            
            // console.log(item)
           // console.log({...item})
           localStorage.setItem('DeviceId',JSON.stringify(item.did))
           }
         }
         >
          Register
        </Button>

      <EditDetailsModal 
      show={modalShow}
      onHide={()=>setModalShow(false)} 
      {...item}
      item = {JSON.parse(localStorage.getItem('DeviceId'))}
      />
      <Button title='Update'
      onClick={()=>{
      setModalShow1(true);
      {item1}  
      console.log({...item1})
      {localStorage.setItem('item1',JSON.stringify(item1))}
      {localStorage.setItem('AliasName',JSON.stringify(item1.AliasName))}                                             
      }}
    >
    {/* Update */}
    {<Image width="20" height="20" src={edit} className={Style.Image}/>}
    </Button>
    <Button title='Register'
      onClick={()=>{
      setModalShow(true);
      {item}                            
      localStorage.setItem('DeviceId',JSON.stringify(item.did))
      }
      }
      >
      {<Image width="20" height="20" src={edit} className={Style.Image}/>}
      </Button>

      <EditDetailsModal 
      show={modalShow}
      onHide={()=>setModalShow(false)} 
      {...item}
      item = {JSON.parse(localStorage.getItem('DeviceId'))}
      />
      <UpdateDetailsModal
        show={modalShow1}
        onHide={()=>setModalShow1(false)}
        {...item1}
        {...console.log(item1)}
      />
      </section>                       
      </React.Fragment>
   )
 })
}

   </section>   
   </React.Fragment>
    );
  })}
  </div>
          </section>
                    </section>
                    <section className="p-2">
                      <Pagination
                        code={code}
                        projectType={currentStateDevices.projectCode}
                        currentPage={currentPage}
                        totalCount={data?.data?.count ? data?.data?.count : 0}
                        pageSize={currentStateDevices.record}
                        onPageChange={(page) => setCurrentPage(page)}
                      />
                    </section>
                  </>
                )}
                {data12 && data12.data12  == 0 && (
                  <section className={Style.noDataFound}>
                    <p
                      style={{
                        color: theme == 'light-theme' ? `#000` : `#fff`,
                      }}                     
                    >
                      No Data Found
                    </p>
                  </section>
                )}
                {loading && <SpinnerCustom />}
              </TableCard1>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  </div>
);


}

