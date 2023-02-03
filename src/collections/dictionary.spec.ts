/* eslint-disable @typescript-eslint/no-explicit-any */
/*!
 * Paradigm Framework - Web Shared
 * Copyright (c) 2017 Miracle Devs, Inc
 * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.Shared/blob/master/LICENSE)
 */

import { Dictionary } from "./dictionary";
import { ArrayList } from "./array-list";
import { IKeyValuePair } from "./ikey-value-pair";

describe("Dictionary", () => {
    const firstLastError = "The source sequence is empty.";

    const wrongKeyError = "The given key was not present in the dictionary.";

    const wrongValueError = "The given value was not present in the dictionary.";

    const valueNotArrayError = "Value should be an array or an IEnumerable class.";

    const keyPresentError = "An element with the same key already exists in the Dictionary<TKey, TValue>.";

    const predicateError = "Predicate can not be null.";

    const itemNullError = "Item can not be null";

    const keyNullError = "Key can not be null.";

    describe("instantiation", () => {
        it("should be able to create an empty dictionary", () => {
            const dictionary: Dictionary<string, number> = new Dictionary<string, number>();
            expect(dictionary).not.toBeNull();
            expect(dictionary.count()).toBe(0);
        });

        it("should be able to create an filled dictionary", () => {
            const dictionary: Dictionary<string, number> = new Dictionary([
                { key: "a", value: 1 },
                { key: "b", value: 2 },
            ]);
            expect(dictionary).not.toBeNull();
            expect(dictionary.count()).toBe(2);
            expect(dictionary.get("a")).toBe(1);
            expect(dictionary.get("b")).toBe(2);
        });

        it("should fail when creating the dictionary with duplicate keys", () => {
            expect(
                () =>
                    new Dictionary([
                        { key: "a", value: 1 },
                        { key: "a", value: 2 },
                    ])
            ).toThrowError(keyPresentError);
        });
    });

    describe("get values", () => {
        it("should get element values", () => {
            const dictionary = new Dictionary([
                { key: "a", value: 1 },
                { key: "b", value: 2 },
            ]);
            const values = dictionary.getValues();

            expect(values.getInnerArray()).toEqual([1, 2]);
        });
    });

    describe("get keys", () => {
        it("should get element keys", () => {
            const dictionary = new Dictionary([
                { key: "a", value: 1 },
                { key: "b", value: 2 },
            ]);
            const values = dictionary.getKeys();

            expect(values.getInnerArray()).toEqual(["a", "b"]);
        });
    });

    describe("operate over elements", () => {
        it("should get elements by key", () => {
            const dictionary = new Dictionary([
                { key: "a", value: 1 },
                { key: "b", value: 2 },
            ]);

            expect(dictionary.get("a")).toBe(1);
            expect(dictionary.get("b")).toBe(2);
        });

        it("should fail if when key not present", () => {
            const dictionary = new Dictionary([
                { key: "a", value: 1 },
                { key: "b", value: 2 },
            ]);

            expect(() => dictionary.get("c")).toThrowError(wrongKeyError);
        });

        it("should pop last element", () => {
            const dictionary = new Dictionary([
                { key: "a", value: 1 },
                { key: "b", value: 2 },
                { key: "c", value: 3 },
            ]);

            const popped = dictionary.pop();

            expect(popped?.value).toBe(3);
            expect(dictionary.count()).toBe(2);
            expect(dictionary.get("a")).toBe(1);
            expect(dictionary.get("b")).toBe(2);
        });

        it("should retrieve key of element by value", () => {
            const dictionary = new Dictionary([
                { key: "a", value: 1 },
                { key: "b", value: 2 },
                { key: "c", value: 3 },
            ]);

            expect(dictionary.keyOf(1)).toBe("a");
            expect(dictionary.keyOf(2)).toBe("b");
            expect(dictionary.keyOf(3)).toBe("c");
        });

        it("should fail trying to retrieve a key of a value that is not present", () => {
            const dictionary = new Dictionary([
                { key: "a", value: 1 },
                { key: "b", value: 2 },
                { key: "c", value: 3 },
            ]);

            expect(() => dictionary.keyOf(-1)).toThrowError(wrongValueError);
        });

        it("should add elements", () => {
            const dictionary = new Dictionary<string, number>();

            dictionary.add("a", 1);
            dictionary.add("b", 2);

            expect(dictionary.count()).toBe(2);
            expect(dictionary.get("a")).toBe(1);
            expect(dictionary.get("b")).toBe(2);
        });

        it("should add range of elements from an array", () => {
            const dictionary = new Dictionary<string, number>();

            dictionary.addRange([
                { key: "a", value: 1 },
                { key: "b", value: 2 },
            ]);

            expect(dictionary.count()).toBe(2);
            expect(dictionary.get("a")).toBe(1);
            expect(dictionary.get("b")).toBe(2);
        });

        it("should add range of elements from an ArrayList", () => {
            const dictionary = new Dictionary<string, number>();
            const arrayList = new ArrayList<IKeyValuePair<string, number>>();

            arrayList.add({ key: "a", value: 1 });
            arrayList.add({ key: "b", value: 2 });

            dictionary.addRange(arrayList);

            expect(dictionary.count()).toBe(2);
            expect(dictionary.get("a")).toBe(1);
            expect(dictionary.get("b")).toBe(2);
        });

        it("should fail when adding duplicate keys", () => {
            const dictionary = new Dictionary<string, number>();
            expect(() =>
                dictionary.addRange([
                    { key: "a", value: 1 },
                    { key: "a", value: 2 },
                ])
            ).toThrowError(keyPresentError);
        });

        it("should fail when adding other than key-value pairs.", () => {
            const dictionary = new Dictionary<string, number>();
            expect(() => dictionary.addRange(new Object() as any)).toThrowError(valueNotArrayError);
        });

        it("should fail when adding null items.", () => {
            const dictionary = new Dictionary<string, number>();
            expect(() => dictionary.addRange([{ key: "element 1", value: 1 }, null as any])).toThrowError(itemNullError);
        });

        it("should fail when adding one item with a null key.", () => {
            const dictionary = new Dictionary<string, number>();
            expect(() => dictionary.add(null as any, 1)).toThrowError(keyNullError);
        });

        it("should execute code for each element", () => {
            let counter = 0;
            const dictionary = new Dictionary([
                { key: "a", value: 1 },
                { key: "b", value: 2 },
                { key: "c", value: 3 },
            ]);

            dictionary.forEach(element => {
                expect(element.key).not.toBeNull();
                expect(element.value).not.toBeNull();
                expect(dictionary.get(element.key)).toBe(element.value);
                expect(dictionary.keyOf(element.value)).toBe(element.key);
                counter++;
            });

            expect(counter).toBe(dictionary.count());
        });
    });

    describe("filtering elements", () => {
        it("should retrieve elements where condition for key is met", () => {
            const dictionary = new Dictionary([
                { key: "element 1", value: 1 },
                { key: "index 2", value: 2 },
                { key: "element 3", value: 3 },
                { key: "index 4", value: 4 },
                { key: "element 5", value: 5 },
            ]);

            const results = dictionary.where(x => x.key.indexOf("index") >= 0) as Dictionary<string, number>;

            expect(results.count()).toBe(2);
            expect(results.get("index 2")).toBe(2);
            expect(results.get("index 4")).toBe(4);
        });

        it("should retrieve elements where condition for value is met", () => {
            const dictionary = new Dictionary([
                { key: "element 1", value: 1 },
                { key: "index 2", value: 2 },
                { key: "element 3", value: 3 },
                { key: "index 4", value: 4 },
                { key: "element 5", value: 5 },
            ]);

            const results = dictionary.where(x => x.value >= 4) as Dictionary<string, number>;

            expect(results.count()).toBe(2);
            expect(results.get("index 4")).toBe(4);
            expect(results.get("element 5")).toBe(5);
        });

        it("shouldn't retrieve elements where condition is not met", () => {
            const dictionary = new Dictionary([
                { key: "element 1", value: 1 },
                { key: "index 2", value: 2 },
                { key: "element 3", value: 3 },
                { key: "index 4", value: 4 },
                { key: "element 5", value: 5 },
            ]);
            const results = dictionary.where(x => x.value > 10);
            expect(results.count()).toBe(0);
        });

        it("shouldn't retrieve elements when dictionary is empty", () => {
            const dictionary = new Dictionary<string, number>();
            const results = dictionary.where(x => x.value >= 0);
            expect(results.count()).toBe(0);
        });
    });

    describe("selecting elements", () => {
        it("should select elements", () => {
            const dictionary = new Dictionary([
                { key: "key 1", value: 1 },
                { key: "key 2", value: 2 },
            ]);
            const results = dictionary.select(x => `element ${x.value}`);

            expect(results.count()).toBe(2);
            expect(results.first()).toBe("element 1");
            expect(results.last()).toBe("element 2");
        });

        it("shouldn't select if dictionary is empty", () => {
            const dictionary = new Dictionary<string, number>();
            const results = dictionary.select(x => `element ${x.value}`);
            expect(results.count()).toBe(0);
        });
    });

    describe("first and last elements", () => {
        it("should retrieve the first element or null otherwise", () => {
            const dictionary1 = new Dictionary([
                { key: "element 1", value: 1 },
                { key: "index 2", value: 2 },
                { key: "element 3", value: 3 },
                { key: "index 4", value: 4 },
                { key: "element 5", value: 5 },
            ]);
            const dictionary2 = new Dictionary<string, number>();

            expect(dictionary1.firstOrDefault()?.key).toBe("element 1");
            expect(dictionary2.firstOrDefault()).toBeNull();
        });

        it("should retrieve the first element when condition is met or null otherwise", () => {
            const dictionary1 = new Dictionary([
                { key: "element 1", value: 1 },
                { key: "index 2", value: 2 },
                { key: "element 3", value: 3 },
                { key: "index 4", value: 4 },
                { key: "element 5", value: 5 },
            ]);
            const dictionary2 = new Dictionary<string, number>();

            expect(dictionary1.firstOrDefault(x => x.key === "element 3")?.value).toBe(3);
            expect(dictionary1.firstOrDefault(x => x.key === "other element")).toBeNull();
            expect(dictionary2.firstOrDefault(x => x.key === "some string")).toBeNull();
        });

        it("should retrieve the last element or null otherwise", () => {
            const dictionary1 = new Dictionary([
                { key: "element 1", value: 1 },
                { key: "index 2", value: 2 },
                { key: "element 3", value: 3 },
                { key: "index 4", value: 4 },
                { key: "element 5", value: 5 },
            ]);
            const dictionary2 = new Dictionary<string, number>();

            expect(dictionary1.lastOrDefault()?.key).toBe("element 5");
            expect(dictionary2.lastOrDefault()).toBeNull();
        });

        it("should retrieve the last element when condition is met or null otherwise", () => {
            const dictionary1 = new Dictionary([
                { key: "element 1", value: 1 },
                { key: "index 2", value: 2 },
                { key: "element 3", value: 3 },
                { key: "index 4", value: 4 },
                { key: "element 5", value: 5 },
            ]);
            const dictionary2 = new Dictionary<string, number>();

            expect(dictionary1.lastOrDefault(x => x.key === "element 3")?.value).toBe(3);
            expect(dictionary1.lastOrDefault(x => x.key === "other element")).toBeNull();
            expect(dictionary2.lastOrDefault(x => x.key === "some string")).toBeNull();
        });

        it("should retrieve the first element or fail otherwise", () => {
            const dictionary1 = new Dictionary([
                { key: "element 1", value: 1 },
                { key: "index 2", value: 2 },
                { key: "element 3", value: 3 },
                { key: "index 4", value: 4 },
                { key: "element 5", value: 5 },
            ]);
            const dictionary2 = new Dictionary<string, number>();

            expect(dictionary1.first().key).toBe("element 1");
            expect(() => dictionary2.first()).toThrowError("The source sequence is empty.");
        });

        it("should retrieve the first element when condition is met or fail otherwise", () => {
            const dictionary1 = new Dictionary([
                { key: "element 1", value: 1 },
                { key: "index 2", value: 2 },
                { key: "element 3", value: 3 },
                { key: "index 4", value: 4 },
                { key: "element 5", value: 5 },
            ]);
            const dictionary2 = new Dictionary<string, number>();

            expect(dictionary1.first(x => x.value === 3).key).toBe("element 3");
            expect(() => dictionary1.first(x => x.key === "other element")).toThrowError(firstLastError);
            expect(() => dictionary2.first(x => x.key === "some string")).toThrowError(firstLastError);
        });

        it("should retrieve the last element or fail otherwise", () => {
            const dictionary1 = new Dictionary([
                { key: "element 1", value: 1 },
                { key: "index 2", value: 2 },
                { key: "element 3", value: 3 },
                { key: "index 4", value: 4 },
                { key: "element 5", value: 5 },
            ]);
            const dictionary2 = new Dictionary<string, number>();

            expect(dictionary1.last().key).toBe("element 5");
            expect(() => dictionary2.last()).toThrowError(firstLastError);
        });

        it("should retrieve the last element when condition is met or fail otherwise", () => {
            const dictionary1 = new Dictionary([
                { key: "element 1", value: 1 },
                { key: "index 2", value: 2 },
                { key: "element 3", value: 3 },
                { key: "index 4", value: 4 },
                { key: "element 5", value: 5 },
            ]);
            const dictionary2 = new Dictionary<string, number>();

            expect(dictionary1.last(x => x.value === 3).key).toBe("element 3");
            expect(() => dictionary1.last(x => x.key === "other element")).toThrowError(firstLastError);
            expect(() => dictionary2.last(x => x.key === "some string")).toThrowError(firstLastError);
        });
    });

    describe("checking elements", () => {
        it("should check if any", () => {
            const dictionary1 = new Dictionary([
                { key: "element 1", value: 1 },
                { key: "index 2", value: 2 },
                { key: "element 3", value: 3 },
                { key: "index 4", value: 4 },
                { key: "element 5", value: 5 },
            ]);
            const dictionary2 = new Dictionary<string, number>();

            expect(dictionary1.any()).toBe(true);
            expect(dictionary2.any()).toBe(false);
        });

        it("should check if any when condition met", () => {
            const dictionary = new Dictionary([
                { key: "element 1", value: 1 },
                { key: "index 2", value: 2 },
                { key: "element 3", value: 3 },
                { key: "index 4", value: 4 },
                { key: "element 5", value: 5 },
            ]);

            expect(dictionary.any(x => x.key === "element 1")).toBe(true);
            expect(dictionary.any(x => x.key === "element 6")).toBe(false);
        });
    });

    describe("counting elements", () => {
        it("should count elements", () => {
            const dictionary1 = new Dictionary([
                { key: "element 1", value: 1 },
                { key: "index 2", value: 2 },
                { key: "element 3", value: 3 },
                { key: "index 4", value: 4 },
                { key: "element 5", value: 5 },
            ]);
            const dictionary2 = new Dictionary<string, number>();

            expect(dictionary1.count()).toBe(5);
            expect(dictionary2.count()).toBe(0);
        });

        it("should count elements when condition met", () => {
            const dictionary1 = new Dictionary([
                { key: "element 1", value: 1 },
                { key: "index 2", value: 2 },
                { key: "element 3", value: 3 },
                { key: "index 4", value: 4 },
                { key: "element 5", value: 5 },
            ]);

            expect(dictionary1.count(x => x.value <= 2)).toBe(2);
            expect(dictionary1.count(x => x.value >= 10)).toBe(0);
        });

        it("should sum elements", () => {
            const dictionary1 = new Dictionary([
                { key: "1", value: 1 },
                { key: "2", value: 2 },
                { key: "3", value: 3 },
                { key: "4", value: 4 },
            ]);
            const dictionary2 = new Dictionary<string, number>();

            expect(() => dictionary1.sum(null as any)).toThrowError(predicateError);
            expect(dictionary1.sum(x => x.value)).toBe(10);
            expect(dictionary1.sum(x => x.key)).toBe("1234");
            expect(dictionary2.sum(x => x.value)).toBe(null);
        });
    });

    describe("ordering elements", () => {
        it("should order by ascending", () => {
            const dictionary = new Dictionary([
                { key: "element 3", value: 3 },
                { key: "element 4", value: 4 },
                { key: "element 2", value: 2 },
                { key: "element 1", value: 1 },
            ]);

            const ordered1 = dictionary.orderBy(x => x.key).getInnerArray();
            const ordered2 = dictionary.orderBy(x => x.value).getInnerArray();

            expect(ordered1[0].value).toBe(1);
            expect(ordered1[1].value).toBe(2);
            expect(ordered1[2].value).toBe(3);
            expect(ordered1[3].value).toBe(4);

            expect(ordered2[0].key).toBe("element 1");
            expect(ordered2[1].key).toBe("element 2");
            expect(ordered2[2].key).toBe("element 3");
            expect(ordered2[3].key).toBe("element 4");
        });

        it("shouldn't order by ascending without a predicate", () => {
            const dictionary = new Dictionary([
                { key: "element 3", value: 3 },
                { key: "element 4", value: 4 },
                { key: "element 2", value: 2 },
                { key: "element 1", value: 1 },
            ]);
            expect(() => dictionary.orderBy(null as any)).toThrowError(predicateError);
        });

        it("should order elements descending", () => {
            const dictionary = new Dictionary([
                { key: "element 3", value: 3 },
                { key: "element 4", value: 4 },
                { key: "element 2", value: 2 },
                { key: "element 1", value: 1 },
            ]);

            expect(() => dictionary.orderBy(null as any)).toThrowError(predicateError);

            const ordered1 = dictionary.orderByDesc(x => x.key).getInnerArray();
            const ordered2 = dictionary.orderByDesc(x => x.value).getInnerArray();

            expect(ordered1[3].value).toBe(1);
            expect(ordered1[2].value).toBe(2);
            expect(ordered1[1].value).toBe(3);
            expect(ordered1[0].value).toBe(4);

            expect(ordered2[3].key).toBe("element 1");
            expect(ordered2[2].key).toBe("element 2");
            expect(ordered2[1].key).toBe("element 3");
            expect(ordered2[0].key).toBe("element 4");
        });

        it("shouldn't order by descending without a predicate", () => {
            const dictionary = new Dictionary([
                { key: "element 3", value: 3 },
                { key: "element 4", value: 4 },
                { key: "element 2", value: 2 },
                { key: "element 1", value: 1 },
            ]);
            expect(() => dictionary.orderByDesc(null as any)).toThrowError(predicateError);
        });
    });

    describe("removing elements", () => {
        it("should remove element", () => {
            const dictionary = new Dictionary([
                { key: "element 1", value: 1 },
                { key: "element 2", value: 2 },
                { key: "element 3", value: 3 },
                { key: "element 4", value: 4 },
            ]);

            expect(() => dictionary.remove("element 2")).not.toThrow();
            expect(dictionary.count()).toBe(3);
            expect(dictionary.getInnerArray()[0].value).toBe(1);
            expect(dictionary.getInnerArray()[1].value).toBe(3);
            expect(dictionary.getInnerArray()[2].value).toBe(4);
        });

        it("should fail if tries to remove an unexisting element", () => {
            const dictionary = new Dictionary([
                { key: "element 1", value: 1 },
                { key: "element 2", value: 2 },
                { key: "element 3", value: 3 },
                { key: "element 4", value: 4 },
            ]);

            expect(() => dictionary.remove("element 5")).toThrowError(wrongKeyError);
            expect(dictionary.count()).toBe(4);
            expect(dictionary.get("element 1")).toBe(1);
            expect(dictionary.get("element 2")).toBe(2);
            expect(dictionary.get("element 3")).toBe(3);
            expect(dictionary.get("element 4")).toBe(4);
        });

        it("should remove all elements", () => {
            const dictionary = new Dictionary([
                { key: "element 1", value: 1 },
                { key: "element 2", value: 2 },
                { key: "element 3", value: 3 },
                { key: "element 4", value: 4 },
            ]);

            expect(dictionary.removeAll()).toBe(4);
            expect(dictionary.count()).toBe(0);
        });

        it("should remove all elements under certain conditions", () => {
            const dictionary = new Dictionary([
                { key: "element 1", value: 1 },
                { key: "element 2", value: 2 },
                { key: "element 3", value: 3 },
                { key: "element 4", value: 4 },
            ]);

            expect(dictionary.removeAll(x => x.value > 2)).toBe(2);
            expect(dictionary.count()).toBe(2);
            expect(dictionary.get("element 1")).toBe(1);
            expect(dictionary.get("element 2")).toBe(2);
        });

        it("shouldn't remove any elements if condition is not met", () => {
            const dictionary = new Dictionary([
                { key: "element 1", value: 1 },
                { key: "element 2", value: 2 },
                { key: "element 3", value: 3 },
                { key: "element 4", value: 4 },
            ]);

            expect(dictionary.removeAll(x => x.value > 4)).toBe(0);
            expect(dictionary.count()).toBe(4);
            expect(dictionary.get("element 1")).toBe(1);
            expect(dictionary.get("element 2")).toBe(2);
            expect(dictionary.get("element 3")).toBe(3);
            expect(dictionary.get("element 4")).toBe(4);
        });

        it("should clear all elements", () => {
            const dictionary = new Dictionary([
                { key: "element 1", value: 1 },
                { key: "element 2", value: 2 },
                { key: "element 3", value: 3 },
                { key: "element 4", value: 4 },
            ]);

            expect(() => dictionary.clear()).not.toThrow();
            expect(dictionary.count()).toBe(0);
        });
    });
});
