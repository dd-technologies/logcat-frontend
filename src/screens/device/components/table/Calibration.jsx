import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import back from "../../../../assets/images/back.png";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Style from '../../../../css/deviceCalibration.module.css';
import { ThemeContext } from '../../../../utils/ThemeContext';
import { getCalibrationById } from '../../../../store/action/DeviceAction';
export default function Events() {
  const { theme } = React.useContext(ThemeContext);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('code');
  const getCalibrationByDeviceIdReducer = useSelector((state) => state.getCalibrationByDeviceIdReducer);
  const { data } = getCalibrationByDeviceIdReducer;

  let calibrationFilter = data && data.data;
  const incPage = parseInt(data && data.currentPage)
  const totalPage = parseInt(data && data.totalPages)
  console.log("incPage", incPage)
  console.log("data", data)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getCalibrationById({ page: 1, limit: recordsPerPage })
    )
  }, ([]))

  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = calibrationFilter && calibrationFilter.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data && data.data.length / recordsPerPage)
  const numbers = Array.from({ length: npage }, (_, i) => i + 1).slice(1)

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
          {records && records
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
                      {item1.message == "FAILED" ?
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#d51515", height: "2rem", borderRadius: "10px", width: "6rem", marginTop: "0.3rem" }}><span style={{ color: "white" }}>FAILED</span></div>
                        : item1.message == "SUCCESS" ?
                          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#209018", height: "2rem", borderRadius: "10px", width: "6rem", marginTop: "0.3rem" }}><span style={{ color: "white" }}>SUCCESS</span></div>
                          : ""}
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
    </>
  )
  function prePage() {
    dispatch(getCalibrationById({ page: incPage - 1, limit: recordsPerPage }))
  }
  function changeCPage(id) {
    setCurrentPage(id)
  }
  function nextPage() {
    dispatch(getCalibrationById({ page: incPage + 1, limit: recordsPerPage }))
  }
}