
export const clearState = ({ store }) => {
    const reservation = {
        startDate: null,
        endDate: null,
        selectedCar: null,
        isAlert: false
    };

    const damage = {
        selectedCar: null,
        photo: null,
        description: null,
        damaged_at: null
    };

    const calendarCar = null;

    store.set('reservation', reservation);
    store.set('damage', damage);
    store.set('calendarCar', calendarCar);
}
