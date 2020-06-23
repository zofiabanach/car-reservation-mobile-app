
export default ({ props }) => {
    const { reservationFromProcess } = props;

    const reservationToSave = {
        carId: reservationFromProcess.selectedCar.id,
        personId: reservationFromProcess.personId,
        startAt: reservationFromProcess.startDate,
        endAt: reservationFromProcess.endDate
    }

    return { reservationToSave }
}