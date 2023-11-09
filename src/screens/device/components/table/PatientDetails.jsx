import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast';
import { Navbar } from '../../../../utils/NavBar';
import SideBar from '../../../../utils/Sidebar';
import back from "../../../../assets/images/back.png";

function PatientDetails() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const deviceUhId = urlParams.get("uhId");
    const goBack = () => {
        window.history.go(-1)
    }
    return (
        <>
            <Navbar />
            <SideBar />
            <Toaster />
            <div
                className="main-overview"
                style={{ position: "absolute", left: "4rem", width: '90%' }}
            >
                <div style={{ marginTop: '5rem', display: 'flex' }}>
                    <div>
                        <Link onClick={goBack}>
                            <img src={back} style={{ width: "3rem" }} />
                        </Link>
                    </div>
                    <h1 class="flex items-center text-5xl font-extrabold" style={{ justifyContent: 'center' }}>Patient<span class="bg-rgb(203, 41, 123)-100 text-rgb(203, 41, 123)-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded   ml-2">Details</span></h1>
                </div>
                <form class="p-3">
                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 :text-white">UHID</label>
                            <input list='borow'
                                // onChange={(e) => {
                                //     setInstallationData({ ...indtallationData, deviceId: e.target.value })}}
                                type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Device Id" required />
                            {/* <datalist id='borow'>
                            {deviceIdData && deviceIdData.map((item) => {
                                return (
                                    <option value={item.deviceId}>{item.deviceId}</option>
                                )
                            })}
                        </datalist> */}
                        </div>
                        <div>
                            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Patient Name</label>
                            <input type="text"
                                // onChange={(e) => {
                                //     setInstallationData({ ...indtallationData, concernedPersonName: e.target.value })
                                // }} 
                                id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Concerned Name" required />
                        </div>
                        {/* <div>
                        <label for="company" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Date Of Warranty</label>
                        <input type="date" 
                        // onChange={(e) => {
                        //     setInstallationData({ ...indtallationData, dateOfWaranty: e.target.value })
                        // }}
                         id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" required />
                    </div> */}
                        <div>
                            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Hospital Name</label>
                            <input list="data" type="text"
                                // onChange={(e) => setInstallationData({ ...indtallationData, hospitalName: e.target.value })} value={indtallationData.hospitalName} 
                                id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Hospital Name" required />
                            {/* <datalist id="data">
                            {getHospitalData && getHospitalData.map((item, index) => {
                                return (
                                    <option key={index} >{item.Hospital_Name}</option>
                                )
                            })}
                        </datalist> */}
                        </div>
                        <div>
                            <label for="address" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Address</label>
                            <input type="text"
                                // onChange={(e) => setInstallationData({ ...indtallationData, Address: e.target.value })} value={indtallationData.Address}
                                id="website" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Address" required />
                        </div>
                        <div>
                            <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 :text-white">Service Eng. Name</label>
                            <input type="text"
                                //  onChange={(e) => setInstallationData({ ...indtallationData, ServiceEngName: e.target.value })} value={indtallationData.ServiceEngName}
                                id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Enter Service Eng. Name" required />
                        </div>
                    </div>
                    <div class="mb-6">
                        <label for="file" class="block mb-2 text-sm font-medium text-gray-900 :text-white">File</label>
                        <div class="flex gap-2 mb-6 md:grid-cols-2" style={{ alignItems: 'center' }}>
                            <input type="file"
                                //  onChange={handleImageSelect} 
                                id="file" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" required />
                            <button style={{ width: '20%', height: '3rem' }}
                                //  onClick={generatePdfAndUploadToS3} 
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">Select</button>
                        </div>
                    </div>
                    <button style={{ backgroundColor: 'rgb(203, 41, 123)', width: '100%' }}
                        // onClick={handleSubmitData}
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </>
    )
}

export default PatientDetails