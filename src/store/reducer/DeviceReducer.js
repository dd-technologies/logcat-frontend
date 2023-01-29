import{
    GET_DEVICE_REQUEST,
    GET_DEVICE_REQUEST_SUCCESS,
    GET_DEVICE_REQUEST_FAIL,
    REGISTER_NEW_DEVICE_REQUEST,
    REGISTER_NEW_DEVICE_SUCCESS,
    REGISTER_NEW_DEVICE_FAIL,
    REGISTER_NEW_DEVICE_RESET,

}from "../types/DeviceConstant"

export const getAllDeviceReducer = (state = {},action) =>{
    switch(action.type){
        case GET_DEVICE_REQUEST:
        return{
            loading:true,
        };
        case GET_DEVICE_REQUEST_SUCCESS:
            return{
                loading:false,
                allDeviceData:action.payload,
            };
        case  GET_DEVICE_REQUEST_FAIL:
            return{
                loading:false,
                error:action.payload,
            };
        default:
            return state;
    }
};
export const registerNewDeviceReducer = (state={},action)=>{
    switch(action.type){
        case REGISTER_NEW_DEVICE_REQUEST:
            return{loading:true};

        case REGISTER_NEW_DEVICE_SUCCESS:
            return{
                loading:false,
                data:action.payload,
            }
        case REGISTER_NEW_DEVICE_FAIL:
            return{
                loading:false,
                error:action.payload,
            };
        case REGISTER_NEW_DEVICE_RESET:
            return{
                loading:false,
                data:action.payload,
            };
        default:
            return state;
    }
};