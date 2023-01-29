import React, {useState} from "react";
import {Modal,Button,Form} from "react-bootstrap";
import { useDispatch,useSelector } from "react-redux";
import {registerNewDevice} from "../../../store/action/DeviceAction"
import Style from "../../../css/AddProjectModal.module.css";

const addDeviceModal = (props) =>{
    const [registerDevice,setRegisterDevice] = useState({
      deviceID:"",
      IMEINo: "",
      hospName: "",
      WardNo:"",
      VentilatorOperator:"",
      DocName:"",

    });
    const [chips,setChips] = useState("");
    const[modelType,setModelType] = useState([]);
    const [ errorName,setErrorName] = useState();
    const [errorMsg, setErrorMsg] = useState();

    const registerNewDeviceReducer = useSelector(
        (state) =>state.registerNewDeviceReducer
       );
       const {data,error} = registerNewDeviceReducer;
       const deleteChips = (type) =>{
        setModelType(
            modelType.filter((item) => {
              return item !== type;
            })
        );
       };
       
  const addChips = (e) => {
    if (["Enter", "Tab", ","].includes(e.key)) {
      // e.preventDefault();

      let inputChips = chips.trim();
      if (inputChips) {
        if (!modelType.includes(inputChips.toLowerCase())) {
          setModelType([...modelType, inputChips]);
        }
        setChips("");
      }
    }
  };
  const dispatch = useDispatch();


  const handleSubmit = (e) =>{
    setErrorName("");
    setErrorMsg("");
    if(!registerDevice.hospName.length){
        setErrorName("Device Id is Required")
    }
    if(!modelType.length){
        setErrorMsg("Device ID is required");
    }
    if(registerDevice.hospName.length && modelType.length)  {
        setErrorName("");
        setErrorMsg("");
        dispatch(
            registerNewDevice(
                registerDevice.deviceID,
                modelType,
                registerDevice.hospName
            )
        );
    }
  };
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
                style={{color:"#1F99A4"}}
                >
                    Register New Device
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className="card darkModeColor">
            {error ? (
                <div style={{fontSize :12, color:"red"}}>{error}</div>
            ):(
                ""
            )}
            {data ? (
                <h6 style={{fontSize:12,color:"green"}}>
                    Device Registered Successfully...
                </h6>
            ):(
                ""
            )}
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="darkModeColor">Device ID</Form.Label>
                <Form.Control
                className={Style.inputFields}
                type="text"
                placeholder="Please Enter Device ID"
                onChange={(e)=>
                    setRegisterDevice({...registerDevice,deviceID:e.target.value})
                }
                required
                />
                {errorName ? (
                    <div style={{fontSize : 12, color:"red"}}>{errorName}</div>
                ):(
                    ""
                )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="darkModeColor">Description</Form.Label>
            <Form.Control
              className={Style.inputFields}
              as="textarea"
              rows={3}
              type="textarea"
              placeholder="Please Provide Project description"
              onChange={(e) =>
                setRegisterDevice({
                  ...registerDevice,
                  description: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3  " controlId="formBasicPassword">
            <Form.Label className="darkModeColor">
              Provide Device type
            </Form.Label>
            <Form.Control
              className={Style.inputFields}
              type="text"
              placeholder="Device type"
              value={chips}
              onKeyDown={(e) => {
                addChips(e);
              }}
              onChange={(e) => setChips(e.target.value)}
              required
            />
            {errorMsg ? (
              <small style={{ fontSize: 12, color: "red" }}>{errorMsg}</small>
            ) : (
              ""
            )}
          </Form.Group>

          <section className={Style.tagItemsOuter}>
            {modelType.map((type) => (
              <div className={Style.tag_item} key={type}>
                {type}
                <button
                  type="button"
                  onClick={() => {
                    deleteChips(type);
                  }}
                >
                  &times;
                </button>
              </div>
            ))}
          </section>
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
              Save
            </Button>
          </section>
        </Modal.Footer>
      </Modal>
    </>
  )
    

}
export default addDeviceModal;