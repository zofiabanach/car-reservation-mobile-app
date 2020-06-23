import moment from 'moment';
import { state } from "cerebral";

export const isValidEndDate = ({ get, props, path }) => {
    const startDate = get(state`reservation.startDate`);
    if (moment(new Date(props.endDate)).isBefore(startDate))
        return path.error();
    else
        return path.success()
}