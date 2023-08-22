// Live.js
import React from 'react';
import image from '../../assets/images/remove.png';
import { useNavigate } from 'react-router';
import { liveDataUpdate } from "../../store/action/LiveAction"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Toaster, toast } from 'react-hot-toast';
import Style from "../../css/Live.module.css"
const serverUrl = 'http://192.168.2.1:8000/'; // Replace with your server address
const socket = io.connect(serverUrl, () => {
  console.log("hello world")
})
function Live() {
  const [dataArray, setDataArray] = useState([]);
  const [mode, setMode] = useState([])
  const [perameters, setParameters] = useState([])
  const [observer, setObserver] = useState([])
  const [alertData, setAlertData] = useState([])
  const [seconds, setSeconds] = useState(120);

  // 2 Minute timmer functionality
  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(prevSeconds => prevSeconds - 1);
      }
    }, 1000);
    if (seconds <= 0) {
      // console.log("Hello Rohan")
      socket.emit('ReactNodeStop', deviceId)
      navigate(`/device`)
    }
    return () => {
      clearInterval(timer);
    };
  }, [seconds]);

  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return (`${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`)
  };





  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const deviceId = urlParams.get('DeviceId')
  const projectName = urlParams.get('projectName');
  const code = urlParams.get('code');
  const navigate = useNavigate()
  const handleClose = () => {
    socket.emit('ReactNodeStop', deviceId)
    navigate(`/deviceOverview?code=${code}&projectName=${projectName}&DeviceId=${deviceId}`)
  };
  const dispatch = useDispatch()
  const liveDataReducer = useSelector((state) => state.liveDataReducer);
  const { data } = liveDataReducer;
  console.log("data", data)
  useEffect(() => {
    dispatch(liveDataUpdate(deviceId))
  }, [])
  useEffect(() => {
    const connectToServer = async () => {
      try {
        await io.connect();
        console.log('Connected to server');
        checkServerStatus();
      } catch (error) {
        console.error('Error connecting to server:', error);
      }
    };

    socket.emit('ReactStartUp', deviceId)
    socket.on('DataReceivingReact', data => {
      var value = data.split("^")[0];
      if (value == deviceId) {
        const modeData = data.split("^")[1]
        const observedData = data.split("^")[2].split(",")
        const setParameter = data.split("^")[3].split(",")
        const secondaryObserved = data.split("^")[4].split(",")
        const alertData = data.split("^")[5]
        setDataArray(observedData)
        setMode(modeData)
        setParameters(setParameter)
        setObserver(secondaryObserved)
        setAlertData(alertData)
      }
    })

    socket.on('ReceiverVentilatorDisconnected', data => {
      var value = data.split(",")[0];
      if (value == deviceId) {
        setTimeout(() => {
          navigate('/deviceOverview')
        }, 1000);
        toast.error('Ventilator Disconnected')
      }
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      setDataArray([]);
    });

    var newDeviceId = deviceId
    var supernewDeviceid = JSON.stringify(newDeviceId)
    console.log("supernewDeviceid1", supernewDeviceid)
    socket.on(supernewDeviceid, (data) => {
      console.log('Received data:', data);
      console.log("supernewDeviceid2", supernewDeviceid)
      // setDataArray(data);
    });
    var newDeviceId = deviceId
    var supernewDeviceid = JSON.stringify(newDeviceId)
    const checkServerStatus = () => {
      console.log("123123", supernewDeviceid)
    };
  }, [])
  console.log("123", data)
  const detectHistory = () => {
    socket.emit('ReactNodeStop', deviceId)
  }
  useEffect(() => {
    // Attach the event listener when the component mounts
    window.addEventListener("popstate", detectHistory);
  }, []); // Empty dependency array means this effect runs only on mount and unmount

  return (
    <div className={Style.container}>
      <Toaster />
      {dataArray.length > 0 ?
        <div className={Style.insideContainer}>
          <div className={Style.upperModel}>
            <div className={Style.liveHeading}>
              <h1 className={Style.model_heading}>{mode}</h1>
              <h5 style={{ width: "500px", backgroundColor: alertData.split("~")[1], color: alertData.split("~")[2], padding: '20px', fontSize: "1rem" }}>{alertData.split("~")[0]}</h5>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <h5 style={{ color: 'white' }}>{formatTime()}</h5>
                <div
                  style={{
                    cursor: 'pointer',
                  }}
                  onClick={handleClose}
                >
                  <img
                    src={image}
                    alt="Close"
                    className={Style.cross_ing}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={Style.formData}>
            <div className={Style.leftDataForm}>
              <h5 className={Style.dataHeading}>DATA</h5>
              <h5>ALARMS</h5>
              <h5>LOPPS</h5>
              <h5>LAYOUTS</h5>
              <h5>MANEUVERS</h5>
              <h5>LOGS</h5>
              <h5>MODES</h5>
              <h5>CONTROLES</h5>
              <h5>SYSTEM</h5>
            </div>
            <div className={Style.mainData}>
              {dataArray.map((label, index) => (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', gap: "1rem" }}>
                  <span style={{ color: "white", fontSize: 20 }}>{label.split("~")[0]}</span>
                  <span style={{ color: "white", fontSize: 15 }}>{label.split("~")[1] === "null" ? "-" : label.split("~")[1]}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {observer.map((item, index) => {
                return (
                  <div key={index} style={{ textAlign: "start", color: '#787878', width: '15rem', border: '1px solid #606060', padding: '0.8rem' }}>
                    <h6>{item.split("~")[0]}</h6>
                    <h1 style={{ textAlign: 'end', color: 'white' }}>{item.split("~")[1]}</h1>
                    <h6>{item.split("~")[2]}</h6>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='lower_model' style={{ marginTop: "1rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              {perameters.map((item, index) => {
                return (
                  <div key={index} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", textAlign: 'center', color: '#787878', width: '12rem', height: '9rem', border: '1px solid #606060', padding: '1rem' }}>
                    <h6>{item.split("~")[0]}</h6>
                    <h1 style={{ color: 'white' }}>{item.split("~")[1]}</h1>
                    <h6>{item.split("~")[2]}</h6>
                  </div>
                )
              })}
            </div>
          </div>
        </div> :
        <div style={{ backgroundColor: "black", height: "100vh", textAlign: 'center', marginTop: "25%" }}>
          <h5 style={{ color: "white" }}>Loading...</h5></div>}
    </div>
  );
}

export default Live;