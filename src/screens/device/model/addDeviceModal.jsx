import React, { useState } from "react";
import { Modal, Button, Form, ModalBody } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerNewDevice } from "../../../store/action/DeviceAction";
import Style from "../../../css/AddProjectModal.module.css";
import CreateProject from "../../projects/CreateProject";
import { uploadNewProject } from "../../../store/action/ProjectAction";


const AddDeviceModal = (props) => {
  const [registerDevice, setRegisterDevice] = useState({
    DeviceID:"",
    DoctorName:"",
    HospitalName:"",
    Alias:"",
    IMEINumber:"",
    VentiOperator:"",
    Wardno:"",
    
  });
  const [chips, setChips] = useState("");
  const [modelType, setModelType] = useState([]);
  const [errorName, setErrorName] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const createNewProjectReducer = useSelector(
    (state) => state.createNewProjectReducer
  );
  // console.log('createNewProjectReducer',createNewProjectReducer)
  const { data, error } = createNewProjectReducer;

  const dispatch = useDispatch();

  const handleSubmit = (e) =>{
    e.preventDefault();
    setErrorName("");
    setErrorMsg("");
    // if(!registerDevice.DoctorName){
    //   setErrorName("Device ID is Mandatory");
    // }
    // if(!HospitalName.length){
    //   setErrorName("Hospital's Name is Required Field");
    // }
    if(registerDevice.DeviceID && registerDevice.Alias ){
      setErrorName("");
      setErrorMsg("");
      dispatch(
        registerNewDevice(
          registerDevice.DeviceID,
          registerDevice.DoctorName,

        )
      )
    }

  }
  return(
    <>
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
         <Modal.Header className="card darkModeColor">
          <Modal.Title
            id="contained-modal-title-vcenterv"
            style={{ color: "#1F99A4" }}
          >
            Register New Device
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="card darkModeColor">
          {error ? (
            <div style={{ fontSize: 12, color: "red" }}>{error}</div>
          ) : (
            ""
          )}
          {data ? (
            <h6 style={{ fontSize: 12, color: "green" }}>
             Device Registered Successfully...
            </h6>
          ) : (
            ""
          )}
           <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="darkModeColor">Device ID</Form.Label>
            <Form.Control
              className={Style.inputFields}
              type="text"
              placeholder="Enter Your Device ID"
              onChange={(e) =>
                setRegisterDevice({ ...registerDevice,  DeviceID: e.target.value })
              }
              required
            />
            {errorName ? (
              <div style={{ fontSize: 12, color: "red" }}>{errorName}</div>
            ) : (
              ""
            )}
          </Form.Group>
          <Form.Group>
          </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="darkModeColor"> Alias Name</Form.Label>
            <Form.Control
              className={Style.inputFields}
              type="text"
              placeholder="Please Enter an Alias Name for the Ventilator"
              onChange={(e) =>
                setRegisterDevice({ ...registerDevice,  Alias: e.target.value })
              }
              required
            />
            {errorName ? (
              <div style={{ fontSize: 12, color: "red" }}>{errorName}</div>
            ) : (
              ""
            )}
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="darkModeColor">Doctor Name</Form.Label>
            <Form.Control
              className={Style.inputFields}
              type="text"
              placeholder="Please Enter Doctor Name"
              onChange={(e) =>
                setRegisterDevice({ ...registerDevice, DoctorName: e.target.value })
              }
              required
            />
            {errorName ? (
              <div style={{ fontSize: 12, color: "red" }}>{errorName}</div>
            ) : (
              ""
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="darkModeColor">Hospital Name</Form.Label>
            <Form.Control
              className={Style.inputFields}
              type="text"
              placeholder="Please Enter Hospital Name"
              onChange={(e) =>
                setRegisterDevice({ ...registerDevice, HospitalName: e.target.value })
              }
              required
            />
            {errorName ? (
              <div style={{ fontSize: 12, color: "red" }}>{errorName}</div>
            ) : (
              ""
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="darkModeColor"> Ventilator IMEI Number</Form.Label>
            <Form.Control
              className={Style.inputFields}
              type="text"
              placeholder="Please Enter IMEI Number"
              onChange={(e) =>
                setRegisterDevice({ ...registerDevice,  IMEINumber: e.target.value })
              }
              required
            />
            {errorName ? (
              <div style={{ fontSize: 12, color: "red" }}>{errorName}</div>
            ) : (
              ""
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="darkModeColor"> Ventilator Operator</Form.Label>
            <Form.Control
              className={Style.inputFields}
              type="text"
              placeholder="Please enter Ventilator Operator's Name"
              onChange={(e) =>
                setRegisterDevice({ ...registerDevice,  VentiOperator: e.target.value })
              }
              required
            />
            {errorName ? (
              <div style={{ fontSize: 12, color: "red" }}>{errorName}</div>
            ) : (
              ""
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="darkModeColor"> Ward Number</Form.Label>
            <Form.Control
              className={Style.inputFields}
              type="text"
              placeholder="Please Enter Ward Number"
              onChange={(e) =>
                setRegisterDevice({ ...registerDevice,  Wardno: e.target.value })
              }
              required
            />
            {errorName ? (
              <div style={{ fontSize: 12, color: "red" }}>{errorName}</div>
            ) : (
              ""
            )}
          </Form.Group>
          </Modal.Body>
          <Modal.Footer className="card darkModeColor">
          <section
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              onClick={props.onHide}
              style={{ backgroundColor: "#1a83ff", marginLeft: "10px" }}
            >
              Cancel
            </Button>
            <Button
              style={{ backgroundColor: "#1a83ff" }}
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Register
            </Button>
          </section>
        </Modal.Footer>

    </Modal>
    </>
  )
}
export default AddDeviceModal;