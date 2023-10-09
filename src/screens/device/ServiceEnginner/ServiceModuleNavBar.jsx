import { Dropdown } from 'flowbite-react';
import { Avatar } from 'flowbite-react';
import { adminLogout } from '../../../store/action/AdminAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
function ServiceModuleNavBar() {
    const adminLoginReducer = useSelector((state) => state.adminLoginReducer);
    const { adminInfo } = adminLoginReducer;
    const userProfileData=adminInfo && adminInfo.data
    const dispatch =useDispatch()
    let navigate = useNavigate();
    const handlelogout = (e) => {
        e.preventDefault();
        dispatch(adminLogout(navigate));
      };
    return (
        <Dropdown
            dismissOnClick={false}
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />}
        >
            <div class="px-4 py-3">
                <span class="block text-sm text-gray-900 dark:text-white">{userProfileData.name}</span>
                <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">{userProfileData.email}</span>
            </div>
            <ul class="py-2 px-1" aria-labelledby="user-menu-button">
                <li>
                <button onClick={(e)=>handlelogout(e)} class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Logout</button></li>
            </ul>
        </Dropdown>
    )
}

export default ServiceModuleNavBar