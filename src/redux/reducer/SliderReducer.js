import { SWIPE_SLIDER_SHOW, SWIPE_SLIDER_HIDE } from "../types/SilderConstant"

const initialState = {
    data: false
}

const slideWindowReducer = (state = initialState, action) => {
    switch (action.type) {
        case SWIPE_SLIDER_SHOW: return {
            data: action.payload
        };
        default: return state
    }
}
export default slideWindowReducer;