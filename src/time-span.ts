/*!
 * Paradigm Framework - Web Shared
 * Copyright (c) 2017 Miracle Devs, Inc
 * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.Shared/blob/master/LICENSE)
 */

export class TimeSpan
{
    /**
     * Retrieves the number of milliseconds in one second.
     * @return {Number} Number of milliseconds in one second.
     * @static
     */
    static get millisecondsPerSecond(): number
    {
        return 1000;
    }

    /**
     * Retrieves the number of milliseconds in one minute.
     * @return {Number} Number of milliseconds in one minute.
     * @static
     */
    static get millisecondsPerMinute(): number
    {
        return 60000;
    }

    /**
     * Retrieves the number of milliseconds in one hour.
     * @return {Number} Number of milliseconds in one hour.
     * @static
     */
    static get millisecondsPerHour(): number
    {
        return 3600000;
    }

    /**
     * Retrieves the number of milliseconds in one day.
     * @return {Number} Number of milliseconds in one day.
     * @static
     */
    static get millisecondsPerDay(): number
    {
        return 86400000;
    }

    /**
     * Creates a new time span with the number of milliseconds
     * elapsed to the present time.
     * @return {TimeSpan} Time span representing the current UTC time.
     * @static
     */
    static get now(): TimeSpan
    {
        return new TimeSpan(new Date().valueOf());
    }

    /**
     * The exact time when the application started.
     * On reality holds the time when this script was loaded.
     * @type TimeSpan
     * @static
     */
    private static applicationStarted = TimeSpan.now;

    /**
     * Creates a new time span with the number of milliseconds
     * elapsed since the aplication started.
     * @return {TimeSpan} Time elapsed sirce the Application started.
     * @static
     */
    static get sinceTheApplicationStarted(): TimeSpan
    {
        return TimeSpan.now.subtract(TimeSpan.applicationStarted);
    }

    /**
     * A time span without milliseconds.
     * @type TimeSpan
     * @static
     */
    static get zero(): TimeSpan { return new TimeSpan(0); }

    /**
     * A time span which represents one millisecond.
     * @type TimeSpan
     * @static
     */
    static get oneMillisecond(): TimeSpan { return new TimeSpan(1); }

    /**
     * A time span which represents ten milliseconds.
     * @type TimeSpan
     * @static
     */
    static get tenMilliseconds(): TimeSpan { return new TimeSpan(10); }

    /**
     * A time span which represents hundred milliseconds.
     * @type TimeSpan
     * @static
     */
    static get hundredMilliseconds(): TimeSpan { return new TimeSpan(100); }

    /**
     * A time span which represents a quarter of a second.
     * @type TimeSpan
     * @static
     */
    static get quartedOfASecond(): TimeSpan { return new TimeSpan(250); }

    /**
     * A time span which represents five hundred millisencods, or half a second.
     * @type TimeSpan
     * @static
     */
    static get halfSecond(): TimeSpan { return new TimeSpan(500); }

    /**
     * A time span which represents one second.
     * @type TimeSpan
     * @static
     */
    static get oneSecond(): TimeSpan { return TimeSpan.fromSeconds(1); }

    /**
     * A time span which represents thirty seconds or half a minute.
     * @type TimeSpan
     * @static
     */
    static get halfMinute(): TimeSpan { return TimeSpan.fromSeconds(30); }

    /**
     * A time span which represents one minute.
     * @type TimeSpan
     * @static
     */
    static get oneMinute(): TimeSpan { return TimeSpan.fromMinutes(1); }

    /**
     * A time span which represents thirty minutes or half an hour.
     * @type TimeSpan
     * @static
     */
    static get halfHour(): TimeSpan { return TimeSpan.fromMinutes(30); }

    /**
     * A time span which represents an hour.
     * @type TimeSpan
     * @static
     */
    static get oneHour(): TimeSpan { return TimeSpan.fromHours(1); }

    /**
     * A time span which represents tweleve hours or half a day.
     * @type TimeSpan
     * @static
     */
    static get halfDay(): TimeSpan { return TimeSpan.fromHours(12); }

    /**
     * A time span which represents on day.
     * @type TimeSpan
     * @static
     */
    static get oneDay(): TimeSpan { return TimeSpan.fromDays(1); }

    /**
     * Number of milliseconds representing the time span.
     * @type Number
     */
    private ms: number;

    /**
     * Number of milliseconds representing the time span.
     * @type Number
     */
    get milliseconds(): number { return this.ms; }

    /**
     * Construct the milliseconds.
     * @param milliseconds
     */
    constructor(milliseconds: number)
    {
        this.validate(milliseconds);

        if (milliseconds < 0)
            milliseconds = 0;

        this.ms = milliseconds;
    }

    /**
     * Adds the milliseconds of the parameter to the current timespan.
     * @param {TimeSpan} timeSpan TimeSpan to be added to the current one.
     * @return {TimeSpan} A reference to the time span.
     */
    add(timeSpan: TimeSpan): TimeSpan
    {
        if (timeSpan === null || timeSpan === undefined)
            throw new Error("The time span can not be null.");

        return this.addMilliseconds(timeSpan.milliseconds);
    }

    /**
     * Subtract the milliseconds of the parameter to the current timespan.
     * @param {TimeSpan} timeSpan TimeSpan to be added to the current one.
     * @return {TimeSpan} A reference to the time span.
     */
    subtract(timeSpan: TimeSpan): TimeSpan
    {
        if (timeSpan === null || timeSpan === undefined)
            throw new Error("The time span can not be null.");

        return this.addMilliseconds(-timeSpan.milliseconds);
    }

