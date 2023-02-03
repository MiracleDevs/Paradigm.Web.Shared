/*!
 * Paradigm Framework - Web Shared
 * Copyright (c) 2017 Miracle Devs, Inc
 * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.Shared/blob/master/LICENSE)
 */

import { Md5 } from "./md5";

describe("MD5", () => {
    it("should get MD5 for 'hello world'", () => expect(Md5.computeHash("hello world")).toBe("5eb63bbbe01eeed093cb22bb8f5acdc3"));

    it("should get MD5 for 'password1234admin'", () => expect(Md5.computeHash("password1234admin")).toBe("d43a469e1e7440e49149df5b2b1206fe"));

    it("should get MD5 for lorem ipsum (long text)", () =>
        expect(
            Md5.computeHash(
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            )
        ).toBe("01aad0e51fcd5582b307613842e4ffe5"));
});
