import { sequences } from "cerebral";
import { MENU, RESERVATION, DAMAGE, AVAILABILITY, reservationSteps, damageSteps, availabilitySteps } from "../steps";

export const initialize = ({ get, router }) => {

  router.initialize({
    "/": () => get(sequences`changeStep`)({ path: MENU, step: "" }),

    "/reservation/startdate": () => get(sequences`changeStep`)({ path: RESERVATION, step: reservationSteps.STARTDATE }),
    "/reservation/enddate": () => get(sequences`changeStep`)({ path: RESERVATION, step: reservationSteps.ENDDATE }),
    "/reservation/car": () => get(sequences`changeStep`)({ path: RESERVATION, step: reservationSteps.CAR }),
    "/reservation/route": () => get(sequences`changeStep`)({ path: RESERVATION, step: reservationSteps.ROUTE }),
    "/reservation/summary": () => get(sequences`changeStep`)({ path: RESERVATION, step: reservationSteps.SUMMARY }),

    "/damage/car": () => get(sequences`changeStep`)({ path: DAMAGE, step: damageSteps.CAR }),
    "/damage/camera": () => get(sequences`changeStep`)({ path: DAMAGE, step: damageSteps.CAMERA }),
    "/damage/description": () => get(sequences`changeStep`)({ path: DAMAGE, step: damageSteps.DESCRIPTION }),

    "/availability/car": () => get(sequences`changeStep`)({ path: AVAILABILITY, step: availabilitySteps.CAR }),
    "/availability/calendar": () => get(sequences`changeStep`)({ path: AVAILABILITY, step: availabilitySteps.CALENDAR }),
  });
};

export const goToMenu = ({ router }) => router.goToStep("");

export const openStartdateStep = ({ router }) => router.goToStep(reservationPath(reservationSteps.STARTDATE));
export const goToEnddateStep = ({ router }) => router.goToStep(reservationPath(reservationSteps.ENDDATE));
export const goToCarStep = ({ router }) => router.goToStep(reservationPath(reservationSteps.CAR));
export const goToRouteStep = ({ router }) => router.goToStep(reservationPath(reservationSteps.ROUTE));
export const goToSummary = ({ router }) => router.goToStep(reservationPath(reservationSteps.SUMMARY));

export const startReportDamage = ({ router }) => router.goToStep(damagePath(damageSteps.CAR));
export const goToCamera = ({ router }) => router.goToStep(damagePath(damageSteps.CAMERA));
export const goToDescription = ({ router }) => router.goToStep(damagePath(damageSteps.DESCRIPTION));

export const startCarAvailability = ({ router }) => router.goToStep(availabilityPath(availabilitySteps.CAR));
export const goToCalendar = ({ router }) => router.goToStep(availabilityPath(availabilitySteps.CALENDAR));

const reservationPath = (step) => RESERVATION + '/' + step
const damagePath = (step) => DAMAGE + '/' + step
const availabilityPath = (step) => AVAILABILITY + '/' + step