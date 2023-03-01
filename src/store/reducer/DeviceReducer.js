import{
    DEVICE_FAIL,
    DEVICE_REQUEST,
    DEVICE_SUCCESS,
    GET_DEVICE_DETAILS_BY_ID_FAIL,
    GET_DEVICE_DETAILS_BY_ID_SUCCESS,
    GET_DEVICE_DETAILS_BY_ID_REQUEST,
    GET_REGISTERED_DEVICE_DETAILS_FAIL,
    GET_REGISTERED_DEVICE_DETAILS_SUCCESS,
    GET_REGISTERED_DEVICE_DETAILS_REQUEST

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
    case GET_DEVICE_DETAILS_BY_ID_REQUEST:
      return {loading : true};
    
    case GET_DEVICE_DETAILS_BY_ID_SUCCESS:
    return{
      loading:false,
      data : action.payload,
    }
    case GET_DEVICE_DETAILS_BY_ID_FAIL:
    return{
      loading:false,
      error:action.payload,
    }
    default:
      return state;
  }
}
export const getRegisteredDetailsReducer = (state={},action)=>{
  switch(action.type){
    case GET_REGISTERED_DEVICE_DETAILS_REQUEST:
      return {loading:true};

    case GET_REGISTERED_DEVICE_DETAILS_SUCCESS:
      return{
        loading:false,
        data1 : action.payload,
      }
    case GET_REGISTERED_DEVICE_DETAILS_FAIL:
      return{
        loading:false,
        error:action.payload,
      }
      default:
        return state;
  }
}
