import React,{useState} from 'react';
import { Modal,Button,Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateDetailsById } from '../../../store/action/DeviceAction';
import Style from "../../../css/EditDetailsModal.module.css";

const UpdateDetailsModal = (props)=>{
    // const {...item1} = props;
    // console.log('3',{...item1})
    // console.log('12',{item1}.item1.AliasName)
    // localStorage.setItem('item1',JSON.stringify(item1))
   var item11 = JSON.parse(localStorage.getItem('item1'))

  // var item11 = 0;
console.log("item11",item11)
const [updateDetails,setUpdateDetails] = useState({
        DeviceID1:item11.DeviceId,
        AliasName:item11.AliasName,
        HospitalName:item11.Hospital_Name,
        DocName:item11.Doctor_Name,
        WardNo:item11.Ward_No,
        IMEINo:item11.IMEI_NO,
        VentiOp:item11.Ventilator_Operator
      
    })
    const [values,setValues]=useState({
      
    })
    console.log("DeviceID1",updateDetails.DeviceID1)
    // console.log(updateDetails.DeviceID1)
    const dispatch = useDispatch();
    const handleSubmit = (e) =>{
        e.preventDefault();
        setErrorName("");
        alert("Details Updated SuccessFully")
        if(item11){
            setErrorMsg("");
            setErrorName("");
            dispatch(
                  updateDetailsById(
                    updateDetails.DeviceID1,
                    updateDetails.AliasName,
                    updateDetails.HospitalName,
                    updateDetails.DocName,
                    updateDetails.WardNo,
                    updateDetails.IMEINo,
                    updateDetails.VentiOp
                )
            );
            // window.location.reload()
            console.log(updateDetails.AliasName)
            console.log('DoctorName',updateDetails.DocName)
            props.onHide(); 
        }

    }
    const [errorName,setErrorName]= useState();
    const [errorMsg,setErrorMsg] = useState();
    return(
        <>
        <Modal
            {...props}
            // {...console.log(props,'props')}
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
                  value={item11.DeviceId}
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
                    window.location.reload()
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