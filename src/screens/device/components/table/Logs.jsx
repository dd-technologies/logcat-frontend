import React,{useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import Style from '../../../../css/deviceLogs.module.css';
import { ThemeContext } from '../../../../utils/ThemeContext';
import { getDeviceLogsById } from '../../../../store/action/DeviceAction';

export default function Logs(){
    const {theme} = React.useContext(ThemeContext);

    const getAllLogsByDeviceIdReducer = useSelector((state)=>state.getAllLogsByDeviceIdReducer)
    const {data} = getAllLogsByDeviceIdReducer;
    console.log('getAllLogsByDeviceIdReducer',getAllLogsByDeviceIdReducer);

    let logsFilter = data && data.data && data.data.findDeviceById;
    console.log('logsFilter',logsFilter);
    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('name');
    console.log(code)

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(
            getDeviceLogsById(
                code,
            )
        )
    },([]))
    return(
        <>
        <section className={Style.alertTable}>
            <section className={Style.tableHeader}>
                <section style={{
                    color:theme == 'light-theme' ? '#000' : '#fff',
                }}
                ><input
                type="checkbox"
                // onChange={handleSelectAll}
                // checked={isCheckAll}
                id="selectAll"
              
              /></section>
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
                                Log Message
                              </p>
                              {/* <FontAwesomeIcon
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
                                Log Type
                              </p>
                              {/* <FontAwesomeIcon
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
                                Device Id
                              </p>
                              {/* <FontAwesomeIcon
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
                                Category
                              </p>
                              {/* <FontAwesomeIcon
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
                                Date
                              </p>
                              {/* <FontAwesomeIcon
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
                                Time
                              </p>
                              {/* <FontAwesomeIcon
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
                              /> */}
                            </section>
            </section>
            <div>
                {console.log(logsFilter)}
                {logsFilter && logsFilter.map((item,_id)=>{
                    return(
                        <React.Fragment key={_id}>
                              <section className={Style.tableBody}>
                              <section>
                                    <input
                                    type="checkbox"
                                    id={item._id}
                                    />
                                </section>
                                <section
                                    style={{
                                      color:
                                        theme == 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    {/* {item.log.message} */}
                                    {item.log.filePath
                            ? item.log.file
                            : item.log.message.includes('at ')
                            ? item.log.message.split('at ')[0]
                            : item.log.message}
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme == 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    {item.type}
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
                                    <section>
                      {item.log.type == 'error' && (
                        <span style={{ color: 'red' }}>
                          {item.log.type.toUpperCase()}
                        </span>
                      )}
                      {item.log.type == 'info' && (
                        <span style={{ color: 'blue' }}>
                          {item.log.type.toUpperCase()}
                        </span>
                      )}
                      {item.log.type == 'warn' && (
                        <span style={{ color: 'violet' }}>
                          {item.log.type.toUpperCase()}
                        </span>
                      )}
                      {item.log.type == 'debug' && (
                        <span style={{ color: 'green' }}>
                          {item.log.type.toUpperCase()}
                        </span>
                      )}
                      {item.log.type == 'verbose' && (
                        <span style={{ color: 'purple' }}>
                          {item.log.type.toUpperCase()}
                        </span>
                      )}
                    </section>
                                  </section>
                                  
                                   <section
                                    style={{
                                      color:
                                        theme == 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                   {item.log.date.split('T')[0]}
                                  </section>
                                  
                                  <section
                                      style={{
                                        color:
                                          theme == 'light-theme' ? '' : '#fff',
                                      }}
                                    >
                                    {item.log.date.split('T')[1].split('.')[0]}
                                    </section>
                              </section>
                              

                        </React.Fragment>
                    )
                })}
            </div>
        </section>
        </>
    )
}