import React, { useEffect, useState } from 'react';
import {useDispatch,useSelector } from 'react-redux';
import Style from '../../../../css/deviceAlerts.module.css';
import { ThemeContext } from '../../../../utils/ThemeContext';
import { getDeviceAlarmsById } from '../../../../store/action/DeviceAction';


export default function Alarms(){
    const {theme} = React.useContext(ThemeContext);

    const getAllAlarmsByDeviceIdReducer = useSelector((state)=>state.getAllAlarmsByDeviceIdReducer);
    const {data} = getAllAlarmsByDeviceIdReducer;
    console.log('getAllAlarmsByDeviceIdReducer',getAllAlarmsByDeviceIdReducer)

    let alarmsFilter = data && data.data && data.data.findDeviceById;
    console.log(alarmsFilter)

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('name');
    console.log(code)
    
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(
            getDeviceAlarmsById(
                code,
            )
        )
    },([]))

    return(
        <>
        <section className={Style.alertTable}>
            <section className={Style.tableHeader}>
                <section style={{
                     color: theme === 'light-theme' ? '#000' : '#fff',
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
                                    theme === 'light-theme' ? '#000' : '#fff',
                                  fontWeight: '600',
                                  fontSize: '.9rem',
                                }}
                              >
                                Device Id
                              </p>
                            </section>
                            <section className={Style.innerHeader}>
                              <p
                                style={{
                                  marginRight: '10px',
                                  color:
                                    theme === 'light-theme' ? '#000' : '#fff',
                                  fontWeight: '600',
                                  fontSize: '.9rem',
                                }}
                              >
                                Code
                              </p>
                            </section>
                            <section className={Style.innerHeader}>
                              <p
                                style={{
                                  marginRight: '10px',
                                  color:
                                    theme === 'light-theme' ? '#000' : '#fff',
                                  fontWeight: '600',
                                  fontSize: '.9rem',
                                }}
                              >
                                Log Message
                              </p>
                            </section>
                            <section className={Style.innerHeader}>
                              <p
                                style={{
                                  marginRight: '10px',
                                  color:
                                    theme === 'light-theme' ? '#000' : '#fff',
                                  fontWeight: '600',
                                  fontSize: '.9rem',
                                }}
                              >
                                Priority
                              </p>
                            </section>
                            <section className={Style.innerHeader}>
                              <p
                                style={{
                                  marginRight: '10px',
                                  color:
                                    theme === 'light-theme' ? '#000' : '#fff',
                                  fontWeight: '600',
                                  fontSize: '.9rem',
                                }}
                              >
                                Date
                              </p>
                            </section>
                            <section className={Style.innerHeader}>
                              <p
                                style={{
                                  marginRight: '10px',
                                  color:
                                    theme === 'light-theme' ? '#000' : '#fff',
                                  fontWeight: '600',
                                  fontSize: '.9rem',
                                }}
                              >
                                Time
                              </p>
                            </section>
            </section>
            <div>
                {console.log(alarmsFilter)}
                {alarmsFilter && alarmsFilter.map((item,_id)=>{
                  console.log("item.priority",item.priority)
                    return(
                        <React.Fragment key ={_id}>
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
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    {item.did}
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    {item.ack.code}
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    {item.ack.msg}
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    {item.priority==="high"?<div style={{backgroundColor:"#ff0000",height:"0.6rem",borderRadius:"10px",width:"5rem",marginTop:"0.3rem"}}></div>:item.priority==="low"?<div style={{backgroundColor:"#ffbf00",height:"0.6rem",borderRadius:"10px",width:"5rem",marginTop:"0.3rem"}}></div>:item.priority==="medium"?<div style={{backgroundColor:"#ffbf00",height:"0.6rem",borderRadius:"10px",width:"5rem",marginTop:"0.3rem"}}></div>:""}
                                    {/* {item.priority} */}
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                   {item.ack.date.split('T')[0]}
                                   {console.log(item.ack.date.split('T')[0])}
                                  </section>
                                  <section
                                      style={{
                                        color:
                                          theme === 'light-theme' ? '' : '#fff',
                                      }}
                                    >
                                      {item.ack.date.split('T')[1]}
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