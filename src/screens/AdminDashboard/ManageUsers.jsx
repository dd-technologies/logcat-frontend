import React, { useState } from "react";
import { Navbar } from "../../utils/NavBar";
import SideBar from "../../utils/Sidebar";
import back from "../../assets/images/back.png";
import { Link } from "react-router-dom";
import Style from "../../css/ManagerUsers.module.css";
import { Row } from "react-bootstrap";
import TableCard1 from "../../container/TableCard1";
import { getAllUsersDetalisById, updateAllUsersDetailsById, userDeleteAction } from "../../store/action/AdminDashboard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
function ManageUsers() {
  const allUsersDetailsReducer = useSelector(
    (state) => state.allUsersDetailsReducer
  );
  const { loading, data } = allUsersDetailsReducer;
  const dispatch = useDispatch();
  const incPage = parseInt(data && data.currentPage)
  const totalPage = parseInt(data && data.totalPages)
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data && data.data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data && data.data.length / recordsPerPage)
  const numbers = Array.from({ length: npage }, (_, i) => i + 1).slice(1)
  useEffect(() => {
    dispatch(getAllUsersDetalisById({ page: 1, limit: recordsPerPage }));
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <SideBar />
      <Toaster />
      <div
        className=""
        style={{
          position: "relative",
          top: "3.5rem",
          marginLeft: "7%",
          width: "90%",
        }}
      >
        {/* Heading Section */}
        <div
          className="topHeading"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div
            className={Style.deviceSummary}
          >
            <div className={Style.deviceSummary}>
              <Link to="/adminDashboard">
                <img src={back} style={{ width: "3rem" }} />
              </Link>
              <h4 className={Style.Header}>Manage User's</h4>
            </div>
            <Link to='/add_register_user' style={{ textDecoration: 'none' }}>
              <span style={{ backgroundColor: '#CB297B', color: 'white', padding: '10px', borderRadius: '10px' }}>
                Add user
              </span>
            </Link>
          </div>
        </div>
        <div className={Style.Container}>
          {/* Events  */}
          {records && records.length > 0 ?
            <>
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ borderRadius: '1.5rem' }}>
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                        User Name
                      </td>
                      <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                        Email
                      </td>
                      <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                        Department
                      </td>
                      <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                        Resources
                      </td>
                      <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                        Hospital Name
                      </td>
                      <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                        Actions
                      </td>
                      <td scope="col" class="px-6 py-3 text-center text-white text-4xl font-semibold" style={{ backgroundColor: '#cb297b' }}>
                        Delete
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {records && records.map((item1, index) => {
                      var firstname = item1.firstName
                      var name = firstname + " " + item1.lastName
                      return (
                        <tr class="bg-white border-b hover:bg-gray-50">
                          <td class="px-6 py-4 text-center font-semibold text-gray-900">
                            {name}
                          </td>
                          <td class="px-6 py-4 text-center ">
                            {item1.email}
                          </td>
                          <td class="px-6 py-4 text-center ">
                            {!item1.department ? "--" : item1.department}
                          </td>
                          <td class="px-6 py-4 text-center ">
                            {!item1.resourse ? "--" : item1.resourse}
                          </td>
                          <td class="px-6 py-4 text-center ">
                            {item1.hospitalName}
                          </td>
                          <td class="px-6 py-4 text-center ">
                            <select style={{ padding: "5px", padding: "9px", borderRadius: "8px", border: "0px", backgroundColor: "#cb297b", color: "white" }} onChange={(e) => { dispatch(updateAllUsersDetailsById({ userType: e.target.value, _id: item1._id })) }}>
                              <option >{item1.userType}</option>
                              {item1.userType == 'User' ?
                                <>
                                  <option value="Admin">Admin</option>
                                  <option value="Super-Admin">Super Admin</option>
                                  <option value="Nurse">Nurse</option>
                                  <option value="Dispatch">Dispatch</option>
                                  <option value="Production">Production</option>
                                  <option value="Support">Support</option>
                                  <option value="Service-Engineer">Service Engineer</option>
                                </>
                                :
                                item1.userType == 'Admin' ?
                                  <>
                                    <option value="User">User</option>
                                    <option value="Super-Admin">Super Admin</option>
                                    <option value="Nurse">Nurse</option>
                                    <option value="Dispatch">Dispatch</option>
                                    <option value="Production">Production</option>
                                    <option value="Support">Support</option>
                                    <option value="Service-Engineer">Service Engineer</option>
                                  </>
                                  :
                                  item1.userType == 'Nurse' ?
                                    <>
                                      <option value="User">User</option>
                                      <option value="Admin">Admin</option>
                                      <option value="Super-Admin">Super Admin</option>
                                      <option value="Dispatch">Dispatch</option>
                                      <option value="Production">Production</option>
                                      <option value="Support">Support</option>
                                      <option value="Service-Engineer">Service Engineer</option>
                                    </>
                                    :
                                    item1.userType == 'Dispatch' ?
                                      <>
                                        <option value="User">User</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Super-Admin">Super Admin</option>
                                        <option value="Nurse">Nurse</option>
                                        <option value="Production">Production</option>
                                        <option value="Support">Support</option>
                                        <option value="Service-Engineer">Service Engineer</option>
                                      </>
                                      :
                                      item1.userType == 'Dispatch' ?
                                        <>
                                          <option value="User">User</option>
                                          <option value="Admin">Admin</option>
                                          <option value="Super-Admin">Super Admin</option>
                                          <option value="Nurse">Nurse</option>
                                          <option value="Production">Production</option>
                                          <option value="Support">Support</option>
                                          <option value="Service-Engineer">Service Engineer</option>
                                        </>
                                        :
                                        item1.userType == 'Production' ?
                                          <>
                                            <option value="User">User</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Super-Admin">Super Admin</option>
                                            <option value="Nurse">Nurse</option>
                                            <option value="Dispatch">Dispatch</option>
                                            <option value="Support">Support</option>
                                            <option value="Service-Engineer">Service Engineer</option>
                                          </>
                                          :
                                          item1.userType == 'Support' ?
                                            <>
                                              <option value="User">User</option>
                                              <option value="Admin">Admin</option>
                                              <option value="Super-Admin">Super Admin</option>
                                              <option value="Nurse">Nurse</option>
                                              <option value="Dispatch">Dispatch</option>
                                              <option value="Production">Production</option>
                                              <option value="Service-Engineer">Service Engineer</option>
                                            </>
                                            :
                                            item1.userType == 'Service-Engineer' ?
                                              <>
                                                <option value="User">User</option>
                                                <option value="Admin">Admin</option>
                                                <option value="Super-Admin">Super Admin</option>
                                                <option value="Nurse">Nurse</option>
                                                <option value="Dispatch">Dispatch</option>
                                                <option value="Production">Production</option>
                                                <option value="Support">Support</option>
                                              </>
                                              :
                                              <>
                                                <option value="User">User</option>
                                                <option value="Admin">Admin</option>
                                                <option value="Nurse">Nurse</option>
                                                <option value="Dispatch">Dispatch</option>
                                                <option value="Production">Production</option>
                                                <option value="Support">Support</option>
                                                <option value="Service-Engineer">Service Engineer</option>
                                              </>
                              }
                            </select>
                          </td>
                          <td class="px-6 py-4 text-center ">
                            <button className={Style.viewbtn} onClick={() => {
                              dispatch(userDeleteAction({ userId: item1._id }))
                              toast.success('User Delete Sucessfully')
                            }
                            }>Delete</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-end" style={{ display: "flex", alignItems: 'center' }}>
                  {incPage > 1 ?
                    <button onClick={prePage} style={{ border: "0px", backgroundColor: "white" }}>
                      <img src={back} style={{ width: "3rem" }} />
                    </button>
                    : " "}
                  {numbers.map((n, i) => (
                    <li key={i} class={`page-item ${incPage == n ? 'active' : ""}`}><a style={{ borderRadius: "100px", margin: "5px" }} class="page-link" href="#" onClick={() => changeCPage(n)}>{n}</a></li>
                  ))}
                  {incPage !== totalPage ?
                    <button onClick={nextPage} style={{ border: "0px", backgroundColor: "white" }}>
                      <img src={back} style={{ width: "3rem", transform: "rotate(180deg)" }} />
                    </button>
                    : " "}
                </ul>
              </nav>
            </>
            :
            <div style={{ height: '500px', backgroundColor: 'white', width: '100%', borderRadius: '20px', boxShadow: '0px 0px 50px #00000029', background: '#FFFFFF 0% 0% no-repeat padding-box' }}>
              {records && records.length == 0 && (
                <section className={Style.noDataFound}>
                  <span>
                    No Data Found
                  </span>
                </section>
              )}
              {loading && <span style={{ position: 'absolute', top: '50%', right: '50%' }}>Loading...</span>}
            </div>
          }
        </div>
      </div>
    </>
  );
  function prePage() {
    dispatch(getAllUsersDetalisById({ page: incPage - 1, limit: recordsPerPage }))
  }
  function changeCPage(id) {
    setCurrentPage(id)
  }
  function nextPage() {
    dispatch(getAllUsersDetalisById({ page: incPage + 1, limit: recordsPerPage }))
  }
}

export default ManageUsers;