import { SWIPE_SLIDER_SHOW } from "../types/SilderConstant"

export function slideShow(option) {
    return {
        type: SWIPE_SLIDER_SHOW,
        payload: option
    }
}

