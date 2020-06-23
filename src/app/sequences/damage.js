import { state, props } from "cerebral";
import { set } from "cerebral/factories";

import * as actions from "../actions";
import createDamage from "../actions/createDamage"


export const startReportDamage = [
    actions.startReportDamage
]

export const setSelectedDamageCar = [
    set(state`damage.selectedCar`, props`selectedCar`),
    actions.goToCamera
];

export const savePhoto = [
    set(state`damage.photo`, props`pictureCoded`),
    set(state`photoUrl`, props`photo`),
    actions.goToDescription
]

export const registerDamage = [
    set(state`damage.description`, props`description`),
    set(state`damage.damaged_at`, props`damaged_at`),
    set(props`userId`, state`user.id`),
    set(props`damage`, state`damage`),
    createDamage,
    actions.goToMenu
]

export const goToCamera = actions.goToCamera;