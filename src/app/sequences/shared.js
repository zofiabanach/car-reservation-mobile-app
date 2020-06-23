import { state, props } from "cerebral";
import { set } from "cerebral/factories";

import * as actions from "../actions";
import { clearState } from "../actions/clearState";

export const initialize = actions.initialize;

export const changeStep = [
    set(state`path`, props`path`),
    set(state`step`, props`step`)
]

export const goToMenu = [
    actions.goToMenu,
    clearState
]

export const goToSelectCar = actions.goToCarStep



