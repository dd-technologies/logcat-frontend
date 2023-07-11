import { HOSPITAL_NAME_REQUEST, HOSPITAL_NAME_FAIL, HOSPITAL_NAME_SUCCESS,COUNTRY_STATE_DATA_REQUEST,COUNTRY_STATE_DATA_SUCCESS,COUNTRY_STATE_DATA_FAIL,STATE_DATA_REQUEST,STATE_DATA_SUCCESS,STATE_DATA_FAIL } from "../types/AdminConstants";

export const allhospitalNameReducer = (state = {}, action) => {
    switch (action.type) {
        case HOSPITAL_NAME_REQUEST:
            return {
                loading: true,
            };
        case HOSPITAL_NAME_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case HOSPITAL_NAME_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
export const allCountryStateReducer = (state = {}, action) => {
    switch (action.type) {
        case COUNTRY_STATE_DATA_REQUEST:
            return {
                loading: true,
            };
        case COUNTRY_STATE_DATA_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case COUNTRY_STATE_DATA_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
export const allStateReducer = (state = {}, action) => {
    switch (action.type) {
        case STATE_DATA_REQUEST:
            return {
                loading: true,
            };
        case STATE_DATA_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case STATE_DATA_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};