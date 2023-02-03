/* eslint-disable @typescript-eslint/no-explicit-any */
/*!
 * Paradigm Framework - Web Shared
 * Copyright (c) 2017 Miracle Devs, Inc
 * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.Shared/blob/master/LICENSE)
 */

import { ArrayList } from "./array-list";
import { IKeyValuePair } from "./ikey-value-pair";

describe("ArrayList", () => {
    const firstLastError = "The source sequence is empty.";

    const indexLesserError = "index is less than 0.";

    const indexGreaterError = "index is equal to or greater than length.";

    const orderByError = "Can not order complex objects without a predicate.";

    const valueNotArrayError = "Value should be an array or an IEnumerable class.";

    describe("instantiation", () => {
        it("should be able to create an empty array list", () => {
            const array: ArrayList<number> = new ArrayList<number>();
            expect(array).not.toBeNull();
            expect(array.count()).toBe(0);
        });

        it("should be able to create an filled array list", () => {
            const array: ArrayList<number> = new ArrayList([1, 2]);
            expect(array).not.toBeNull();
            expect(array.count()).toBe(2);
            expect(array.get(0)).toBe(1);
            expect(array.get(1)).toBe(2);
        });
    });

    describe("operate over elements", () => {
        it("should get elements", () => {
            const array = new ArrayList([1, 2, 3]);

            expect(array.get(0)).toBe(1);
            expect(array.get(1)).toBe(2);
            expect(array.get(2)).toBe(3);
        });

        it("should fail if get out of bounds", () => {
            const array = new ArrayList([1, 2, 3]);

            expect(() => array.get(-1)).toThrowError(indexLesserError);
            expect(() => array.get(3)).toThrowError(indexGreaterError);
        });

        it("should pop last element", () => {
            const array = new ArrayList([1, 2, 3]);
            const popped = array.pop();
            expect(popped).toBe(3);
            expect(array.count()).toBe(2);
            expect(array.get(0)).toBe(1);
            expect(array.get(1)).toBe(2);
        });

        it("should retrieve index of element", () => {
            const array = new ArrayList([1, 2, 3]);

            expect(array.indexOf(1)).toBe(0);
            expect(array.indexOf(2)).toBe(1);
            expect(array.indexOf(3)).toBe(2);
        });

        it("should retrieve a negative index for an un-existing element", () => {
            const array = new ArrayList([1, 2, 3]);

            expect(array.indexOf(-1)).toBe(-1);
            expect(array.indexOf(4)).toBe(-1);
        });

        it("should add elements", () => {
            const array = new ArrayList<number>();

            array.add(1);
            array.add(2);

            expect(array.count()).toBe(2);
            expect(array.get(0)).toBe(1);
            expect(array.get(1)).toBe(2);
        });

        it("should add range of elements from an array", () => {
            const array = new ArrayList<number>();

            array.addRange([1, 2]);

            expect(array.count()).toBe(2);
            expect(array.get(0)).toBe(1);
            expect(array.get(1)).toBe(2);
        });

        it("should add range of elements from an ArrayList", () => {
            const array1 = new ArrayList<number>();
            const array2 = new ArrayList<number>();

            array2.add(1);
            array2.add(2);

            array1.addRange(array2);

            expect(array1.count()).toBe(2);
            expect(array1.get(0)).toBe(1);
            expect(array1.get(1)).toBe(2);
        });

        it("should fail when adding a range other than an array or ArrayList.", () => {
            const array = new ArrayList<number>();
            expect(() => array.addRange(new Object() as any)).toThrowError(valueNotArrayError);
        });

        it("should execute code for each element", () => {
            let counter = 0;
            const array = new ArrayList(["element 1", "element 2", "element 3", "element 4"]);

            array.forEach(element => {
                expect(element).toBe(array.get(counter));
                counter++;
            });

            expect(counter).toBe(array.count());
        });
    });

    describe("filtering elements", () => {
        it("should retrieve elements where condition is met", () => {
            const array = new ArrayList(["element 1", "element 2", "element 3", "index 4", "element 5", "element 6", "index 7"]);
            const results = array.where(x => x.indexOf("index") >= 0);

            expect(results.count()).toBe(2);
            expect(results.get(0)).toBe("index 4");
            expect(results.get(1)).toBe("index 7");
        });

        it("shouldn't retrieve elements where condition is not met", () => {
            const array = new ArrayList(["element 1", "element 2", "element 3", "index 4", "element 5", "element 6", "index 7"]);
            const results = array.where(x => x.indexOf("some string") >= 0);

            expect(results.count()).toBe(0);
        });

        it("shouldn't retrieve elements when array is empty", () => {
            const array = new ArrayList<string>();
            const results = array.where(x => x.indexOf("some string") >= 0);

            expect(results.count()).toBe(0);
        });
    });

    describe("selecting elements", () => {
        it("should select elements", () => {
            const array = new ArrayList(["1", "2"]);
            const results = array.select(x => `element ${x}`);

            expect(results.count()).toBe(2);
            expect(results.get(0)).toBe("element 1");
            expect(results.get(1)).toBe("element 2");
        });

        it("shouldn't select if array is empty", () => {
            const array = new ArrayList<string>();
            const results = array.select(x => `element ${x}`);
            expect(results.count()).toBe(0);
        });
    });

    describe("first and last elements", () => {
        it("should retrieve the first element or null otherwise", () => {
            const array1 = new ArrayList(["element 1", "element 2", "element 3", "element 4"]);
            const array2 = new ArrayList<string>();

            expect(array1.firstOrDefault()).toBe("element 1");
            expect(array2.firstOrDefault()).toBeNull();
        });

        it("should retrieve the first element when condition is met or null otherwise", () => {
            const array1 = new ArrayList(["element 1", "element 2", "element 3", "element 4"]);
            const array2 = new ArrayList<string>();

            expect(array1.firstOrDefault(x => x.indexOf("element") >= 0)).toBe("element 1");
            expect(array1.firstOrDefault(x => x === "other element")).toBeNull();
            expect(array2.firstOrDefault(x => x === "some string")).toBeNull();
        });

        it("should retrieve the last element or null otherwise", () => {
            const array1 = new ArrayList(["element 1", "element 2", "element 3", "element 4"]);
            const array2 = new ArrayList<string>();

            expect(array1.lastOrDefault()).toBe("element 4");
            expect(array2.lastOrDefault()).toBeNull();
        });

        it("should retrieve the last element when condition is met or null otherwise", () => {
            const array1 = new ArrayList(["element 1", "element 2", "element 3", "element 4"]);
            const array2 = new ArrayList<string>();

            expect(array1.lastOrDefault(x => x.indexOf("element") >= 0)).toBe("element 4");
            expect(array1.lastOrDefault(x => x === "other element")).toBeNull();
            expect(array2.lastOrDefault(x => x === "some string")).toBeNull();
        });

        it("should retrieve the first element or fail otherwise", () => {
            const array1 = new ArrayList(["element 1", "element 2", "element 3", "element 4"]);
            const array2 = new ArrayList<string>();

            expect(array1.first()).toBe("element 1");
            expect(() => array2.first()).toThrowError("The source sequence is empty.");
        });

        it("should retrieve the first element when condition is met or fail otherwise", () => {
            const array1 = new ArrayList(["element 1", "element 2", "element 3", "element 4"]);
            const array2 = new ArrayList<string>();

            expect(array1.first(x => x.indexOf("element") >= 0)).toBe("element 1");
            expect(() => array1.first(x => x === "other element")).toThrowError(firstLastError);
            expect(() => array2.first(x => x === "some string")).toThrowError(firstLastError);
        });

        it("should retrieve the last element or fail otherwise", () => {
            const array1 = new ArrayList(["element 1", "element 2", "element 3", "element 4"]);
            const array2 = new ArrayList<string>();

            expect(array1.last()).toBe("element 4");
            expect(() => array2.last()).toThrowError(firstLastError);
        });

        it("should retrieve the last element when condition is met or fail otherwise", () => {
            const array1 = new ArrayList(["element 1", "element 2", "element 3", "element 4"]);
            const array2 = new ArrayList();

            expect(array1.last(x => x.indexOf("element") >= 0)).toBe("element 4");
            expect(() => array1.last(x => x === "other element")).toThrowError(firstLastError);
            expect(() => array2.last(x => x === "some string")).toThrowError(firstLastError);
        });
    });

    describe("checking elements", () => {
        it("should check if any", () => {
            const array1 = new ArrayList(["element 1", "element 2", "element 3", "element 4"]);
            const array2 = new ArrayList();

            expect(array1.any()).toBe(true);
            expect(array2.any()).toBe(false);
        });

        it("should check if any when condition met", () => {
            const array = new ArrayList(["element 1", "element 2", "element 3", "element 4"]);

            expect(array.any(x => x === "element 1")).toBe(true);
            expect(array.any(x => x === "element 5")).toBe(false);
        });

        it("should check if contains element", () => {
            const array = new ArrayList(["element 1", "element 2", "index 3", "index 4"]);

            expect(array.contains("element 1")).toBe(true);
            expect(array.contains("other")).toBe(false);
        });
    });

    describe("counting elements", () => {
        it("should count elements", () => {
            const array1 = new ArrayList(["element 1", "element 2", "element 3", "element 4"]);
            const array2 = new ArrayList();

            expect(array1.count()).toBe(4);
            expect(array2.count()).toBe(0);
        });

        it("should count elements when condition met", () => {
            const array = new ArrayList(["element 1", "element 2", "index 3", "index 4"]);

            expect(array.count(x => x.indexOf("element") >= 0)).toBe(2);
            expect(array.count(x => x.indexOf("other") >= 0)).toBe(0);
        });

        it("should sum elements", () => {
            const array1 = new ArrayList([1, 2, 3, 4]);
            const array2 = new ArrayList(["1", "2", "3", "4"]);
            const array3 = new ArrayList();

            expect(array1.sum()).toBe(10);
            expect(array2.sum()).toBe("1234");
            expect(array3.sum()).toBe(null);
        });

        it("should sum inner elements", () => {
            const array = new ArrayList([
                { value: 1, name: "1" },
                { value: 2, name: "2" },
                { value: 3, name: "3" },
                { value: 4, name: "4" },
            ]);

            expect(array.sum(x => x.value)).toBe(10);
            expect(array.sum(x => x.name)).toBe("1234");
            expect(array.sum(x => (x as any)["other"])).toBe(null);
        });
    });

    describe("ordering elements", () => {
        it("should order ascending elements without predicate", () => {
            const array1 = new ArrayList([3, 1, 4, 2]);
            const array2 = new ArrayList(["element 3", "element 1", "element 4", "element 2"]);

            const ordered1 = array1.orderBy();
            const ordered2 = array2.orderBy();

            expect(ordered1.get(0)).toBe(1);
            expect(ordered1.get(1)).toBe(2);
            expect(ordered1.get(2)).toBe(3);
            expect(ordered1.get(3)).toBe(4);

            expect(ordered2.get(0)).toBe("element 1");
            expect(ordered2.get(1)).toBe("element 2");
            expect(ordered2.get(2)).toBe("element 3");
            expect(ordered2.get(3)).toBe("element 4");
        });

        it("shouldn't order by ascending objects without predicate", () => {
            const array1 = new ArrayList<IKeyValuePair<string, number>>([
                { key: "b", value: 2 },
                { key: "a", value: 1 },
            ]);
            expect(() => array1.orderBy()).toThrowError(orderByError);
        });

        it("should order ascending objects with predicate", () => {
            const array = new ArrayList([
                { value: 2, name: "3" },
                { value: 1, name: "4" },
                { value: 3, name: "1" },
                { value: 5, name: "2" },
            ]);

            const ordered1 = array.orderBy(x => x.value);
            const ordered2 = array.orderBy(x => x.name);

            expect(ordered1.get(0).value).toBe(1);
            expect(ordered1.get(1).value).toBe(2);
            expect(ordered1.get(2).value).toBe(3);
            expect(ordered1.get(3).value).toBe(5);

            expect(ordered2.get(0).name).toBe("1");
            expect(ordered2.get(1).name).toBe("2");
            expect(ordered2.get(2).name).toBe("3");
            expect(ordered2.get(3).name).toBe("4");
        });

        it("should order by descending elements", () => {
            const array1 = new ArrayList([3, 1, 4, 2]);
            const array2 = new ArrayList(["element 3", "element 1", "element 4", "element 2"]);

            const ordered1 = array1.orderByDesc();
            const ordered2 = array2.orderByDesc();

            expect(ordered1.get(3)).toBe(1);
            expect(ordered1.get(2)).toBe(2);
            expect(ordered1.get(1)).toBe(3);
            expect(ordered1.get(0)).toBe(4);

            expect(ordered2.get(3)).toBe("element 1");
            expect(ordered2.get(2)).toBe("element 2");
            expect(ordered2.get(1)).toBe("element 3");
            expect(ordered2.get(0)).toBe("element 4");
        });

        it("shouldn't order by descending objects without predicate", () => {
            const array1 = new ArrayList<IKeyValuePair<string, number>>([
                { key: "a", value: 1 },
                { key: "b", value: 2 },
            ]);
            expect(() => array1.orderByDesc()).toThrowError(orderByError);
        });

        it("should order by descending objects with predicate", () => {
            const array = new ArrayList([
                { value: 2, name: "3" },
                { value: 1, name: "4" },
                { value: 3, name: "1" },
                { value: 5, name: "2" },
            ]);

            const ordered1 = array.orderByDesc(x => x.value);
            const ordered2 = array.orderByDesc(x => x.name);

            expect(ordered1.get(3).value).toBe(1);
            expect(ordered1.get(2).value).toBe(2);
            expect(ordered1.get(1).value).toBe(3);
            expect(ordered1.get(0).value).toBe(5);

            expect(ordered2.get(3).name).toBe("1");
            expect(ordered2.get(2).name).toBe("2");
            expect(ordered2.get(1).name).toBe("3");
            expect(ordered2.get(0).name).toBe("4");
        });
    });

    describe("removing elements", () => {
        it("should remove element", () => {
            const array = new ArrayList([1, 2, 3, 4]);

            expect(array.remove(1)).toBe(true);
            expect(array.count()).toBe(3);
            expect(array.get(0)).toBe(2);
            expect(array.get(1)).toBe(3);
            expect(array.get(2)).toBe(4);
        });

        it("should return false if tries to remove an unexisting element", () => {
            const array = new ArrayList([1, 2, 3, 4]);

            expect(array.remove(5)).toBe(false);
            expect(array.get(0)).toBe(1);
            expect(array.get(1)).toBe(2);
            expect(array.get(2)).toBe(3);
            expect(array.get(3)).toBe(4);
        });

        it("should remove element at index", () => {
            const array = new ArrayList([1, 2, 3, 4]);

            expect(() => array.removeAt(0)).not.toThrow();
            expect(array.count()).toBe(3);
            expect(array.get(0)).toBe(2);
            expect(array.get(1)).toBe(3);
            expect(array.get(2)).toBe(4);
        });

        it("should fail if tries to remove an element at an unexising index", () => {
            const array = new ArrayList([1, 2, 3, 4]);

            expect(() => array.removeAt(5)).toThrowError(indexGreaterError);
            expect(() => array.removeAt(-1)).toThrowError(indexLesserError);

            expect(array.get(0)).toBe(1);
            expect(array.get(1)).toBe(2);
            expect(array.get(2)).toBe(3);
            expect(array.get(3)).toBe(4);
        });

        it("should remove all elements", () => {
            const array = new ArrayList([1, 2, 3, 4]);

            expect(array.removeAll()).toBe(4);
            expect(array.count()).toBe(0);
        });

        it("should remove all elements under certain conditions", () => {
            const array = new ArrayList([1, 2, 3, 4]);

            expect(array.removeAll(x => x > 2)).toBe(2);
            expect(array.count()).toBe(2);
            expect(array.get(0)).toBe(1);
            expect(array.get(1)).toBe(2);
        });

        it("shouldn't remove any elements if condition is not met", () => {
            const array = new ArrayList([1, 2, 3, 4]);

            expect(array.removeAll(x => x > 4)).toBe(0);
            expect(array.count()).toBe(4);
            expect(array.get(0)).toBe(1);
            expect(array.get(1)).toBe(2);
            expect(array.get(2)).toBe(3);
            expect(array.get(3)).toBe(4);
        });

        it("should clear all elements", () => {
            const array = new ArrayList([1, 2, 3, 4]);

            expect(() => array.clear()).not.toThrow();
            expect(array.count()).toBe(0);
        });
    });
});
