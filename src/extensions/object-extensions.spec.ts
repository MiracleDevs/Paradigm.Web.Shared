/*!
 * Paradigm Framework - Web Shared
 * Copyright (c) 2017 Miracle Devs, Inc
 * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.Shared/blob/master/LICENSE)
 */

import { ObjectExtensions } from "./object-extensions";
import { Guid } from "../guid";
import { PersonMock } from "./person-mock.spec";

describe("Object", () =>
{
    var objectNullError = "Object can not be null.";

    describe("is null", () =>
    {
        it("should be true if null", () => expect(ObjectExtensions.isNull(null)).toBe(true));

        it("should be true if undefined", () => expect(ObjectExtensions.isNull(undefined)).toBe(true));

        it("shouldn't be true if number", () => expect(ObjectExtensions.isNull(0)).toBe(false));

        it("shouldn't be true if date", () => expect(ObjectExtensions.isNull(new Date())).toBe(false));

        it("shouldn't be true if bool", () => expect(ObjectExtensions.isNull(false)).toBe(false));

        it("shouldn't be true if string", () => expect(ObjectExtensions.isNull("")).toBe(false));
    });

    describe("get type name", () =>
    {
        it("should get type of number", () => expect(ObjectExtensions.getTypeName(3)).toBe("Number"));

        it("should get type of Number", () => expect(ObjectExtensions.getTypeName(Number(3))).toBe("Number"));

        it("should get type of string", () => expect(ObjectExtensions.getTypeName("hello")).toBe("String"));

        it("should get type of String", () => expect(ObjectExtensions.getTypeName(String("hello"))).toBe("String"));

        it("should get type of boolean", () => expect(ObjectExtensions.getTypeName(false)).toBe("Boolean"));

        it("should get type of Boolean", () => expect(ObjectExtensions.getTypeName(Boolean(false))).toBe("Boolean"));

        it("should get type of array", () => expect(ObjectExtensions.getTypeName([])).toBe("Array"));

        it("should get type of date", () => expect(ObjectExtensions.getTypeName(new Date())).toBe("Date"));

        it("should get type of custom object", () => expect(ObjectExtensions.getTypeName({})).toBe("Object"));

        it("should get type of custom class", () => expect(ObjectExtensions.getTypeName(Guid.new())).toBe("Guid"));

        it("should get type of null", () => expect(() => ObjectExtensions.getTypeName(null)).toThrowError(objectNullError));
    });

    describe("is native value type", () =>
    {
        it("should be true for number", () => expect(ObjectExtensions.isNativeValueType(3)).toBe(true));

        it("should be true for Number", () => expect(ObjectExtensions.isNativeValueType(Number(3))).toBe(true));

        it("should be true for string", () => expect(ObjectExtensions.isNativeValueType("hello")).toBe(true));

        it("should be true for String", () => expect(ObjectExtensions.isNativeValueType(String("hello"))).toBe(true));

        it("should be true for boolean", () => expect(ObjectExtensions.isNativeValueType(false)).toBe(true));

        it("should be true for Boolean", () => expect(ObjectExtensions.isNativeValueType(Boolean(false))).toBe(true));

        it("should be true for date", () => expect(ObjectExtensions.isNativeValueType(new Date())).toBe(true));

        it("should be false for array", () => expect(ObjectExtensions.isNativeValueType([])).toBe(false));

        it("should be false for custom object", () => expect(ObjectExtensions.isNativeValueType({})).toBe(false));

        it("should be false for custom class", () => expect(ObjectExtensions.isNativeValueType(Guid.new())).toBe(false));

        it("should throw error if null", () => expect(() => ObjectExtensions.isNativeValueType(null)).toThrowError(objectNullError));
    });

    describe("object is equal", () =>
    {
        it("should be true for two nulls", () => expect(ObjectExtensions.isEqualTo(null, null)).toBe(true));
        it("should be true for two undefined", () => expect(ObjectExtensions.isEqualTo(undefined, undefined)).toBe(true));
        it("should be true for null and undefined", () => expect(ObjectExtensions.isEqualTo(null, undefined)).toBe(true));
        it("should be false for null and any not null", () => expect(ObjectExtensions.isEqualTo(null, 1)).toBe(false));
        it("should be false for undefined and any not null", () => expect(ObjectExtensions.isEqualTo(undefined, 1)).toBe(false));

        it("should be true for two equal numbers", () => expect(ObjectExtensions.isEqualTo(1, 1)).toBe(true));
        it("should be false for two different numbers", () => expect(ObjectExtensions.isEqualTo(1, 2)).toBe(false));
        it("should be false for a number and a bool", () => expect(ObjectExtensions.isEqualTo(1, true)).toBe(false));
        it("should be false for a number and a string", () => expect(ObjectExtensions.isEqualTo(1, "1")).toBe(false));

        it("should be true for two equal strings", () => expect(ObjectExtensions.isEqualTo("hello", "hello")).toBe(true));
        it("should be false for two different strings", () => expect(ObjectExtensions.isEqualTo("hello", "world")).toBe(false));
        it("should be false for a string and a bool", () => expect(ObjectExtensions.isEqualTo("true", true)).toBe(false));

        it("should be true for two equal booleans", () => expect(ObjectExtensions.isEqualTo(true, true)).toBe(true));
        it("should be false for two different booleans", () => expect(ObjectExtensions.isEqualTo(true, false)).toBe(false));

        it("should be true for two equal dates", () => expect(ObjectExtensions.isEqualTo(new Date(2012, 12, 12, 12, 12, 12), new Date(2012, 12, 12, 12, 12, 12))).toBe(true));
        it("should be false for two different dates", () => expect(ObjectExtensions.isEqualTo(new Date(2014, 12, 12), new Date(2012, 12, 12))).toBe(false));

        it("should be true for two equal objects",
            () => expect(ObjectExtensions.isEqualTo(
                { number: 1, text: "hello", bool: true, date: new Date(2012, 12, 12, 12, 12, 12) },
                { number: 1, text: "hello", bool: true, date: new Date(2012, 12, 12, 12, 12, 12) })).toBe(true));

        it("should be false for two equal objects with different numbers",
            () => expect(ObjectExtensions.isEqualTo(
                { number: 1, text: "hello", bool: true, date: new Date(2012, 12, 12, 12, 12, 12) },
                { number: 2, text: "hello", bool: true, date: new Date(2012, 12, 12, 12, 12, 12) })).toBe(false));

        it("should be false for two equal objects with different strings",
            () => expect(ObjectExtensions.isEqualTo(
                { number: 1, text: "hello", bool: true, date: new Date(2012, 12, 12, 12, 12, 12) },
                { number: 1, text: "world", bool: true, date: new Date(2012, 12, 12, 12, 12, 12) })).toBe(false));

        it("should be false for two equal objects with different booleans",
            () => expect(ObjectExtensions.isEqualTo(
                { number: 1, text: "hello", bool: true, date: new Date(2012, 12, 12, 12, 12, 12) },
                { number: 1, text: "hello", bool: false, date: new Date(2012, 12, 12, 12, 12, 12) })).toBe(false));

        it("should be false for two equal objects with different dates",
            () => expect(ObjectExtensions.isEqualTo(
                { number: 1, text: "hello", bool: true, date: new Date(2012, 12, 12, 12, 12, 12) },
                { number: 1, text: "hello", bool: true, date: new Date(2014, 12, 12, 12, 12, 12) })).toBe(false));

        it("should be true for two equal arrays",
            () => expect(ObjectExtensions.isEqualTo(
                [1, 2, 3, 4, 5],
                [1, 2, 3, 4, 5])).toBe(true));

        it("should be false for two equal arrays with different values",
            () => expect(ObjectExtensions.isEqualTo(
                [1, 2, 3, 4, 5],
                [1, 2, 3, 4, 4])).toBe(false));

        it("should be false for two equal arrays with different length",
            () => expect(ObjectExtensions.isEqualTo(
                [1, 2, 3, 4, 5],
                [1, 2, 3, 4])).toBe(false));

        it("should be true for two equal complex objects",
            () => expect(ObjectExtensions.isEqualTo(
                { name: "object", childs: [{ name: "child1" }, { name: "child2" }], parent: { name: "parent" } },
                { name: "object", childs: [{ name: "child1" }, { name: "child2" }], parent: { name: "parent" } })).toBe(true));

        it("should be false for two equal complex objects whith different values",
            () => expect(ObjectExtensions.isEqualTo(
                { name: "object", childs: [{ name: "child1" }, { name: "child2" }], parent: { name: "parent 1" } },
                { name: "object", childs: [{ name: "child1" }, { name: "child2" }], parent: { name: "parent 2" } })).toBe(false));

        it("should be false for two equal complex objects whith different child values",
            () => expect(ObjectExtensions.isEqualTo(
                { name: "object", childs: [{ name: "child1" }, { name: "child2" }], parent: { name: "parent" } },
                { name: "object", childs: [{ name: "child1" }, { name: "child3" }], parent: { name: "parent" } })).toBe(false));

        it("should be false for two equal complex objects whith different childs",
            () => expect(ObjectExtensions.isEqualTo(
                { name: "object", childs: [{ name: "child1" }, { name: "child2" }], parent: { name: "parent" } },
                { name: "object", childs: [{ name: "child1" }, { name: "child2" }, { name: "child3" }], parent: { name: "parent" } })).toBe(false));


        it("should ignore properties",
            () => expect(ObjectExtensions.isEqualTo(
                { name: "object", childs: [{ name: "child1" }, { name: "child2" }], parent: { name: "parent" } },
                { name: "object", childs: [{ name: "child1" }, { name: "child2" }, { name: "child3" }], parent: { name: "parent" } }, ["childs"])).toBe(true));

        it("should ignore child properties",
            () => expect(ObjectExtensions.isEqualTo(
                { name: "object", childs: [{ name: "child1" }, { name: "child2", id: 1 }], parent: { name: "parent" } },
                { name: "object", childs: [{ name: "child1" }, { name: "child2", id: 2 }], parent: { name: "parent" } }, ["id"])).toBe(true));


        it("should ignore object type",
            () =>
            {
                var original = new PersonMock();

                original.name = "John";
                original.lastName = "Smith";
                original.age = 39;
                original.isAlive = true;
                original.children = [new PersonMock()];

                var copy = ObjectExtensions.clone(original);

                expect(ObjectExtensions.isEqualTo(original, copy, null, false)).toBe(true);
            });

        it("should take object type in account",
            () =>
            {
                var original = new PersonMock();

                original.name = "John";
                original.lastName = "Smith";
                original.age = 39;
                original.isAlive = true;
                original.children = [new PersonMock()];

                var copy = ObjectExtensions.clone(original);

                expect(ObjectExtensions.isEqualTo(original, copy)).toBe(false);
            });
    });

    describe("object get difference", () =>
    {
        it("should be null for two nulls", () => expect(ObjectExtensions.getDifference(null, null)).toBeNull());
        it("should be null for two undefined", () => expect(ObjectExtensions.getDifference(undefined, undefined)).toBeNull());
        it("should be null for null and undefined", () => expect(ObjectExtensions.getDifference(null, undefined)).toBeNull());
        it("should get difference for null and any not null", () => expect(ObjectExtensions.getDifference(null, 1)).toBe("different value"));
        it("should get difference for undefined and any not null", () => expect(ObjectExtensions.getDifference(undefined, 1)).toBe("different value"));

        it("should be null for two equal numbers", () => expect(ObjectExtensions.getDifference(1, 1)).toBeNull());
        it("should get difference for two different numbers", () => expect(ObjectExtensions.getDifference(1, 2)).toBe("different value"));
        it("should get difference for a number and a bool", () => expect(ObjectExtensions.getDifference(1, true)).toBe("different type"));
        it("should get difference for a number and a string", () => expect(ObjectExtensions.getDifference(1, "1")).toBe("different type"));

        it("should be null for two equal strings", () => expect(ObjectExtensions.getDifference("hello", "hello")).toBeNull());
        it("should get difference for two different strings", () => expect(ObjectExtensions.getDifference("hello", "world")).toBe("different value"));
        it("should get difference for a string and a bool", () => expect(ObjectExtensions.getDifference("true", true)).toBe("different type"));

        it("should be null for two equal booleans", () => expect(ObjectExtensions.getDifference(true, true)).toBeNull());
        it("should get difference for two different booleans", () => expect(ObjectExtensions.getDifference(true, false)).toBe("different value"));

        it("should be null for two equal dates", () => expect(ObjectExtensions.getDifference(new Date(2012, 12, 12, 12, 12, 12), new Date(2012, 12, 12, 12, 12, 12))).toBeNull());
        it("should get difference for two different dates", () => expect(ObjectExtensions.getDifference(new Date(2014, 12, 12), new Date(2012, 12, 12))).toBe("different value"));

        it("should be null for two equal objects",
            () => expect(ObjectExtensions.getDifference(
                { number: 1, text: "hello", bool: true, date: new Date(2012, 12, 12, 12, 12, 12) },
                { number: 1, text: "hello", bool: true, date: new Date(2012, 12, 12, 12, 12, 12) })).toBeNull());

        it("should get difference for two equal objects with different numbers",
            () => expect(ObjectExtensions.getDifference(
                { number: 1, text: "hello", bool: true, date: new Date(2012, 12, 12, 12, 12, 12) },
                { number: 2, text: "hello", bool: true, date: new Date(2012, 12, 12, 12, 12, 12) })).toBe("different value in number"));

        it("should get difference for two equal objects with different strings",
            () => expect(ObjectExtensions.getDifference(
                { number: 1, text: "hello", bool: true, date: new Date(2012, 12, 12, 12, 12, 12) },
                { number: 1, text: "world", bool: true, date: new Date(2012, 12, 12, 12, 12, 12) })).toBe("different value in text"));

        it("should get difference for two equal objects with different booleans",
            () => expect(ObjectExtensions.getDifference(
                { number: 1, text: "hello", bool: true, date: new Date(2012, 12, 12, 12, 12, 12) },
                { number: 1, text: "hello", bool: false, date: new Date(2012, 12, 12, 12, 12, 12) })).toBe("different value in bool"));

        it("should get difference for two equal objects with different dates",
            () => expect(ObjectExtensions.getDifference(
                { number: 1, text: "hello", bool: true, date: new Date(2012, 12, 12, 12, 12, 12) },
                { number: 1, text: "hello", bool: true, date: new Date(2014, 12, 12, 12, 12, 12) })).toBe("different value in date"));

        it("should be null for two equal arrays",
            () => expect(ObjectExtensions.getDifference(
                [1, 2, 3, 4, 5],
                [1, 2, 3, 4, 5])).toBeNull());

        it("should get difference for two equal arrays with different values",
            () => expect(ObjectExtensions.getDifference(
                [1, 2, 3, 4, 5],
                [1, 2, 3, 4, 4])).toBe("different value for 5th element"));

        it("should get difference for two equal arrays with different length",
            () => expect(ObjectExtensions.getDifference(
                [1, 2, 3, 4, 5],
                [1, 2, 3, 4])).toBe("different lengths"));

        it("should be null for two equal complex objects",
            () => expect(ObjectExtensions.getDifference(
                { name: "object", childs: [{ name: "child1" }, { name: "child2" }], parent: { name: "parent" } },
                { name: "object", childs: [{ name: "child1" }, { name: "child2" }], parent: { name: "parent" } })).toBeNull());

        it("should get difference for two equal complex objects whith different values",
            () => expect(ObjectExtensions.getDifference(
                { name: "object", childs: [{ name: "child1" }, { name: "child2" }], parent: { name: "parent 1" } },
                { name: "object", childs: [{ name: "child1" }, { name: "child2" }], parent: { name: "parent 2" } })).toBe("different value in name in parent"));

        it("should get difference for two equal complex objects whith different child values",
            () => expect(ObjectExtensions.getDifference(
                { name: "object", childs: [{ name: "child1" }, { name: "child2" }], parent: { name: "parent" } },
                { name: "object", childs: [{ name: "child1" }, { name: "child3" }], parent: { name: "parent" } })).toBe("different value in name for 2th element in childs"));

        it("should get difference for two equal complex objects whith different childs",
            () => expect(ObjectExtensions.getDifference(
                { name: "object", childs: [{ name: "child1" }, { name: "child2" }], parent: { name: "parent" } },
                { name: "object", childs: [{ name: "child1" }, { name: "child2" }, { name: "child3" }], parent: { name: "parent" } })).toBe("different lengths in childs"));


        it("should ignore properties",
            () => expect(ObjectExtensions.getDifference(
                { name: "object", childs: [{ name: "child1" }, { name: "child2" }], parent: { name: "parent" } },
                { name: "object", childs: [{ name: "child1" }, { name: "child2" }, { name: "child3" }], parent: { name: "parent" } }, ["childs"])).toBeNull());

        it("should ignore child properties",
            () => expect(ObjectExtensions.getDifference(
                { name: "object", childs: [{ name: "child1" }, { name: "child2", id: 1 }], parent: { name: "parent" } },
                { name: "object", childs: [{ name: "child1" }, { name: "child2", id: 2 }], parent: { name: "parent" } }, ["id"])).toBeNull());


        it("should ignore object type",
            () =>
            {
                var original = new PersonMock();

                original.name = "John";
                original.lastName = "Smith";
                original.age = 39;
                original.isAlive = true;
                original.children = [new PersonMock()];

                var copy = ObjectExtensions.clone(original);

                expect(ObjectExtensions.getDifference(original, copy, null, false)).toBeNull();
            });

        it("should take object type in account",
            () =>
            {
                var original = new PersonMock();

                original.name = "John";
                original.lastName = "Smith";
                original.age = 39;
                original.isAlive = true;
                original.children = [new PersonMock()];

                var copy = ObjectExtensions.clone(original);

                expect(ObjectExtensions.getDifference(original, copy)).toBe("different type");
            });
    });

    describe("clone object", () =>
    {
        it("should clone numbers", () => expect(ObjectExtensions.clone(1)).toBe(1));
        it("should clone strings", () => expect(ObjectExtensions.clone("hello")).toBe("hello"));
        it("should clone booleans", () => expect(ObjectExtensions.clone(true)).toBe(true));
        it("should clone numbers", () =>
        {
            var date1 = new Date(12, 12, 12);
            var date2 = ObjectExtensions.clone(date1);

            expect(date1 === date2).toBe(false);
            expect(date1.getTime() === date2.getTime()).toBe(true);
        });

        it("should clone simple objects", () =>
        {
            var object1 = { number: 1, text: "hello", bool: true, date: new Date(12, 12, 12) };
            var object2 = ObjectExtensions.clone(object1);
            expect(ObjectExtensions.isEqualTo(object1, object2)).toBe(true);
        });

        it("should clone arrays", () =>
        {
            var object1 = [1, 2, 3, 4];
            var object2 = ObjectExtensions.clone(object1);
            expect(ObjectExtensions.isEqualTo(object1, object2)).toBe(true);
        });

        it("should clone complex objects", () =>
        {
            var object1 = { name: "object", childs: [{ name: "child1" }, { name: "child2" }], parent: { name: "parent" } };
            var object2 = ObjectExtensions.clone(object1);
            expect(ObjectExtensions.isEqualTo(object1, object2)).toBe(true);
        });
    });
});