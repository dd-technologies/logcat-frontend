import React,{useState} from 'react';
import { Modal,Button,Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateDetailsById } from '../../../store/action/DeviceAction';
import Style from "../../../css/EditDetailsModal.module.css";

const UpdateDetailsModal = (props)=>{
    const {...item1} = props;
    // console.log(item1)
    localStorage.setItem('item1',JSON.stringify(item1))

    const[updateDetails,setUpdateDetails] = useState({
        DeviceId:item1.DeviceId,
        AliasName:item1.AliasName,
        HospitalName:item1.Hospital_Name,
        DocName:item1.Doctor_Name,
        WardNo:item1.Ward_No,
        IMEINo:item1.IMEI_NO,
        VentiOp:item1.Ventilator_Operator
      
    })
    // console.log('deviceid',updateDetails.DeviceId)
    // console.log('aliasupdate',updateDetails.AliasName)
    const dispatch = useDispatch();
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        setErrorName("");
        alert("Details Updated SuccessFully")
        if(item1){
            setErrorMsg("");
            setErrorName("");
            dispatch(
                updateDetailsById(
                    updateDetails.DeviceId,
                    updateDetails.AliasName,
                    updateDetails.HospitalName,
                    updateDetails.DocName,
                    updateDetails.WardNo,
                    updateDetails.IMEINo,
                    updateDetails.VentiOp

                )
            );
            // console.log(updateDetails.AliasName)
            // console.log('DoctorName',updateDetails.DocName)
            props.onHide(); 
        }

    }
    const [errorName,setErrorName]= useState();
    const [errorMsg,setErrorMsg] = useState();
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
                         Update Device Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='card darkModeColor'>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="darkModeColor">Device ID</Form.Label>
                <Form.Control
                  className={Style.inputFields}
                  type="text"
                  name="DeviceId"
                  value={updateDetails.DeviceId}
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
                  value={updateDetails.AliasName}
                  placeholder="Enter Your Device Alias Name"
                  onChange={(e) =>
                    setUpdateDetails({ ...updateDetails,  AliasName: e.target.value })
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
                  value={updateDetails.HospitalName}
                  placeholder="Enter the Hospital Name"
                  onChange={(e) =>
                    setUpdateDetails({ ...updateDetails,  HospitalName: e.target.value })                  }
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
                  value={updateDetails.DocName}
                  placeholder="Enter Doctor's Name"
                  onChange={(e) =>
                    setUpdateDetails({ ...updateDetails,  DocName: e.target.value })
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
                  value={updateDetails.WardNo}
                  placeholder="Enter Your Ward Number"
                  onChange={(e) =>
                    setUpdateDetails({ ...updateDetails,  WardNo: e.target.value })
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
                  value={updateDetails.IMEINo}
                  placeholder="Enter Your Device IMEI Number"
                  onChange={(e) =>
                    setUpdateDetails({ ...updateDetails,  IMEINo: e.target.value })
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
                  value={updateDetails.VentiOp}
                  placeholder="Enter Ventilator Operator's Name"
                  onChange={(e) =>
                    setUpdateDetails({ ...updateDetails,  VentiOp: e.target.value })
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
                  Update
                </Button>
              </section>
            </Modal.Footer>
        </Modal>
        </>
       )
}
export default UpdateDetailsModal;