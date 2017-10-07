﻿/*!
 * Paradigm Framework - Web Shared
 * Copyright (c) 2017 Miracle Devs, Inc
 * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.Shared/blob/master/LICENSE)
 */

import { ArrayExtensions } from "./array-extensions";

describe("Array", () =>
{
    var firstLastError = "The source sequence is empty.";

    var indexLesserError = "index is less than 0.";

    var indexGreaterError = "index is equal to or greater than length.";

    describe("operate over elements", () =>
    {
        it("should execute code for each element", () =>
        {
            var counter = 0;
            var array = ["element 1", "element 2", "element 3", "element 4"];

            ArrayExtensions.forEach(array, element =>
            {
                expect(element).toBe(array[counter]);
                counter++;
            });

            expect(counter).toBe(array.length);
        });
    });

    describe("filtering elements", () =>
    {
        it("should retrieve elements where condition is met", () =>
        {
            var array = ["element 1", "element 2", "element 3", "index 4", "element 5", "element 6", "index 7"];
            var results = ArrayExtensions.where(array, x => x.indexOf("index") >= 0);

            expect(results.length).toBe(2);
            expect(results[0]).toBe("index 4");
            expect(results[1]).toBe("index 7");
        });

        it("shouldnt retrieve elements where condition is not met", () =>
        {
            var array = ["element 1", "element 2", "element 3", "index 4", "element 5", "element 6", "index 7"];
            var results = ArrayExtensions.where(array, x => x.indexOf("some string") >= 0);

            expect(results.length).toBe(0);
        });

        it("shouldnt retrieve elements when array is empty", () =>
        {
            var array = [];
            var results = ArrayExtensions.where(array, x => x.indexOf("some string") >= 0);

            expect(results.length).toBe(0);
        });
    });

    describe("selecting elements", () =>
    {
        it("should select elements", () =>
        {
            var array = ["1", "2"];
            var results = ArrayExtensions.select(array, x => `element ${x}`);

            expect(results.length).toBe(2);
            expect(results[0]).toBe("element 1");
            expect(results[1]).toBe("element 2");
        });

        it("shouldnt select if array is empty", () =>
        {
            var array = [];
            var results = ArrayExtensions.select(array, x => `element ${x}`);
            expect(results.length).toBe(0);
        });
    });

    describe("first and last elements", () =>
    {
        it("should retrieve the first element or null otherwise", () =>
        {
            var array1 = ["element 1", "element 2", "element 3", "element 4"];
            var array2 = [];

            expect(ArrayExtensions.firstOrDefault(array1)).toBe("element 1");
            expect(ArrayExtensions.firstOrDefault(array2)).toBeNull();
        });

        it("should retrieve the first element when condition is met or null otherwise", () =>
        {
            var array1 = ["element 1", "element 2", "element 3", "element 4"];
            var array2 = [];

            expect(ArrayExtensions.firstOrDefault(array1, x => x.indexOf("element") >= 0)).toBe("element 1");
            expect(ArrayExtensions.firstOrDefault(array1, x => x === "other element")).toBeNull();
            expect(ArrayExtensions.firstOrDefault(array2, x => x === "some string")).toBeNull();
        });

        it("should retrieve the last element or null otherwise", () =>
        {
            var array1 = ["element 1", "element 2", "element 3", "element 4"];
            var array2 = [];

            expect(ArrayExtensions.lastOrDefault(array1)).toBe("element 4");
            expect(ArrayExtensions.lastOrDefault(array2)).toBeNull();
        });

        it("should retrieve the last element when condition is met or null otherwise", () =>
        {
            var array1 = ["element 1", "element 2", "element 3", "element 4"];
            var array2 = [];

            expect(ArrayExtensions.lastOrDefault(array1, x => x.indexOf("element") >= 0)).toBe("element 4");
            expect(ArrayExtensions.lastOrDefault(array1, x => x === "other element")).toBeNull();
            expect(ArrayExtensions.lastOrDefault(array2, x => x === "some string")).toBeNull();
        });

        it("should retrieve the first element or fail otherwise", () =>
        {
            var array1 = ["element 1", "element 2", "element 3", "element 4"];
            var array2 = [];

            expect(ArrayExtensions.first(array1)).toBe("element 1");
            expect(() => ArrayExtensions.first(array2)).toThrowError(firstLastError);
        });

        it("should retrieve the first element when condition is met or fail otherwise", () =>
        {
            var array1 = ["element 1", "element 2", "element 3", "element 4"];
            var array2 = [];

            expect(ArrayExtensions.first(array1, x => x.indexOf("element") >= 0)).toBe("element 1");
            expect(() => ArrayExtensions.first(array1, x => x === "other element")).toThrowError(firstLastError);
            expect(() => ArrayExtensions.first(array2, x => x === "some string")).toThrowError(firstLastError);
        });

        it("should retrieve the last element or fail otherwise", () =>
        {
            var array1 = ["element 1", "element 2", "element 3", "element 4"];
            var array2 = [];

            expect(ArrayExtensions.last(array1)).toBe("element 4");
            expect(() => ArrayExtensions.last(array2)).toThrowError(firstLastError);
        });

        it("should retrieve the last element when condition is met or fail otherwise", () =>
        {
            var array1 = ["element 1", "element 2", "element 3", "element 4"];
            var array2 = [];

            expect(ArrayExtensions.last(array1, x => x.indexOf("element") >= 0)).toBe("element 4");
            expect(() => ArrayExtensions.last(array1, x => x === "other element")).toThrowError(firstLastError);
            expect(() => ArrayExtensions.last(array2, x => x === "some string")).toThrowError(firstLastError);
        });
    });

    describe("checking elements", () =>
    {
        it("should check if any", () =>
        {
            var array1 = ["element 1", "element 2", "element 3", "element 4"];
            var array2 = [];

            expect(ArrayExtensions.any(array1)).toBe(true);
            expect(ArrayExtensions.any(array2)).toBe(false);
        });

        it("should check if any when condition met", () =>
        {
            var array = ["element 1", "element 2", "element 3", "element 4"];

            expect(ArrayExtensions.any(array, x => x === "element 1")).toBe(true);
            expect(ArrayExtensions.any(array, x => x === "element 5")).toBe(false);
        });

        it("should check if contains element", () =>
        {
            var array = ["element 1", "element 2", "index 3", "index 4"];

            expect(ArrayExtensions.contains(array, "element 1")).toBe(true);
            expect(ArrayExtensions.contains(array, "other")).toBe(false);
        });
    });

    describe("counting elements", () =>
    {
        it("should count elements", () =>
        {
            var array1 = ["element 1", "element 2", "element 3", "element 4"];
            var array2 = [];

            expect(ArrayExtensions.count(array1)).toBe(4);
            expect(ArrayExtensions.count(array2)).toBe(0);
        });

        it("should count elements when condition met", () =>
        {
            var array = ["element 1", "element 2", "index 3", "index 4"];

            expect(ArrayExtensions.count(array, x => x.indexOf("element") >= 0)).toBe(2);
            expect(ArrayExtensions.count(array, x => x.indexOf("other") >= 0)).toBe(0);
        });

        it("should sum elements", () =>
        {
            var array1 = [1, 2, 3, 4];
            var array2 = ["1", "2", "3", "4"];
            var array3 = [];

            expect(ArrayExtensions.sum(array1)).toBe(10);
            expect(ArrayExtensions.sum(array2)).toBe("1234");
            expect(ArrayExtensions.sum(array3)).toBe(null);
        });

        it("should sum inner elements", () =>
        {
            var array1 = [{ value: 1, name: "1" }, { value: 2, name: "2" }, { value: 3, name: "3" }, { value: 4, name: "4" }];

            expect(ArrayExtensions.sum(array1, x => x.value)).toBe(10);
            expect(ArrayExtensions.sum(array1, x => x.name)).toBe("1234");
            expect(ArrayExtensions.sum(array1, x => x["other"])).toBe(null);
        });
    });

    describe("ordering elements", () =>
    {
        it("should order elements ascending", () =>
        {
            var array1 = [3, 1, 4, 2];
            var array2 = ["element 3", "element 1", "element 4", "element 2"];

            var ordered1 = ArrayExtensions.orderBy(array1);
            var ordered2 = ArrayExtensions.orderBy(array2);

            expect(ordered1[0]).toBe(1);
            expect(ordered1[1]).toBe(2);
            expect(ordered1[2]).toBe(3);
            expect(ordered1[3]).toBe(4);

            expect(ordered2[0]).toBe("element 1");
            expect(ordered2[1]).toBe("element 2");
            expect(ordered2[2]).toBe("element 3");
            expect(ordered2[3]).toBe("element 4");
        });

        it("should order by predicate ascending", () =>
        {
            var array = [{ value: 2, name: "3" }, { value: 1, name: "4" }, { value: 3, name: "1" }, { value: 5, name: "2" }];

            var ordered1 = ArrayExtensions.orderBy(array, x => x.value);
            var ordered2 = ArrayExtensions.orderBy(array, x => x.name);

            expect(ordered1[0].value).toBe(1);
            expect(ordered1[1].value).toBe(2);
            expect(ordered1[2].value).toBe(3);
            expect(ordered1[3].value).toBe(5);

            expect(ordered2[0].name).toBe("1");
            expect(ordered2[1].name).toBe("2");
            expect(ordered2[2].name).toBe("3");
            expect(ordered2[3].name).toBe("4");
        });

        it("should order elements descending", () =>
        {
            var array1 = [3, 1, 4, 2];
            var array2 = ["element 3", "element 1", "element 4", "element 2"];

            var ordered1 = ArrayExtensions.orderByDesc(array1);
            var ordered2 = ArrayExtensions.orderByDesc(array2);

            expect(ordered1[3]).toBe(1);
            expect(ordered1[2]).toBe(2);
            expect(ordered1[1]).toBe(3);
            expect(ordered1[0]).toBe(4);

            expect(ordered2[3]).toBe("element 1");
            expect(ordered2[2]).toBe("element 2");
            expect(ordered2[1]).toBe("element 3");
            expect(ordered2[0]).toBe("element 4");
        });

        it("should order by predicate descending", () =>
        {
            var array = [{ value: 2, name: "3" }, { value: 1, name: "4" }, { value: 3, name: "1" }, { value: 5, name: "2" }];

            var ordered1 = ArrayExtensions.orderByDesc(array, x => x.value);
            var ordered2 = ArrayExtensions.orderByDesc(array, x => x.name);

            expect(ordered1[3].value).toBe(1);
            expect(ordered1[2].value).toBe(2);
            expect(ordered1[1].value).toBe(3);
            expect(ordered1[0].value).toBe(5);

            expect(ordered2[3].name).toBe("1");
            expect(ordered2[2].name).toBe("2");
            expect(ordered2[1].name).toBe("3");
            expect(ordered2[0].name).toBe("4");
        });
    });

    describe("removing elements", () =>
    {
        it("should remove element", () =>
        {
            var array = [1, 2, 3, 4];

            expect(ArrayExtensions.remove(array, 1)).toBe(true);
            expect(array.length).toBe(3);
            expect(array[0]).toBe(2);
            expect(array[1]).toBe(3);
            expect(array[2]).toBe(4);
        });

        it("should return false if tries to remove an unexisting element", () =>
        {
            var array = [1, 2, 3, 4];

            expect(ArrayExtensions.remove(array, 5)).toBe(false);
            expect(array[0]).toBe(1);
            expect(array[1]).toBe(2);
            expect(array[2]).toBe(3);
            expect(array[3]).toBe(4);
        });

        it("should remove element at index", () =>
        {
            var array = [1, 2, 3, 4];

            expect(() => ArrayExtensions.removeAt(array, 0)).not.toThrow();
            expect(array.length).toBe(3);
            expect(array[0]).toBe(2);
            expect(array[1]).toBe(3);
            expect(array[2]).toBe(4);
        });

        it("should fail if tries to remove an element at an unexising index", () =>
        {
            var array = [1, 2, 3, 4];

            expect(() => ArrayExtensions.removeAt(array, 5)).toThrowError(indexGreaterError);
            expect(() => ArrayExtensions.removeAt(array, -1)).toThrowError(indexLesserError);

            expect(array[0]).toBe(1);
            expect(array[1]).toBe(2);
            expect(array[2]).toBe(3);
            expect(array[3]).toBe(4);
        });

        it("should remove all elements", () =>
        {
            var array = [1, 2, 3, 4];

            expect(ArrayExtensions.removeAll(array)).toBe(4);
            expect(array.length).toBe(0);
        });

        it("should remove all elements under certain conditions", () =>
        {
            var array = [1, 2, 3, 4];

            expect(ArrayExtensions.removeAll(array, x => x > 2)).toBe(2);
            expect(array.length).toBe(2);
            expect(array[0]).toBe(1);
            expect(array[1]).toBe(2);
        });

        it("shouldnt remove any elements if condition is not met", () =>
        {
            var array = [1, 2, 3, 4];

            expect(ArrayExtensions.removeAll(array, x => x > 4)).toBe(0);
            expect(array.length).toBe(4);
            expect(array[0]).toBe(1);
            expect(array[1]).toBe(2);
            expect(array[2]).toBe(3);
            expect(array[3]).toBe(4);
        });
    });

});