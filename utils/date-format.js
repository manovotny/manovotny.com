import {DateTime} from 'luxon';

export const dateTime = (date) => {
    const dt = DateTime.fromISO(date);

    return dt.toISO();
};

export const full = (date) => {
    const dt = DateTime.fromISO(date);

    return dt.toLocaleString(DateTime.DATE_FULL);
};
