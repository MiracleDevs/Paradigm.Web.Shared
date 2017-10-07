/*!
 * Paradigm Framework - Web Shared
 * Copyright (c) 2017 Miracle Devs, Inc
 * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.Shared/blob/master/LICENSE)
 */

import { StringExtensions } from "./string-extensions";

export class DateExtensions
{
    static getNextWeekDay(date: Date, dayOfWeek: DayOfWeek): Date
    {
        const from = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const daysUntil = (dayOfWeek - from.getDay() + 7) % 7;

        return DateExtensions.addDays(from, daysUntil);
    }

    static getPreviousWeekDay(date: Date, dayOfWeek: DayOfWeek): Date
    {
        const from = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const daysUntil = (from.getDay() - dayOfWeek + 7) % 7;

        return DateExtensions.addDays(from, -daysUntil);
    }

    static getTwoDigitYear(date: Date): string
    {
        const year = date.getFullYear();

        return (year < 0)
            ? "-" + DateExtensions.getTwoDigit(Math.abs(year))
            : DateExtensions.getTwoDigit(year);
    }

    static getTwoDigitUTCYear(date: Date): string
    {
        const year = date.getUTCFullYear();

        return (year < 0)
            ? "-" + DateExtensions.getTwoDigit(Math.abs(year))
            : DateExtensions.getTwoDigit(year);
    }

    static format(date: Date, format: string): string
    {
        return format
            .replace(/yyyy/g, date.getFullYear().toString())
            .replace(/yy/g, DateExtensions.getTwoDigitYear(date))

            .replace(/MM/g, StringExtensions.padRight((date.getMonth() + 1).toString(), 2, "0"))
            .replace(/M/g, (date.getMonth() + 1).toString())

            .replace(/dd/g, StringExtensions.padRight(date.getDate().toString(), 2, "0"))
            .replace(/d/g, date.getDate().toString())

            .replace(/ww/g, StringExtensions.padRight(date.getDay().toString(), 2, "0"))
            .replace(/w/g, date.getDay().toString())

            .replace(/hh/g, StringExtensions.padRight(date.getHours().toString(), 2, "0"))
            .replace(/h/g, date.getHours().toString())

            .replace(/mm/g, StringExtensions.padRight(date.getMinutes().toString(), 2, "0"))
            .replace(/m/g, date.getMinutes().toString())

            .replace(/ss/g, StringExtensions.padRight(date.getSeconds().toString(), 2, "0"))
            .replace(/s/g, date.getSeconds().toString())

            .replace(/fff/g, StringExtensions.padRight(date.getMilliseconds().toString(), 3, "0"))
            .replace(/ff/g, StringExtensions.padRight(date.getMilliseconds().toString(), 2, "0"))
            .replace(/f/g, date.getMilliseconds().toString());
    }

    static formatUTC(date: Date, format: string): string
    {
        return format
            .replace(/yyyy/g, date.getUTCFullYear().toString())
            .replace(/yy/g, DateExtensions.getTwoDigitUTCYear(date))

            .replace(/MM/g, StringExtensions.padRight((date.getUTCMonth() + 1).toString(), 2, "0"))
            .replace(/M/g, (date.getUTCMonth() + 1).toString())

            .replace(/dd/g, StringExtensions.padRight(date.getUTCDate().toString(), 2, "0"))
            .replace(/d/g, date.getUTCDate().toString())

            .replace(/ww/g, StringExtensions.padRight(date.getUTCDay().toString(), 2, "0"))
            .replace(/w/g, date.getUTCDay().toString())

            .replace(/hh/g, StringExtensions.padRight(date.getUTCHours().toString(), 2, "0"))
            .replace(/h/g, date.getUTCHours().toString())

            .replace(/mm/g, StringExtensions.padRight(date.getUTCMinutes().toString(), 2, "0"))
            .replace(/m/g, date.getUTCMinutes().toString())

            .replace(/ss/g, StringExtensions.padRight(date.getUTCSeconds().toString(), 2, "0"))
            .replace(/s/g, date.getUTCSeconds().toString())

            .replace(/fff/g, StringExtensions.padRight(date.getUTCMilliseconds().toString(), 3, "0"))
            .replace(/ff/g, StringExtensions.padRight(date.getUTCMilliseconds().toString(), 2, "0"))
            .replace(/f/g, date.getUTCMilliseconds().toString());
    }

    static addMilliseconds(date: Date, ms: number): Date
    {
        date = new Date(date.valueOf());
        date.setMilliseconds(date.getMilliseconds() + ms);
        return date;
    }

    static addSeconds(date: Date, seconds: number): Date
    {
        date = new Date(date.valueOf());
        date.setSeconds(date.getSeconds() + seconds);
        return date;
    }

    static addMinutes(date: Date, minutes: number): Date
    {
        date = new Date(date.valueOf());
        date.setMinutes(date.getMinutes() + minutes);
        return date;
    }

    static addHours(date: Date, hours: number): Date
    {
        date = new Date(date.valueOf());
        date.setHours(date.getHours() + hours);
        return date;
    }

    static addDays(date: Date, days: number): Date
    {
        date = new Date(date.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    static addMonths(date: Date, months: number): Date
    {
        date = new Date(date.valueOf());
        date.setMonth(date.getMonth() + months);
        return date;
    }

    static addYears(date: Date, years: number): Date
    {
        date = new Date(date.valueOf());
        date.setFullYear(date.getFullYear() + years);
        return date;
    }

    static fromIso8601(value: string): Date
    {
        var date = new Date();

        try
        {
            const regexp = "([0-9]{2,4})(-([0-9]{1,2})(-([0-9]{1,2})" +
                "(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?" +
                "(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?";

            const d = value.match(new RegExp(regexp));
            const date = new Date(parseInt(d[1], 10), 0, 1);
            let offset = 0;

            if (d[3])
                date.setMonth(parseInt(d[3], 10) - 1);

            if (d[5])
                date.setDate(parseInt(d[5], 10));

            if (d[7])
                date.setHours(parseInt(d[7], 10));

            if (d[8])
                date.setMinutes(parseInt(d[8], 10));

            if (d[10])
                date.setSeconds(parseInt(d[10], 10));

            if (d[12])
                date.setMilliseconds(Number(`0.${d[12]}`) * 1000);

            if (d[14])
            {
                offset = (Number(d[16]) * 60) + Number(d[17]);
                offset *= ((d[15] === "-") ? 1 : -1);
            }

            offset -= date.getTimezoneOffset();
            const time = (Number(date) + (offset * 60 * 1000));
            date.setTime(Number(time));
        }
        catch (e)
        {
            throw new Error("String is not recognized as a valid ISO 8601 date.");
        }

        return date;
    }

    private static getTwoDigit(value: number): string
    {
        var str = value.toString();
        return (str.length < 2)
            ? StringExtensions.padRight(str, 2, "0")
            : str.substr(str.length - 2, 2);
    }
}

export enum DayOfWeek
{
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}
