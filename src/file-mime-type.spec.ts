/* eslint-disable @typescript-eslint/no-explicit-any */
/*!
 * Paradigm Framework - Web Shared
 * Copyright (c) 2017 Miracle Devs, Inc
 * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.Shared/blob/master/LICENSE)
 */

import { fileMimeType } from "./file-mime-type";

describe("File Mime Type", () => {
    const fileNullError = "File name can not be null.";

    const fileWithoutExtensionError = "File name without extension.";

    describe("get mime type", () => {
        it("should get mime type of video", () => expect(fileMimeType.get("video.mp4")).toBe("video/mp4"));

        it("should get mime type of audio", () => expect(fileMimeType.get("video.mp3")).toBe("audio/mpeg"));

        it("should get mime type of pdf", () => expect(fileMimeType.get("video.pdf")).toBe("application/pdf"));

        it("should throw error if filename is null", () => expect(() => fileMimeType.get(null as any)).toThrowError(fileNullError));

        it("should throw error if filename does not have extension", () =>
            expect(() => fileMimeType.get("filename")).toThrowError(fileWithoutExtensionError));

        it("should throw error if the extension is not recognized", () => expect(() => fileMimeType.get(".|||")).toThrow());
    });

    describe("contains extension", () => {
        it("should be true for video", () => expect(fileMimeType.containsExtension("video.mp4")).toBe(true));

        it("should be true for audio", () => expect(fileMimeType.containsExtension("video.mp3")).toBe(true));

        it("should be true for pdf", () => expect(fileMimeType.containsExtension("video.pdf")).toBe(true));

        it("should be false if it's not recognized", () => expect(fileMimeType.containsExtension(".|||")).toBe(false));

        it("should throw error if filename is null", () => expect(() => fileMimeType.containsExtension(null as any)).toThrowError(fileNullError));

        it("should throw error if filename does not have extension", () =>
            expect(() => fileMimeType.containsExtension("filename")).toThrowError(fileWithoutExtensionError));
    });
});
