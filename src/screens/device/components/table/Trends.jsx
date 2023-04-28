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
    console.log("trendsFilter",trendsFilter);

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
            {trendsFilter && trendsFilter.map((item,_id)=>{
          return(
            <section>
            <p
              style={{
                marginRight: '10px',
                color: theme === 'light-theme' ? '#fff' : '#000',
                fontWeight: '600',
                fontSize: '.9rem',
              }}
            >
              {item.time}
            </p>
            </section>
          )
            })}
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
        
        {trendsFilter && trendsFilter.map((item,_id)=>{
          return(
           <section className={Style.innerHeader}>
            <p
              style={{
                marginRight: '10px',
                color:
                  theme === 'light-theme' ? '#000' : '#fff',
                fontSize: '.9rem',
              }}
            >
              {item.mode}
            </p>
          </section>
          )
        })}
        </section>
         {/* Pip Head Section */}
         <section className={Style.eventableBody}>
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
              PIP
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
              cmH20
            </p>
          </section>
        {trendsFilter && trendsFilter.map((item,_id)=>{
          return(
           <section className={Style.innerHeader}>
            <p
              style={{
                marginRight: '10px',
                color:
                  theme === 'light-theme' ? '#000' : '#fff',
                fontSize: '.9rem',
              }}
            >
              {item.pip}
            </p>
          </section>
          )
        })}
        </section>
        {/* peep */}
        <section className={Style.tableHeader}>
              <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    PEEP
              </section>
              <section
                                    style={{
                                      color:
                                        theme === 'light-theme' ? '' : '#fff',
                                        
                                    }}
                                  >
                                    cmH20
              </section>
              {trendsFilter && trendsFilter.map((item,_id)=>{
          return(
           <section className={Style.innerHeader}>
            <p
              style={{
                marginRight: '10px',
                color:
                  theme === 'light-theme' ? '#000' : '#fff',
                fontSize: '.9rem',
              }}
            >
              {item.peep}
            </p>
          </section>
          )
        })}
        </section>
        {/* Mean Airway Head Section */}
        <section className={Style.eventableBody}>
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
              Mean Airway
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
              cmH20
            </p>
          </section>
          {trendsFilter && trendsFilter.map((item,_id)=>{
          return(
           <section className={Style.innerHeader}>
            <p
              style={{
                marginRight: '10px',
                color:
                  theme === 'light-theme' ? '#000' : '#fff',
                fontSize: '.9rem',
              }}
            >
              {item.mean_Airway}
            </p>
          </section>
          )
        })}
        </section>
        {/* Vti Airway Head Section */}
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
              Vti
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
              ml
            </p>
          </section>
          {trendsFilter && trendsFilter.map((item,_id)=>{
          return(
           <section className={Style.innerHeader}>
            <p
              style={{
                marginRight: '10px',
                color:
                  theme === 'light-theme' ? '#000' : '#fff',
                fontSize: '.9rem',
              }}
            >
              {item.vti}
            </p>
          </section>
          )
        })}
        </section>
        {/* Vte Airway Head Section */}
        <section className={Style.eventableBody}>
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
              Vte
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
              ml
            </p>
          </section>
          {trendsFilter && trendsFilter.map((item,_id)=>{
          return(
           <section className={Style.innerHeader}>
            <p
              style={{
                marginRight: '10px',
                color:
                  theme === 'light-theme' ? '#000' : '#fff',
                fontSize: '.9rem',
              }}
            >
              {item.vte}
            </p>
          </section>
          )
        })}
        </section>
        {/* Mve Airway Head Section */}
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
              Mve
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
              Litre
            </p>
          </section>
          {trendsFilter && trendsFilter.map((item,_id)=>{
          return(
           <section className={Style.innerHeader}>
            <p
              style={{
                marginRight: '10px',
                color:
                  theme === 'light-theme' ? '#000' : '#fff',
                fontSize: '.9rem',
              }}
            >
              {item.mve}
            </p>
          </section>
          )
        })}
        </section>
        {/* Mvi Airway Head Section */}
        <section className={Style.eventableBody}>
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
              Mvi
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
              Litre
            </p>
          </section>
          {trendsFilter && trendsFilter.map((item,_id)=>{
          return(
           <section className={Style.innerHeader}>
            <p
              style={{
                marginRight: '10px',
                color:
                  theme === 'light-theme' ? '#000' : '#fff',
                fontSize: '.9rem',
              }}
            >
              {item.mvi}
            </p>
          </section>
          )
        })}
        </section>
         {/* FiO2 Head Section */}
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
              FiO2
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
              %
            </p>
          </section>
          {trendsFilter && trendsFilter.map((item,_id)=>{
          return(
           <section className={Style.innerHeader}>
            <p
              style={{
                marginRight: '10px',
                color:
                  theme === 'light-theme' ? '#000' : '#fff',
                fontSize: '.9rem',
              }}
            >
              {item.fio2}
            </p>
          </section>
          )
        })}
        </section>
         {/* Resposiratory Rate Head Section */}
         <section className={Style.eventableBody}>
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
              Respiratory Rate
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
              BPM
            </p>
          </section>
          {trendsFilter && trendsFilter.map((item,_id)=>{
          return(
           <section className={Style.innerHeader}>
            <p
              style={{
                marginRight: '10px',
                color:
                  theme === 'light-theme' ? '#000' : '#fff',
                fontSize: '.9rem',
              }}
            >
              {item.respiratory_Rate}
            </p>
          </section>
          )
        })}
        </section>
        {/* i:e Head Section */}
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
              I:E
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
              Ratio
            </p>
          </section>
          {trendsFilter && trendsFilter.map((item,_id)=>{
          return(
           <section className={Style.innerHeader}>
            <p
              style={{
                marginRight: '10px',
                color:
                  theme === 'light-theme' ? '#000' : '#fff',
                fontSize: '.9rem',
              }}
            >
              {item.ie}
            </p>
          </section>
          )
        })}
        </section>
        {/* Tinsp Head Section */}
        <section className={Style.eventableBody}>
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
              Respiratory Rate
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
              BPM
            </p>
          </section>
          {trendsFilter && trendsFilter.map((item,_id)=>{
          return(
           <section className={Style.innerHeader}>
            <p
              style={{
                marginRight: '10px',
                color:
                  theme === 'light-theme' ? '#000' : '#fff',
                fontSize: '.9rem',
              }}
            >
              {item.respiratory_Rate}
            </p>
          </section>
          )
        })}
        </section>
        {/* Texp Head Section */}
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
              Texp
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
              sec
            </p>
          </section>
          {trendsFilter && trendsFilter.map((item,_id)=>{
          return(
           <section className={Style.innerHeader}>
            <p
              style={{
                marginRight: '10px',
                color:
                  theme === 'light-theme' ? '#000' : '#fff',
                fontSize: '.9rem',
              }}
            >
              {item.texp}
            </p>
          </section>
          )
        })}
        </section>
        {/* Average Leak Head Section */}
        <section className={Style.eventableBody}>
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
              Average Leak
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
              %
            </p>
          </section>
          {trendsFilter && trendsFilter.map((item,_id)=>{
          return(
           <section className={Style.innerHeader}>
            <p
              style={{
                marginRight: '10px',
                color:
                  theme === 'light-theme' ? '#000' : '#fff',
                fontSize: '.9rem',
              }}
            >
              {item.averageLeak}
            </p>
          </section>
          )
        })}
        </section>
      </section>
    </>
  )
}

export default Trends