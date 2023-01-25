import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerNewDevice } from "../../../store/action/DeviceAction";
import Style from "../../../css/AddProjectModal.module.css"

const addDeviceModal = (props) =>{
    const [registerDevice,setRegisterDevice] = useState({
        deviceID:"",
        IMEIno:"",
        hospName:"",
    });
    const [chips,setChips] = useState("");
    const [errorName, setErrorName] = useState();
    const [errorMsg, setErrorMsg] = useState();
}