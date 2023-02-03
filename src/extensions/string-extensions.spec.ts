/* eslint-disable @typescript-eslint/no-explicit-any */
/*!
 * Paradigm Framework - Web Shared
 * Copyright (c) 2017 Miracle Devs, Inc
 * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.Shared/blob/master/LICENSE)
 */

import { StringExtensions } from "./string-extensions";

describe("String", () => {
    const formatNullError = "Format string can not be null.";

    describe("pad left", () => {
        it("should pad left if the string size is less than provided.", () => expect(StringExtensions.padLeft("12", 4, "0")).toBe("1200"));

        it("should not pad left if the string is equal to the size provided.", () => expect(StringExtensions.padLeft("12", 2, "0")).toBe("12"));

        it("should not pad left if the string is larger to the size provided.", () =>
            expect(StringExtensions.padLeft("1212", 2, "0")).toBe("1212"));

        it("should return null if string is null.", () => expect(StringExtensions.padLeft(null as any, 2, "0")).toBe(null as any));

        it("should return null if string is undefined.", () => expect(StringExtensions.padLeft(undefined as any, 2, "0")).toBe(null as any));
    });

    describe("pad right", () => {
        it("should pad right if the string size is less than provided.", () => expect(StringExtensions.padRight("12", 4, "0")).toBe("0012"));

        it("should not pad right if the string is equal to the size provided.", () =>
            expect(StringExtensions.padRight("12", 2, "0")).toBe("12"));

        it("should not pad right if the string is larger to the size provided.", () =>
            expect(StringExtensions.padRight("1212", 2, "0")).toBe("1212"));

        it("should return null if string is null.", () => expect(StringExtensions.padRight(null as any, 2, "0")).toBe(null as any));

        it("should return null if string is undefined.", () => expect(StringExtensions.padRight(undefined as any, 2, "0")).toBe(null as any));
    });

    describe("is string", () => {
        it("should be true if string literal", () => expect(StringExtensions.isString("hello world")).toBe(true));

        it("should be false if number", () => expect(StringExtensions.isString(45)).toBe(false));

        it("should be false if number array", () => expect(StringExtensions.isString([])).toBe(false));

        it("should be false if number boolean", () => expect(StringExtensions.isString(true)).toBe(false));

        it("should be false if number date", () => expect(StringExtensions.isString(new Date())).toBe(false));
    });

    describe("is null or empty", () => {
        it("should be true if empty", () => expect(StringExtensions.isNullOrEmpty("")).toBe(true));

        it("should be true if null", () => expect(StringExtensions.isNullOrEmpty(null as any)).toBe(true));

        it("should be true if undefined", () => expect(StringExtensions.isNullOrEmpty(undefined as any)).toBe(true));

        it("should be false if string isn't null nor empty", () => expect(StringExtensions.isNullOrEmpty("hello world")).toBe(false));
    });

    describe("is null or white space", () => {
        it("should be true if white spaces", () => expect(StringExtensions.isNullOrWhiteSpace("    ")).toBe(true));

        it("should be true if empty", () => expect(StringExtensions.isNullOrWhiteSpace("")).toBe(true));

        it("should be true if null", () => expect(StringExtensions.isNullOrWhiteSpace(null as any)).toBe(true));

        it("should be true if undefined", () => expect(StringExtensions.isNullOrWhiteSpace(undefined as any)).toBe(true));

        it("should be false if string isn't null nor empty", () => expect(StringExtensions.isNullOrWhiteSpace("hello world")).toBe(false));
    });

    describe("format string", () => {
        it("should format strings", () => expect(StringExtensions.format("{0} {1}", "hello", "world")).toBe("hello world"));

        it("should format numbers", () => expect(StringExtensions.format("Number: {0}", 10.3)).toBe("Number: 10.3"));

        it("should format booleans", () => expect(StringExtensions.format("Boolean: {0}", true)).toBe("Boolean: true"));

        it("should format arrays", () => expect(StringExtensions.format("Array: {0}", [1, 2, 3])).toBe("Array: 1,2,3"));

        it("shouldn't format nulls", () => expect(StringExtensions.format("Null: {0}", null)).toBe("Null: "));

        it("shouldn't format undefined", () => expect(StringExtensions.format("Null: {0}", undefined)).toBe("Null: "));

        it("should fail without format string", () => expect(() => StringExtensions.format(null as any, "hello")).toThrowError(formatNullError));

        it("should fail when content placeholder above the range.", () => expect(() => StringExtensions.format("{2}", "hello")).toThrow());
    });

    describe("format array", () => {
        it("should format strings", () => expect(StringExtensions.formatArray("{0} {1}", ["hello", "world"])).toBe("hello world"));

        it("should format numbers", () => expect(StringExtensions.formatArray("Number: {0}", [10.3])).toBe("Number: 10.3"));

        it("should format booleans", () => expect(StringExtensions.formatArray("Boolean: {0}", [true])).toBe("Boolean: true"));

        it("should format arrays", () => expect(StringExtensions.formatArray("Array: {0}", [[1, 2, 3]])).toBe("Array: 1,2,3"));

        it("shouldn't format nulls", () => expect(StringExtensions.formatArray("Null: {0}", [null])).toBe("Null: "));

        it("shouldn't format undefined", () => expect(StringExtensions.formatArray("Null: {0}", [undefined])).toBe("Null: "));

        it("should fail without format string", () => expect(() => StringExtensions.formatArray(null as any, ["hello"])).toThrowError(formatNullError));

        it("should fail when content placeholder above the range.", () =>
            expect(() => StringExtensions.formatArray("{2}", ["hello"])).toThrow());
    });

    describe("join strings", () => {
        it("should join strings", () => expect(StringExtensions.join(" ", ["hello", "world"])).toBe("hello world"));

        it("should return null if no separator was provided.", () => expect(StringExtensions.join(null as any, ["hello", "world"])).toBe(null as any));

        it("should return null if no values were provided.", () => expect(StringExtensions.join(" ", null as any)).toBe(null as any));
    });
});
