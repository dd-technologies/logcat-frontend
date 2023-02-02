import React, {useRef,useReducer,useEffect,useMemo,useState} from 'react';
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
  import {getDeviceLogsById}from '../../store/action/DeviceAction';
  import SideBar from '../../utils/Sidebar';
  import { Navbar } from '../../utils/NavBar';
  import { ThemeContext } from '../../utils/ThemeContext';
 import CustomeDropDown from '../../container/DropDown';
 import SpinnerCustom from '../../container/SpinnerCustom';
 import DateIcons from '../../assets/icons/date.png';
 import LogICon from '../../assets/icons/log.png';
 import AlarmIcon from '../../assets/images/AlarmIcon.png';
 import TableCard from '../../container/TableCard';
 import TypeDropDown from '../logs/components/table/TypeDropDown';
  import { deviceDataReducer } from './store/Reducer';
  import {
    ALL_ROW_SELECTED,
    DATE_DROPDOWN,
    DIFF_DATE,
    SEARCH_FIELD,
    SORT_ICONS,
  } from './store/Types';
  import Pagination from '../../common/Pagination';
import { getModelCodeReducer } from '../../store/reducer/ProjectReducer';
  

  export default function DeviceData(){
    const {theme} = React.useContext(ThemeContext);

    const getModelCodeReducer = useSelector((state)=>state.getModelCodeReducer);
    const{data:projectType} = getModelCodeReducer;

    const getAllLogByDeviceIdReducer = useSelector((state)=>state.getAllLogByDeviceIdReducer);
    const {loading,data} = getAllLogByDeviceIdReducer;

    const dispatch = useDispatch();

    const initialState = {
    tableDataState: {},
    diffDate: localStorage.getItem('diffDate') || 90,
    disableButton: false,
    dateDropDown: false,
    showTableField: false,

    record: localStorage.getItem('selected_record')
      ? JSON.parse(localStorage.getItem('selected_record'))
      : 25,

    projectCode: localStorage.getItem('project_type')
      ? JSON.parse(localStorage.getItem('project_type')).typeCode
      : projectType &&
        projectType.modelList[0] &&
        projectType.modelList[0].typeCode,

    searchField: '',
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

    const [currentStateData, dispatchStateData] = useReducer(
        deviceDataReducer,
        initialState
    );
    const [currentPage, setCurrentPage] = useState(1);

    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [checkedLogs, setCheckedLogs] = useState([]);
    
    const handleSelectAll = (e) =>{
        setIsCheckAll(!isCheckAll);
        setIsCheck(data?.data?.data.map((data) => data._id));
        setCheckedLogs(data?.data?.data);
        if (isCheckAll) {
          setIsCheck([]);
          setCheckedLogs([]);
        }
    };
    const handleClick = (e) =>{
        const {id, checked, name } = e.target;
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
    useMemo(() => {
        const firstPageIndex = (currentPage - 1) * currentStateData.record;
        const lastPageIndex = firstPageIndex + currentStateData.record;
        return (
          data && data.data && data.data.data.slice(firstPageIndex, lastPageIndex)
        );
      }, [currentPage]);

      const ref = useRef();

      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const code = urlParams.get('code');
      const projectName = urlParams.get('name');

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
      const handleSearchFunc = (event) => {
        dispatchStateData({
          type: SEARCH_FIELD,
          data: event.target.value,
        });
      };

      let deviceFilter = data && data.data && data.data.data;


      let search =
      (currentStateData.searchField &&
        currentStateData.searchField.trim() &&
        currentStateData.searchField.trim().toLowerCase()) ||
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
            getDeviceLogsById(
            code,
            localStorage.getItem('project_type') &&
              JSON.parse(localStorage.getItem('project_type')).typeCode,
              currentStateData.diffDate,
              currentStateData.page,
              currentStateData.record,
            sortType
          )
        );
      };
      const multpleDispatchSort = (type, data) => {
        return dispatchStateData({
          type: type,
          data: data,
        });
      };
      const sortTableFnDI = (callbackDispatchAllData) => {
        // LM -- log message
        if (currentStateData.sortIcons.DI) {
          return callbackDispatchAllData('-did');
        } else if (!currentStateData.sortIcons.DI) {
          multpleDispatchSort(SORT_ICONS, {
            DI: true,
            CD: false,
            LM: false,
            DA: false,
            TI: false,
          });
    
          return callbackDispatchAllData('did');
        }
      };
        // @@ all checkbox selection function
  const allCheckBoxSelectFn = () => {
    dispatchStateData({
      type: ALL_ROW_SELECTED,
      data: !currentStateData.allRowSelect,
    });
  };

  let newItemsArray = [];
  // DOWNLOAD SINGLE ROW SELECTION FUNCTION
  const singleCheckboxFun = (event, item, index) => {
    newItemsArray.push(item);

    var downloadButtonId = document.getElementById('download_button');

    if (newItemsArray.length >= 2) {
      // @@ conditions---
      /*
      sorting array for removing last tow duplicate indexs
     */
      newItemsArray = newItemsArray.sort((a, b) => {
        const firstObjectKey = parseInt(Object.keys(a));
        const secondObjectKey = parseInt(Object.keys(b));
        // console.log("first array", parseInt(firstObjectKey))
        if (firstObjectKey < secondObjectKey) return -1;
        if (firstObjectKey > secondObjectKey) return 1;
        return 0;
      });
    }

    if (newItemsArray.length) {
      downloadButtonId.style.opacity = '100%';
    }

    let arrayLastIndex = newItemsArray.slice(-1)[0]._id;
    let arraySecondLastIndex =
      newItemsArray.length >= 2 ? newItemsArray.slice(-2, -1)[0]._id : null;

    if (arrayLastIndex == arraySecondLastIndex) {
      newItemsArray.pop();
      newItemsArray.pop();
    }
    if (!newItemsArray.length) downloadButtonId.style.opacity = '30%';
  };

  // DOWNLOAD CSV FILE FUNCTION
  const downloadCSVFun = ({ data, fileName, fileType }) => {
    var csv = ' MAC address';
    csv += '\t Code';
    csv += '\t Log Message';
    csv += '\t Date';
    csv += '\t Time';

    csv += '\n';
    for (var i = 0; i < data.length; i++) {
      csv += `${data[i].did}\t${data[i].ack.code}\t${data[i].ack.msg}\t${
        data[i].ack.date.split('T')[0]
      }\t${data[i].ack.date.split('T')[1].split('.')[0]}`;
      csv += '\n';
    }

    const blob = new Blob([csv], { type: fileType });
    const a = document.createElement('a');
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };
  useEffect(() => {
    dispatch(
        getDeviceLogsById(
        code,
        currentStateData.projectCode,
        currentStateData.diffDate
      )
    );
  }, [dispatch, currentStateData.projectCode, currentStateData.diffDate]);

  return(
    <div>
        <Row className='rowSection'>
        <Col xl={2} lg={2} md={2} sm={2} className="noSidebar colSection">
          <SideBar
            sidebar_details={sidebar_details}
            className={Style.SideBarColume}
          />
           <Col
          xl={10}
          lg={10}
          md={10}
          sm={10}
          className={`${Style.NavbarColumn} colSection`}
        >
            {/* <Navbar navigation_details={navigation_details} /> */}
            <Container className={Style.mainContainer}>
            {/* <h1 className=" darkModeColor">Alerts Summary</h1> */}
            <Row className='mt-4'>
            {/* <Col xl={10} md={9} sm={9}>
                <TypeDropDown
                  tableDataState={currentStateData.tableDataState}
                  diffDate={currentStateData.diffDate}
                  codeReducer={getModelCodeReducer}
                />
              </Col> */}
            </Row>
            <Row className="mt-4">
                <Col>
                <TableCard borderRadius="10px">
                    {data && data.data && data.data.data.length > 0 && (
                        <>
                        <section className={`${Style.OuterTable} `}>
                        <section className={Style.searchSection}>
                          <input
                            type="text"
                            placeholder="Search..."
                            value={currentStateData.searchField}
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
                        {/* Table Here */}
                        
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
                                    currentStateData.sortIcons.DI
                                    ? faSortDown
                                    : faSortUp
                                }
                                onClick={() => {
                                  dispatchStateData({
                                    type: SORT_ICONS,
                                    data: {
                                      ...currentStateData.sortIcons,
                                      DI: !currentStateData.sortIcons.DI,
                                    },
                                  });
                                  sortTableFnDI(callbackfnDispatchGetAllData);
                                }}
                              />
                            </section>
                        </section>
                        {deviceFilter.map((item,index)=>{
                            return(
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

                                    </section>
                                </React.Fragment>
                            );
                        })}
                        </section>
                        </section>
                        <section className="p-2">
                        <Pagination
                          code={code}
                          projectType={currentStateData.projectCode}
                          diffdate={currentStateData.diffDate}
                          currentPage={currentPage}
                          totalCount={data?.data?.count ? data?.data?.count : 0}
                          pageSize={currentStateData.record}
                          onPageChange={(page) => setCurrentPage(page)}
                        />
                      </section>
                        </>
                    )}
                     {data && data.data && data.data.data.length == 0 && (
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
        </Col>
        </Row>
    </div>
  )
  }