import React,{useState} from 'react';
import {Modal,Button,Form} from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { registerNewDevice } from '../../../store/action/DeviceAction';
import Style from "../../../css/EditDetailsModal.module.css";
import Device from "../Device";

const EditDetailsModal = (props) =>{
    const {item} = props;
    // console.log('did',item)
    const[EditDetails,setEditDetails] = useState({
        DeviceId:item,
        AliasName:'',
        Hospital_Name:'',
        Doctor_Name:'',
        Ward_No:'',
        IMEI_No:'',
        Ventilator_Operator:'',
    });
    localStorage.setItem('AliasName',JSON.stringify(EditDetails.AliasName))
    // console.log ({did});
    // console.log(EditDetails.DeviceId);
    // console.log(props)
    const onClick = () =>{
      props.sendData(EditDetails)
    }
    // const handleInputChange = (event) => {
    //   const { name, value } = event.target;
    //   setEditDetails((prevState) => ({
    //     ...prevState,
    //     [name]: value,
    //   }));
    //   props.onEditDetailsChange(EditDetails);
    // };
    const [errorName,setErrorName]= useState();
    const [modalShow,setModalShow] = useState(false);
    const [errorMsg,setErrorMsg] = useState();

    const dispatch = useDispatch();

      const handleSubmit=(e)=>{
        e.preventDefault();
        setErrorName("");
        setErrorMsg("");
        alert("Device Registered Successfully")
        if(item && EditDetails.AliasName && EditDetails.Ward_No && EditDetails.Hospital_Name && EditDetails.Doctor_Name && EditDetails.IMEI_No && EditDetails.Ventilator_Operator){
          console.log(EditDetails.AliasName)
            setErrorName("");
            setErrorMsg("");
            dispatch(
               registerNewDevice(
                    item,
                    EditDetails.AliasName,
                    EditDetails.Hospital_Name,
                    EditDetails.Doctor_Name,
                    EditDetails.Ward_No,
                    EditDetails.IMEI_No,
                    EditDetails.Ventilator_Operator
                ),
            ); 
            props.onHide(); 
            // console.log(item)
            // console.log(EditDetails.AliasName)
            // console.log(EditDetails.Hospital_Name)
            // console.log(EditDetails.Doctor_Name)
            // console.log(EditDetails.Ward_No)
            // console.log(EditDetails.IMEI_No)
            // console.log(EditDetails.Ventilator_Operator)    
      }
    }
  
   return(
    <>
    <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header className={'card darkModeColor'}>
                <Modal.Title
                id="contained-modal-title-vcenterv"
                style={{color:"#IF99A4"}}
                >
                    Device Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='card darkModeColor'>
            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="darkModeColor">Device ID</Form.Label>
            <Form.Control
              className={Style.inputFields}
              type="text"
              name="DeviceId"
              value={item}
              placeholder="Enter Your Device ID"
              readOnly
            />
            {errorName ? (
              <div style={{ fontSize: 12, color: "red" }}>{errorName}</div>
            ) : (
              ""
            )}
            </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="darkModeColor">Alias Name</Form.Label>
            <Form.Control
              className={Style.inputFields}
              type="text"
              name="AliasName"
              value={EditDetails.AliasName}
              placeholder="Enter Your Device Alias Name"
              onChange={(e) =>
                setEditDetails({ ...EditDetails,  AliasName: e.target.value })
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
              name="HospitalName"
              value={EditDetails.Hospital_Name}
              placeholder="Enter the Hospital Name"
              onChange={(e) =>
                setEditDetails({ ...EditDetails,  Hospital_Name: e.target.value })
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
              name="DoctorName"
              value={EditDetails.Doctor_Name}
              placeholder="Enter Doctor's Name"
              onChange={(e) =>
                setEditDetails({ ...EditDetails,  Doctor_Name: e.target.value })
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
            <Form.Label className="darkModeColor">Ward Number</Form.Label>
            <Form.Control
              className={Style.inputFields}
              type="text"
              name="WardNo"
              value={EditDetails.Ward_No}
              placeholder="Enter Your Ward Number"
              onChange={(e) =>
                setEditDetails({ ...EditDetails,  Ward_No: e.target.value })
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
            <Form.Label className="darkModeColor">IMEI Number</Form.Label>
            <Form.Control
              className={Style.inputFields}
              type="text"
              name="IMEINumber"
              value={EditDetails.IMEI_No}
              placeholder="Enter Your Device IMEI Number"
              onChange={(e) =>
                setEditDetails({ ...EditDetails,  IMEI_No: e.target.value })
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
            <Form.Label className="darkModeColor">Ventilator Operator</Form.Label>
            <Form.Control
              className={Style.inputFields}
              type="text"
              name="ventiOperator"
              value={EditDetails.Ventilator_Operator}
              placeholder="Enter Ventilator Operator's Name"
              onChange={(e) =>
                setEditDetails({ ...EditDetails,  Ventilator_Operator: e.target.value })
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
export default EditDetailsModal