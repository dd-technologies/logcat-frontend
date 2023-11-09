import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Style from '../../../../css/deviceTrends.module.css';
import { ThemeContext } from '../../../../utils/ThemeContext';
import { getDeviceTrendsById } from '../../../../store/action/DeviceAction';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { CSVLink } from "react-csv";

function Trends() {
  const { theme } = React.useContext(ThemeContext);
  const getAllTrendsByDeviceIdReducer = useSelector((state) => state.getAllTrendsByDeviceIdReducer);
  const { loading, data } = getAllTrendsByDeviceIdReducer;

  let trendsFilter = data && data.data && data.data.findDeviceById;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('name');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getDeviceTrendsById(
        code,
      )
    )
  }, ([]))
  return (
    <>
      {/* <div className='csvImg' style={{ display: 'flex', gap: '0.5rem', justifyContent: 'end', alignItems: 'center', padding: '5px 10px 0px 0px' }}> */}
        {/* <span style={{ display: 'inline', fontSize: '0.8rem', textDecoration: 'none' }}>Download</span> */}
        {/* <CSVLink title='LogCat' data={trendsFilter}>
          <FontAwesomeIcon icon={faFileArrowDown} style={{ color: "#cb297b", height: "23px" }} />
        </CSVLink> */}
      {/* </div> */}
      <div className='d-flex' style={{ fontSize: "0.9rem" }}>
        {/* Trends Value */}
        {trendsFilter && trendsFilter.length > 0 ?
          <>
            <div>
              <div className={Style.trendsInnerValueTop}>
                <div className={Style.insideMapData} >Parameter</div>
                <div className={Style.insideMapData}>Unit</div>
              </div>
              <div className={Style.trendsInnerValueOdd}>
                <div className={Style.insideMapData}>Mode</div>
                <div className={Style.insideMapData}>Mode Type</div>
              </div>
              <div className={Style.trendsInnerValueEven}>
                <div className={Style.insideMapData}>PIP</div>
                <div className={Style.insideMapData}>cmH20</div>
              </div>
              <div className={Style.trendsInnerValueOdd}>
                <div className={Style.insideMapData}>PEEP</div>
                <div className={Style.insideMapData}>cmH20</div>
              </div>
              <div className={Style.trendsInnerValueEven}>
                <div style={{ margin: "0.8rem", width: "6rem", textAlign: "center" }}>Mean Airway</div>
                <div className={Style.insideMapData}>cmH20</div>
              </div>
              <div className={Style.trendsInnerValueOdd}>
                <div className={Style.insideMapData}>Vti</div>
                <div className={Style.insideMapData}>ml</div>
              </div>
              <div className={Style.trendsInnerValueEven}>
                <div className={Style.insideMapData}>Vte</div>
                <div className={Style.insideMapData}>ml</div>
              </div>
              <div className={Style.trendsInnerValueOdd}>
                <div className={Style.insideMapData}>Mve</div>
                <div className={Style.insideMapData}>Litre</div>
              </div>
              <div className={Style.trendsInnerValueEven}>
                <div className={Style.insideMapData}>Mvi</div>
                <div className={Style.insideMapData}>Litre</div>
              </div>
              <div className={Style.trendsInnerValueOdd}>
                <div className={Style.insideMapData}>FiO2</div>
                <div className={Style.insideMapData}>%</div>
              </div>
              <div className={Style.trendsInnerValueEven}>
                <div style={{ margin: "0.8rem", width: "7rem", textAlign: "center" }}>RR</div>
                <div className={Style.insideMapData}>BPM</div>
              </div>
              <div className={Style.trendsInnerValueOdd}>
                <div className={Style.insideMapData}>I:E</div>
                <div className={Style.insideMapData}>Ratio</div>
              </div>
              <div className={Style.trendsInnerValueEven}>
                <div className={Style.insideMapData}>Tinsp</div>
                <div className={Style.insideMapData}>sec</div>
              </div>
              <div className={Style.trendsInnerValueOdd}>
                <div className={Style.insideMapData}>Texp</div>
                <div className={Style.insideMapData}>sec</div>
              </div>
              <div className={Style.trendsInnerValueEven}>
                <div style={{ margin: "0.8rem", width: "6rem", textAlign: "center" }}>Average Leak</div>
                <div className={Style.insideMapData}>%</div>
              </div>
            </div>
            {/* Trends Data */}
            <div className="d-grid" style={{ maxWidth: "100%", overflowX: "auto" }}>
              <div className={Style.trendsInnerDataTop}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData}>{item.time}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataEven}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData}>{item.mode}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataOdd}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData}>{item.pip}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataEven}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData}>{item.peep}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataOdd}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData}>{item.mean_Airway}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataEven}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData}>{item.vti}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataOdd}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData}>{item.vte}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataEven}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData}>{item.mve}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataOdd}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData}>{item.mvi}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataEven}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData}>{item.fio2}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataOdd}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData}>{item.respiratory_Rate}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataEven}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData}>{item.ie}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataOdd}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData}>{item.tinsp}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataEven}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData}>{item.texp}</div>
                    </>
                  )
                })}
              </div>
              <div className={Style.trendsInnerDataOdd}>
                {trendsFilter && trendsFilter.map((item, _id) => {
                  return (
                    <>
                      <div className={Style.insideMapData}>{item.averageLeak}</div>
                    </>
                  )
                })}
              </div>
            </div>
          </>
          :
          <section style={{ width: '100%', height: '100%', marginTop: '10rem', marginBottom: '10rem' }}>
            {trendsFilter && trendsFilter.length == 0 && (
              <section className={Style.noDataFound}>
                <span>
                  No Data Found
                </span>
              </section>
            )}
            {loading && <span style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', fontSize: 20 }}>Loading...</span>}
          </section>
        }
      </div>
    </>
  )
}

export default Trends