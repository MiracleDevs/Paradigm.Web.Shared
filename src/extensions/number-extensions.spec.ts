/*!
 * Paradigm Framework - Web Shared
 * Copyright (c) 2017 Miracle Devs, Inc
 * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.Shared/blob/master/LICENSE)
 */

import { NumberExtensions } from "./number-extensions";

describe("Number", () =>
{
    describe("is number", () =>
    {
        it("should be true if number", () => expect(NumberExtensions.isNumber(1)).toBe(true));

        it("should be false if NaN", () => expect(NumberExtensions.isNumber(NaN)).toBe(false));

        it("should be false if Infinite", () => expect(NumberExtensions.isNumber(Infinity)).toBe(false));

        it("should be false if string", () => expect(NumberExtensions.isNumber("hello")).toBe(false));

        it("should be false if boolean", () => expect(NumberExtensions.isNumber(true)).toBe(false));

        it("should be false if date", () => expect(NumberExtensions.isNumber(new Date(12, 12, 12))).toBe(false));

        it("should be false if null", () => expect(NumberExtensions.isNumber(null)).toBe(false));

        it("should be false if array", () => expect(NumberExtensions.isNumber([1, 2, 3])).toBe(false));

        it("should be false if object", () => expect(NumberExtensions.isNumber({ })).toBe(false));
    });
});