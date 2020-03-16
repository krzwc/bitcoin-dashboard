import moment from 'moment';

type Time = number | string;

export enum TIMEFORMATS {
    NATURAL_DATE_FORMAT = 'DD.MM.YYYY, HH:mm:ss',
    CLOCK_24_FORMAT = 'HH:mm',
}

export const convertTimestamp = (date: Time, format: string = TIMEFORMATS.CLOCK_24_FORMAT) => {
    return moment
        .utc(date)
        .local()
        .format(format);
};
