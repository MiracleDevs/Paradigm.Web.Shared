/*!
 * Paradigm Framework - Web Shared
 * Copyright (c) 2017 Miracle Devs, Inc
 * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.Shared/blob/master/LICENSE)
 */

import { ArrayExtensions } from "./array-extensions";
import { StringExtensions } from "./string-extensions";

export class ObjectExtensions
{
    static isNull(objectInstance: any): boolean
    {
        return objectInstance === null || objectInstance === undefined;
    }

    static getTypeName(objectInstance: any): string
    {
        if (objectInstance === null || objectInstance === undefined)
            throw new Error("Object can not be null.");

        var funcNameRegex = /function (.{1,})\(.*\).*\{.*\}.*/;
        var results = (funcNameRegex).exec(objectInstance.constructor.toString());

        return (results && results.length > 1) ? results[1] : "";
    }

    static isNativeValueType(objectInstance: any): boolean
    {
        if (objectInstance === null || objectInstance === undefined)
            throw new Error("Object can not be null.");

        var name = ObjectExtensions.getTypeName(objectInstance).toLowerCase();
        return name === "string" ||
            name === "number" ||
            name === "boolean" ||
            name === "date";
    }

    static isEqualTo(source: any, other: any, ignore: Array<string> = null, checkObjectType: boolean = true): boolean
    {
        if (!source && !other)
            return true;

        if ((!source && other) ||
            (source && !other))
            return false;

        if (checkObjectType && ObjectExtensions.getTypeName(source) !== ObjectExtensions.getTypeName(other))
            return false;

        if ((ObjectExtensions.getTypeName(source) === "Number" && ObjectExtensions.getTypeName(other) === "Number") ||
            (ObjectExtensions.getTypeName(source) === "String" && ObjectExtensions.getTypeName(other) === "String") ||
            (ObjectExtensions.getTypeName(source) === "Boolean" && ObjectExtensions.getTypeName(other) === "Boolean"))
            return (source === other);

        if (ObjectExtensions.getTypeName(source) === "Date" && ObjectExtensions.getTypeName(other) === "Date")
            return source.getTime() === other.getTime();

        if (source instanceof Array && other instanceof Array)
        {
            if (source.length !== other.length)
                return false;

            for (let arrayIndex = 0; arrayIndex < source.length; arrayIndex++)
            {
                if (!ObjectExtensions.isEqualTo(source[arrayIndex], other[arrayIndex], ignore, checkObjectType))
                {
                    return false;
                }
            }
        }
        else
        {
            const sourceKeys = Object.keys(source);

            for (let index in sourceKeys)
            {
                if (sourceKeys.hasOwnProperty(index))
                {
                    const key = sourceKeys[index];

                    if (!source.hasOwnProperty(key))
                        continue;

                    if (ignore && ArrayExtensions.contains(ignore, key))
                        continue;

                    const sourceValue = source[key];
                    const otherValue = other[key];

                    if (!ObjectExtensions.isEqualTo(sourceValue, otherValue, ignore, checkObjectType))
                    {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    static getDifference(source: any, other: any, ignore: Array<string> = null, checkObjectType: boolean = true): string
    {
        var difference: string;

        if (!source && !other)
            return null;

        if ((!source && other) ||
            (source && !other))
            return "different value";

        if (checkObjectType && ObjectExtensions.getTypeName(source) !== ObjectExtensions.getTypeName(other))
            return "different type";

        if ((ObjectExtensions.getTypeName(source) === "Number" && ObjectExtensions.getTypeName(other) === "Number") ||
            (ObjectExtensions.getTypeName(source) === "String" && ObjectExtensions.getTypeName(other) === "String") ||
            (ObjectExtensions.getTypeName(source) === "Boolean" && ObjectExtensions.getTypeName(other) === "Boolean"))
            return source !== other ? "different value" : null;

        if (ObjectExtensions.getTypeName(source) === "Date" && ObjectExtensions.getTypeName(other) === "Date")
            return source.getTime() !== other.getTime() ? "different value" : null;

        if (source instanceof Array && other instanceof Array)
        {
            if (source.length !== other.length)
                return "different lengths";

            for (var arrayIndex = 0; arrayIndex < source.length; arrayIndex++)
            {
                difference = ObjectExtensions.getDifference(source[arrayIndex], other[arrayIndex], ignore, checkObjectType);

                if (!StringExtensions.isNullOrEmpty(difference))
                {
                    return difference + " for " + (arrayIndex + 1) + "th element";
                }
            }
        }
        else
        {
            var sourceKeys = Object.keys(source);

            for (var index in sourceKeys)
            {
                if (sourceKeys.hasOwnProperty(index))
                {
                    var key = sourceKeys[index];

                    if (!source.hasOwnProperty(key))
                        continue;

                    if (ignore && ArrayExtensions.contains(ignore, key))
                        continue;

                    var sourceValue = source[key];
                    var otherValue = other[key];

                    difference = ObjectExtensions.getDifference(sourceValue, otherValue, ignore, checkObjectType);

                    if (!StringExtensions.isNullOrEmpty(difference))
                    {
                        return difference + " in " + key;
                    }
                }
            }
        }

        return null;
    }

    static clone(object: any, ignore?: Array<string>): any
    {
        if (ObjectExtensions.getTypeName(object) === "Number" ||
            ObjectExtensions.getTypeName(object) === "String" ||
            ObjectExtensions.getTypeName(object) === "Boolean")
        {
            return object;
        }

        if (ObjectExtensions.getTypeName(object) === "Date")
        {
            return new Date(object.getTime());
        }

        var newObject = object instanceof Array ? [] : {};

        function clone(source: any, destination: any): void
        {
            const isArray = source instanceof Array;
            const sourceKeys = (isArray) ? source : Object.keys(source);

            for (let index in sourceKeys)
            {
                if (sourceKeys.hasOwnProperty(index))
                {
                    const key = isArray ? index : sourceKeys[index];

                    if (!isArray && !source.hasOwnProperty(key))
                        continue;

                    if (!isArray && ignore && ArrayExtensions.contains(ignore, key))
                        continue;

                    const thisValue = source[key];

                    if (typeof (thisValue) === "number" || typeof (thisValue) === "string" || typeof (thisValue) === "boolean" || !thisValue)
                    {
                        destination[key] = thisValue;
                    }
                    else if (thisValue instanceof Date)
                    {
                        destination[key] = new Date(thisValue.valueOf());
                    }
                    else if (thisValue instanceof Array)
                    {
                        destination[key] = new Array();
                        clone(thisValue, destination[key]);
                    }
                    else
                    {
                        destination[key] = new Object();
                        clone(thisValue, destination[key]);
                    }
                }
            }
        }

        clone(object, newObject);

        return newObject;
    }
}