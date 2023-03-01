import React,{useState,useSelector} from 'react';
import Style from '../../../../css/device.module.css';
import { ThemeContext } from '../../../../utils/ThemeContext';
import { getDeviceEventsById } from '../../../../store/action/DeviceAction';

export default function Events(){
    const {theme} = React.useContext(ThemeContext);
    const getAllLogByDeviceIdReducer = useSelector((state)=>state.getAllLogByDeviceIdReducer);
    const {data} = getAllLogByDeviceIdReducer;
    console.log(getAllLogByDeviceIdReducer);
    return(
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
        </section>
      </section>
    )
  }