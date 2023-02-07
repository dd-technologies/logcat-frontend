import React,{useState} from 'react';
import { Modal, Button, Form, ModalBody } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getDetailsById } from '../../../store/action/DeviceAction';
import Style from "../../../css/EditDetailsModal.module.css";

const EditDetailsModal = (props) =>{
    const [EditDetails, setEditDetails] = useState({
        DeviceId:"",
        AliasName:props.data.AliasName,
    });
    console.log(EditDetails.AliasName)
      function handleChange (event){
        setEditDetails(event.target.value);
      }
    //   function handleData(props){
    //     EditDetails(props.data)
    //   }
      console.log(props)
    //   console.log(EditDetails.DeviceId)
      const [errorName, setErrorName] = useState();
      const [errorMsg, setErrorMsg] = useState();
      const [modalShow,setModalShow] = useState(false);
    //   const getAllLogByDeviceIdReducer = useSelector(
    //     (state)=>state.getAllLogByDeviceIdReducer
    //   );
    //   const {data,error} = getAllLogByDeviceIdReducer;
    //   console.log('data',getAllLogByDeviceIdReducer)

      const dispatch = useDispatch();

      const handleSubmit=(e)=>{
        e.preventDefault();
        setErrorName("");
        setErrorMsg("");
        if(EditDetails.DeviceId){
            setErrorName("");
            setErrorMsg("");
            setModalShow(false);
            dispatch(
                getDetailsById(
                    EditDetails.DeviceId,
                ),
            )
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
            <Modal.Header className="card darkModeColor">
          <Modal.Title
            id="contained-modal-title-vcenterv"
            style={{ color: "#1F99A4" }}
          >
            Device Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='card darkModeColor'>
           <div>
            <table className={Style.table}>
                <tr className={Style.tr}>
                    <th className={Style.th}>Device ID</th>
                    <td>{props.data.DeviceId}</td>
                </tr>
                <tr>
                    <th>Alias Name</th>
                    {/* <td>{props.data.AliasName}</td> */}
                    <input type="text" name="AliasName" value={EditDetails.AliasName} onChange={handleChange}></input>
                </tr>
                <tr>
                    <th>Hospital Name</th>
                    <td>{props.data.Hospital_Name}</td>
                </tr>
                <tr>
                    <th>Doctor Name</th>
                    <td>{props.data.Doctor_Name}</td>
                </tr>
                <tr>
                    <th>Ward Number</th>
                    <td>{props.data.Ward_No}</td>
                </tr>
                <tr>
                    <th>IMEI Number</th>
                    <td>{props.data.IMEI_NO}</td>
                </tr>
                <tr>
                    <th>Ventilator Operator</th>
                    <td>{props.data.Ventilator}</td>
                </tr>
                <br/>
                <br/>
                <tr>
                    <button className={Style.Savebtn}>Save</button>
                </tr>
            </table>
           </div>
            
            {/* <h1>{props.data.DeviceId}</h1> */}
        </Modal.Body>
    </Modal>
    </>
   )

}
export default EditDetailsModal;