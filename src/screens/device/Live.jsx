// Live.js
import React from 'react';
import { useSocket } from './SocketIO';
import image from '../../assets/images/remove.png';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import {liveDataUpdate} from "../../store/action/LiveAction"
import { useDispatch, useSelector } from 'react-redux';
const labels = ['Vti', 'Peep', 'PIP', 'VTe', 'Mvi', 'RR', 'FiO2', 'PfRe', 'PFRi', 'DC','Leakage','Texp','Tinsp','Sp. RR','RSBI','I:E','Ti/Tot'];

function Live() {

  const dataArray = useSocket();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const deviceId = urlParams.get('DeviceId')
  const projectName = urlParams.get('projectName');
  const code = urlParams.get('code');
const navigate=useNavigate()
  const handleClose = () => {
    navigate(`/deviceOverview?code=${code}&projectName=${projectName}&DeviceId=${deviceId}`)
  };
  const dispatch=useDispatch()
  const liveDataReducer = useSelector((state) => state.liveDataReducer);
  const { data } = liveDataReducer;
  console.log("deviceId",deviceId)
  console.log("liveDataReducer",liveDataReducer);
useEffect(()=>{
  dispatch(liveDataUpdate(deviceId))
},[])
// useEffect(()=>{
  
// })
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', background: 'black'}}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%',gap:"2rem",marginBottom:"2rem" }}>
        
        <div className='upper_model' style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div className='live_heading' style={{display:"flex",gap:"27rem",padding:"1rem",alignItems:"center"}}>
        <h1 style={{color: 'white',fontSize:"1.8rem",backgroundColor:"#027140",padding:"15px"}}>PC-SIMV</h1>
        <h1 style={{color: 'white',fontSize:"2rem"}}>Data Monitoring</h1>
        </div>
        <div
          style={{
            cursor: 'pointer',
          }}
          onClick={handleClose}
        >
          <img
            src={image}
            alt="Close"
            style={{ width: '20px', height: '20px',margin : '20px' }}
          />
        </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '7rem' }}>
          {labels.slice(0, 7).map((label, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white' ,gap:"1rem"}}>
              <span style={{color:"white", fontSize: 25 }}>{label}</span>
              <span style={{color:"white", fontSize: 15 }}>{dataArray[index] || '-'}</span>
            </div>
          ))}
          {labels.slice(7).map((label, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', gap:"1rem" }}>
              <span style={{color:"white", fontSize: 25 }}>{label}</span>
              <span style={{color:"white", fontSize: 15 }}>{dataArray[index + 7] || '-'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Live;
