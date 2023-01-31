import axios from "axios";
import Cookies from 'universal-cookie';
import {
    DEVICE_FAIL,
    DEVICE_REQUEST,
    DEVICE_SUCCESS
}from "../types/DeviceConstant";

const cookies = new Cookies();

export const deviceAction = (
  code = null,
  diffdate = null,
  page = 1,
  record = 25,
  sort = null
) => async (dispatch) => {
  try {
    // let date = new Date();
    // let endDate = date.toLocaleDateString();
    // endDate =
    //   endDate.split("/")[2] +
    //   "/" +
    //   endDate.split("/")[0] +
    //   "/" +
    //   endDate.split("/")[1];
    //   // console.log('endDate',endDate)

    // let startDate = new Date(
    //   new Date().setDate(new Date().getDate() - diffdate)
    // )
    //   .toLocaleString()
    //   .split(",")[0];
    // startDate =
    //   startDate.split("/")[2] +
    //   "/" +
    //   startDate.split("/")[0] +
    //   "/" +
    //   startDate.split("/")[1];
    //   // console.log('startDate',startDate)
    
      dispatch({
        type:DEVICE_REQUEST,
      });
      const token = cookies.get('ddAdminToken');
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let response;

      response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/logger/device/`, 
        config
      );
      dispatch({
        type:DEVICE_SUCCESS,
        payload:response.data,
      });
    }catch(error){
        dispatch({
            type: DEVICE_FAIL,
            payload:
              error &&
              error.response &&
              error.response.data &&
              error.response.data.data &&
              error.response.data.data.err &&
              error.response.data.data.err.msg,
          });
    }
};

// import Cookies from 'universal-cookie';

// import{
//     REGISTER_NEW_DEVICE_REQUEST,
//     REGISTER_NEW_DEVICE_FAIL,
//     REGISTER_NEW_DEVICE_SUCCESS,
//     GET_DEVICE_REQUEST_RESET,
//     GET_DEVICE_REQUEST,
//     GET_DEVICE_REQUEST_SUCCESS,
//     GET_DEVICE_REQUEST_FAIL,

// }from "../types/DeviceConstant";

// const cookies = new Cookies();

// export const clearDeviceData = () =>(dispatch) =>{
//   dispatch({
//     type:GET_DEVICE_REQUEST_RESET,
//     payload:{},
//   })
// }
// export const getAllDevice = () => async (dispatch) =>{
//   try{
//     dispatch({
//       type:GET_DEVICE_REQUEST,
//     });
//     const token = cookies.get('ddAdminToken');
//     const config = {
//       headers:{
//         "Content-type":"application/json",
//         Authorization:`Bearer ${token}`,
//       },
//     };
//     const {data} = await axios.get(
//       `${process.env.REACT_APP_BASE_URL}/api/logger/device/`,
//       config
//     );
//     dispatch({
//       type:GET_DEVICE_REQUEST_SUCCESS,
//       payload:data,
//     });
//   }catch(error){
//     dispatch({
//       type:GET_DEVICE_REQUEST_FAIL,
//       payload:
//       error &&
//       error.response &&
//       error.response.data &&
//       error.response.data.data &&
//       error.response.data.data.err &&
//       error.response.data.data.err.msg,
//     })
//   }
// }
// export const registerNewDevice = (DeviceId,IMEI_NO,Hospital_Name,Ward_No,VentilatorOperator,DoctorName) =>async(dispatch)=>{

//     try{
//         dispatch({
//             type:REGISTER_NEW_DEVICE_REQUEST,
//         });
//         const token = cookies.get('ddAdminToken')
//         const config = {
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const { data } = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}/api/logger/device/registerDevice/`,
//         {
//           deviceID: DeviceId,
//           IMEINo: IMEI_NO,
//           hospName: Hospital_Name,
//           WardNo:Ward_No,
//           VentilatorOperator:VentilatorOperator,
//           DocName:DoctorName,
//         },
//         config
//       );
//       dispatch({
//         type: REGISTER_NEW_DEVICE_SUCCESS,
//         payload: data,
//       });
//     } catch (error) {
//       dispatch({
//         type: REGISTER_NEW_DEVICE_FAIL,
//         payload:
//           error &&
//           error.response &&
//           error.response.data &&
//           error.response.data.data &&
//           error.response.data.data.err &&
//           error.response.data.data.msg,
//       });
//     }
// };