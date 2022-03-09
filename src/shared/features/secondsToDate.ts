import { format } from "date-fns";

export const secondsToDate = (seconds: number) => {
    
    const milSeconds = new Date(seconds * 1000);
    const date = format(milSeconds, 'dd.MM.yyyy');

    return date;
};

export const secondsToExactDate = (seconds: number) => {
    
    const milSeconds = new Date(seconds * 1000);
    const date = format(milSeconds, 'HH:mm:ss, dd/MM/yyyy');

    return date;
};
