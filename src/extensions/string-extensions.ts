/*!
 * Paradigm Framework - Web Shared
 * Copyright (c) 2017 Miracle Devs, Inc
 * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.Shared/blob/master/LICENSE)
 */

 import { ObjectExtensions } from "./object-extensions";

export class StringExtensions
{
    static padLeft(value: string, length: number, padChar: string): string
    {
        if (!value)
            return null;

        while (value.length < length)
        {
            value += padChar;
        }

        return value;
    }

    static padRight(value: string, length: number, padChar: string): string
    {
        if (!value)
            return null;

        while (value.length < length)
        {
            value = padChar + value;
        }

        return value;
    }

    static isString(value: any): boolean
    {
        return (typeof (value) === "string" || value instanceof String);
    }

    static isNullOrEmpty(value: string): boolean
    {
        return !value || value === "";
    }

    static isNullOrWhiteSpace(value: string): boolean
    {
        return !value || value.replace(/ /g, "") === "";
    }

    static format(format: string, ...args: any[]): string
    {
        if (!format)
            throw new Error("Format string can not be null.");

        return String(format).replace(/\{([0-9]+)\}/g, (match, index) =>
        {
            index = parseInt(index, 10);

            if (index < 0 || index >= args.length)
            {
                throw new Error(`Index is zero based. Must be greater than 0 and less than ${args.length - 1}.`);
            }

            var argument = args[index];

            if (ObjectExtensions.isNull(argument))
                return "";

            return argument.toString();
        });
    }

    static formatArray(format: string, args: any[]): string
    {
        if (!format)
            throw new Error("Format string can not be null.");

        return String(format).replace(/\{([0-9]+)\}/g, (match, index) =>
        {
            index = parseInt(index, 10);

            if (index < 0 || index >= args.length)
            {
                throw new Error(`Index is zero based. Must be greater than 0 and less than ${args.length - 1}.`);
            }

            var argument = args[index];

            if (ObjectExtensions.isNull(argument))
                return "";

            return argument.toString();
        });
    }

    static join(separator: string, values: string[]): string
    {
        if (!values || !separator)
            return null;

        var finalText = "";
        var finalIndex = values.length - 1;

        values.forEach((value, index) =>
        {
            finalText += value;

            if (index !== finalIndex)
            {
                finalText += separator;
            }
        });

        return finalText;
    }
}
