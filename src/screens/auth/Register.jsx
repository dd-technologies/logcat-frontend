import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllHospitalData } from "../../store/action/StoreSystem"
import { VerifySMSOtpNumber, adminRegister, allStateData, getOtpOnPhoneNumber } from "../../store/action/AdminAction"
import { Country, State, City } from 'country-state-city';
import shield from "../../assets/icons/shield.png"
import back from "../../assets/images/back.png";
import Otpinput from '../auth/OtpInput';
import ShowPassword from "../../assets/images/ShowPassword.png";
import HidePassword from "../../assets/images/HidePassword.png";
import { Toaster, toast } from 'react-hot-toast'
import { Button, Modal } from 'flowbite-react';
function AddRegisterUser() {
    const [newUserData, setNewUserData] = useState({
        firstName: '',
        lastName: '',
        hospitalName: '',
        email: '',
        designation: '',
        department: '',
        phoneNum: '',
        passwordHash: '',
        confirmPassword: ''
    })
    const dispatch = useDispatch()
    const [state, setState] = useState({
        otp: null,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPwd, setshowConfirmPwd] = useState(false)

    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal };

    const getOtpOnNumberReducer = useSelector((state) => state.getOtpOnNumberReducer);
    const { data: otpData, error, message } = getOtpOnNumberReducer;
    // console.log('11', otpData, error, message)

    const VerifySMSOtpNumberReducer = useSelector((state) => state.VerifySMSOtpNumberReducer);
    const { data: verifyData, error: err, message: msg } = VerifySMSOtpNumberReducer;
    console.log('22', verifyData, err, msg)

    // hospital reducer
    const allHospitalDataReducer = useSelector((state) => state.allHospitalDataReducer);
    const { data } = allHospitalDataReducer;
    const getHospitalData = data && data.data
    let getAllCountryData = Country.getAllCountries()
    useEffect(() => {
        dispatch(getAllHospitalData())
    }, [dispatch])
    // state reducer
    const allStateReducer = useSelector((state) => state.allStateReducer);
    const { data: allStatesData } = allStateReducer;
    const stateData = allStatesData && allStatesData.data


    const [verifyBtn, setVerifyBtn] = useState('Verify')
    const handleDhrFile = useCallback((e) => {
        e.preventDefault()
        var regEx = /^\d{10}$/
        if (!newUserData.phoneNum) {
            toast.error('Please Enter Number First')
        }
        else if (!regEx.test(newUserData.phoneNum)) {
            toast.error('Enter Correct 10 digit Number')
        }
        else if (regEx.test(newUserData.phoneNum)) {
            const number = newUserData.phoneNum;
            dispatch(getOtpOnPhoneNumber(number))
            if (message) {
                toast.error(message)
                setVerifyBtn('Verified')
            }
            else {
                props.setOpenModal('pop-up')

            }
        }
    })

    useEffect(()=>{
        dispatch(VerifySMSOtpNumber())
    },[])
    const handleSubmitOtp = (e) => {
        e.preventDefault()
        const otp = state.otp
        console.log('00', err, msg)
        if (!otp) {
            toast.error('Enter OTP')
        }
        else {
            dispatch(VerifySMSOtpNumber(otp))
            if (verifyData && verifyData.statusCode == 200) {
                toast.success(verifyData && verifyData.message)
                setVerifyBtn('Verified')
                setTimeout(() => {
                    props.setOpenModal(undefined)
                }, 500);
            }
            else if (!!err && err) {
                toast.error(err)
            }
        }
    }

    const handleSubmitUser = () => {
        dispatch(adminRegister(
            newUserData.firstName,
            newUserData.lastName,
            // newUserData.stateName,
            // newUserData.countryName,
            newUserData.hospitalName,
            newUserData.email,
            newUserData.passwordHash,
        ))
    }

    const goBack = () => {
        window.history.go(-1)
    }
    return (
        <>
            <Toaster />
            <div>
                <div class=" px-6 py-8 ">
                    <Link style={{ textDecoration: 'none', color: 'rgb(203, 41, 123)' }} onClick={goBack} class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img src={back} style={{ width: "3rem" }} />
                        Register New User
                    </Link>

                    <form>
                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                                <input onChange={(e) => setNewUserData({ ...newUserData, firstName: e.target.value })} value={newUserData.firstName} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter First Name" required />
                            </div>
                            <div>
                                <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                                <input onChange={(e) => setNewUserData({ ...newUserData, lastName: e.target.value })} value={newUserData.lastName} type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Last Name" required />
                            </div>
                            <div>
                                <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hospital Name</label>
                                <input list="data" onChange={(e) => setNewUserData({ ...newUserData, hospitalName: e.target.value })} value={newUserData.hospitalName} type="text" id="hospitalName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Hospital Name" required />
                                <datalist id="data" onChange={(e) => setNewUserData({ ...newUserData, hospitalName: e.target.value })} value={newUserData.hospitalName}>
                                    {getHospitalData && getHospitalData.map((item, index) => {
                                        return (
                                            <option key={index} >{item.Hospital_Name}</option>
                                        )
                                    })}
                                </datalist>
                            </div>
                            <div>
                                <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Designation</label>
                                <input list='designation' onChange={(e) => setNewUserData({ ...newUserData, designation: e.target.value })} value={newUserData.designation} type="text" id="Designation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Designation" required />
                                <datalist id="designation" onChange={(e) => setNewUserData({ ...newUserData, designation: e.target.value })} value={newUserData.designation}>
                                    <option>Dr.</option>
                                    <option>Dr.Prof</option>
                                    <option>Prof.</option>
                                    <option>Nurse</option>
                                    <option>Support Staff</option>
                                    <option>Engineer</option>
                                    <option>Admin</option>
                                    <option>Owner</option>
                                </datalist>
                            </div>
                            <div>
                                <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                                <input onChange={(e) => setNewUserData({ ...newUserData, department: e.target.value })} value={newUserData.department} type="text" id="department" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Department Name" required />
                            </div>
                            <div>
                                <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                <div class="flex items-center">
                                    <input type='number' onChange={(e) => {
                                        setNewUserData({ ...newUserData, phoneNum: e.target.value })
                                        newUserData && newUserData.phoneNum === '' ? setVerifyBtn('Verify') : setVerifyBtn('Verify')
                                    }} value={newUserData.phoneNum} id="phoneno" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Department Name" required />
                                    {verifyBtn === 'Verified' ?
                                        <button onClick={handleDhrFile} class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled>
                                            {verifyBtn}
                                        </button>
                                        :
                                        <button onClick={handleDhrFile} class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            {verifyBtn}
                                        </button>
                                    }
                                </div>
                                {newUserData && newUserData.phoneNum && newUserData.phoneNum.length > 0 ?
                                    <Modal show={props.openModal === 'pop-up'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
                                        <Modal.Header />
                                        <Modal.Body>
                                            <div className="text-center">
                                                <div class="mb-6">
                                                    <img src={shield} style={{ height: '3rem', display: 'block', margin: '10px auto' }} />
                                                    <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter OTP Code</label>
                                                    <div class="flex items-center" style={{ gap: '20px' }}>
                                                        <Otpinput setState={setState} state={state} />
                                                    </div>
                                                </div>
                                                <div className="flex justify-center gap-4">
                                                    <Button onClick={handleSubmitOtp} color="failure"
                                                    >
                                                        Verify OTP
                                                    </Button>
                                                </div>
                                            </div>
                                        </Modal.Body>
                                    </Modal>
                                    :
                                    ''}
                            </div>
                            {/* <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                                <input type='email' onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })} value={newUserData.email} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@gmail.com" required />
                            </div> */}
                        </div>
                        <div class="mb-6">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                            <div class="relative w-full">
                                <input type='email' onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })} value={newUserData.email} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@gmail.com" required />
                            </div>
                        </div>
                        <div class="mb-6">
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <div class="relative w-full">
                                <input onChange={(e) => setNewUserData({ ...newUserData, passwordHash: e.target.value })} value={newUserData.passwordHash} type={showPassword ? "text" : "password"} id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                                <button type="button" class="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <img
                                        style={{ width: "1.2rem", opacity: "59%" }}
                                        src={showPassword ? HidePassword : ShowPassword}
                                        onClick={() => {
                                            setShowPassword(!showPassword);
                                        }}
                                    />
                                </button>
                            </div>
                        </div>
                        <div class="mb-6">
                            <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                            <div class="relative w-full">
                                <input onChange={(e) => setNewUserData({ ...newUserData, confirmPassword: e.target.value })} value={newUserData.confirmPassword} type={showConfirmPwd ? "text" : "password"} id="confirm_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                                <button type="button" class="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <img
                                        style={{ width: "1.2rem", opacity: "59%" }}
                                        src={showConfirmPwd ? HidePassword : ShowPassword}
                                        onClick={() => {
                                            setshowConfirmPwd(!showConfirmPwd);
                                        }}
                                    />
                                </button>
                            </div>
                        </div>
                        <div class="flex items-start mb-6">
                            <div class="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                            </div>
                            <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the
                                <Link class="text-blue-600 hover:underline dark:text-blue-500" data-modal-target="defaultModal" data-modal-toggle="popup-modal">
                                    terms and conditions
                                </Link>.
                            </label>
                            {/* <!-- Main modal --> */}
                            <div id="popup-modal" aria-hidden="true" tabindex="-1" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                <div class="relative w-full max-w-2xl max-h-full">
                                    {/* <!-- Modal content --> */}
                                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                        {/* <!-- Modal header --> */}
                                        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                                Terms of Service
                                            </h3>
                                            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                </svg>
                                                <span class="sr-only">Close modal</span>
                                            </button>
                                        </div>
                                        {/* <!-- Modal body --> */}
                                        <div class="p-6 space-y-6">
                                            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                                            </p>
                                            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                                            </p>
                                        </div>
                                        {/* <!-- Modal footer --> */}
                                        <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                            <button data-modal-hide="defaultModal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                                            <button data-modal-hide="defaultModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button style={{ backgroundColor: '#CB297B' }} onClick={handleSubmitUser} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

                    </form>

                </div>
            </div>
        </>
    )
}

export default AddRegisterUser