/*!
 * Paradigm Framework - Web Shared
 * Copyright (c) 2017 Miracle Devs, Inc
 * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.Shared/blob/master/LICENSE)
 */

import { FunctionExtensions } from "./extensions/function-extensions";
import { Dictionary } from "./collections/dictionary";

export class LocalStorage {
    static set<T extends { toString(): string }>(name: string, value: T): void {
        localStorage.setItem(name, value.toString());
    }

    static setObject<T>(name: string, value: T): void {
        localStorage.setItem(name, JSON.stringify(value));
    }

    static get<T>(type: { new (): T }, name: string): T | null {
        if (FunctionExtensions.getFunctionName(type) === FunctionExtensions.getFunctionName(Number))
            return LocalStorage.getNumber(name) as T;

        if (FunctionExtensions.getFunctionName(type) === FunctionExtensions.getFunctionName(Boolean))
            return LocalStorage.getBoolean(name) as T;

        if (FunctionExtensions.getFunctionName(type) === FunctionExtensions.getFunctionName(Date)) return LocalStorage.getDate(name) as T;

        if (FunctionExtensions.getFunctionName(type) === FunctionExtensions.getFunctionName(String))
            return LocalStorage.getString(name) as T;

        return this.getObject<T>(type, name);
    }

    static getInt(name: string): number | null {
        const value = localStorage.getItem(name);
        return !value ? null : parseInt(value, 10);
    }

    static getNumber(name: string): number | null {
        const value = localStorage.getItem(name);
        return !value ? null : parseFloat(value);
    }

    static getBoolean(name: string): boolean | null {
        let value = localStorage.getItem(name);

        if (!value) return null;

        value = value.toLowerCase();

        return value === "true" || value === "yes" || value === "1";
    }

    static getDate(name: string): Date | null {
        const value = localStorage.getItem(name);
        return !value ? null : new Date(value);
    }

    static getString(name: string): string | null {
        return localStorage.getItem(name);
    }

    static getObject<T>(type: { new (): T }, name: string): T | null {
        const value = localStorage.getItem(name);

        if (!value) return null;

        return JSON.parse(value) as T;
    }

    static remove(name: string): void {
        localStorage.removeItem(name);
    }

    static getAllContent(): Dictionary<string, string> {
        const dictionary = new Dictionary<string, string>();

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);

            if (key) {
                const value = localStorage.getItem(key);

                if (value) {
                    dictionary.add(key, value);
                }
            }
        }

        return dictionary;
    }

    static clear(): void {
        localStorage.clear();
    }
}
