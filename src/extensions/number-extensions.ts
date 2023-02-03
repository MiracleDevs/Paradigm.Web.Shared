/* eslint-disable @typescript-eslint/no-explicit-any */
/*!
 * Paradigm Framework - Web Shared
 * Copyright (c) 2017 Miracle Devs, Inc
 * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.Shared/blob/master/LICENSE)
 */

export class NumberExtensions {
    static isNumber(value: any): boolean {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }
}
