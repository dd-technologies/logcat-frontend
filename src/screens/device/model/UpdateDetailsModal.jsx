import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateDetailsById, getSingleDeviceIdDetails } from '../../../store/action/DeviceAction';
import Style from "../../../css/EditDetailsModal.module.css";
import { getHospitalDataFromAdding } from '../../../store/action/StoreSystem';
const UpdateDetailsModal = (props) => {
  const getAllSectionByDeviceId = useSelector(
    (state) => state.getAllSectionByDeviceId
  );
  const { data } = getAllSectionByDeviceId;
  const getAllData = data && data.data
  const deviceID=getAllData && getAllData.DeviceId
  const item11=JSON.parse(localStorage.getItem('item1'))
  const [updateDetails, setUpdateDetails] = useState({
    DeviceID1: getAllData && getAllData.DeviceId,
    DepartmentName: getAllData && getAllData.Department_Name,
    HospitalName: getAllData && getAllData.Hospital_Name,
    DocName: getAllData && getAllData.Doctor_Name,
    WardNo: getAllData && getAllData.Ward_No,
    IMEINo: getAllData && getAllData.IMEI_NO,
    VentiOp: getAllData && getAllData.Bio_Med,
    AliasName:getAllData && getAllData.Alias_Name,
  })
  const dispatch = useDispatch();

    // Hpospital Data
    const getHospitalFromAdding = useSelector((state) => state.getHospitalFromAdding);
    const { data: dataHospital } = getHospitalFromAdding;
  
    useEffect(() => {
      dispatch(getHospitalDataFromAdding())
    }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorName("");
    alert("Details Updated SuccessFully")
    if (getAllData) {
      setErrorMsg("");
      setErrorName("");
      dispatch(
        updateDetailsById({
          DeviceId: getAllData && getAllData.DeviceId,
          departmentName: updateDetails.DepartmentName,
          hospitalName: updateDetails.HospitalName,
          Doctor_Name: updateDetails.DocName,
          Ward_No: updateDetails.WardNo,
          IMEI_NO: updateDetails.IMEINo,
          Bio_Med: updateDetails.VentiOp,
          Alias_Name:updateDetails.AliasName,
        }
        )
      );
      setTimeout(() => {
        window.location.reload()
      }, 500);
      props.onHide();
    }
  }
  const [errorName, setErrorName] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const DeviceId = JSON.parse(localStorage.getItem('111'))
  useEffect(() => {
   getSingleDeviceIdDetails()
  }, [])

  return (
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
            style={{ color: "#IF99A4" }}
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
              value={getAllData && getAllData.DeviceId}
              placeholder="Enter  Device ID"
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
              defaultValue={getAllData && getAllData.Alias_Name}
              placeholder="Enter  Alias Name"
              onChange={(e) =>
                setUpdateDetails({ ...updateDetails, AliasName: e.target.value })
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
            <Form.Label className="darkModeColor">Department</Form.Label>
            <Form.Control
              className={Style.inputFields}
              type="text"
              name="DepartmentName"
              defaultValue={getAllData && getAllData.Department_Name}
              placeholder="Enter  Department Name"
              onChange={(e) =>
                setUpdateDetails({ ...updateDetails, DepartmentName: e.target.value })
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
              list='data'
              name="HospitalName"
              defaultValue={getAllData && getAllData.Hospital_Name}
              placeholder="Enter the Hospital Name"
              onChange={(e) =>
                setUpdateDetails({ ...updateDetails, HospitalName: e.target.value })}
              required
            />
            <datalist id='data'>
              {dataHospital && dataHospital.map((item) => {
                return (
                  <option value={item.Hospital_Name}>{item.Hospital_Name}</option>
                )
              })}
            </datalist>
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
              defaultValue={getAllData && getAllData.Doctor_Name}
              placeholder="Enter Doctor's Name"
              onChange={(e) =>
                setUpdateDetails({ ...updateDetails, DocName: e.target.value })
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
              defaultValue={getAllData && getAllData.Ward_No}
              placeholder="Enter  Ward Number"
              onChange={(e) =>
                setUpdateDetails({ ...updateDetails, WardNo: e.target.value })
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
              defaultValue={getAllData && getAllData.IMEI_NO}
              placeholder="Enter  Device IMEI Number"
              onChange={(e) =>
                setUpdateDetails({ ...updateDetails, IMEINo: e.target.value })
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
            <Form.Control
              className={Style.inputFields}
              type="text"
              name="ventiOperator"
              defaultValue={getAllData && getAllData.Bio_Med}
              placeholder="Enter Ventilator Operator's Name"
              onChange={(e) =>
                setUpdateDetails({ ...updateDetails, VentiOp: e.target.value })
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
              style={{
                backgroundColor: "#CB297B", color: "#CB297B", marginLeft: "10px", background: "#FFFFFF 0% 0% no-repeat padding-box", boxShadow: "0px 0px 30px #00000029",
                borderRadius: "10px"
              }}>
              Cancel
            </Button>
            <button
              style={{ backgroundColor: "#CB297B", color: "#ffff", padding: "revert", border: "0px", borderRadius: "10px" }}
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Update
            </button>
          </section>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default UpdateDetailsModal;