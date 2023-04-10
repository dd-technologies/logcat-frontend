import React, { useEffect } from 'react';
import {useDispatch,useSelector } from 'react-redux';
import Style from '../../../../css/deviceTrends.module.css';
import { ThemeContext } from '../../../../utils/ThemeContext';
import { getDeviceTrendsById } from '../../../../store/action/DeviceAction';

function Trends() {
  const { theme } = React.useContext(ThemeContext);
    const getAllTrendsByDeviceIdReducer = useSelector((state)=>state.getAllTrendsByDeviceIdReducer);
    const {data} = getAllTrendsByDeviceIdReducer;
    console.log('getAllTrendsByDeviceIdReducer',getAllTrendsByDeviceIdReducer)

    let trendsFilter = data && data.data && data.data.findDeviceById;
    console.log(trendsFilter)

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('name');
    console.log(code)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(
          getDeviceTrendsById(
                code,
            )
        )
    },([]))
  return (
    <>
      <section className={Style.alertTable}>
        {/* Parameter and timmer Head Section */}
        <section className={Style.uppertableHeader}>
          <section style={{
            color: theme === 'light-theme' ? '#fff' : '#000',
          }}
          >
            <p
              style={{
                marginRight: '10px',
                color: theme === 'light-theme' ? '#fff' : '#000',
                fontSize: '.9rem',
              }}
            >
              Parameter
            </p>
          </section>
          <section className={Style.innerHeader}>
            <p
              style={{
                marginRight: '10px',
                color: theme === 'light-theme' ? '#fff' : '#000',
                fontWeight: '600',
                fontSize: '.9rem',
              }}
            >
              Unit
            </p>
          </section>
          <section className={Style.innerHeader}>
            <p
              style={{
                marginRight: '10px',
                color: 
                theme === 'light-theme' ? '#fff' : '#000',
                fontWeight: '600',
                fontSize: '.9rem',
              }}
            >
              05:05
            </p>
          </section>
          {/* timmer section */}
          <section className={Style.innerHeader}>
            <p
              style={{
                marginRight: '10px',
                color:
                  theme === 'light-theme' ? '#fff' : '#000',
                fontWeight: '600',
                fontSize: '.9rem',
              }}
            >05:00
            </p>
          </section>
          <section className={Style.innerHeader}>
            <p
              style={{
                marginRight: '10px',
                color:
                  theme === 'light-theme' ? '#fff' : '#000',
                fontWeight: '600',
                fontSize: '.9rem',
              }}
            >04:55
            </p>
          </section>
          <section className={Style.innerHeader}>
            <p
              style={{
                marginRight: '10px',
                color:
                  theme === 'light-theme' ? '#fff' : '#000',
                fontWeight: '600',
                fontSize: '.9rem',
              }}
            >04:50
            </p>
          </section>
          <section className={Style.innerHeader}>
            <p
              style={{
                marginRight: '10px',
                color:
                  theme === 'light-theme' ? '#fff' : '#000',
                fontWeight: '600',
                fontSize: '.9rem',
              }}
            >04:45
            </p>
          </section>
          <section className={Style.innerHeader}>
            <p
              style={{
                marginRight: '10px',
                color:
                  theme === 'light-theme' ? '#fff' : '#000',
                fontWeight: '600',
                fontSize: '.9rem',
              }}
            >04:35
            </p>
          </section>
          <section className={Style.innerHeader}>
            <p
              style={{
                marginRight: '10px',
                color:
                  theme === 'light-theme' ? '#fff' : '#000',
                fontWeight: '600',
                fontSize: '.9rem',
              }}
            >04:30
            </p>
          </section>
          <section className={Style.innerHeader}>
            <p
              style={{
                marginRight: '10px',
                color:
                  theme === 'light-theme' ? '#fff' : '#000',
                fontWeight: '600',
                fontSize: '.9rem',
              }}
            >04:25
            </p>
          </section>
        </section>
        {/* Mode Head Section */}
        <section className={Style.tableHeader}>
          <section style={{
            color: theme === 'light-theme' ? '#000' : '#fff',
          }}
          >
            <p
              style={{
                marginRight: '10px',
                color:
                  theme === 'light-theme' ? '#000' : '#fff',
                fontSize: '.9rem',
              }}
            >
              Mode
            </p>
          </section>
          <section className={Style.innerHeader}>
            <p
              style={{
                marginRight: '10px',
                color:
                  theme === 'light-theme' ? '#000' : '#fff',
                fontSize: '.9rem',
              }}
            >
              Mode Type
            </p>
          </section>
          <section className={Style.innerHeader}>
            <p
              style={{
                marginRight: '10px',
                color:
                  theme === 'light-theme' ? '#000' : '#fff',
                fontSize: '.9rem',
              }}
            >
              PC-SIMV
            </p>
          </section>
        </section>
        <div>
                {console.log(trendsFilter)}
                {trendsFilter && trendsFilter.map((item,_id)=>{
                    return(
                        <React.Fragment key ={_id}>
                          {/* Pip */}
                            <section className={Style.eventableBody}>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    PIP
                                    {/* {item.did} */}
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    cmH20
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    {item.pip}
                                  </section>
                            </section>
                            {/* Peep */}
                            <section className={Style.tableBody}>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    PEEP
                                    {/* {item.did} */}
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    cmH20
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    {item.peep}
                                  </section>
                            </section>
                            {/* Mean Airway */}
                            <section className={Style.eventableBody}>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    Mean Airway
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    cmH20
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    {item.mean_Airway}
                                  </section>
                            </section>
                            {/* Vti */}
                            <section className={Style.tableBody}>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    Vti
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    ml
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    {item.vti}
                                  </section>
                            </section>
                            {/* Vte */}
                            <section className={Style.eventableBody}>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    Vte
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    ml
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    {item.vte}
                                  </section>
                            </section>
                            {/* MVe */}
                            <section className={Style.tableBody}>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    MVe
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    Litre
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    {item.mve}
                                  </section>
                            </section>
                            {/* MVi */}
                            <section className={Style.eventableBody}>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    MVi
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    Litre
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    {item.mvi}
                                    </section>
                            </section>
                            {/* FiO2 */}
                            <section className={Style.tableBody}>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    FiO2
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    %
                                  </section>
                                  <section
                                      style={{
                                        color:
                                          theme === 'light-theme' ? '' : '#fff',
                                      }}
                                    >
                                      {item.fio2}
                                    </section>
                            </section>
                            {/* Respiratory Rate */}
                            <section className={Style.eventableBody}>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    Respiratory Rate
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    BPM
                                  </section>
                                  <section
                                      style={{
                                        color:
                                          theme === 'light-theme' ? '' : '#fff',
                                      }}
                                    >
                                      {item.respiratory_Rate}
                                    </section>
                            </section>
                            {/* I:E */}
                            <section className={Style.tableBody}>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    I:E
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    Ratio
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    {item.ie}
                                  </section>
                            </section>
                            {/* Tinsp */}
                            <section className={Style.eventableBody}>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    Tinsp
                                    {/* {item.did} */}
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    sec
                                    {/* {item.mode} */}
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    {item.tinsp}
                                  </section>
                            </section>
                            {/* Texp */}
                            <section className={Style.tableBody}>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    Texp
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >Sec
                                  </section>
                                  <section
                                      style={{
                                        color:
                                          theme === 'light-theme' ? '' : '#fff',
                                      }}
                                    >
                                      {item.texp}
                                    </section>
                            </section>
                            {/* Average Leak */}
                            <section className={Style.eventableBody}>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    Average Leak
                                    {/* {item.did} */}
                                  </section>
                                  <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    %
                                  </section>
                                  <section
                                      style={{
                                        color:
                                          theme === 'light-theme' ? '' : '#fff',
                                      }}
                                    >
                                      {item.averageLeak}
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

export default Trends