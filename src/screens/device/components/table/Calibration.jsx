import React, { useEffect, useState } from 'react';
import back from "../../../../assets/images/back.png";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Style from '../../../../css/deviceCalibration.module.css';
import { ThemeContext } from '../../../../utils/ThemeContext';
import { getCalibrationById } from '../../../../store/action/DeviceAction';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { CSVLink } from "react-csv";
export default function Events() {
  const { theme } = React.useContext(ThemeContext);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('code');
  const getCalibrationByDeviceIdReducer = useSelector((state) => state.getCalibrationByDeviceIdReducer);
  const { loading, data } = getCalibrationByDeviceIdReducer;

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
      {records && records.length > 0 ?
        <>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ borderRadius: '0px 0px 2rem 2rem' }}>
          <div className='csvImg' style={{ display: 'flex', gap: '0.5rem', justifyContent: 'end', alignItems: 'center', padding: '5px 10px 5px 0px', backgroundColor: '#cb297b' }}>
              <CSVLink title='LogCat' data={records} style={{ display: 'flex', fontSize: '0.8rem', textDecoration: 'none', color: 'white', textAlign: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline', fontSize: '0.8rem', textDecoration: 'none', color: 'white' }}>Download</span>
                <FontAwesomeIcon icon={faFileArrowDown} style={{ color: "white", height: "23px" }} />
              </CSVLink>
            </div>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <td scope="col" class="px-6 py-3 text-center text-black text-4xl font-semibold">
                    Device ID
                  </td>
                  <td scope="col" class="px-6 py-3 text-center text-black text-4xl font-semibold">
                    Name
                  </td>
                  <td scope="col" class="px-6 py-3 text-center text-black text-4xl font-semibold">
                    Message
                  </td>
                  <td scope="col" class="px-6 py-3 text-center text-black text-4xl font-semibold">
                    Date
                  </td>
                  <td scope="col" class="px-6 py-3 text-center text-black text-4xl font-semibold">
                    Time
                  </td>
                </tr>
              </thead>
              <tbody>
                {records && records.map((item, index) => {
                  return (
                    <tr class="bg-white border-b hover:bg-gray-50">
                      <td class="px-6 py-4 text-center font-semibold text-gray-900">
                        {item.deviceId ? item.deviceId : '---'}
                      </td>
                      <td class="px-6 py-4 text-center ">
                        {item.name ? item.name : '---'}
                      </td>
                      <td class="px-6 py-4 text-center ">
                        {item.message == "FAILED" ?
                          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#d51515", height: "2rem", borderRadius: "10px", width: "6rem", marginTop: "0.3rem" }}><span style={{ color: "white" }}>FAILED</span></div>
                          : item.message == "SUCCESS" ?
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#209018", height: "2rem", borderRadius: "10px", width: "6rem", marginTop: "0.3rem" }}><span style={{ color: "white" }}>SUCCESS</span></div>
                            : ""}
                      </td>
                      <td class="px-6 py-4 text-center ">
                        {item.date ? item.date : '---'}
                      </td>
                      <td class="px-6 py-4 text-center ">
                        {item.time ? item.time : '---'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
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
        :
        <div style={{ height: '500px', backgroundColor: 'white', width: '100%', borderRadius: '20px', boxShadow: '0px 0px 50px #00000029', background: '#FFFFFF 0% 0% no-repeat padding-box' }}>
          {records && records.length == 0 && (
            <section className={Style.noDataFound}>
              <span>
                No Data Found
              </span>
            </section>
          )}
          {loading && <span style={{ position: 'absolute', top: '50%', right: '50%' }}>Loading...</span>}
        </div>
      }
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