import { faL } from "@fortawesome/free-solid-svg-icons";
import{
    DEVICE_FAIL,
    DEVICE_REQUEST,
    DEVICE_SUCCESS,
    GET_ALL_LOG_BY_CODE_FAIL,
    GET_ALL_LOG_BY_CODE_REQUEST,
    GET_ALL_LOG_BY_CODE_SUCCESS

}from "../types/DeviceConstant";


export const deviceReducer = (state = {},action) =>{
    switch(action.type){
        case DEVICE_REQUEST:
            return{
                loading:true,
            };
        case DEVICE_SUCCESS:
            return{
                loading:false,
                data: action.payload,
            }
        case DEVICE_FAIL:
            return{
                loading:false,
                error:action.payload,
            };
        default:
            return state;
    }
};
export const getAllLogByDeviceIdReducer = (state = {},action) =>{
  switch(action.type){
    case GET_ALL_LOG_BY_CODE_REQUEST:
      return {loading : true};
    
    case GET_ALL_LOG_BY_CODE_SUCCESS:
    return{
      loading:false,
      data : action.payload,
    }
    case GET_ALL_LOG_BY_CODE_FAIL:
    return{
      loading:false,
      error:action.payload,
    }
    default:
      return state;
  }
}
