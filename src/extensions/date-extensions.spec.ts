/*!
 * Paradigm Framework - Web Shared
 * Copyright (c) 2017 Miracle Devs, Inc
 * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.Shared/blob/master/LICENSE)
 */

import { DateExtensions, DayOfWeek } from "./date-extensions";

describe("Date", () => {
    const wrongDateError = "String is not recognized as a valid ISO 8601 date.";

    describe("parse from iso", () => {
        it("should be able to parse iso string with positive timezone", () =>
            expect(() => DateExtensions.fromIso8601("2012-10-10T12:00:00+300")).not.toThrow());

        it("should be able to parse iso string with negative timezone", () =>
            expect(() => DateExtensions.fromIso8601("2012-10-10T12:00:00-300")).not.toThrow());

        it("should be able to parse iso string with positive timezone and letter Z", () =>
            expect(() => DateExtensions.fromIso8601("2012-10-10T12:00:00Z+300")).not.toThrow());

        it("should be able to parse iso string with negative timezone and letter Z", () =>
            expect(() => DateExtensions.fromIso8601("2012-10-10T12:00:00Z-300")).not.toThrow());

        it("should be able to parse iso string with milliseconds, positive timezone and letter Z", () =>
            expect(() => DateExtensions.fromIso8601("2012-10-10T12:00:00.0001Z+300")).not.toThrow());

        it("should be able to parse iso string with milliseconds, negative timezone and letter Z", () =>
            expect(() => DateExtensions.fromIso8601("2012-10-10T12:00:00.0001Z-300")).not.toThrow());

        it("should be able to parse iso string with milliseconds, positive timezone (h:m) and letter Z", () =>
            expect(() => DateExtensions.fromIso8601("2012-10-10T12:00:00.0001Z+03:00")).not.toThrow());

        it("should be able to parse iso string with milliseconds, negative timezone (h:m) and letter Z", () =>
            expect(() => DateExtensions.fromIso8601("2012-10-10T12:00:00.0001Z-03:00")).not.toThrow());

        it("should be able to parse iso string without timezone", () =>
            expect(() => DateExtensions.fromIso8601("2012-10-10T12:00:00")).not.toThrow());

        it("should be able to parse iso string with one month char", () => expect(() => DateExtensions.fromIso8601("2012-1-10")).not.toThrow());

        it("should be able to parse iso string with one day char", () => expect(() => DateExtensions.fromIso8601("2012-01-1")).not.toThrow());

        it("should be able to parse iso string with two year chars", () => expect(() => DateExtensions.fromIso8601("12-1-10")).not.toThrow());

        it("should be able to parse iso string with a negative year", () =>
            expect(() => DateExtensions.fromIso8601("-2012-1-10")).not.toThrow());

        it("should be able to parse iso string with a positive number", () =>
            expect(() => DateExtensions.fromIso8601("12354343")).not.toThrow());

        it("should be able to parse iso string with a positive number", () =>
            expect(() => DateExtensions.fromIso8601("-12354343")).not.toThrow());

        it("shouldn't parse wrong formatted strings", () => expect(() => DateExtensions.fromIso8601("hello world")).toThrowError(wrongDateError));
    });

    describe("get two digit year", () => {
        it("should be able to format one digit negative year", () =>
            expect(DateExtensions.getTwoDigitYear(new Date(-62199999999990))).toBe("-02"));
        it("should be able to format one digit positive year", () =>
            expect(DateExtensions.getTwoDigitYear(new Date(-62119999999990))).toBe("01"));

        it("should be able to format four digits negative year", () =>
            expect(DateExtensions.getTwoDigitYear(new Date(-8640000000000000))).toBe("-21"));
        it("should be able to format four digits positive year", () => expect(DateExtensions.getTwoDigitYear(new Date(2017, 1, 1))).toBe("17"));
    });

    describe("get two digit UTC year", () => {
        it("should be able to format one digit negative year", () =>
            expect(DateExtensions.getTwoDigitUTCYear(new Date(-62199999999990))).toBe("-02"));
        it("should be able to format one digit positive year", () =>
            expect(DateExtensions.getTwoDigitUTCYear(new Date(-62119999999990))).toBe("01"));

        it("should be able to format four digits negative year", () =>
            expect(DateExtensions.getTwoDigitUTCYear(new Date(-8640000000000000))).toBe("-21"));
        it("should be able to format four digits positive year", () =>
            expect(DateExtensions.getTwoDigitUTCYear(new Date(2017, 1, 1))).toBe("17"));
    });

    describe("get two digit year in UTC", () => {
        it("should be able to format two digit years", () => expect(DateExtensions.format(new Date(2012, 10, 10), "yy")).toBe("12"));
    });

    describe("format date", () => {
        it("should be able to format two digit years", () => expect(DateExtensions.format(new Date(2012, 10, 10), "yy")).toBe("12"));

        it("should be able to format four digit years", () => expect(DateExtensions.format(new Date(2012, 10, 10), "yyyy")).toBe("2012"));

        it("should be able to format two digit years for years smaller than 10", () =>
            expect(DateExtensions.format(new Date(1908, 10, 10), "yy")).toBe("08"));

        it("should be able to format two digit month smaller than 10", () =>
            expect(DateExtensions.format(new Date(2012, 7, 10), "MM")).toBe("08"));

        it("should be able to format one digit month smaller than 10", () =>
            expect(DateExtensions.format(new Date(2012, 7, 10), "M")).toBe("8"));

        it("should be able to format two digit month larger than 10", () =>
            expect(DateExtensions.format(new Date(2012, 10, 10), "MM")).toBe("11"));

        it("should be able to format one digit month larger than 10", () =>
            expect(DateExtensions.format(new Date(2012, 10, 10), "M")).toBe("11"));

        it("should be able to format two digit days smaller than 10", () =>
            expect(DateExtensions.format(new Date(2012, 10, 8), "dd")).toBe("08"));

        it("should be able to format one digit days smaller than 10", () => expect(DateExtensions.format(new Date(2012, 10, 8), "d")).toBe("8"));

        it("should be able to format two digit days larger than 10", () =>
            expect(DateExtensions.format(new Date(2012, 10, 11), "dd")).toBe("11"));

        it("should be able to format one digit days larger than 10", () =>
            expect(DateExtensions.format(new Date(2012, 10, 11), "d")).toBe("11"));

        it("should be able to format two digit day of the week smaller than 10", () =>
            expect(DateExtensions.format(new Date(2012, 10, 8), "ww")).toBe("04"));

        it("should be able to format one digit day of the week smaller than 10", () =>
            expect(DateExtensions.format(new Date(2012, 10, 8), "w")).toBe("4"));

        it("should be able to format two digit hours smaller than 10", () =>
            expect(DateExtensions.format(new Date(2012, 10, 10, 8), "hh")).toBe("08"));

        it("should be able to format one digit hours smaller than 10", () =>
            expect(DateExtensions.format(new Date(2012, 10, 10, 8), "h")).toBe("8"));

        it("should be able to format two digit hours larger than 10", () =>
            expect(DateExtensions.format(new Date(2012, 10, 10, 11), "hh")).toBe("11"));

        it("should be able to format one digit hours larger than 10", () =>
            expect(DateExtensions.format(new Date(2012, 10, 10, 11), "h")).toBe("11"));

        it("should be able to format two digit minutes smaller than 10", () =>
            expect(DateExtensions.format(new Date(2012, 10, 10, 10, 8), "mm")).toBe("08"));

        it("should be able to format one digit minutes smaller than 10", () =>
            expect(DateExtensions.format(new Date(2012, 10, 10, 10, 8), "m")).toBe("8"));

        it("should be able to format two digit minutes larger than 10", () =>
            expect(DateExtensions.format(new Date(2012, 10, 10, 10, 11), "mm")).toBe("11"));

        it("should be able to format one digit minutes larger than 10", () =>
            expect(DateExtensions.format(new Date(2012, 10, 10, 10, 11), "m")).toBe("11"));

        it("should be able to format two digit seconds smaller than 10", () =>
            expect(DateExtensions.format(new Date(2012, 10, 10, 10, 10, 8), "ss")).toBe("08"));

        it("should be able to format one digit seconds smaller than 10", () =>
            expect(DateExtensions.format(new Date(2012, 10, 10, 10, 10, 8), "s")).toBe("8"));

        it("should be able to format two digit seconds larger than 10", () =>
            expect(DateExtensions.format(new Date(2012, 10, 10, 10, 10, 11), "ss")).toBe("11"));

        it("should be able to format one digit seconds larger than 10", () =>
            expect(DateExtensions.format(new Date(2012, 10, 10, 10, 10, 11), "s")).toBe("11"));

        it("should be able to format two digit milliseconds smaller than 10", () =>
            expect(DateExtensions.format(new Date(2012, 10, 10, 10, 10, 10, 8), "ff")).toBe("08"));

        it("should be able to format one digit milliseconds smaller than 10", () =>
            expect(DateExtensions.format(new Date(2012, 10, 10, 10, 10, 10, 8), "f")).toBe("8"));

        it("should be able to format two digit milliseconds larger than 10", () =>
            expect(DateExtensions.format(new Date(2012, 10, 10, 10, 10, 10, 11), "ff")).toBe("11"));

        it("should be able to format one digit milliseconds larger than 10", () =>
            expect(DateExtensions.format(new Date(2012, 10, 10, 10, 10, 10, 11), "f")).toBe("11"));

        it("should be able to format four digit milliseconds larger than 10", () =>
            expect(DateExtensions.format(new Date(2012, 10, 10, 10, 10, 10, 8), "fff")).toBe("008"));

        it("should be able to format four digit milliseconds larger than 10", () =>
            expect(DateExtensions.format(new Date(2012, 10, 10, 10, 10, 10, 234), "fff")).toBe("234"));

        it("should not represent months and days using 0 index based numbers, but to start with 1 instead", () =>
            expect(DateExtensions.format(new Date(2012, 0, 1), "MM/dd/yyyy")).toBe("01/01/2012"));

        it("should not represent months and days using 0 index based numbers, but to start with 1 instead", () =>
            expect(DateExtensions.format(new Date(2012, 11, 12), "MM/dd/yyyy")).toBe("12/12/2012"));
    });

    describe("format UTF date", () => {
        it("should be able to format two digit years", () => expect(DateExtensions.formatUTC(new Date(2012, 10, 10), "yy")).toBe("12"));

        it("should be able to format four digit years", () => expect(DateExtensions.formatUTC(new Date(2012, 10, 10), "yyyy")).toBe("2012"));

        it("should be able to format two digit years for years smaller than 10", () =>
            expect(DateExtensions.formatUTC(new Date(1908, 10, 10), "yy")).toBe("08"));

        it("should be able to format two digit month smaller than 10", () =>
            expect(DateExtensions.formatUTC(new Date(2012, 7, 10), "MM")).toBe("08"));

        it("should be able to format one digit month smaller than 10", () =>
            expect(DateExtensions.formatUTC(new Date(2012, 7, 10), "M")).toBe("8"));

        it("should be able to format two digit month larger than 10", () =>
            expect(DateExtensions.formatUTC(new Date(2012, 10, 10), "MM")).toBe("11"));

        it("should be able to format one digit month larger than 10", () =>
            expect(DateExtensions.formatUTC(new Date(2012, 10, 10), "M")).toBe("11"));

        it("should be able to format two digit days smaller than 10", () =>
            expect(DateExtensions.formatUTC(new Date(2012, 10, 8), "dd")).toBe("08"));

        it("should be able to format one digit days smaller than 10", () =>
            expect(DateExtensions.formatUTC(new Date(2012, 10, 8), "d")).toBe("8"));

        it("should be able to format two digit days larger than 10", () =>
            expect(DateExtensions.formatUTC(new Date(2012, 10, 11), "dd")).toBe("11"));

        it("should be able to format one digit days larger than 10", () =>
            expect(DateExtensions.formatUTC(new Date(2012, 10, 11), "d")).toBe("11"));

        it("should be able to format two digit day of the week smaller than 10", () =>
            expect(DateExtensions.formatUTC(new Date(2012, 10, 8), "ww")).toBe("04"));

        it("should be able to format one digit day of the week smaller than 10", () =>
            expect(DateExtensions.formatUTC(new Date(2012, 10, 8), "w")).toBe("4"));

        it("should be able to format two digit hours smaller than 10", () =>
            expect(DateExtensions.formatUTC(new Date(Date.UTC(2012, 10, 10, 8)), "hh")).toBe("08"));

        it("should be able to format one digit hours smaller than 10", () =>
            expect(DateExtensions.formatUTC(new Date(Date.UTC(2012, 10, 10, 8)), "h")).toBe("8"));

        it("should be able to format two digit hours larger than 10", () =>
            expect(DateExtensions.formatUTC(new Date(Date.UTC(2012, 10, 10, 11)), "hh")).toBe("11"));

        it("should be able to format one digit hours larger than 10", () =>
            expect(DateExtensions.formatUTC(new Date(Date.UTC(2012, 10, 10, 11)), "h")).toBe("11"));

        it("should be able to format two digit minutes smaller than 10", () =>
            expect(DateExtensions.formatUTC(new Date(2012, 10, 10, 10, 8), "mm")).toBe("08"));

        it("should be able to format one digit minutes smaller than 10", () =>
            expect(DateExtensions.formatUTC(new Date(2012, 10, 10, 10, 8), "m")).toBe("8"));

        it("should be able to format two digit minutes larger than 10", () =>
            expect(DateExtensions.formatUTC(new Date(2012, 10, 10, 10, 11), "mm")).toBe("11"));

        it("should be able to format one digit minutes larger than 10", () =>
            expect(DateExtensions.formatUTC(new Date(2012, 10, 10, 10, 11), "m")).toBe("11"));

        it("should be able to format two digit seconds smaller than 10", () =>
            expect(DateExtensions.formatUTC(new Date(2012, 10, 10, 10, 10, 8), "ss")).toBe("08"));

        it("should be able to format one digit seconds smaller than 10", () =>
            expect(DateExtensions.formatUTC(new Date(2012, 10, 10, 10, 10, 8), "s")).toBe("8"));

        it("should be able to format two digit seconds larger than 10", () =>
            expect(DateExtensions.formatUTC(new Date(2012, 10, 10, 10, 10, 11), "ss")).toBe("11"));

        it("should be able to format one digit seconds larger than 10", () =>
            expect(DateExtensions.formatUTC(new Date(2012, 10, 10, 10, 10, 11), "s")).toBe("11"));

        it("should be able to format two digit milliseconds smaller than 10", () =>
            expect(DateExtensions.formatUTC(new Date(2012, 10, 10, 10, 10, 10, 8), "ff")).toBe("08"));

        it("should be able to format one digit milliseconds smaller than 10", () =>
            expect(DateExtensions.formatUTC(new Date(2012, 10, 10, 10, 10, 10, 8), "f")).toBe("8"));

        it("should be able to format two digit milliseconds larger than 10", () =>
            expect(DateExtensions.formatUTC(new Date(2012, 10, 10, 10, 10, 10, 11), "ff")).toBe("11"));

        it("should be able to format one digit milliseconds larger than 10", () =>
            expect(DateExtensions.formatUTC(new Date(2012, 10, 10, 10, 10, 10, 11), "f")).toBe("11"));

        it("should be able to format four digit milliseconds larger than 10", () =>
            expect(DateExtensions.formatUTC(new Date(2012, 10, 10, 10, 10, 10, 8), "fff")).toBe("008"));

        it("should be able to format four digit milliseconds larger than 10", () =>
            expect(DateExtensions.formatUTC(new Date(2012, 10, 10, 10, 10, 10, 234), "fff")).toBe("234"));

        it("should not represent months and days using 0 index based numbers, but to start with 1 instead", () =>
            expect(DateExtensions.formatUTC(new Date(2012, 0, 1), "MM/dd/yyyy")).toBe("01/01/2012"));

        it("should not represent months and days using 0 index based numbers, but to start with 1 instead", () =>
            expect(DateExtensions.formatUTC(new Date(2012, 11, 12), "MM/dd/yyyy")).toBe("12/12/2012"));
    });

    describe("add milliseconds", () => {
        it("should add positive milliseconds", () =>
            expect(DateExtensions.addMilliseconds(new Date(2012, 6, 5, 4, 3, 2, 1), 10).getMilliseconds()).toBe(11));

        it("should add negative milliseconds", () =>
            expect(DateExtensions.addMilliseconds(new Date(2012, 6, 5, 4, 3, 2, 1), -10).getMilliseconds()).toBe(991));

        it("should subtract seconds when adding negative milliseconds", () =>
            expect(DateExtensions.addMilliseconds(new Date(2012, 6, 5, 4, 3, 2, 1), -10).getSeconds()).toBe(1));

        it("should add seconds when adding more than 1 thousand milliseconds", () =>
            expect(DateExtensions.addMilliseconds(new Date(2012, 6, 5, 4, 3, 2, 1), 1000).getSeconds()).toBe(3));
    });

    describe("add seconds", () => {
        it("should add positive seconds", () => expect(DateExtensions.addSeconds(new Date(2012, 6, 5, 4, 3, 2, 1), 10).getSeconds()).toBe(12));

        it("should add negative seconds", () => expect(DateExtensions.addSeconds(new Date(2012, 6, 5, 4, 3, 2, 1), -10).getSeconds()).toBe(52));

        it("should subtract minutes when adding negative seconds", () =>
            expect(DateExtensions.addSeconds(new Date(2012, 6, 5, 4, 3, 2, 1), -10).getMinutes()).toBe(2));

        it("should add minutes when adding more than 60 seconds", () =>
            expect(DateExtensions.addSeconds(new Date(2012, 6, 5, 4, 3, 2, 1), 60).getMinutes()).toBe(4));
    });

    describe("add minutes", () => {
        it("should add positive minutes", () => expect(DateExtensions.addMinutes(new Date(2012, 6, 5, 4, 3, 2, 1), 10).getMinutes()).toBe(13));

        it("should add negative minutes", () => expect(DateExtensions.addMinutes(new Date(2012, 6, 5, 4, 3, 2, 1), -10).getMinutes()).toBe(53));

        it("should subtract hours when adding negative minutes", () =>
            expect(DateExtensions.addMinutes(new Date(2012, 6, 5, 4, 3, 2, 1), -10).getHours()).toBe(3));

        it("should add hours when adding more than 60 minutes", () =>
            expect(DateExtensions.addMinutes(new Date(2012, 6, 5, 4, 3, 2, 1), 60).getHours()).toBe(5));
    });

    describe("add hours", () => {
        it("should add positive hours", () => expect(DateExtensions.addHours(new Date(2012, 6, 5, 4, 3, 2, 1), 10).getHours()).toBe(14));

        it("should add negative hours", () => expect(DateExtensions.addHours(new Date(2012, 6, 5, 4, 3, 2, 1), -10).getHours()).toBe(18));

        it("should subtract days when adding negative hours", () =>
            expect(DateExtensions.addHours(new Date(2012, 6, 5, 4, 3, 2, 1), -10).getDate()).toBe(4));

        it("should add days when adding more than 60 hours", () =>
            expect(DateExtensions.addHours(new Date(2012, 6, 5, 4, 3, 2, 1), 24).getDate()).toBe(6));
    });

    describe("add days", () => {
        it("should add positive days", () => expect(DateExtensions.addDays(new Date(2012, 6, 5, 4, 3, 2, 1), 10).getDate()).toBe(15));

        it("should add negative days", () => expect(DateExtensions.addDays(new Date(2012, 6, 5, 4, 3, 2, 1), -10).getDate()).toBe(25));

        it("should subtract months when adding negative days", () =>
            expect(DateExtensions.addDays(new Date(2012, 6, 5, 4, 3, 2, 1), -10).getMonth()).toBe(5));

        it("should add month when adding more than 60 days", () =>
            expect(DateExtensions.addDays(new Date(2012, 6, 5, 4, 3, 2, 1), 30).getMonth()).toBe(7));
    });

    describe("add months", () => {
        it("should add positive months", () => expect(DateExtensions.addMonths(new Date(2012, 6, 5, 4, 3, 2, 1), 4).getMonth()).toBe(10));

        it("should add negative months", () => expect(DateExtensions.addMonths(new Date(2012, 6, 5, 4, 3, 2, 1), -4).getMonth()).toBe(2));

        it("should subtract years when adding negative months", () =>
            expect(DateExtensions.addMonths(new Date(2012, 6, 5, 4, 3, 2, 1), -10).getFullYear()).toBe(2011));

        it("should add years when adding more than 60 months", () =>
            expect(DateExtensions.addMonths(new Date(2012, 6, 5, 4, 3, 2, 1), 6).getFullYear()).toBe(2013));
    });

    describe("add years", () => {
        it("should add positive years", () => expect(DateExtensions.addYears(new Date(2012, 6, 5, 4, 3, 2, 1), 4).getFullYear()).toBe(2016));

        it("should add negative years", () => expect(DateExtensions.addYears(new Date(2012, 6, 5, 4, 3, 2, 1), -4).getFullYear()).toBe(2008));
    });

    describe("get next week day", () => {
        it("should get next saturday", () =>
            expect(DateExtensions.format(DateExtensions.getNextWeekDay(new Date(2017, 0, 4), DayOfWeek.Saturday), "MM/dd/yyyy")).toBe(
                "01/07/2017"
            ));

        it("should get next sunday", () =>
            expect(DateExtensions.format(DateExtensions.getNextWeekDay(new Date(2017, 0, 4), DayOfWeek.Sunday), "MM/dd/yyyy")).toBe(
                "01/08/2017"
            ));

        it("should get itself from sunday", () =>
            expect(DateExtensions.format(DateExtensions.getNextWeekDay(new Date(2017, 0, 1), DayOfWeek.Sunday), "MM/dd/yyyy")).toBe(
                "01/01/2017"
            ));

        it("should get next monday from sunday", () =>
            expect(DateExtensions.format(DateExtensions.getNextWeekDay(new Date(2017, 0, 1), DayOfWeek.Monday), "MM/dd/yyyy")).toBe(
                "01/02/2017"
            ));

        it("should get next tuesday from sunday", () =>
            expect(DateExtensions.format(DateExtensions.getNextWeekDay(new Date(2017, 0, 1), DayOfWeek.Tuesday), "MM/dd/yyyy")).toBe(
                "01/03/2017"
            ));

        it("should get next wednesday from sunday", () =>
            expect(DateExtensions.format(DateExtensions.getNextWeekDay(new Date(2017, 0, 1), DayOfWeek.Wednesday), "MM/dd/yyyy")).toBe(
                "01/04/2017"
            ));

        it("should get next thursday from sunday", () =>
            expect(DateExtensions.format(DateExtensions.getNextWeekDay(new Date(2017, 0, 1), DayOfWeek.Thursday), "MM/dd/yyyy")).toBe(
                "01/05/2017"
            ));

        it("should get next friday from sunday", () =>
            expect(DateExtensions.format(DateExtensions.getNextWeekDay(new Date(2017, 0, 1), DayOfWeek.Friday), "MM/dd/yyyy")).toBe(
                "01/06/2017"
            ));

        it("should get next saturday from sunday", () =>
            expect(DateExtensions.format(DateExtensions.getNextWeekDay(new Date(2017, 0, 1), DayOfWeek.Saturday), "MM/dd/yyyy")).toBe(
                "01/07/2017"
            ));
    });

    describe("get previous week day", () => {
        it("should get previous saturday", () =>
            expect(DateExtensions.format(DateExtensions.getPreviousWeekDay(new Date(2017, 0, 4), DayOfWeek.Saturday), "MM/dd/yyyy")).toBe(
                "12/31/2016"
            ));

        it("should get previous sunday", () =>
            expect(DateExtensions.format(DateExtensions.getPreviousWeekDay(new Date(2017, 0, 4), DayOfWeek.Sunday), "MM/dd/yyyy")).toBe(
                "01/01/2017"
            ));

        it("should get itself from saturday", () =>
            expect(DateExtensions.format(DateExtensions.getPreviousWeekDay(new Date(2017, 0, 7), DayOfWeek.Saturday), "MM/dd/yyyy")).toBe(
                "01/07/2017"
            ));

        it("should get previous monday from sunday", () =>
            expect(DateExtensions.format(DateExtensions.getPreviousWeekDay(new Date(2017, 0, 7), DayOfWeek.Monday), "MM/dd/yyyy")).toBe(
                "01/02/2017"
            ));

        it("should get previous tuesday from sunday", () =>
            expect(DateExtensions.format(DateExtensions.getPreviousWeekDay(new Date(2017, 0, 7), DayOfWeek.Tuesday), "MM/dd/yyyy")).toBe(
                "01/03/2017"
            ));

        it("should get previous wednesday from sunday", () =>
            expect(DateExtensions.format(DateExtensions.getPreviousWeekDay(new Date(2017, 0, 7), DayOfWeek.Wednesday), "MM/dd/yyyy")).toBe(
                "01/04/2017"
            ));

        it("should get previous thursday from sunday", () =>
            expect(DateExtensions.format(DateExtensions.getPreviousWeekDay(new Date(2017, 0, 7), DayOfWeek.Thursday), "MM/dd/yyyy")).toBe(
                "01/05/2017"
            ));

        it("should get previous friday from sunday", () =>
            expect(DateExtensions.format(DateExtensions.getPreviousWeekDay(new Date(2017, 0, 7), DayOfWeek.Friday), "MM/dd/yyyy")).toBe(
                "01/06/2017"
            ));

        it("should get previous saturday from sunday", () =>
            expect(DateExtensions.format(DateExtensions.getPreviousWeekDay(new Date(2017, 0, 7), DayOfWeek.Saturday), "MM/dd/yyyy")).toBe(
                "01/07/2017"
            ));
    });
});
