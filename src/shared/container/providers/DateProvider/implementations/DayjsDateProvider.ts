import dayjs from "dayjs";
import { IDateProvider } from "../IDateProvider";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
class DayjsDateProvider implements IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number {
        const startDate = this.convertToUTC(start_date);
        const endDate = this.convertToUTC(end_date);

        return dayjs(endDate).diff(startDate, "hours");
    }

    convertToUTC(date: Date): string {
        return dayjs(date).utc().local().format();
    }
    
    dateNow(): Date {
        return dayjs().toDate();
    }
    addHours(hours: number): Date {
        throw new Error("Method not implemented.");
    }
    addDays(days: number): Date {
        throw new Error("Method not implemented.");
    }
    addMonths(months: number): Date {
        throw new Error("Method not implemented.");
    }
}

export { DayjsDateProvider };