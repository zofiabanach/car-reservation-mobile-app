import {
    initialize,
    changeStep,
    goToMenu,
    goToSelectCar
} from "./shared";

import {
    setStartDate,
    setEndDate,
    setSelectedReservationCar,
    setSelectedRoute,
    startRes,
    confirmReservation,
    closeReservationAlert,
    goToEndDate,
    goToRouteStep,
    setAddress
} from "./reservation";

import {
    startReportDamage,
    setSelectedDamageCar,
    savePhoto,
    registerDamage,
    goToCamera
} from "./damage";

import {
    getUser,
    logout
} from "./user"

import {
    startCarsAvailability,
    setCalendarCar
} from "./availability"

export {
    initialize,
    changeStep,
    setStartDate,
    setEndDate,
    setSelectedReservationCar,
    setSelectedRoute,
    startRes,
    confirmReservation,
    startReportDamage,
    setSelectedDamageCar,
    savePhoto,
    registerDamage,
    getUser,
    logout,
    startCarsAvailability,
    setCalendarCar,
    closeReservationAlert,
    goToMenu,
    goToSelectCar,
    goToEndDate,
    goToRouteStep,
    goToCamera,
    setAddress
};
