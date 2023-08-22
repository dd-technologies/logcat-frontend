import React,{useState} from 'react';
import {Modal,Button,Form} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { registerNewDevice } from '../../../store/action/DeviceAction';
import Style from "../../../css/EditDetailsModal.module.css";
import { Toaster, toast } from 'react-hot-toast';

const EditDetailsModal = (props) =>{
    const {item} = props;
    const[EditDetails,setEditDetails] = useState({
        DeviceId:item,
        Department_Name:'',
        Hospital_Name:'',
        Doctor_Name:'',
        Ward_No:'',
        IMEI_No:'',
        Bio_Med:'',
    });
    // localStorage.setItem('Department_Name',JSON.stringify(EditDetails.Department_Name));  



    const [errorName,setErrorName]= useState();
    const [errorMsg,setErrorMsg] = useState();

    const dispatch = useDispatch();

      const handleSubmit=()=>{
        // e.preventDefault();
        setErrorName("");
        setErrorMsg("");
        if(item && EditDetails.Department_Name && EditDetails.Ward_No && EditDetails.Hospital_Name && EditDetails.Doctor_Name && EditDetails.IMEI_No && EditDetails.Bio_Med){
          console.log("(EditDetails.Department_Name",EditDetails.Department_Name)
          alert("Device Registered Successfully")
            setErrorName("");
            setErrorMsg("");
            dispatch(
               registerNewDevice(
                    item,
                    EditDetails.Department_Name,
                    EditDetails.Hospital_Name,
                    EditDetails.Doctor_Name,
                    EditDetails.Ward_No,
                    EditDetails.IMEI_No,
                    EditDetails.Bio_Med
                ),
            );
            props.onHide(); 
            window.location.reload()
            // console.log(item)
            // console.log(EditDetails.Hospital_Name)
            // console.log(EditDetails.Doctor_Name)
            // console.log(EditDetails.Ward_No)
            // console.log(EditDetails.IMEI_No)
            // console.log(EditDetails.Bio_Med)    
      }
      else{
        toast.error("Fill All Details")
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
          <Toaster/>
            <Modal.Header className={'card darkModeColor'}>
                <Modal.Title
                id="contained-modal-title-vcenterv"
                style={{color:"#707070"}}
                >
                     Register Device
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='card darkModeColor'>
            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="darkModeColor">Device ID</Form.Label>
            <input
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
            <Form.Label className="darkModeColor">Department</Form.Label>
            <input
              className={Style.inputFields}
              type="text"
              name="Department_Name"
              value={EditDetails.Department_Name}
              placeholder="Enter Department Name"
              onChange={(e) =>
                setEditDetails({ ...EditDetails,  Department_Name: e.target.value })
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
            <input
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
            <input
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
            <input
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
            <input
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
            <Form.Label className="darkModeColor">Bio-Med</Form.Label>
            <input
              className={Style.inputFields}
              type="text"
              name="ventiOperator"
              value={EditDetails.Bio_Med}
              placeholder="Enter Bio-Med Name"
              onChange={(e) =>
                setEditDetails({ ...EditDetails,  Bio_Med: e.target.value })
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
              style={{ backgroundColor: "#CB297B",color:"#CB297B", marginLeft: "10px",background: "#FFFFFF 0% 0% no-repeat padding-box",  boxShadow: "0px 0px 30px #00000029",
              borderRadius: "10px"}}
            >
              Cancel
            </Button>
            <button
              style={{backgroundColor: "#CB297B",color:"#fff",padding:"revert",border:"0px",borderRadius:"10px" }}
              onClick={(e) => {
                handleSubmit(e); 
              }}
            >
              Register
            </button>
          </section>
            </Modal.Footer>
    </Modal>
    </>
   )
}
export default EditDetailsModal