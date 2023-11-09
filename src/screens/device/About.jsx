import React, { useState } from 'react'
import { Navbar } from '../../utils/NavBar'
import SideBar from '../../utils/Sidebar'
import back from "../../assets/images/back.png";
import { Link, useHref } from "react-router-dom";
import { getAboutSectionById } from '../../../src/store/action/DeviceAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDHRUploadFile, getdispatchDetailsByDeviceIdAction, getproductionDetailsByIdAction } from '../../store/action/DispatchDetailsAction';
// import Style from "../../css/AboutSectionModule.css"
import { Button, Modal } from 'flowbite-react';

function About() {
  const productionAllDetailsByUserIdReducer = useSelector((state) => state.productionAllDetailsByUserIdReducer);
  const {  data: dataa } = productionAllDetailsByUserIdReducer;
  const getDispatchData = dataa && dataa.data
  console.log('getDispatchData', getDispatchData)
  console.log('11', getDispatchData && getDispatchData.dispatchDate, getDispatchData && getDispatchData.productType)
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const projectName = urlParams.get("name");
  const code = urlParams.get('code');
  const deviceId = urlParams.get('DeviceId')
  const dispatchAllDetailsByIdReducer = useSelector((state) => state.dispatchAllDetailsByIdReducer)
  const { data:dispatchData } = dispatchAllDetailsByIdReducer
  const deviceAssignData = dispatchData && dispatchData.data
  console.log('deviceAssignData',deviceAssignData)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      getproductionDetailsByIdAction(deviceId)
    )
  }, ([]))
  useEffect(() => {
    dispatch(getdispatchDetailsByDeviceIdAction(deviceId))
  }, [])
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  const getdhrqualityFileReducer = useSelector((state) => state.getdhrqualityFileReducer);
  const { data } = getdhrqualityFileReducer;
  console.log('data', data)
  const did = urlParams.get('DeviceId')
  useEffect(() => {
    dispatch(
      getAboutSectionById(did)
    )
  }, ([dispatch]))
  const handleDhrFile = () => {
    const key = 'DHR-FILE'
    dispatch(getDHRUploadFile(deviceId, key))
    props.setOpenModal('pop-up')
  }
  return (
    <>
      <Navbar />
      <SideBar />
      <div
        className="main-overview"
        style={{ position: "absolute", top: "5rem", left: "8rem", width: "40%" }}
      >
        <div
          className="inside-overview"
          style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        >
          {/* Heading  */}
          <div
            className=""
            style={{ display: "flex", alignItems: "center", gap: "1rem", color: "#707070" }}
          >
            <Link to={`/deviceOverview?code=${code}&projectName=${projectName}&DeviceId=${did}`}>
              <img src={back} style={{ width: "4rem" }} />
            </Link>
            <h4>About</h4>
          </div>
          {/* Details */}
          <div style={{ display: "flex", flexWrap: 'wrap', flexDirection: "row", gap: "8rem", background: "#FFFFFF 0% 0% no-repeat padding-box", boxShadow: "0px 0px 50px #00000029", borderRadius: "15px", padding: "2rem", marginLeft: "0px" }}>
            <div className="d-flex" style={{ gap: "1.5rem", flexDirection: "column", color: "#4B4B4B" }}>
              <h5 style={{ fontSize: "1rem" }}>Product</h5>
              <h5 style={{ fontSize: "1rem" }}>Delivery Date</h5>
              <h5 style={{ fontSize: "1rem" }}>Batch No.</h5>
              <h5 style={{ fontSize: "1rem" }}>Date of Warranty</h5>
              <h5 style={{ fontSize: "1rem" }}>Last Service</h5>
              <h5 style={{ fontSize: "1rem" }}>Hardware Version</h5>
              <h5 style={{ fontSize: "1rem" }}>Software Version</h5>
            </div>
            <div className="d-flex" style={{ gap: "1.5rem", flexDirection: "column", textAlign: "center", color: "#4B4B4B" }}>
              <h5 style={{ fontSize: "1rem" }}>{deviceAssignData && deviceAssignData.product_type && deviceAssignData.product_type.length > 0 ?deviceAssignData.product_type:'- - -'}</h5>
              <h5 style={{ fontSize: "1rem" }}>{deviceAssignData && deviceAssignData.date_of_dispatch && deviceAssignData.date_of_dispatch.length > 0 ?deviceAssignData.date_of_dispatch:'- - -'}</h5>
              <h5 style={{ fontSize: "1rem" }}>{getDispatchData && getDispatchData.batchNumber && getDispatchData.batchNumber.length > 0 ?getDispatchData.batchNumber:'- - -'}</h5>
              <h5 style={{ fontSize: "1rem" }}>{getDispatchData && getDispatchData.dispatchDate && getDispatchData.dispatchDate.length > 0 ?getDispatchData.dispatchDate:'- - -'}</h5>
              <h5 style={{ fontSize: "1rem" }}>{getDispatchData && getDispatchData.batchNumber && getDispatchData.batchNumber.length > 0 ?getDispatchData.batchNumber:'- - -'}</h5>
              <h5 style={{ fontSize: "1rem" }}>{getDispatchData && getDispatchData.hw_version && getDispatchData.hw_version.length > 0 ?getDispatchData.hw_version:'- - -'}</h5>
              <h5 style={{ fontSize: "1rem" }}>{getDispatchData && getDispatchData.sw_version && getDispatchData.sw_version.length > 0 ?getDispatchData.sw_version:'- - -'}</h5>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: 'start', gap: '1rem', background: "#FFFFFF 0% 0% no-repeat padding-box", boxShadow: "0px 0px 50px #00000029", borderRadius: "15px", padding: "2rem", marginLeft: "0px" }}>
            <h6>DHR File Download</h6>
            <Button onClick={handleDhrFile}>See DHR Files</Button>
          </div>
          <Modal show={props.openModal === 'pop-up'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                {data && data.location.length > 0 ?
                  <>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure you want to Download?
                    </h3>
                    <div className="flex justify-center gap-4">
                      <a href={data && data.location}>
                        <Button color="failure" onClick={() => props.setOpenModal(undefined)}>
                          Yes Download
                        </Button>
                      </a>
                      <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
                        No, cancel
                      </Button>
                    </div>
                  </>
                  :
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    No File here
                  </h3>
                }
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  )
}

export default About