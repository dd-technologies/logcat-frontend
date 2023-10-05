import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Style from '../../../../css/deviceEvents.module.css';
import { ThemeContext } from '../../../../utils/ThemeContext';
import { getDeviceEventsById } from '../../../../store/action/DeviceAction';
import back from "../../../../assets/images/back.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { CSVLink } from "react-csv";
export default function Events() {
  const { theme } = React.useContext(ThemeContext);
  const getAllEventsByDeviceIdReducer = useSelector((state) => state.getAllEventsByDeviceIdReducer);
  const { loading, data } = getAllEventsByDeviceIdReducer;

  let eventsFilter = data && data.data && data.data.findDeviceById;
  const incPage = parseInt(data && data.currentPage)
  const totalPage = parseInt(data && data.totalPages)
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 8;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = eventsFilter && eventsFilter.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data && data.data.length / recordsPerPage)
  const numbers = Array.from({ length: npage }, (_, i) => i + 1).slice(1)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDeviceEventsById({ page: 1, limit: recordsPerPage }));
  }, [dispatch])
  console.log("eventsFilter",eventsFilter)
  return (
    <>
      {records && records.length > 0 ?
        <section className={Style.alertTable}>
          <div className='csvImg' style={{display:'flex',gap:'0.5rem',justifyContent:'end',alignItems:'center',padding:'5px 10px 0px 0px'}}>
            <span style={{display:'inline',fontSize:'0.8rem',textDecoration:'none'}}>Download</span>
            <CSVLink title='LogCat' data={records}>
              <FontAwesomeIcon icon={faFileArrowDown} style={{ color: "#cb297b", height: "23px" }} />
            </CSVLink>
          </div>
          <section className={Style.tableHeader}>
            <section className={Style.innerHeader}>
              <p
                className={Style.tableHeadingData}
              >
                Device Id
              </p>
            </section>
            <section className={Style.innerHeader}>
              <p
                className={Style.tableHeadingData}
              >
                Message
              </p>
            </section>
            <section className={Style.innerHeader}>
              <p
                className={Style.tableHeadingData}
              >
                Type
              </p>
            </section>
            <section className={Style.innerHeader}>
              <p
                className={Style.tableHeadingData}
              >
                Date
              </p>
            </section>
            <section className={Style.innerHeader}>
              <p
                className={Style.tableHeadingData}
              >
                Time
              </p>
            </section>
          </section>
          <section>
            {records && records
              .map((item1, _id) => {
                return (
                  <React.Fragment key={_id}>
                    <section className={Style.tableBody}>
                      <section
                      >
                        <h6 className={Style.insideTextData}>
                          {item1.did}
                        </h6>
                      </section>
                      <section

                      >
                        <h6 className={Style.insideTextData}>
                          {item1.message}
                        </h6>
                      </section>
                      <section

                      >
                        <h6 className={Style.insideTextData}>
                          {item1.type}
                        </h6>
                      </section>
                      <section

                      >
                        <h6 className={Style.insideTextData}>
                          {item1.date}
                        </h6>
                      </section>
                      <section

                      >
                        <h6 className={Style.insideTextData}>
                          {item1.time}
                        </h6>
                      </section>
                    </section>
                  </React.Fragment>
                )
              }
              )
            }
          </section>
        </section>
        :
        <section style={{ width: '100%', height: '100%', marginTop: '10rem', marginBottom: '10rem' }}>
          {records && records.length == 0 && (
            <section className={Style.noDataFound}>
              <span>
                No Data Found
              </span>
            </section>
          )}
          {loading && <span style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', fontSize: 20 }}>Loading...</span>}
        </section>
      }
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
    dispatch(getDeviceEventsById({ page: incPage - 1, limit: recordsPerPage }))
  }
  function changeCPage(id) {
    setCurrentPage(id)
  }
  function nextPage() {
    dispatch(getDeviceEventsById({ page: incPage + 1, limit: recordsPerPage }))
  }
}