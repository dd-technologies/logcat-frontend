import {
    STORE_SYSTEM_REQUEST,
    STORE_SYSTEM_SUCCESS,
    STORE_SYSTEM_FAIL,
    ALL_HOSPITAL_DATA_REQUEST,
    ALL_HOSPITAL_DATA_SUCCESS,
    ALL_HOSPITAL_DATA_FAIL,
} from "../types/StoreConstant";
export const storeSystemReducer = (state = {}, action) => {
    switch (action.type) {
        case STORE_SYSTEM_REQUEST:
            return {
                loading: true,
            };
        case STORE_SYSTEM_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case STORE_SYSTEM_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const allHospitalDataReducer = (state = {}, action) => {
    switch (action.type) {
        case ALL_HOSPITAL_DATA_REQUEST:
            return {
                loading: true,
            };
        case ALL_HOSPITAL_DATA_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case ALL_HOSPITAL_DATA_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};