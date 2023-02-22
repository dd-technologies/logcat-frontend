import React,{useState} from 'react';
import {Modal,Button,Form} from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { getDetailsById } from '../../../store/action/DeviceAction';
import Style from "../../../css/EditDetailsModal.module.css";

const EditDetailsModal = (props) =>{
    const {did} = props;
    console.log('did',did)
    const[EditDetails,setEditDetails] = useState({
        DeviceId:did,
    });
    // console.log ({did});
    console.log(EditDetails.DeviceId);
    // console.log(props)

    const [errorName,setErrorName]= useState();
    const [modalShow,setModalShow] = useState(false);
    const [errorMsg,setErrorMsg] = useState();

    const dispatch = useDispatch();

    //   const handleSubmit=(e)=>{
    //     e.preventDefault();
    //     setErrorName("");
    //     setErrorMsg("");
    //     if(EditDetails.DeviceId === {did}){

    //         setErrorName("");
    //         setErrorMsg("");
    //         setModalShow(false);
    //         dispatch(
    //             getDetailsById(
    //                 EditDetails.DeviceId,
    //             ),
    //         )        
    //   }
    // }
    
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
              value={EditDetails.DeviceId}
              placeholder="Enter Your Device ID"
            //   onChange={(e) =>
            //     setEditDetails({ ...EditDetails,  DeviceId: e.target.value })
            //   }
            onChange={(e)=>setEditDetails({DeviceId:e.target.value})}
              required
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
              placeholder="Enter Your Device ID"
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
            </Modal.Body>

    </Modal>
    </>
   )
}
export default EditDetailsModal