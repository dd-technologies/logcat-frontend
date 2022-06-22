import { UPDATE_REQUEST, UPDATE_SUCSESS } from "../types/UpdateUserInfoConstant";

export const UpdateUserInfoReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_REQUEST:
            return {
                loading: true,
            };
        case UPDATE_SUCSESS:
            return {
                loading: false,
                data: action.payload,
            };
        case UPDATE_SUCSESS:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};