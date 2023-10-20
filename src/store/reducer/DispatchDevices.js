import { DISPATCH_DETAILS_FAIL, DISPATCH_DETAILS_REQUEST, DISPATCH_DETAILS_SUCCESS, GET_DHR_UPLOAD_FILE_FAIL, GET_DHR_UPLOAD_FILE_REQUEST, GET_DHR_UPLOAD_FILE_SUCCESS, GET_DISPATCH_DETAILS_DATA_BYID_FAIL, GET_DISPATCH_DETAILS_DATA_BYID_REQUEST, GET_DISPATCH_DETAILS_DATA_BYID_SUCCESS, GET_DISPATCH_DETAILS_DATA_FAIL, GET_DISPATCH_DETAILS_DATA_REQUEST, GET_DISPATCH_DETAILS_DATA_SUCCESS, GET_PRODUCTION_DETAILS_DATA_BY_ID_FAIL, GET_PRODUCTION_DETAILS_DATA_BY_ID_REQUEST, GET_PRODUCTION_DETAILS_DATA_BY_ID_SUCCESS, GET_PRODUCTION_DETAILS_DATA_FAIL, GET_PRODUCTION_DETAILS_DATA_REQUEST, GET_PRODUCTION_DETAILS_DATA_SUCCESS } from "../types/DispatchDeviceType";

export const dispatchDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case DISPATCH_DETAILS_REQUEST:
            return { loading: true };

        case DISPATCH_DETAILS_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case DISPATCH_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
export const dispatchAllDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_DISPATCH_DETAILS_DATA_REQUEST:
            return { loading: true };

        case GET_DISPATCH_DETAILS_DATA_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case GET_DISPATCH_DETAILS_DATA_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const dispatchAllDetailsByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_DISPATCH_DETAILS_DATA_BYID_REQUEST:
            return { loading: true };

        case GET_DISPATCH_DETAILS_DATA_BYID_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case GET_DISPATCH_DETAILS_DATA_BYID_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const productionAllDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_PRODUCTION_DETAILS_DATA_REQUEST:
            return { loading: true };

        case GET_PRODUCTION_DETAILS_DATA_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case GET_PRODUCTION_DETAILS_DATA_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const productionAllDetailsByUserIdReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_PRODUCTION_DETAILS_DATA_BY_ID_REQUEST:
            return { loading: true };

        case GET_PRODUCTION_DETAILS_DATA_BY_ID_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case GET_PRODUCTION_DETAILS_DATA_BY_ID_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const getdhrqualityFileReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_DHR_UPLOAD_FILE_REQUEST:
            return { loading: true };

        case GET_DHR_UPLOAD_FILE_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case GET_DHR_UPLOAD_FILE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};