/*!
 * Paradigm Framework - Web Shared
 * Copyright (c) 2017 Miracle Devs, Inc
 * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.Shared/blob/master/LICENSE)
 */

export class FunctionExtensions
{
    static getFunctionName(func: Function): string
    {
        const f = typeof func === "function";
        const s = f && ((func["name"] && ["", func["name"]]) || func.toString().match(/function ([^\(]+)/));
        return (!f && "not a function") || (s && s[1] || "anonymous");
    }
}