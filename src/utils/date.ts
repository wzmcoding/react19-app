import { differenceInDays, format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export const formatDate = (date: string | Date) => {
    return format(new Date(date), 'PPP', { locale: zhCN });
};

export const getDaysDifference = (startDate: Date, endDate: Date = new Date()) => {
    return differenceInDays(endDate, startDate);
}; 