import { SWIPE_SLIDER_SHOW, SWIPE_SLIDER_HIDE } from "../types/SilderConstant"

export function slideShow(option) {
    return {
        type: SWIPE_SLIDER_SHOW,
        payload: option
    }
}

export function slideHide(option) {
    return {
        type: SWIPE_SLIDER_HIDE,
        payload: option
    }
}

