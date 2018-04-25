import {DateTime} from 'luxon';

const Date = ({children}) => {
    const dt = DateTime.fromISO(children);
    const date = dt.toLocaleString(DateTime.DATE_FULL);
    const dateTime = dt.toISO();

    return (
        <time dateTime={dateTime}>{date}</time>
    );
};

export default Date;
