/*!
 * Paradigm Framework - Web Shared
 * Copyright (c) 2017 Miracle Devs, Inc
 * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.Shared/blob/master/LICENSE)
 */

export class MathExtensions
{
    static clamp(value: number, min: number = 0, max: number = 1): number
    {
        return value <= min
            ? min
            : value >= max
                ? max
                : value;
    }
}