import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Style from '../../../../css/deviceEvents.module.css';
import { ThemeContext } from '../../../../utils/ThemeContext';
import { getRegisteredDetailsById, getDeviceEventsById } from '../../../../store/action/DeviceAction';
import { Link } from 'react-router-dom';
import back from "../../../../assets/images/back.png";
import SpinnerCustom from '../../../../container/SpinnerCustom';
export default function Events() {
  const {theme} = React.useContext(ThemeContext);
  const getAllEventsByDeviceIdReducer = useSelector((state)=>state.getAllEventsByDeviceIdReducer);
  const {data} = getAllEventsByDeviceIdReducer;
  console.log(getAllEventsByDeviceIdReducer);

  const deviceReducer = useSelector((state) => state.deviceReducer);
  const { loading } = deviceReducer;

  let eventsFilter = data && data.data && data.data.findDeviceById;
  console.log("data001",data)
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('code');
  const deviceid = localStorage.getItem("deviceid")
  console.log('deviceid',deviceid)

  const getRegisteredDetailsReducer = useSelector((state)=>state.getRegisteredDetailsReducer);
  const {data12} = getRegisteredDetailsReducer;
  console.log(data && data.data && data.data.findDeviceById && data.data.findDeviceById.did)
  const incPage=parseInt(data && data.currentPage)
  const totalPage=parseInt(data && data.totalPages)
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 8;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = eventsFilter && eventsFilter.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data && data.data.length / recordsPerPage)
  const numbers = Array.from({ length: npage }, (_, i) => i + 1).slice(1)
  console.log("incPage", incPage)
  console.log("totalPage", totalPage)
  console.log("currentPage", currentPage)
  console.log("111",deviceid)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDeviceEventsById({page:1,limit:recordsPerPage}));
  }, [dispatch])
  // useEffect(() => {
  //   dispatch(
  //     getRegisteredDetailsById(
  //       deviceid
  //     )
  //   )
  // }, ([]))
  
  const goBack=()=>{
    window.history.go(-1)
  }
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
              Type
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
          {records && records
            .map((item1, _id) => {
              return (
                <React.Fragment key={_id}>
                  <section className={Style.tableBody}>
                    {/* <section>
                      <input
                        type="checkbox"
                        id={item1._id}
                      // name={JSON.stringify(item)}
                      // onChange={handleClick}
                      // checked={isCheck.includes(item._id)}
                      />
                    </section> */}
                    <section
                      style={{
                        color:
                          theme === 'light-theme' ? '' : '#fff',

                      }}
                    >
                      {item1.did}
                    </section>
                    <section
                      style={{
                        color:
                          theme === 'light-theme' ? '' : '#fff',
                      }}
                    >
                      {item1.message}
                    </section>
                    <section
                      style={{
                        color:
                          theme === 'light-theme' ? '' : '#fff',
                      }}
                    >
                      {item1.type}
                    </section>
                    <section
                      style={{
                        color:
                          theme === 'light-theme' ? '' : '#fff',
                      }}
                    >
                      {item1.date.split('T')[0]}
                    </section>
                    <section
                      style={{
                        color:
                          theme === 'light-theme' ? '' : '#fff',
                      }}
                    >
                      {(item1.date.split('T')[1])}

                      {/* { dateNew = moment.tz((item1.date.split('T')[1].split('.')[0]),"Asia/Calcutta").utcOffset("+05:30").format()} */}
                      {/* {parseInt(item1.date.split('T')[1].split('.')[0].split(':'))+5}{":"}{parseInt(item1.date.split('T')[1].split('.')[0].split(':')[1])+30} */}
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
            <ul class="pagination justify-content-end" style={{display:"flex",alignItems:'center'}}>
                {incPage > 1 ? 
                <button onClick={prePage} style={{border:"0px",backgroundColor:"white"}}>
                  <img src={back} style={{ width: "3rem" }} />
                </button>
                :" "}
                {numbers.map((n, i) => (
                  <li key={i} class={`page-item ${incPage == n ? 'active' : ""}`}><a style={{borderRadius:"100px",margin:"5px"} }class="page-link" href="#" onClick={() => changeCPage(n)}>{n}</a></li>
                ))}
                {incPage !== totalPage ?
                <button onClick={nextPage} style={{border:"0px",backgroundColor:"white"}}>
                  <img src={back} style={{ width: "3rem", transform: "rotate(180deg)" }} />
                </button>
                : " "}
              </ul>
            </nav>
            {/* {loading && <SpinnerCustom />} */}
    </>
  )
  function prePage() {
    dispatch(getDeviceEventsById({page:incPage-1,limit:recordsPerPage}))
}
function changeCPage(id) {
  setCurrentPage(id)
}
function nextPage() {
  dispatch(getDeviceEventsById({page:incPage+1,limit:recordsPerPage}))
}
}