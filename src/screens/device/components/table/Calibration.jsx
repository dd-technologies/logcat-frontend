import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Style from '../../../../css/deviceCalibration.module.css';
import { ThemeContext } from '../../../../utils/ThemeContext';
import {getCalibrationById } from '../../../../store/action/DeviceAction';
export default function Events() {
  const {theme} = React.useContext(ThemeContext);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('code');
  // const deviceid = urlParams.get('DeviceId')
  // console.log('deviceid',deviceid)

  // const getRegisteredDetailsReducer = useSelector((state)=>state.getRegisteredDetailsReducer);
  // const {data12} = getRegisteredDetailsReducer;
  // console.log('first',data12)




  const getCalibrationByDeviceIdReducer = useSelector((state)=>state.getCalibrationByDeviceIdReducer);
  const {data} = getCalibrationByDeviceIdReducer;
  console.log('getCalibrationByDeviceIdReducer',getCalibrationByDeviceIdReducer)

  let calibrationFilter = data && data.data;
  console.log("calibrationFilter",calibrationFilter)
  console.log("code",code)
  const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(
        getCalibrationById(
              code,
          )
      )
  },([]))


  return (
    <>
      <section className={Style.alertTable}>
        <section className={Style.tableHeader}>
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
              Name
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
              Message
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
        </section>
        <div>
          {calibrationFilter && calibrationFilter
            .map((item1, _id) => {
              return (
                <React.Fragment key={_id}>
                  <section className={Style.tableBody}>
                    <section
                      style={{
                        color:
                          theme === 'light-theme' ? '' : '#fff',

                      }}
                    >
                      {item1.deviceId}
                    </section>
                    <section
                      style={{
                        color:
                          theme === 'light-theme' ? '' : '#fff',
                      }}
                    >
                      {item1.name}
                    </section>
                    <section
                      style={{
                        color:
                          theme === 'light-theme' ? '' : '#fff',
                      }}
                    >
                      {item1.message=="FAILED"?
                      <div style={{display:"flex",justifyContent:"center",alignItems:"center",backgroundColor: "#d51515",height: "2rem",borderRadius: "10px",width: "6rem",marginTop: "0.3rem"}}><span style={{color:"white"}}>FAILED</span></div>
                      :item1.message=="SUCCESS"?
                      <div style={{display:"flex",justifyContent:"center",alignItems:"center",backgroundColor: "#209018",height: "2rem",borderRadius: "10px",width: "6rem",marginTop: "0.3rem"}}><span style={{color:"white"}}>SUCCESS</span></div>
                      :""}
                    </section>
                    <section
                      style={{
                        color:
                          theme === 'light-theme' ? '' : '#fff',
                      }}
                    >
                      {item1.date}
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