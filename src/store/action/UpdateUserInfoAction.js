import axios from "axios";
import { UPDATE_FAIL, UPDATE_REQUEST, UPDATE_SUCSESS } from "../types/UpdateUserInfoConstant";

export const UpdateUserInfoActionFn = () => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_REQUEST,
        });

        const token = localStorage.getItem("ddAdminToken");
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/logger/users`,
            config
        );
        dispatch({
            type: UPDATE_SUCSESS,
            payload: response.data,
        });
    } catch (error) {
        // console.log("get log count api error", error);

        dispatch({
            type: UPDATE_FAIL,
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