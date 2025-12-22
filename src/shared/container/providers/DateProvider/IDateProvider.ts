interface IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number;
    convertToUTC(date: Date): string;
    dateNow(): Date;
    addHours(hours: number): Date;
    addDays(days: number): Date;
    addMonths(months: number): Date;

}

export { IDateProvider };