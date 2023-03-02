import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import Style from '../../../../css/deviceEvents.module.css';
import { ThemeContext } from '../../../../utils/ThemeContext';
import { getDeviceEventsById } from '../../../../store/action/DeviceAction';

export default function Events(){
  const {theme} = React.useContext(ThemeContext);
    const getAllEventsByDeviceIdReducer = useSelector((state)=>state.getAllEventsByDeviceIdReducer);
    const {data} = getAllEventsByDeviceIdReducer;
    console.log(getAllEventsByDeviceIdReducer);
  
    let eventsFilter = data && data.data && data.data.findDeviceById;
    // console.log(eventsFilter)
    let ds = data && data.state;
    // console.log('ds',ds)

    return(
      <>
       <section className={Style.alertTable}>
        <section className={Style.tableHeader}>
          <section style={{
            color: theme == 'light-theme' ? '#000' : '#fff',
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
                               Message
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
                                Type
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
          {console.log(eventsFilter)}
          {eventsFilter && eventsFilter.map((item1,_id) => {
            return(
              <React.Fragment key = {_id}>
                <section className={Style.tableBody}>
                  {/* {JSON.stringify(localStorage.setItem('Status',data.state))}
                  {console.log('data.state',data.state)} */}
                <section>
                                    <input
                                      type="checkbox"
                                      id={item1._id}
                                      // name={JSON.stringify(item)}
                                      // onChange={handleClick}
                                      // checked={isCheck.includes(item._id)}
                                    />
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme == 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    {item1.did}
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme == 'light-theme' ? '' : '#fff',
                                    }}
                                  >
                                    {item1.message}
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme == 'light-theme' ? '' : '#fff',
                                    }}
                                  >
                                    {item1.type}
                                  </section>
                                  {/* <section
                                    style={{
                                      color:
                                        theme == 'light-theme' ? '' : '#fff',
                                    }}
                                  >
                                    {data.state}
                                  </section> */}
                                      <section
                                      style={{
                                        color:
                                          theme == 'light-theme' ? '' : '#fff',
                                      }}
                                    >
                                      {item1.date.split('T')[0]}
                                    </section>
                                  <section
                                      style={{
                                        color:
                                          theme == 'light-theme' ? '' : '#fff',
                                      }}
                                    >
                                      {item1.date.split('T')[1].split('.')[0]}
                                    </section>
                </section>
              </React.Fragment>
            )
      }   
    )
  }
        </div>
      </section>
      </>
    )
  }