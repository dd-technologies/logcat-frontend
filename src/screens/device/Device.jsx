/* eslint-disable */

import React, { useRef, useEffect, useReducer, useMemo, useState } from 'react';
import {
  faCaretDown,
  faDatabase,
  faDownload,
  faSortDown,
  faSortUp,
} from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Style from '../../css/AlertsNew.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import DateIcons from '../../assets/icons/date.png';
import LogICon from '../../assets/icons/log.png';
import AlarmIcon from '../../assets/images/AlarmIcon.png';
import CustomeDropDown from '../../container/DropDown';
import SpinnerCustom from '../../container/SpinnerCustom';
import TableCard from '../../container/TableCard';
import TypeDropDown from '../logs/components/table/TypeDropDown';
import { deviceAction } from '../../store/action/DeviceAction';
import { Navbar } from '../../utils/NavBar';
import SideBar from '../../utils/Sidebar';
import { ThemeContext } from '../../utils/ThemeContext';
import { deviceDataReducer } from './store/Reducer';
import {
  ALL_ROW_SELECTED,
  DATE_DROPDOWN,
  DIFF_DATE,
  SEARCH_FIELD,
  SORT_ICONS,
} from './store/Types';
import Pagination from '../../common/Pagination';

export default function DeviceTable() {
  const { theme } = React.useContext(ThemeContext);

  // REDUX REDUCER=========================================================

//   const getModelCodeReducer = useSelector((state) => state.getModelCodeReducer);
//   const { data: dev } = getModelCodeReducer;

  const deviceReducer = useSelector((state) => state.deviceReducer);
  // console.log("first", deviceReducer);
  const { loading, data } = deviceReducer;
  console.log('data',data)
// console.log("deviceReducer", deviceReducer);

  // USE DISPATCH
  const dispatch = useDispatch();
  // state===============use Reducer==================================================

  const initialState = {
    tableDataState: {},
    diffDate: localStorage.getItem('diffDate') || 90,
    disableButton: false,
    dateDropDown: false,
    showTableField: false,

    record: localStorage.getItem('selected_record')
      ? JSON.parse(localStorage.getItem('selected_record'))
      : 10 ,

    // projectCode: localStorage.getItem('project_type')
    //   ? JSON.parse(localStorage.getItem('project_type')).typeCode
    //   : projectType &&
    //     projectType.modelList[0] &&
    //     projectType.modelList[0].typeCode,

    searchField: '',

    /**
     * @objectKey MA: Mac Address--------------,
     * @objectKey LM: Log Message-------------,
     * @objectKey ET: Error Type--------------,
     * @objectKey DT: Date--------------------,
     * @objectKey TI: Time--------------------,
     */

    sortIcons: {
      DI: false,
      CD: false,
      LM: false,
      DA: false,
      TI: false,
    },
    singleRowSelect: false,
    allRowSelect: false,
  };

  const [currentStateDevice, dispatchDeviceData] = useReducer(
    deviceDataReducer,
    initialState
  );

  const [currentPage, setCurrentPage] = useState(1);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [checkedLogs, setCheckedLogs] = useState([]);

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data?.data?.device.map((device) => device._id));
    setCheckedLogs(data?.data?.device);
    if (isCheckAll) {
      setIsCheck([]);
      setCheckedLogs([]);
    }
  };

  const handleClick = (e) => {
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

  useMemo(() => 
  {
    const firstPageIndex = (currentPage - 1) * currentStateDevice.record;
    const lastPageIndex = firstPageIndex + currentStateDevice.record;
    
    return (
      data && data.data && data.data.device.slice(firstPageIndex,lastPageIndex)
    );
  }, [currentPage]);

  const ref = useRef();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('code');
  const projectName = urlParams.get('name');

  // DATE FILTER
  // Filter crash free STATICS & Trend wrt to date
  const DateFilter = () => {
    dispatchDeviceData({
      type: DATE_DROPDOWN,
      data: !currentStateDevice.dateDropDown,
    });
  };

  // navigation=================================================================

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

  let deviceFilter = data && data.data && data.data.device;
  // console.log('deviceFilter',deviceFilter)

  let search =
    (currentStateDevice.searchField &&
      currentStateDevice.searchField.trim() &&
      currentStateDevice.searchField.trim().toLowerCase()) ||
    '';

  if (search.length > 0) {
    deviceFilter = deviceFilter.filter((item) => {
      return (
        item.did.toLowerCase().includes(search) ||
        item.ack.msg.toLowerCase().includes(search) ||
        item.createdAt.toLowerCase().includes(search)
      );
    });
  }

  const callbackfnDispatchGetAllData = (sortType) => {
    dispatch(
      deviceAction(
        code,
        localStorage.getItem('project_type') &&
          JSON.parse(localStorage.getItem('project_type')).typeCode,
        currentStateDevice.diffDate,
        currentStateDevice.page,
        currentStateDevice.record,
        sortType
      )
    );
  };

  // SORTING FUNCTION
  // multple dispatch function for sorting
  const multpleDispatchSort = (type, data) => {
    return dispatchDeviceData({
      type: type,
      data: data,
    });
  };
  const sortTableFnCD = (callbackDispatchAllData) => {
    // AD-- mac address
    if (currentStateDevice.sortIcons.CD) {
      return callbackDispatchAllData('-ack.code');
    } else if (!currentStateDevice.sortIcons.CD) {
      multpleDispatchSort(SORT_ICONS, {
        DI: false,
        CD: true,
        LM: false,
        DA: false,
        TI: false,
      });
      return callbackDispatchAllData('ack.code');
    }
  };

  const sortTableFnDT = (callbackDispatchAllData) => {
    // DT -- date TI-- time
    if (currentStateDevice.sortIcons.DA || currentStateDevice.sortIcons.TI) {
      return callbackDispatchAllData('-ack.date');
    } else if (
      !currentStateDevice.sortIcons.DA ||
      !currentStateDevice.sortIcons.TI
    ) {
      multpleDispatchSort(SORT_ICONS, {
        DI: false,
        CD: false,
        LM: false,
        DA: true,
        TI: true,
      });
      return callbackDispatchAllData('ack.date');
    }
  };

  // @@ all checkbox selection function
  const allCheckBoxSelectFn = () => {
    dispatchDeviceData({
      type: ALL_ROW_SELECTED,
      data: !currentStateDevice.allRowSelect,
    });
  };

  // Use Effect Section =================================================

  //   FIRST TIME ALARM ACTION DISPATCH
  useEffect(() => {
    dispatch(
      deviceAction(
        code,
        currentStateDevice.projectCode,
        currentStateDevice.diffDate
      )
    );
  }, [dispatch, currentStateDevice.projectCode, currentStateDevice.diffDate]);

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
          <Container className={Style.mainContainer}>
            <h1 className=" darkModeColor">Device Summary</h1>
            <Row className="mt-4">
              <Col xl={10} md={9} sm={9}>
                {/* <TypeDropDown
                  tableDataState={currentStateDevice.tableDataState}
                  diffDate={currentStateDevice.diffDate}
                  codeReducer={getModelCodeReducer}
                /> */}
              </Col>

              {/* DATE FILTER */}
              {/* <Col xl={2} md={3} sm={3} className={Style.filterWithDate}>
                <section className={Style.filterwithDate} ref={ref}>
                  <section className={Style.datafilter} onClick={DateFilter}>
                    {/* <Image
                      src={DateIcons}
                      width="20px"
                      style={{
                        filter:
                          'invert(45%) sepia(99%) saturate(341%) hue-rotate(135deg) brightness(91%) contrast(91%)',
                      }}
                    /> */}
                    {/* <p
                      style={{
                        fontSize: '.9rem',
                      }}
                      className="m-2 darkModeColor"
                    >
                      {currentStateDevice.diffDate == 10
                        ? `last 10 days`
                        : currentStateDevice.diffDate == 7
                        ? `last 7 days`
                        : currentStateDevice.diffDate == 15
                        ? `last 15 days`
                        : currentStateDevice.diffDate == 30
                        ? `last 30 days`
                        : currentStateDevice.diffDate == 45
                        ? `last 45 days`
                        : currentStateDevice.diffDate == 60
                        ? `last 60 days`
                        : currentStateDevice.diffDate == 90
                        ? `last 90 days`
                        : null}
                    </p> */}
                    {/* <FontAwesomeIcon
                      icon={faCaretDown}
                      color="#2A9AA4"
                      style={{
                        width: '10px',
                        height: '20px',
                        marginBottom: '2px',
                      }}
                    />
                  </section> */}

                  {/* <section>
                    {currentStateDevice.dateDropDown ? (
                      <CustomeDropDown width="100%" zIndex="8">
                        <p
                          style={{ fontSize: '.8rem' }}
                          className={`${Style.productVersion} mt-1 darkModeColor `}
                          onClick={() => {
                            dispatchDeviceData({
                              type: DIFF_DATE,
                              data: 7,
                            });
                            localStorage.setItem(
                              'diffDate',
                              currentStateDevice.diffDate
                            );
                            dispatchDeviceData({
                              type: DATE_DROPDOWN,
                              data: false,
                            });
                          }}
                        >
                          7 days
                        </p>
                        <p
                          style={{ fontSize: '.8rem' }}
                          className={`${Style.productVersion} mt-1 darkModeColor`}
                          onClick={() => {
                            dispatchDeviceData({
                              type: DIFF_DATE,
                              data: 15,
                            });
                            localStorage.setItem(
                              'diffDate',
                              currentStateDevice.diffDate
                            );
                            dispatchDeviceData({
                              type: DATE_DROPDOWN,
                              data: false,
                            });
                          }}
                        >
                          15 days
                        </p>

                        <p
                          style={{ fontSize: '.8rem' }}
                          className={`${Style.productVersion} mt-1 darkModeColor`}
                          onClick={() => {
                            dispatchDeviceData({
                              type: DIFF_DATE,
                              data: 30,
                            });
                            localStorage.setItem(
                              'diffDate',
                              currentStateDevice.diffDate
                            );
                            dispatchDeviceData({
                              type: DATE_DROPDOWN,
                              data: false,
                            });
                          }}
                        >
                          30 days
                        </p>
                        <p
                          style={{ fontSize: '.8rem' }}
                          className={`${Style.productVersion} mt-1 darkModeColor`}
                          onClick={() => {
                            dispatchDeviceData({
                              type: DIFF_DATE,
                              data: 45,
                            });
                            localStorage.setItem(
                              'diffDate',
                              currentStateDevice.diffDate
                            );
                            dispatchDeviceData({
                              type: DATE_DROPDOWN,
                              data: false,
                            });
                          }}
                        >
                          45 days
                        </p>
                        <p
                          style={{ fontSize: '.8rem' }}
                          className={`${Style.productVersion} mt-1 darkModeColor`}
                          onClick={() => {
                            dispatchDeviceData({
                              type: DIFF_DATE,
                              data: 60,
                            });
                            localStorage.setItem(
                              'diffDate',
                              currentStateDevice.diffDate
                            );
                            dispatchDeviceData({
                              type: DATE_DROPDOWN,
                              data: false,
                            });
                          }}
                        >
                          60 days
                        </p>
                        <p
                          style={{ fontSize: '.8rem' }}
                          className={`${Style.productVersion} mt-1 darkModeColor`}
                          onClick={() => {
                            dispatchDeviceData({
                              type: DIFF_DATE,
                              data: 90,
                            });
                            localStorage.setItem(
                              'diffDate',
                              currentStateDevice.diffDate
                            );
                            dispatchDeviceData({
                              type: DATE_DROPDOWN,
                              data: false,
                            });
                          }}
                        >
                          90 days
                        </p>
                      </CustomeDropDown>
                    ) : null}
                  </section> */}
                {/* </section> */}
              {/* </Col> */} 
            </Row>
            {/* Events  */}
            <Row className="mt-4">
              <Col>
                <TableCard borderRadius="10px">
                  {data && data.data && data.data.device.length > 0 && (
                    <>
                      <section className={`${Style.OuterTable} `}>
                        <section className={Style.searchSection}>
                          <input
                            type="text"
                            placeholder="Search..."
                            value={currentStateDevice.searchField}
                            onChange={handleSearchFunc}
                          />
                          <section
                            id="download_button"
                            disabled={checkedLogs?.length ? null : 'disabled'}
                            style={{
                              border: 'none',
                              opacity: checkedLogs?.length ? '100%' : '40%',
                            }}
                            // onClick={() =>
                            //   downloadCSVFun({
                            //     data: checkedLogs,
                            //     fileName: `${code}-${
                            //       new Date().getDay() +
                            //       '-' +
                            //       new Date().getMonth() +
                            //       '-' +
                            //       new Date().getFullYear()
                            //     }.csv`,
                            //     fileType: 'text/csv;charset=utf-8;',
                            //   })
                            // }
                          >
                            {/* <section className={Style.filterGraphFirstSection}>
                              <FontAwesomeIcon
                                color="#0099a4"
                                style={{ cursor: 'pointer' }}
                                icon={faDownload}
                              />
                            </section> */}
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
                                style={{ cursor: 'pointer' }}
                                icon={
                                  currentStateDevice.sortIcons.DI
                                    ? faSortDown
                                    : faSortUp
                                }
                                onClick={() => {
                                  dispatchDeviceData({
                                    type: SORT_ICONS,
                                    data: {
                                      ...currentStateDevice.sortIcons,
                                      DI: !currentStateDevice.sortIcons.DI,
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
                                Date
                              </p>
                              <FontAwesomeIcon
                                color="#0099a4"
                                style={{ cursor: 'pointer' }}
                                icon={
                                  currentStateDevice.sortIcons.DT
                                    ? faSortDown
                                    : faSortUp
                                }
                                onClick={() => {
                                  dispatchDeviceData({
                                    type: SORT_ICONS,
                                    data: {
                                      ...currentStateDevice.sortIcons,
                                      DT: !currentStateDevice.sortIcons.DT,
                                    },
                                  });
                                  sortTableFnDT(callbackfnDispatchGetAllData);
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
                                Time
                              </p>
                              <FontAwesomeIcon
                                color="#0099a4"
                                style={{ cursor: 'pointer' }}
                                icon={
                                  currentStateDevice.sortIcons.TI
                                    ? faSortDown
                                    : faSortUp
                                }
                                onClick={() => {
                                  dispatchDeviceData({
                                    type: SORT_ICONS,
                                    data: {
                                      ...currentStateDevice.sortIcons,
                                      TI: !currentStateDevice.sortIcons.TI,
                                    },
                                  });
                                  sortTableFnDT(callbackfnDispatchGetAllData);
                                }}
                              />
                            </section>
                          </section>
                          {deviceFilter.map((item, index) => {
                            return (
                              <React.Fragment key={item._id}>
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
                                    {item.did}
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme == 'light-theme' ? '' : '#fff',
                                    }}
                                  >
                                    {item.ack.msg || `N/A`}
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme == 'light-theme' ? '' : '#fff',
                                    }}
                                  >
                                    {item.ack.date.split('T')[0]}
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme == 'light-theme' ? '' : '#fff',
                                    }}
                                  >
                                    {item.ack.date.split('T')[1].split('.')[0]}
                                  </section>
                                </section>
                              </React.Fragment>
                            );
                          })}
                        </section>
                      </section>
                      <section className="p-2">
                        <Pagination
                          code={code}
                          projectType={currentStateDevice.projectCode}
                          diffdate={currentStateDevice.diffDate}
                          currentPage={currentPage}
                          totalCount={data?.data?.count ? data?.data?.count : 0}
                          pageSize={currentStateDevice.record}
                          onPageChange={(page) => setCurrentPage(page)}
                        />
                      </section>
                    </>
                  )}

                  {data && data.data && data.data.device.length == 0 && (
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
                </TableCard>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
}
