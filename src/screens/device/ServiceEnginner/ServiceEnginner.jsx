import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { getAllTicketsDataAction, putStatusDataAction } from '../../../store/action/ServiceEngAction';
import ServiceModuleNavBar from './ServiceModuleNavBar';

function ServiceEnginner() {
    const [query, setQuery] = useState("");
    const getAllTicketsDataReducer = useSelector((state) => state.getAllTicketsDataReducer);
    const { data } = getAllTicketsDataReducer;
    const getAllTicket = data && data.data
    console.log('data', getAllTicket)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllTicketsDataAction({ searchData: query, page: '1', limit: '100' }))
    }, [])
    let navigate = useNavigate();
    // const handleClickSearch = () => {
    //     if (query && query.length > 0) {
    //       dispatch(deviceAction({ page: 1, limit: recordsPerPage, searchData: query }));
    //     }
    //   }
    const handleSearchChange = (e) => {
        setQuery(e.target.value.toLowerCase())
        if (query && query.length > 0) {
            dispatch(getAllTicketsDataAction({ searchData: query, page: '1', limit: '100' }));
        }
    }
    return (
        <>
            <div>

                <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <div class="px-3 py-3 lg:px-5 lg:pl-3" style={{ backgroundColor: 'rebeccapurple' }}>
                        <div class="flex items-center justify-between">
                            <div class="flex items-center justify-start">
                                <Link href="#" class="flex ml-2 md:mr-24" style={{ textDecoration: 'none' }}>
                                    <span style={{ color: 'white' }} class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">AgVa Healthcare</span>
                                </Link>
                            </div>
                            <div class="flex items-center">
                                <div class="flex items-center ml-3">
                                    <ServiceModuleNavBar />
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div class="p-4" style={{ marginTop: '2rem' }}>
                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <h6 style={{ backgroundColor: 'green', borderRadius: '20rem', width: '1rem', height: '0.4rem', padding: '0.5rem' }}></h6>
                            <span style={{ color: 'black' }}>Online</span>
                        </div>
                        <div>
                            <span style={{ color: 'black' }}>Emp Id - AgVa326</span>
                        </div>
                    </div>
                </div>
                <div>
                    <form>
                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div class="relative" style={{ padding: '1rem' }}>
                            <input onChange={handleSearchChange} type="search" id="default-search" class="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Search...' required />
                        </div>
                    </form>
                </div>
                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Ticket Number
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Issue
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Priority
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Details
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {getAllTicket && getAllTicket
                                .filter((item) =>
                                    item.ticket_number.toLowerCase().includes(query)
                                ).map((item, index) => {
                                    return (
                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {item.ticket_number}
                                            </th>
                                            <td class="px-6 py-4">
                                                {item.issues}
                                            </td>
                                            <td class="px-6 py-4">
                                                <h6>
                                                    {item.priority === 'Critical' ?
                                                        <div style={{ backgroundColor: 'red', borderRadius: '20rem', width: '1rem', height: '0.4rem', padding: '0.5rem' }}></div>
                                                        : item.priority === "Medium" ?
                                                            <div style={{ backgroundColor: "#f1c300", height: "1rem", borderRadius: "10px", width: "1rem", marginTop: "0.3rem" }}></div>
                                                            :
                                                            ""}
                                                </h6>
                                            </td>
                                            <td class="px-6 py-4" style={{ color: 'rebeccapurple' }}>
                                                <select onChange={(e) => { dispatch(putStatusDataAction({ id: item._id, status: e.target.value })) }} id="countries" style={{ width: '8rem' }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option>{item.status}</option>
                                                    <option value='Pending'>Pending</option>
                                                    <option value='Completed'>Completed</option>
                                                    <option value='Not-Done'>Incompleted</option>
                                                </select>
                                            </td>
                                            <td class="px-6 py-4" style={{ color: 'rebeccapurple' }}>
                                                <button type="button" onClick={() => {
                                                    navigate(`/service_eng_module?Id=${item._id}`);
                                                    console.log("111", item._id)
                                                }} style={{ backgroundColor: 'rebeccapurple' }} class="text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ServiceEnginner