    /**
     * Adds milliseconds to the current time span.
     * @param {Number} milliseconds Milliseconds to be added.
     * @return {TimeSpan} A reference to the time span.
     */
    addMilliseconds(milliseconds: number): TimeSpan
    {
        this.validate(milliseconds);
        this.ms += milliseconds;

        if (this.ms < 0)
            this.ms = 0;

        return this;
    }

    /**
     * Adds secods to the current time span.
     * @param {Number} seconds Seconds to be added.
     * @return {TimeSpan} A reference to the time span.
     */
    addSeconds(seconds: number): TimeSpan
    {
        if (seconds === null || seconds === undefined)
            throw new Error("The milliseconds can not be null.");

        return this.addMilliseconds(seconds * TimeSpan.millisecondsPerSecond);
    }

    /**
     * Adds minutes to the current time span.
     * @param {Number} minutes Minutes to be added.
     * @return {TimeSpan} A reference to the time span.
     */
    addMinutes(minutes: number): TimeSpan
    {
        if (minutes === null || minutes === undefined)
            throw new Error("The milliseconds can not be null.");

        return this.addMilliseconds(minutes * TimeSpan.millisecondsPerMinute);
    }

    /**
     * Adds hours to the current time span.
     * @param {Number} hours Hours to be added.
     * @return {TimeSpan} A reference to the time span.
     */
    addHours(hours: number): TimeSpan
    {
        if (hours === null || hours === undefined)
            throw new Error("The milliseconds can not be null.");

        return this.addMilliseconds(hours * TimeSpan.millisecondsPerHour);
    }

    /**
     * Adds days to the current time span.
     * @param {Number} days Days to be added.
     * @return {TimeSpan} A reference to the time span.
     */
    addDays(days: number): TimeSpan
    {
        if (days === null || days === undefined)
            throw new Error("The milliseconds can not be null.");

        return this.addMilliseconds(days * TimeSpan.millisecondsPerDay);
    }

    /**
     * Converts the timespan into seconds.
     * @return {Number} Number of seconds.
     */
    toSeconds(): number { return this.milliseconds / TimeSpan.millisecondsPerSecond; }

    /**
     * Converts the timespan into minutes.
     * @return {Number} Number of minutes.
     */
    toMinutes(): number { return this.milliseconds / TimeSpan.millisecondsPerMinute; }

    /**
     * Converts the timespan into hours.
     * @return {Number} Number of hours.
     */
    toHours(): number { return this.milliseconds / TimeSpan.millisecondsPerHour; }

    /**
     * Converts the timespan into days.
     * @return {Number} Number of days.
     */
    toDays(): number { return this.milliseconds / TimeSpan.millisecondsPerDay; }

    /**
     * Returns a new instance copy of the current time span.
     * @return {TimeSpan} New instance copied from this one.
     */
    copy(): TimeSpan
    {
        return new TimeSpan(this.milliseconds);
    }

    /**
     * Retrieves the difference with the current time span in milliseconds.
     * @param {TimeSpan} timeSpan Time span to calculate the difference.
     * @return {Number} difference between the two time span in milliseconds.
     */
    difference(timeSpan: TimeSpan): number
    {
        if (timeSpan === null || timeSpan === undefined)
            throw new Error("The time span can not be null.");

        return this.milliseconds - timeSpan.milliseconds;
    }

    /**
     * Retrieves the percentage relation between the current time and the
     * given one. This takes as the total value the given time span, so if
     * this time span is greater than the parameter the percentage will be
     * greater than one. The percentage is expressed between[0-1] being 1
     * 100%.
     * @param {TimeSpan} timeSpan Time considered the total time in the percentage relation.
     * @return {Number} A Number greater or equal than 0, when 1 is 100%.
     */
    percentage(timeSpan: TimeSpan): number
    {
        if (timeSpan === null || timeSpan === undefined)
            throw new Error("The time span can not be null.");

        return this.milliseconds / timeSpan.milliseconds;
    }

    /**
     * Converts the object into a string.
     * @return {String} String representation of the object.
     */
    toString(): string
    {
        return this.milliseconds.toString() + "ms";
    }

    /**
     * Creates a new time span from a number of seconds.
     * @param {Number} second Number of seconds.
     * @return {TimeSpan} A time span representing the number of seconds.
     * @static
     */
    static fromSeconds(seconds: number): TimeSpan
    {
        return new TimeSpan(seconds * TimeSpan.millisecondsPerSecond);
    }

    /**
     * Creates a new time span from a number of minutes.
     * @param {Number} second Number of minutes.
     * @return {TimeSpan} A time span representing the number of minutes.
     * @static
     */
    static fromMinutes(minutes: number): TimeSpan
    {
        return new TimeSpan(minutes * TimeSpan.millisecondsPerMinute);
    }

    /**
     * Creates a new time span from a number of hours.
     * @param {Number} second Number of hours.
     * @return {TimeSpan} A time span representing the number of hours.
     * @static
     */
    static fromHours(hours: number): TimeSpan
    {
        return new TimeSpan(hours * TimeSpan.millisecondsPerHour);
    }

    /**
     * Creates a new time span from a number of days.
     * @param {Number} second Number of days.
     * @return {TimeSpan} A time span representing the number of days.
     * @static
     */
    static fromDays(days: number): TimeSpan
    {
        return new TimeSpan(days * TimeSpan.millisecondsPerDay);
    }

    /**
     * Validates the numerical value.
     * @param milliseconds
     */
    private validate(milliseconds: number): void
    {
        if (milliseconds === null || milliseconds === undefined)
            throw new Error("The milliseconds can not be null.");

        if (isNaN(milliseconds))
            throw new Error("The milliseconds can not be NaN.");

        if (!isFinite(milliseconds))
            throw new Error("The milliseconds can not be infinite");
    }

}