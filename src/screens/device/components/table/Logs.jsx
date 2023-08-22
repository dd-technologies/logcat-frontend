import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import back from "../../../../assets/images/back.png";
import { useDispatch, useSelector } from 'react-redux';
import Style from '../../../../css/deviceLogs.module.css';
import { ThemeContext } from '../../../../utils/ThemeContext';
import { getDeviceLogsById } from '../../../../store/action/DeviceAction';
import ReactReadMoreReadLess from "react-read-more-read-less";
// import { Link } from 'react-router-dom';

export default function Logs() {
  const { theme } = React.useContext(ThemeContext);

  const getAllLogsByDeviceIdReducer = useSelector((state) => state.getAllLogsByDeviceIdReducer)
  const { data } = getAllLogsByDeviceIdReducer;
  console.log('getAllLogsByDeviceIdReducer', getAllLogsByDeviceIdReducer);
  let logsFilter = data && data.data && data.data.findDeviceById;
  console.log('logsFilter', logsFilter);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('name');
  console.log(code)

  const dispatch = useDispatch();

  // const [currentPage, setCurrentPage] = useState(1)
  // const recordsPerPage = 6;
  // const lastIndex = currentPage * recordsPerPage;
  // const firstIndex = lastIndex - recordsPerPage;
  // const records = logsFilter && logsFilter.slice(firstIndex, lastIndex);
  // const npage = Math.ceil(data && data.data.length / recordsPerPage)
  // const numbers = Array.from({ length: npage }, (_, i) => i + 1).slice(1)

  useEffect(() => {
    dispatch(
      getDeviceLogsById({ page: 1, limit: recordsPerPage })
    )
  }, ([]))

  const incPage = parseInt(data && data.currentPage)
  const totalPage = parseInt(data && data.totalPages)
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = logsFilter && logsFilter.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data && data.data.length / recordsPerPage)
  const numbers = Array.from({ length: npage }, (_, i) => i + 1).slice(1)

  return (
    <>
    {records && records.length > 0 ?
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
            {records && records.map((item, _id) => {
              return (
                <React.Fragment key={_id}>
                  <section className={Style.tableBody}>
                    <section
                      style={{
                        color:
                          theme === 'light-theme' ? '' : '#fff',

                      }}
                    >

                      {item.deviceId}
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
    dispatch(getDeviceLogsById({ page: incPage - 1, limit: recordsPerPage }))
  }
  function changeCPage(id) {
    setCurrentPage(id)
  }
  function nextPage() {
    dispatch(getDeviceLogsById({ page: incPage + 1, limit: recordsPerPage }))
  }
}