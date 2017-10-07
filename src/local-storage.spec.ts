/*!
 * Paradigm Framework - Web Shared
 * Copyright (c) 2017 Miracle Devs, Inc
 * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.Shared/blob/master/LICENSE)
 */

import { LocalStorage } from "./local-storage";
import { PersonMock } from "./extensions/person-mock.spec";

describe("Local Storage", () =>
{
    describe("Booleans", () =>
    {
        it("should store and retrieve booleans", () =>
        {
            expect(() => LocalStorage.set("boolean", true)).not.toThrow();
            expect(LocalStorage.get(Boolean, "boolean")).toBe(true);
            expect(LocalStorage.getBoolean("boolean")).toBe(true);
        });

        it("should retrieve \"1\" as true", () =>
        {
            expect(() => LocalStorage.set("boolean", 1)).not.toThrow();
            expect(LocalStorage.get(Boolean, "boolean")).toBe(true);
            expect(LocalStorage.getBoolean("boolean")).toBe(true);
        });

        it("should retrieve \"yes\" as true", () =>
        {
            expect(() => LocalStorage.set("boolean", "yes")).not.toThrow();
            expect(LocalStorage.get(Boolean, "boolean")).toBe(true);
            expect(LocalStorage.getBoolean("boolean")).toBe(true);
        });

        it("should retrieve any other value as false", () =>
        {
            expect(() => LocalStorage.set("boolean", "hello world")).not.toThrow();
            expect(LocalStorage.get(Boolean, "boolean")).toBe(false);
            expect(LocalStorage.getBoolean("boolean")).toBe(false);
        });

        it("should retrieve null if the value is not present in the storage", () =>
        {
            expect(LocalStorage.get(Boolean, "xghb6rerg-temp")).toBe(null);
            expect(LocalStorage.getBoolean("xghb6rerg-temp")).toBe(null);
        });
    });

    describe("Numbers", () =>
    {
        it("should store and retrieve numbers", () =>
        {
            expect(() => LocalStorage.set("number", 1.1)).not.toThrow();
            expect(LocalStorage.get(Number, "number")).toBe(1.1);
            expect(LocalStorage.getNumber("number")).toBe(1.1);
        });

        it("should store and retrieve integer", () =>
        {
            expect(() => LocalStorage.set("int", 1)).not.toThrow();
            expect(LocalStorage.getInt("int")).toBe(1);
        });

        it("should retrieve null if the value is not present in the storage", () =>
        {
            expect(LocalStorage.get(Number, "xghb6rerg-temp")).toBe(null);
            expect(LocalStorage.getNumber("xghb6rerg-temp")).toBe(null);
            expect(LocalStorage.getInt("xghb6rerg-temp")).toBe(null);
        });
    });

    describe("Dates", () =>
    {
        it("should store and retrieve dates", () =>
        {
            expect(() => LocalStorage.set("date", new Date(12, 12, 12))).not.toThrow();
            expect(LocalStorage.get(Date, "date").getTime()).toBe(new Date(12, 12, 12).getTime());
            expect(LocalStorage.getDate("date").getTime()).toBe(new Date(12, 12, 12).getTime());
        });

        it("should retrieve null if the value is not present in the storage", () =>
        {
            expect(LocalStorage.get(Date, "xghb6rerg-temp")).toBe(null);
            expect(LocalStorage.getDate("xghb6rerg-temp")).toBe(null);
        });
    });

    describe("Strings", () =>
    {
        it("should store and retrieve dates", () =>
        {
            expect(() => LocalStorage.set("string", "hello world")).not.toThrow();
            expect(LocalStorage.get(String, "string")).toBe("hello world");
            expect(LocalStorage.getString("string")).toBe("hello world");
        });

        it("should retrieve null if the value is not present in the storage", () =>
        {
            expect(LocalStorage.get(String, "xghb6rerg-temp")).toBe(null);
            expect(LocalStorage.getString("xghb6rerg-temp")).toBe(null);
        });
    })

    describe("Objects", () =>
    {
        it("should store and retrieve objects", () =>
        {
            var person = new PersonMock();
            var person1: PersonMock = null;
            var person2: PersonMock = null;

            person.name = "John";
            person.lastName = "Smith";
            person.age = 24;
            person.children = [{ name: "Peter", lastName: "Smith", age: 1, isAlive: true, children: []}];
            person.isAlive = true;

            expect(() => LocalStorage.setObject("person", person)).not.toThrow();
            expect(() => person1 = LocalStorage.get(PersonMock, "person")).not.toThrow();
            expect(() => person2 = LocalStorage.getObject(PersonMock, "person")).not.toThrow();

            expect(person1.name).toBe(person.name);
            expect(person1.lastName).toBe(person.lastName);
            expect(person1.age).toBe(person.age);
            expect(person1.isAlive).toBe(person.isAlive);
            expect(person1.children.length).toBe(person.children.length);
            expect(person1.children[0].name).toBe(person.children[0].name);
            expect(person1.children[0].lastName).toBe(person.children[0].lastName);
            expect(person1.children[0].age).toBe(person.children[0].age);
            expect(person1.children[0].isAlive).toBe(person.children[0].isAlive);
            expect(person1.children[0].children.length).toBe(person.children[0].children.length);

            expect(person2.name).toBe(person.name);
            expect(person2.lastName).toBe(person.lastName);
            expect(person2.age).toBe(person.age);
            expect(person2.isAlive).toBe(person.isAlive);
            expect(person2.children.length).toBe(person.children.length);
            expect(person2.children[0].name).toBe(person.children[0].name);
            expect(person2.children[0].lastName).toBe(person.children[0].lastName);
            expect(person2.children[0].age).toBe(person.children[0].age);
            expect(person2.children[0].isAlive).toBe(person.children[0].isAlive);
            expect(person2.children[0].children.length).toBe(person.children[0].children.length);
        });

        it("should retrieve null if the value is not present in the storage", () =>
        {
            expect(LocalStorage.get(Object, "xghb6rerg-temp")).toBe(null);
            expect(LocalStorage.getObject(Object, "xghb6rerg-temp")).toBe(null);
        });
    })

    it("should remove values", () =>
    {
        LocalStorage.remove("boolean");
        LocalStorage.remove("number");
        LocalStorage.remove("date");

        expect(LocalStorage.getBoolean("boolean")).toBe(null);
        expect(LocalStorage.getNumber("number")).toBe(null);
        expect(LocalStorage.getDate("date")).toBe(null);
    });

    it("should get all content", () =>
    {
        LocalStorage.clear();
        LocalStorage.set("element 1", "value 1");
        LocalStorage.set("element 2", "value 2");
        LocalStorage.set("element 3", "value 3");

        var allContent = LocalStorage.getAllContent();

        expect(allContent).not.toBeNull();
        expect(allContent.count()).toBe(3);
        expect(allContent.get("element 1")).toBe("value 1");
        expect(allContent.get("element 2")).toBe("value 2");
        expect(allContent.get("element 3")).toBe("value 3");
    });

    it("should clear all content", () =>
    {
        LocalStorage.set("element 1", "value 1");
        LocalStorage.set("element 2", "value 2");
        LocalStorage.set("element 3", "value 3");
        LocalStorage.clear();

        var allContent = LocalStorage.getAllContent();

        expect(allContent).not.toBeNull();
        expect(allContent.count()).toBe(0);
    });
});