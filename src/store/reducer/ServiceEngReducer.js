import {
    GET_ALL_TICKETS_DATA_REQUEST,
    GET_ALL_TICKETS_DATA_SUCCESS,
    GET_ALL_TICKETS_DATA_FAIL,
    GET_TICKET_DETAILS_BY_ID_REQUEST,
    GET_TICKET_DETAILS_BY_ID_SUCCESS,
    GET_TICKET_DETAILS_BY_ID_FAIL,
    GET_TICKET_DETAILS_BY_TICKET_NO_SUCCESS,
    GET_TICKET_DETAILS_BY_TICKET_NO_FAIL,
    GET_TICKET_DETAILS_BY_TICKET_NO_REQUEST,
    GET_SERVICE_ENGINNER_DATA_REQUEST,
    GET_SERVICE_ENGINNER_DATA_SUCCESS,
    GET_SERVICE_ENGINNER_DATA_FAIL
} from "../types/ServiceEngType";
export const getAllTicketsDataReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_TICKETS_DATA_REQUEST:
            return { loading: true };

        case GET_ALL_TICKETS_DATA_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case GET_ALL_TICKETS_DATA_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

export const getAllTicketsByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_TICKET_DETAILS_BY_ID_REQUEST:
            return { loading: true };

        case GET_TICKET_DETAILS_BY_ID_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case GET_TICKET_DETAILS_BY_ID_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

export const getTicketDetailsByNumberReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_TICKET_DETAILS_BY_TICKET_NO_REQUEST:
            return { loading: true };

        case GET_TICKET_DETAILS_BY_TICKET_NO_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case GET_TICKET_DETAILS_BY_TICKET_NO_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

export const getServiceEngDataReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_SERVICE_ENGINNER_DATA_REQUEST:
            return { loading: true };

        case GET_SERVICE_ENGINNER_DATA_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            }
        case GET_SERVICE_ENGINNER_DATA_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

