/*!
 * Paradigm Framework - Web Shared
 * Copyright (c) 2017 Miracle Devs, Inc
 * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.Shared/blob/master/LICENSE)
 */

import { TimeSpan } from "./time-span";
import { DateExtensions } from "./extensions/date-extensions";

var started = DateExtensions.addHours(new Date(), 1);

describe("TimeSpan", () =>
{
    const nullTimeSpanError = "The time span can not be null.";

    const nullError = "The milliseconds can not be null.";

    const nanError = "The milliseconds can not be NaN.";

    const infinityError = "The milliseconds can not be infinite";

    describe("Static Methods", () =>
    {

        it("should get millisencods per second", () => expect(TimeSpan.millisecondsPerSecond).toBe(1000));

        it("should get millisencods per minute", () => expect(TimeSpan.millisecondsPerMinute).toBe(60000));

        it("should get millisencods per hour", () => expect(TimeSpan.millisecondsPerHour).toBe(3600000));

        it("should get millisencods per day", () => expect(TimeSpan.millisecondsPerDay).toBe(86400000));

        it("should get the current timespan", () =>
        {
            var before = new Date();
            var now = TimeSpan.now;
            var after = new Date();

            expect(now.milliseconds >= before.valueOf() &&
                now.milliseconds <= after.valueOf()).toBe(true);
        });

        it("should get milliseconds since the app started", () => expect(TimeSpan.sinceTheApplicationStarted.milliseconds).toBeLessThan(started.valueOf()));

        it("should get zero timespan", () => expect(TimeSpan.zero.milliseconds).toBe(0));

        it("should get one millisecond timespan", () => expect(TimeSpan.oneMillisecond.milliseconds).toBe(1));

        it("should get ten milliseconds timespan", () => expect(TimeSpan.tenMilliseconds.milliseconds).toBe(10));

        it("should get hundred milliseconds timespan", () => expect(TimeSpan.hundredMilliseconds.milliseconds).toBe(100));

        it("should get a quarter of a second timespan", () => expect(TimeSpan.quartedOfASecond.milliseconds).toBe(250));

        it("should get half second timespan", () => expect(TimeSpan.halfSecond.milliseconds).toBe(500));

        it("should get one second timespan", () => expect(TimeSpan.oneSecond.milliseconds).toBe(1000));

        it("should get half minute timespan", () => expect(TimeSpan.halfMinute.milliseconds).toBe(30000));

        it("should get one minute timespan", () => expect(TimeSpan.oneMinute.milliseconds).toBe(60000));

        it("should get half hour timespan", () => expect(TimeSpan.halfHour.milliseconds).toBe(1800000));

        it("should get one hour timespan", () => expect(TimeSpan.oneHour.milliseconds).toBe(3600000));

        it("should get half day timespan", () => expect(TimeSpan.halfDay.milliseconds).toBe(43200000));

        it("should get one day timespan", () => expect(TimeSpan.oneDay.milliseconds).toBe(86400000));
    });

    describe("Create", () =>
    {
        it("should create a positive timespan", () => expect(new TimeSpan(1000).milliseconds).toBe(1000));

        it("should create a zero timespan", () => expect(new TimeSpan(0).milliseconds).toBe(0));

        it("should create a negative timespan as a zero timespan", () => expect(new TimeSpan(-1000).milliseconds).toBe(0));

        it("shouldn't create a null timespan", () => expect(() => new TimeSpan(null)).toThrowError(nullError));

        it("shouldn't create a undefined timespan", () => expect(() => new TimeSpan(undefined)).toThrowError(nullError));

        it("shouldn't create a NaN timespan", () => expect(() => new TimeSpan(NaN)).toThrowError(nanError));

        it("shouldn't create a infinite timespan", () => expect(() => new TimeSpan(Infinity)).toThrowError(infinityError));
    });

    describe("Add timespan", () =>
    {
        it("should return the same instance", () =>
        {
            var timeSpan = TimeSpan.zero;
            expect(timeSpan.add(TimeSpan.oneDay)).toBe(timeSpan);
        });

        it("should add a timespan", () => expect(TimeSpan.zero.add(TimeSpan.oneSecond).milliseconds).toBe(1000));

        it("shouldn't add a null timespan", () => expect(() => TimeSpan.oneSecond.add(null)).toThrowError(nullTimeSpanError));

        it("shouldn't add a undefined timespan", () => expect(() => TimeSpan.oneSecond.add(undefined)).toThrowError(nullTimeSpanError));
    });

    describe("Subtract timespan", () =>
    {
        it("should return the same instance", () =>
        {
            var timeSpan = TimeSpan.zero;
            expect(timeSpan.subtract(TimeSpan.oneDay)).toBe(timeSpan);
        });

        it("should subtract a timespan", () => expect(TimeSpan.oneMinute.subtract(TimeSpan.oneSecond).milliseconds).toBe(59000));

        it("should round to zero if the subtraction is less than 0", () => expect(TimeSpan.oneSecond.subtract(TimeSpan.oneMinute).milliseconds).toBe(0));

        it("shouldn't subtract a null timespan", () => expect(() => TimeSpan.oneSecond.subtract(null)).toThrowError(nullTimeSpanError));

        it("shouldn't subtract a undefined timespan", () => expect(() => TimeSpan.oneSecond.subtract(undefined)).toThrowError(nullTimeSpanError));
    });

    describe("Add Milliseconds", () =>
    {
        it("should return the same instance", () =>
        {
            var timeSpan = TimeSpan.zero;
            expect(timeSpan.addMilliseconds(1000)).toBe(timeSpan);
        });

        it("should add positive milliseconds", () => expect(TimeSpan.zero.addMilliseconds(1000).milliseconds).toBe(1000));

        it("should add negative milliseconds", () => expect(TimeSpan.oneSecond.addMilliseconds(-250).milliseconds).toBe(750));

        it("should round to zero if the value is less than zero", () => expect(TimeSpan.oneSecond.addMilliseconds(-2000).milliseconds).toBe(0));

        it("shouldn't add a null number", () => expect(() => TimeSpan.oneSecond.addMilliseconds(null)).toThrowError(nullError));

        it("shouldn't add a undefined number", () => expect(() => TimeSpan.oneSecond.addMilliseconds(undefined)).toThrowError(nullError));

        it("shouldn't add a NaN number", () => expect(() => TimeSpan.oneSecond.addMilliseconds(NaN)).toThrowError(nanError));

        it("shouldn't add a infinite number", () => expect(() => TimeSpan.oneSecond.addMilliseconds(Infinity)).toThrowError(infinityError));
    });

    describe("Add Seconds", () =>
    {
        it("should return the same instance", () =>
        {
            var timeSpan = TimeSpan.zero;
            expect(timeSpan.addSeconds(1000)).toBe(timeSpan);
        });

        it("should add positive Seconds", () => expect(TimeSpan.zero.addSeconds(1).milliseconds).toBe(TimeSpan.millisecondsPerSecond));

        it("should add negative Seconds", () => expect(TimeSpan.oneMinute.addSeconds(-10).milliseconds).toBe(50000));

        it("should round to zero if the value is less than zero", () => expect(TimeSpan.oneSecond.addSeconds(-2000).milliseconds).toBe(0));

        it("shouldn't add a null number", () => expect(() => TimeSpan.oneSecond.addSeconds(null)).toThrowError(nullError));

        it("shouldn't add a undefined number", () => expect(() => TimeSpan.oneSecond.addSeconds(undefined)).toThrowError(nullError));

        it("shouldn't add a NaN number", () => expect(() => TimeSpan.oneSecond.addSeconds(NaN)).toThrowError(nanError));

        it("shouldn't add a infinite number", () => expect(() => TimeSpan.oneSecond.addSeconds(Infinity)).toThrowError(infinityError));
    });

    describe("Add Minutes", () =>
    {
        it("should return the same instance", () =>
        {
            var timeSpan = TimeSpan.zero;
            expect(timeSpan.addMinutes(1000)).toBe(timeSpan);
        });

        it("should add positive Minutes", () => expect(TimeSpan.zero.addMinutes(1).milliseconds).toBe(TimeSpan.millisecondsPerMinute));

        it("should add negative Minutes", () => expect(TimeSpan.oneHour.addMinutes(-10).milliseconds).toBe(3000000));

        it("should round to zero if the value is less than zero", () => expect(TimeSpan.oneSecond.addMinutes(-2000).milliseconds).toBe(0));

        it("shouldn't add a null number", () => expect(() => TimeSpan.oneSecond.addMinutes(null)).toThrowError(nullError));

        it("shouldn't add a undefined number", () => expect(() => TimeSpan.oneSecond.addMinutes(undefined)).toThrowError(nullError));

        it("shouldn't add a NaN number", () => expect(() => TimeSpan.oneSecond.addMinutes(NaN)).toThrowError(nanError));

        it("shouldn't add a infinite number", () => expect(() => TimeSpan.oneSecond.addMinutes(Infinity)).toThrowError(infinityError));
    });

    describe("Add Hours", () =>
    {
        it("should return the same instance", () =>
        {
            var timeSpan = TimeSpan.zero;
            expect(timeSpan.addHours(1000)).toBe(timeSpan);
        });

        it("should add positive Hours", () => expect(TimeSpan.zero.addHours(1).milliseconds).toBe(TimeSpan.millisecondsPerHour));

        it("should add negative Hours", () => expect(TimeSpan.oneDay.addHours(-10).milliseconds).toBe(50400000));

        it("should round to zero if the value is less than zero", () => expect(TimeSpan.oneSecond.addHours(-2000).milliseconds).toBe(0));

        it("shouldn't add a null number", () => expect(() => TimeSpan.oneSecond.addHours(null)).toThrowError(nullError));

        it("shouldn't add a undefined number", () => expect(() => TimeSpan.oneSecond.addHours(undefined)).toThrowError(nullError));

        it("shouldn't add a NaN number", () => expect(() => TimeSpan.oneSecond.addHours(NaN)).toThrowError(nanError));

        it("shouldn't add a infinite number", () => expect(() => TimeSpan.oneSecond.addHours(Infinity)).toThrowError(infinityError));
    });

    describe("Add Days", () =>
    {
        it("should return the same instance", () =>
        {
            var timeSpan = TimeSpan.zero;
            expect(timeSpan.addDays(1000)).toBe(timeSpan);
        });

        it("should add positive Days", () => expect(TimeSpan.zero.addDays(1).milliseconds).toBe(TimeSpan.millisecondsPerDay));

        it("should add negative Days", () => expect(TimeSpan.fromDays(10).addDays(-2).milliseconds).toBe(TimeSpan.millisecondsPerDay * 8));

        it("should round to zero if the value is less than zero", () => expect(TimeSpan.oneSecond.addDays(-2000).milliseconds).toBe(0));

        it("shouldn't add a null number", () => expect(() => TimeSpan.oneSecond.addDays(null)).toThrowError(nullError));

        it("shouldn't add a undefined number", () => expect(() => TimeSpan.oneSecond.addDays(undefined)).toThrowError(nullError));

        it("shouldn't add a NaN number", () => expect(() => TimeSpan.oneSecond.addDays(NaN)).toThrowError(nanError));

        it("shouldn't add a infinite number", () => expect(() => TimeSpan.oneSecond.addDays(Infinity)).toThrowError(infinityError));
    });

    describe("Time convertion", () =>
    {
        it("should convert to seconds", () => expect(TimeSpan.oneSecond.toSeconds()).toBe(1));

        it("should convert to minutes", () => expect(TimeSpan.oneMinute.toMinutes()).toBe(1));

        it("should convert to hours", () => expect(TimeSpan.oneHour.toHours()).toBe(1));

        it("should convert to days", () => expect(TimeSpan.oneDay.toDays()).toBe(1));
    });

    describe("Copy", () =>
    {
        it("should copy a time span", () =>
        {

            var timeSpan1 = new TimeSpan(120);
            var timeSpan2 = timeSpan1.copy();

            expect(timeSpan1.milliseconds).toBe(timeSpan2.milliseconds);
            expect(timeSpan1).not.toBe(timeSpan2);
        });
    });

    describe("To String", () =>
    {
        it("should convert to string", () => expect(TimeSpan.oneSecond.toString()).toBe("1000ms"));
    });

    describe("Difference", () =>
    {
        it("should calculate the difference", () => expect(TimeSpan.oneMinute.difference(TimeSpan.oneSecond)).toBe(59000));

        it("shouldn't calculate the difference of a null", () => expect(() => TimeSpan.oneSecond.difference(null)).toThrowError(nullTimeSpanError));

        it("shouldn't calculate the difference of a undefined", () => expect(() => TimeSpan.oneSecond.difference(undefined)).toThrowError(nullTimeSpanError));
    });

    describe("Percentage", () =>
    {
        it("should calculate the percentage", () => expect(new TimeSpan(900).percentage(new TimeSpan(1000))).toBe(0.9));

        it("shouldn't calculate the percentage of a null", () => expect(() => TimeSpan.oneSecond.percentage(null)).toThrowError(nullTimeSpanError));

        it("shouldn't calculate the percentage of a undefined", () => expect(() => TimeSpan.oneSecond.percentage(undefined)).toThrowError(nullTimeSpanError));
    });
});