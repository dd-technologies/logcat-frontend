import axios from "axios";
import { UPDATE_FAIL, UPDATE_REQUEST, UPDATE_SUCSESS } from "../types/UpdateUserInfoConstants";


export const updateUserInfoAction = (name) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_FAIL,
        });

        const token = localStorage.getItem("ddAdminToken");

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        console.log("token", name)

        const { data } = await axios.put(
            `${process.env.REACT_APP_BASE_URL}/api/logger/users/update`,
            { name },
            config,
        );
        dispatch({
            type: UPDATE_REQUEST,
            payload: data,
        });
    } catch (error) {
        // console.log("get log count api error", error);

        dispatch({
            type: UPDATE_SUCSESS,
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