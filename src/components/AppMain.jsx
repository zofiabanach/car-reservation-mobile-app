import React from "react";
import { connect } from "@cerebral/react";
import { state, sequences } from "cerebral";

import Menu from "./shared/Menu/Menu";
import Login from "./shared/Login/Login";
import { MENU, RESERVATION, DAMAGE, reservationSteps, damageSteps, availabilitySteps, AVAILABILITY } from "../steps";
import DateTimeSelector from "./reservation/DateTimeSelector/DateTimeSelector";
import Summary from "./reservation/Summary/Summary";
import SelectCar from "./shared/SelectCar";
import SelectRoute from "./reservation/SelectRoute/SelectRoute";
import CameraComponent from "./damage-registration/CameraComponent/CameraComponent";
import Description from "./damage-registration/Description/Description";
import CarsCalendar from "./cars-calendar/CarsCalendar";
import { startDateTitle, endDateTitle, startTime, endTime, dateInPastMsg, dateBeforeStart } from "../strings";
import ShowAvailableCars from "./shared/ShowAvailableCars";


const AppMain = connect(
  {
    path: state`path`,
    step: state`step`,
    setStartDate: sequences`setStartDate`,
    setEndDate: sequences`setEndDate`,
    reservation: state`reservation`,
    setSelectedReservationCar: sequences`setSelectedReservationCar`,
    setSelectedRoute: sequences`setSelectedRoute`,
    setSelectedDamageCar: sequences`setSelectedDamageCar`,
    damage: state`damage`,
    user: state`user`,
    setCalendarCar: sequences`setCalendarCar`,
    calendarCar: state`calendarCar`,
    goToMenu: sequences`goToMenu`,
    goToSelectCar: sequences`goToSelectCar`,
    startReservation: sequences`startRes`,
    goToEndDate: sequences`goToEndDate`,
  },
  ({
    path,
    step,
    setStartDate,
    setEndDate,
    reservation,
    setSelectedReservationCar,
    setSelectedRoute,
    setSelectedDamageCar,
    damage,
    user,
    setCalendarCar,
    calendarCar,
    goToMenu,
    goToSelectCar,
    startReservation,
    goToEndDate
  }) => {
    const tryToSetStartDate = (date) => {
      const startDate = date.toJSON()
      setStartDate({ startDate });
    }

    const tryToSetEndDate = (date) => {
      const endDate = date.toJSON()
      setEndDate({ endDate });
    }

    const addSelectedCarToReservation = (car) => setSelectedReservationCar({ selectedCar: car })
    const addSelectedCarToDamage = (car) => setSelectedDamageCar({ selectedCar: car })
    const selectCalendarCar = (car) => setCalendarCar({ selectedCar: car })

    const selectedCar = () => {
      if (path === RESERVATION) {
        return reservation && reservation.selectedCar;
      } else if (path === DAMAGE) {
        return damage && damage.selectedCar;
      } else {
        return calendarCar;
      }
    }

    const isReservationRoute = (s) => path === RESERVATION && step === s
    const isDamageRoute = (s) => path === DAMAGE && step === s
    const isAvailabilityRoute = (s) => path === AVAILABILITY && step === s

    const isLoggedIn = !!user;

    return (
      <div style={{ height: "100%" }}>
        {!isLoggedIn && <Login />}
        {(isLoggedIn && path === MENU) && <Menu />}

        {isReservationRoute(reservationSteps.STARTDATE) && <DateTimeSelector saveDate={tryToSetStartDate} title={startDateTitle}
          timeString={startTime} back={goToMenu} alertMessage={dateInPastMsg} date={reservation && reservation.startDate} />}
        {isReservationRoute(reservationSteps.ENDDATE) && <DateTimeSelector saveDate={tryToSetEndDate} title={endDateTitle}
          timeString={endTime} alertMessage={dateBeforeStart} back={startReservation} date={reservation && reservation.endDate} />}
        {isReservationRoute(reservationSteps.CAR) && <ShowAvailableCars setSelectedCar={addSelectedCarToReservation} officeId={user.office_id}
          back={goToEndDate} car={selectedCar} />}
        {isReservationRoute(reservationSteps.ROUTE) && <SelectRoute setSelectedRoute={setSelectedRoute} back={goToSelectCar} />}
        {isReservationRoute(reservationSteps.SUMMARY) && <Summary />}

        {isDamageRoute(damageSteps.CAR) && <SelectCar setSelectedCar={addSelectedCarToDamage} officeId={user.office_id} back={goToMenu}
          car={selectedCar} />}
        {isDamageRoute(damageSteps.CAMERA) && <CameraComponent />}
        {isDamageRoute(damageSteps.DESCRIPTION) && <Description />}

        {isAvailabilityRoute(availabilitySteps.CAR) && <SelectCar setSelectedCar={selectCalendarCar} officeId={user.office_id} back={goToMenu}
          car={selectedCar} />}
        {isAvailabilityRoute(availabilitySteps.CALENDAR) && <CarsCalendar />}

      </div>
    );
  }
);

export default AppMain;