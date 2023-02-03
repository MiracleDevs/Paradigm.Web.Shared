/*!
 * Paradigm Framework - Web Shared
 * Copyright (c) 2017 Miracle Devs, Inc
 * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.Shared/blob/master/LICENSE)
 */

export class MathExtensions {
    static clamp(value: number, min = 0, max = 1): number {
        return value <= min ? min : value >= max ? max : value;
    }
}
