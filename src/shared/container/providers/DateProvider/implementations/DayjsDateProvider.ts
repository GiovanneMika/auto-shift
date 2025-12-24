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

    compareInDays(start_date: Date, end_date: Date): number {
        const startDate = this.convertToUTC(start_date);
        const endDate = this.convertToUTC(end_date);

        return dayjs(endDate).diff(startDate, "days");
    }

    convertToUTC(date: Date): string {
        return dayjs(date).utc().local().format();
    }

    dateNow(): Date {
        return dayjs().toDate();
    }

    addDays(days: number): Date {
        return dayjs().add(days, "days").toDate();
    }
    addHours(hours: number): Date {
        return dayjs().add(hours, "hours").toDate();
    }
    // addMonths(months: number): Date {
    //     throw new Error("Method not implemented.");
    // }
}

export { DayjsDateProvider };