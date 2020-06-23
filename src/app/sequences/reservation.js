import { state, props } from "cerebral";
import { set } from "cerebral/factories";

import * as actions from "../actions";
import createAddress from '../actions/createAddress'
import createReservation from "../actions/createReservation";
import prepareReservationObject from "../actions/prepareReservationObject"
import createTravelPlan from "../actions/createTravelPlan"
import { isValidStartDate } from "../actions/isValidStartDate"
import { isValidEndDate } from "../actions/isValidEndDate"


export const setStartDate = [
    isValidStartDate, {
        success: [
            set(state`reservation.startDate`, props`startDate`),
            actions.goToEnddateStep
        ],
        error: [
            set(state`reservation.isAlert`, true)
        ]
    }
];

export const setEndDate = [
    isValidEndDate, {
        success: [
            set(state`reservation.endDate`, props`endDate`),
            actions.goToCarStep
        ],
        error: [
            set(state`reservation.isAlert`, true)
        ]
    }
];

export const setSelectedReservationCar = [
    set(state`reservation.selectedCar`, props`selectedCar`),
    actions.goToRouteStep
];

export const setSelectedRoute = [
    // TODO set selected route
    actions.goToSummary
];

export const startRes = [
    set(state`reservation.personId`, state`user.id`),
    actions.openStartdateStep
];

export const clearReservationState = [
    set(state`reservation.personId`, null),
    set(state`reservation.selectedCar`, null),
    set(state`reservation.endDate`, null),
    set(state`reservation.startDate`, null),
    set(state`address`, null)
]

export const confirmReservation = [
    set(props`address`, state`address`),
    createAddress,
    set(props`reservationFromProcess`, state`reservation`),
    prepareReservationObject,
    createReservation,
    createTravelPlan,
    actions.goToMenu,
    clearReservationState
]

export const closeReservationAlert = set(state`reservation.isAlert`, false)

export const goToEndDate = actions.goToEnddateStep;

export const goToRouteStep = actions.goToRouteStep;

export const setAddress = [
    set(state`address`, props`addressToReservation`)
]
