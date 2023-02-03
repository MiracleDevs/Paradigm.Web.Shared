/*!
 * Paradigm Framework - Web Shared
 * Copyright (c) 2017 Miracle Devs, Inc
 * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.Shared/blob/master/LICENSE)
 */

import { MathExtensions } from "./math-extensions";

describe("Math", () => {
    describe("clamp", () => {
        it("should clamp number greater than the maximum number in the range", () => expect(MathExtensions.clamp(10, 0, 5)).toBe(5));

        it("should clamp number lesser than the maximum number in the range", () => expect(MathExtensions.clamp(-10, 0, 5)).toBe(0));

        it("should keep number between the range", () => expect(MathExtensions.clamp(3, 0, 5)).toBe(3));

        it("should keep number equal to the minimum number in the range", () => expect(MathExtensions.clamp(0, 0, 5)).toBe(0));

        it("should keep number equal to the maximum number in the range", () => expect(MathExtensions.clamp(5, 0, 5)).toBe(5));

        it("should keep number between 0 and 1 if range values are not provided", () => expect(MathExtensions.clamp(2)).toBe(1));

        it("should keep number between 0 and 1 if range values are not provided", () => expect(MathExtensions.clamp(-2)).toBe(0));
    });
});
