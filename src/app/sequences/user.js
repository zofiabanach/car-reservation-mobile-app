import { state } from "cerebral";
import { set } from "cerebral/factories";

import getUserData from "../actions/getUserData"

import { clearReservationState } from "./reservation"

export const getUser = [
    getUserData
]

export const logout = [
    clearReservationState,
    set(state`user`, null)
]