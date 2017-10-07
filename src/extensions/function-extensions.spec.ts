/*!
 * Paradigm Framework - Web Shared
 * Copyright (c) 2017 Miracle Devs, Inc
 * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.Shared/blob/master/LICENSE)
 */

import { PersonMock } from "./person-mock.spec";
import { FunctionExtensions } from "./function-extensions";

function testFunction(): void
{
    /* test function */
}

const functionVariable = testFunction;

const anonymousFunction =  function (): void {
    /* test function */
};

const wrongObject : Function =  ({}) as Function;

describe("Function", () =>
{
    describe("get function name", () =>
    {
        it("should get function name of number", () => expect(FunctionExtensions.getFunctionName(Number)).toBe("Number"));

        it("should get function name of string", () => expect(FunctionExtensions.getFunctionName(String)).toBe("String"));

        it("should get function name of boolean", () => expect(FunctionExtensions.getFunctionName(Boolean)).toBe("Boolean"));

        it("should get function name of date", () => expect(FunctionExtensions.getFunctionName(Date)).toBe("Date"));

        it("should get function name of object", () => expect(FunctionExtensions.getFunctionName(Object)).toBe("Object"));

        it("should get function name of a custom object", () => expect(FunctionExtensions.getFunctionName(PersonMock)).toBe("PersonMock"));

        it("should get function name of a function", () => expect(FunctionExtensions.getFunctionName(testFunction)).toBe("testFunction"));

        it("should get function name of a variable pointing a function", () => expect(FunctionExtensions.getFunctionName(testFunction)).toBe("testFunction"));

        it("should get function name of a variable pointing to an anonymous function", () => expect(FunctionExtensions.getFunctionName(anonymousFunction)).toBe("anonymousFunction"));

        it("should get function name of an anonymous function", () => expect(FunctionExtensions.getFunctionName(() => 0)).toBe("anonymous"));

        it("shouldnt get function name of an object", () => expect(FunctionExtensions.getFunctionName(wrongObject)).toBe("not a function"));
    });
});