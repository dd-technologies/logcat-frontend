import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllHospitalData } from "../../store/action/StoreSystem"
import { adminRegister, allStateData } from "../../store/action/AdminAction"
import { Country, State, City } from 'country-state-city';
function AddRegisterUser() {
    const [newUserData, setNewUserData] = useState({
        firstName: '',
        lastName: '',
        countryName: '',
        stateName: '',
        hospitalName: '',
        email: '',
        passwordHash: '',
        confirmPassword: ''
    })
    const dispatch = useDispatch()
    // hospital reducer
    const allHospitalDataReducer = useSelector((state) => state.allHospitalDataReducer);
    const { data } = allHospitalDataReducer;
    const getHospitalData = data && data.data
    console.log('data', data)
    let getAllCountryData = Country.getAllCountries()
    useEffect(() => {
        dispatch(getAllHospitalData())
    }, [dispatch])
    // state reducer
    const allStateReducer = useSelector((state) => state.allStateReducer);
    const { data: allStatesData } = allStateReducer;
    const stateData = allStatesData && allStatesData.data
    const name = newUserData.countryName
    const stateChange = (e) => {
        e.preventDefault()
        setNewUserData({
            ...newUserData,
            stateName: e.target.value,
        })
        dispatch(allStateData(name))
    }
    const countryChange = (e) => {
        // setStatesData(e.target.value)
        setNewUserData({
            ...newUserData,
            countryName: e.target.value,
        })
        // dispatch(allCountryStateData(name))
    }
    const handleSubmitUser = () => {
        console.log('newUserData', newUserData)
        dispatch(adminRegister(
            newUserData.firstName,
            newUserData.lastName,
            newUserData.stateName,
            newUserData.countryName,
            newUserData.hospitalName,
            newUserData.email,
            newUserData.passwordHash,
        ))
    }
    return (
        <div>
            <div class=" px-6 py-8 ">
                <Link style={{ textDecoration: 'none' , color:'rgb(203, 41, 123)'}} href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
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
                            <label for="country" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                            <input list="countryName" onChange={(e) => countryChange(e)} type="text" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Couuntry Name" required />
                            {/* <input list="countryName" onChange={(e) => countryChange(e)} placeholder='Enter Name' /> */}
                            <datalist id='countryName' onChange={(e) => countryChange(e)} >
                                {getAllCountryData && getAllCountryData.map((item) => {
                                    return (
                                        <option>{item.name}</option>
                                    )
                                })}

                            </datalist>
                        </div>
                        <div>
                            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
                            <input list="stateName" onChange={(e) => stateChange(e)} type="text" id="state" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter State Name" required />
                            <datalist id='stateName' style={{ padding: "4px", border: "0px", width: "100%" }} onClick={(e) => stateChange(e)}>
                                {stateData && stateData.map((item) => {
                                    return (
                                        <option
                                            style={{ padding: "4px", border: "0px", width: "100%" }}
                                        >
                                            {item.name}
                                        </option>
                                    )
                                })}
                            </datalist>

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
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                            <input onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })} value={newUserData.email} type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@gmail.com" required />
                        </div>
                    </div>

                    <div class="mb-6">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input onChange={(e) => setNewUserData({ ...newUserData, passwordHash: e.target.value })} value={newUserData.passwordHash} type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                    </div>
                    <div class="mb-6">
                        <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                        <input onChange={(e) => setNewUserData({ ...newUserData, confirmPassword: e.target.value })} value={newUserData.confirmPassword} type="password" id="confirm_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
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
    )
}

export default AddRegisterUser