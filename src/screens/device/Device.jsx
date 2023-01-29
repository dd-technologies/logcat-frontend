// //same as create project used to show device table list

import React, {useState,useEffect,Fragment} from "react";
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Style from "../../css/CreateProject.module.css"
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CustomCard from '../../container/CustomCard';
import {Row,Col,Container} from "react-bootstrap";
import { useDispatch,useSelector } from "react-redux";
import ProjectCard from "../projects/Allprojects";
import{
     clearDeviceData,
     getAllDevice,
}from "../../store/action/DeviceAction"
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import Spinner from "../../container/Spinner";
import {adminLogout} from "../../store/action/AdminAction";
import CustomeDropDown from "../../container/DropDown";


const cookies = new Cookies();

function Device(){
     const [modalShow,setModalShow] = useState(false);
     // const [darkMode,setDarkMode] = React.useState(true);
     const [userInfo,setUserInfo] = useState(false);
     const Dispatch = useDispatch();


     const getAllDeviceReducer = useSelector(
          (state) => state.getAllDeviceReducer
     );
     const {allDeviceData: DeviceData, allDeviceData} = getAllDeviceReducer;

     const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
     const {adminInfo} = adminLoginReducer;

     const avatar = useState(
          adminInfo && adminInfo.image && adminInfo.image
     )[0];
    const registerNewDeviceReducer = useSelector(
     (state) =>state.registerNewDeviceReducer
    );
    const {data} = registerNewDeviceReducer;
    if(data && data.data){
     toast.success("Device Registered Successfully");
     Dispatch(clearDeviceData());
    }
    const navigate = useNavigate();

    useEffect(()=>{
     if(!cookies.get('ddAdminToken')){
          navigate("/");
     }
     if(localStorage.getItem("project_type")){
          localStorage.removeItem("project_type");
     }
     if(localStorage.getItem("selected_date")){
          localStorage.removeItem("selected_date");
     }
     Dispatch(getAllDevice());
    },[]);
    //Logout Functionality
    const handlelogout=(e)=>{
     Dispatch(adminLogout(navigate));
    };
//     useEffect(()=>{
//      setDarkMode
//     },[]);

    const showUserInfoFun = () =>{
     setUserInfo(!userInfo)
    };
    useEffect(() => {
     localStorage.removeItem("project_type");
     localStorage.removeItem("page_no");
   }, []);

   return (
     <>
       {/*Logout functionality */}
       {DeviceData && DeviceData.data && DeviceData.data.data ? (
         <>
           <section className={Style.backgroundSection}></section>  
           <Container className={Style.MainContantainer}>
             <Row>
               <Col
                 xl={6}
                 md={6}
                 sm={12}
                 className="mt-2 d-flex align-self-center"
               >
                 <h5
                   style={{
                     color: "#fff",
                   }}
                 >
                   Your Projects
                 </h5>
               </Col>
               <Col
                 xl={6}
                 md={6}
                 sm={12}
                 className="mt-2 d-flex justify-content-end"
               >
                 <section
                   className={`${Style.AvatarSection}`}
                   onClick={showUserInfoFun}
                 >
                   {adminInfo &&
                     adminInfo.data &&
                     adminInfo.data.name.split(" ")[0].split("")[0]}
                 </section>
                 {userInfo && (
                   <CustomeDropDown
                     position="fixed"
                     right="0%"
                     top="10%"
                     width="400px"
                     zIndex="10"
                     marginRight="10px"
                   >
                     <section
                       className={Style.AvatarSectionDropDown}
                       onClick={showUserInfoFun}
                     >
                       {avatar ? (
                         <img src={URL.createObjectURL(avatar)} alt="Avatar" />
                       ) : (
                         adminInfo &&
                         adminInfo.data &&
                         adminInfo.data.name.split(" ")[0].split("")[0]
                       )}
                     </section>
 
                     <p
                       style={{
                         fontSize: "1.3rem",
                       }}
                     >
                       {adminInfo && adminInfo.data && adminInfo.data.name}
                     </p>
                     <p
                       style={{
                         fontSize: "1rem",
                       }}
                     >
                       {adminInfo && adminInfo.data && adminInfo.data.email}
                     </p>
                    {/* Logout method in navbar */}
                     <section
                       style={{ border: "1px solid #fff", marginTop: "5px" }}
                       className={`${Style.logoutAccount} darkModeColor`}
                       onClick={(e) => {
                         handlelogout(e);
                       }}
                     >
                       Logout
                     </section>
                   {/*Navbar section  */}
                     <section className={Style.privacyPolicy}>
                       <p>Privacy policy</p>
                       <p>Terms of service</p>
                     </section>
                   </CustomeDropDown>
                 )}
               </Col>
             </Row>
             <Row className="rowSection">
               {adminInfo && adminInfo.data && adminInfo.data.isSuperAdmin ? (
                 <Col xl={4} lg={4} md={6} sm={6} className="mt-4">
                   <CustomCard
                     padding="10px"
                     height="200px"
                     boxShadow="0px 0px 3px 1px rgba(192,192,192,0.90)"
                   >
                     {/* Shows add project section */}
                     <section
                       className={Style.addProject}
                       onClick={() => setModalShow(true)}
                     >
                       <section>
                         <p>
                           <FontAwesomeIcon icon={faPlus} />
                         </p>
                         <p>Register Device</p>
                       </section>
                     </section>
                   </CustomCard>
                   <addDeviceModel
                     show={modalShow} //shows modal of create project
                     onHide={() => setModalShow(false)}
                   />
                 </Col>
               ) : null}
               {/*maps other project data in the project section  */}
               {allDeviceData &&
                 allDeviceData.data.data.length &&
                 allDeviceData.data.data.map((data, i) => (
                   <Fragment key={i}>
                     <ProjectCard data={data} />
                   </Fragment>
                 ))}
             </Row>
           </Container>
         </>
       ) : (
         <Spinner />
       )}
       )
     </>
   );
 }
export default Device;