import React from 'react'
import Style from '../../css/DeviceData.module.css';



export default function DeviceData(props){
    return(
        <>
        <h1>Device Logs</h1>
        {props.DeviceId}
        </>
    )
}