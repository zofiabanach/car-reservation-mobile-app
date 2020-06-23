import moment from 'moment';

export const isValidStartDate = ({ props, path }) => {
    if (moment(new Date(props.startDate)).isBefore(new Date()))
        return path.error();
    else
        return path.success()
}