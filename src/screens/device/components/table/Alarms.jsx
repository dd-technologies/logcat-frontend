import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Style from '../../../../css/deviceAlerts.module.css';
import { ThemeContext } from '../../../../utils/ThemeContext';
import { getDeviceAlarmsById } from '../../../../store/action/DeviceAction';
import back from "../../../../assets/images/back.png";

export default function Alarms() {
  const { theme } = React.useContext(ThemeContext);

  const getAllAlarmsByDeviceIdReducer = useSelector((state) => state.getAllAlarmsByDeviceIdReducer);
  const { data } = getAllAlarmsByDeviceIdReducer;
  console.log('getAllAlarmsByDeviceIdReducer', getAllAlarmsByDeviceIdReducer)

  let alarmsFilter = data && data.data && data.data.findDeviceById;
  console.log(alarmsFilter)
console.log("data",data && data.statusCode)
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('name');
  console.log(code)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getDeviceAlarmsById({ page: 1, limit: recordsPerPage })
    )
  }, ([]))
  const incPage = parseInt(data && data.currentPage)
  const totalPage = parseInt(data && data.totalPages)
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = alarmsFilter && alarmsFilter.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data && data.data.length / recordsPerPage)
  const numbers = Array.from({ length: npage }, (_, i) => i + 1).slice(1)

  return (
    <>
      {records && records.length > 0 ?
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
            {records && records.map((item, _id) => {
              console.log("item.priority", item.priority)
              return (
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
                      {
                        item.priority === "ALARM_HIGH_LEVEL" ?
                          <div style={{ backgroundColor: "#ff0000", height: "0.5rem", borderRadius: "10px", width: "7rem", marginTop: "0.3rem" }}></div>
                          :
                          item.priority === "ALARM_CRITICAL_LEVEL" ?
                            <div style={{ backgroundColor: "#ff0000", height: "0.5rem", borderRadius: "10px", width: "7rem", marginTop: "0.3rem" }}></div>
                            :
                            item.priority === "ALARM_LOW_LEVEL" ?
                              <div style={{ backgroundColor: "#ffbf00", height: "0.5rem", borderRadius: "10px", width: "7rem", marginTop: "0.3rem" }}></div>
                              :
                              item.priority === "ALARM_MEDIUM_LEVEL" ? <div style={{ backgroundColor: "#ffbf00", height: "0.5rem", borderRadius: "10px", width: "7rem", marginTop: "0.3rem" }}></div>
                                :
                                ""
                      }
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
      :
      <section style={{width:'100%',height:'100%',marginTop:'10rem',marginBottom:'10rem'}}>
          <span style={{display:'flex',textAlign:'center',justifyContent:'center',fontSize:20}}>No Alarms Available</span>
        </section>
      }
      {records && records.length > 0 ?
      <div
        className="left_arrow" style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-end" style={{ display: "flex", alignItems: 'center' }}>
            {incPage > 1 ?
              <button onClick={prePage} style={{ border: "0px", backgroundColor: "white" }}>
                <img src={back} style={{ width: "3rem" }} />
              </button>
              : " "}
            {numbers.map((n, i) => (
              <li key={i} class={`page-item ${incPage == n ? 'active' : ""}`}><a style={{ borderRadius: "100px", margin: "5px" }} class="page-link" href="#" onClick={() => changeCPage(n)}>{n}</a></li>
            ))}
            {incPage !== totalPage ?
              <button onClick={nextPage} style={{ border: "0px", backgroundColor: "white" }}>
                <img src={back} style={{ width: "3rem", transform: "rotate(180deg)" }} />
              </button>
              : " "}
          </ul>
        </nav>
      </div>
      :
      <div
        className="left_arrow" style={{ display: "flex", justifyContent: "flex-end" }}
      >

      </div>
        }
    </>
  )
  function prePage() {
    dispatch(getDeviceAlarmsById({ page: incPage - 1, limit: recordsPerPage }))
  }
  function changeCPage(id) {
    setCurrentPage(id)
  }
  function nextPage() {
    dispatch(getDeviceAlarmsById({ page: incPage + 1, limit: recordsPerPage }))
  }
}