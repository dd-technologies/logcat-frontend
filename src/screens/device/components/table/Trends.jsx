import React, { useEffect } from 'react';
import {useDispatch,useSelector } from 'react-redux';
import Style from '../../../../css/deviceTrends.module.css';
import { ThemeContext } from '../../../../utils/ThemeContext';
import { getDeviceTrendsById } from '../../../../store/action/DeviceAction';
function Trends() {
  const { theme } = React.useContext(ThemeContext);
    const getAllTrendsByDeviceIdReducer = useSelector((state)=>state.getAllTrendsByDeviceIdReducer);
    const {data} = getAllTrendsByDeviceIdReducer;
    console.log('getAllTrendsByDeviceIdReducer',getAllTrendsByDeviceIdReducer)

    let trendsFilter = data && data.data && data.data.findDeviceById;
    console.log(trendsFilter)
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('name');
    console.log(code)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(
          getDeviceTrendsById(
                code,
            )
        )
    },([]))
  return (
    <>
    <div className='d-flex' style={{fontSize: "0.9rem"}}>
      {/* Trends Value */}
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
          <div style={{margin:"0.8rem",width:"6rem",textAlign:"center"}}>Mean Airway</div>
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
          <div style={{margin:"0.8rem",width:"7rem",textAlign:"center"}}>RR</div>
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
          <div style={{margin:"0.8rem",width:"6rem",textAlign:"center"}}>Average Leak</div>
          <div className={Style.insideMapData}>%</div>
        </div>
      </div>
      {/* Trends Data */}
      <div className= "d-grid" style={{maxWidth:"81%",overflowX:"auto"}}> 
        <div className={Style.trendsInnerDataTop}>
          {trendsFilter && trendsFilter.map((item,_id)=>{
              return(
                <>
          <div className={Style.insideMapData}>{item.time}</div>
          </>
              )
        })}
        </div>
        <div className={Style.trendsInnerDataEven}>
        {trendsFilter && trendsFilter.map((item,_id)=>{
              return(
                <>
          <div className={Style.insideMapData}>{item.mode}</div>
          </>
              )
        })}
        </div>
        <div className={Style.trendsInnerDataOdd}>
        {trendsFilter && trendsFilter.map((item,_id)=>{
              return(
                <>
          <div className={Style.insideMapData}>{item.pip}</div>
          </>
              )
        })}
        </div>
        <div className={Style.trendsInnerDataEven}>
        {trendsFilter && trendsFilter.map((item,_id)=>{
              return(
                <>
          <div className={Style.insideMapData}>{item.peep}</div>
          </>
              )
        })}
        </div>
        <div className={Style.trendsInnerDataOdd}>
        {trendsFilter && trendsFilter.map((item,_id)=>{
              return(
                <>
          <div className={Style.insideMapData}>{item.mean_Airway}</div>
          </>
              )
        })}
        </div>
        <div className={Style.trendsInnerDataEven}>
        {trendsFilter && trendsFilter.map((item,_id)=>{
              return(
                <>
          <div className={Style.insideMapData}>{item.vti}</div>
          </>
              )
        })}
        </div>
        <div className={Style.trendsInnerDataOdd}>
        {trendsFilter && trendsFilter.map((item,_id)=>{
              return(
                <>
          <div className={Style.insideMapData}>{item.vte}</div>
          </>
              )
        })}
        </div>
        <div className={Style.trendsInnerDataEven}>
        {trendsFilter && trendsFilter.map((item,_id)=>{
              return(
                <>
          <div className={Style.insideMapData}>{item.mve}</div>
          </>
              )
        })}
        </div>
        <div className={Style.trendsInnerDataOdd}>
        {trendsFilter && trendsFilter.map((item,_id)=>{
              return(
                <>
          <div className={Style.insideMapData}>{item.mvi}</div>
          </>
              )
        })}
        </div>
        <div className={Style.trendsInnerDataEven}>
        {trendsFilter && trendsFilter.map((item,_id)=>{
              return(
                <>
          <div className={Style.insideMapData}>{item.fio2}</div>
          </>
              )
        })}
        </div>
        <div className={Style.trendsInnerDataOdd}>
        {trendsFilter && trendsFilter.map((item,_id)=>{
              return(
                <>
          <div className={Style.insideMapData}>{item.respiratory_Rate}</div>
          </>
              )
        })}
        </div>
        <div className={Style.trendsInnerDataEven}>
        {trendsFilter && trendsFilter.map((item,_id)=>{
              return(
                <>
          <div className={Style.insideMapData}>{item.ie}</div>
          </>
              )
        })}
        </div>
        <div className={Style.trendsInnerDataOdd}>
        {trendsFilter && trendsFilter.map((item,_id)=>{
              return(
                <>
          <div className={Style.insideMapData}>{item.tinsp}</div>
          </>
              )
        })}
        </div>
        <div className={Style.trendsInnerDataEven}>
        {trendsFilter && trendsFilter.map((item,_id)=>{
              return(
                <>
          <div className={Style.insideMapData}>{item.texp}</div>
          </>
              )
        })}
        </div>
        <div className={Style.trendsInnerDataOdd}>
        {trendsFilter && trendsFilter.map((item,_id)=>{
              return(
                <>
          <div className={Style.insideMapData}>{item.averageLeak}</div>
          </>
              )
        })}
        </div>
      </div>
    </div>
    </>
  )
}

export default Trends