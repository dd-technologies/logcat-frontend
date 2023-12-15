import { Navbar } from "../../../utils/NavBar";
import SideBar from "../../../utils/Sidebar";
import {Toaster } from 'react-hot-toast'
import ServiceEngFormData from "./ServiceEngFormData";
function ServiceEngForm() {

    return (
        <>
            <Navbar />
            <SideBar />
            <Toaster />
            <ServiceEngFormData/>
        </>
    )
}
export default ServiceEngForm