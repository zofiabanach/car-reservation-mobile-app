import { state, props } from "cerebral";
import { set } from "cerebral/factories";
import * as actions from "../actions";


export const startCarsAvailability = [
    actions.startCarAvailability
];

export const setCalendarCar = [
    set(state`calendarCar`, props`selectedCar`),
    actions.goToCalendar
]