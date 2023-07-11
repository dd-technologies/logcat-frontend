import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Style from '../../../../css/deviceEvents.module.css';
import { ThemeContext } from '../../../../utils/ThemeContext';
import { getRegisteredDetailsById, getDeviceEventsById } from '../../../../store/action/DeviceAction';
export default function Events() {
  const {theme} = React.useContext(ThemeContext);
  const getAllEventsByDeviceIdReducer = useSelector((state)=>state.getAllEventsByDeviceIdReducer);
  const {data} = getAllEventsByDeviceIdReducer;
  console.log(getAllEventsByDeviceIdReducer);

  let eventsFilter = data && data.data && data.data.findDeviceById;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('code');
  const deviceid = urlParams.get('DeviceId')
  console.log('deviceid',deviceid)

  const getRegisteredDetailsReducer = useSelector((state)=>state.getRegisteredDetailsReducer);
  const {data12} = getRegisteredDetailsReducer;
  console.log('first',data12)
  console.log(data && data.data && data.data.findDeviceById && data.data.findDeviceById.did)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getDeviceEventsById(
        code,
      )
    );
  }, ([]))
  useEffect(() => {
    dispatch(
      getRegisteredDetailsById(
        deviceid
      )
    )
  }, ([]))
  return (
    <>
      <section className={Style.alertTable}>
        {/* <span style={{ display: "flex", justifyContent: "end", marginRight: "2rem", marginTop: "-1rem" }}>
          <CSVLink data={csvData} headers={headers} filename='Event.csv'>
            <FontAwesomeIcon
              color="#CB297B"
              style={{ cursor: "pointer", display: "flex", height: "1.6rem", width: "2rem", color: "white", backgroundColor: "#CB297B", padding: "0.3rem", borderRadius: "5px" }}
              icon={faDownload}
            /></CSVLink>
        </span> */}
        <section className={Style.tableHeader}>
          {/* <section style={{
            color: theme === 'light-theme' ? '#000' : '#fff',
          }}
          ><input
              type="checkbox"
              // onChange={handleSelectAll}
              // checked={isCheckAll}
              id="selectAll"

            /></section> */}
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
          {eventsFilter && eventsFilter
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
          {/* <nav aria-label="Page navigation example">
            <ul class="pagination mt-4">
              <li class="page-item"><a class="page-link"  onClick={prePage}>Previous</a></li>
              {numbers.map((n,i)=>{
                <li class={`page-item ${currentPagae === n ? 'active' : " "}`} key={i}><a class="page-link"  onClick={changePage}>{n}</a></li>
              })}
              <li class="page-item"><a class="page-link"onClick={nextPage}>Next</a></li>
            </ul>
          </nav> */}
        </div>
      </section>
    </>
  )
//   function prePage(){
// if(currentPagae !== firtIndex){
//   setCurentPage( currentPagae - 1)
// }
//   }
//   function changePage(e){
// setCurentPage(e)
//   }
//   function nextPage(){
//     if(currentPagae !== lastIndex){
//       setCurentPage( currentPagae + 1)
//     }
//   }
}