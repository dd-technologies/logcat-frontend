import React,{useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import Style from '../../../../css/deviceLogs.module.css';
import { ThemeContext } from '../../../../utils/ThemeContext';
import { getDeviceLogsById } from '../../../../store/action/DeviceAction';
import ReactReadMoreReadLess from "react-read-more-read-less";
// import { Link } from 'react-router-dom';

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
                    color:theme === 'light-theme' ? '#000' : '#fff',
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
                                Version
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
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    {/* <Link to={`/deviceAnalytics?DeviceId=${item?.deviceId}&logMsg=${item?.message}&col=${item?.message}`} style={{textDecoration:'none',color:'black'}}> */}
                                    {/* {item.log.message} */}
                                    {/* {item.log.filePath
                            ? item.log.file
                            : item.log.message.includes('at ')
                            ? item.log.message.split('at ')[0]
                            : item.log.message} */}
                            {item.deviceId}
                            {/* </Link> */}
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                     <ReactReadMoreReadLess
                charLimit={200}
                readMoreText={"Read more ▼"}
                readLessText={"Read less ▲"}
            >
                {item.message}
            </ReactReadMoreReadLess>

                                    {/* {item.message}
                                    {item.file
                            ? item.file
                            : item.message.includes('at ')
                            ? item.message.split('at ')[0]
                            : item.message} */}
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    {item.version}
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                  </section>
                                  
                                   <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                   {item.date.split('T')[0]}
                                   {console.log(item.date)}
                                  </section>
                                  
                                  <section
                                      style={{
                                        color:
                                          theme === 'light-theme' ? '' : '#fff',
                                      }}
                                    >
                                    {item.date.split('T')[1].split('.')[0]}
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