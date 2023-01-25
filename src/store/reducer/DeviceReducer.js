import { faL } from "@fortawesome/free-solid-svg-icons";
import { act } from "react-test-renderer"
import{
    GET_DEVICE_DETAILS_REQUEST,
    GET_DEVICE_DETAILS_SUCCESS ,
    GET_DEVICE_DETAILS_FAIL,
}from "../types/DeviceConstant"

export const getAllDeviceReducer =(state={},action)=>{
    switch(action.type){
        case GET_DEVICE_DETAILS_REQUEST:
            return{
                loading:true,
            };
        case GET_DEVICE_DETAILS_SUCCESS:
            return{
                loading:false,
                data:action.payload,
            }
        case GET_DEVICE_DETAILS_FAIL:
            return{
                loading:false,
                error:action.payload
            };
        default:
            return state;
    }
};