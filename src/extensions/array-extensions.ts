/* eslint-disable @typescript-eslint/no-explicit-any */
/*!
 * Paradigm Framework - Web Shared
 * Copyright (c) 2017 Miracle Devs, Inc
 * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.Shared/blob/master/LICENSE)
 */

export class ArrayExtensions {
    static forEach<T>(array: Array<T>, action: (element: T) => void): void {
        for (let index = 0; index < array.length; index++) {
            action(array[index]);
        }
    }

    static where<T>(array: Array<T>, predicate: (element: T) => boolean): Array<T> {
        const temp = Array<T>();

        for (let index = 0; index < array.length; index++) {
            if (predicate(array[index])) temp.push(array[index]);
        }

        return temp;
    }

    static select<T, TR>(array: Array<T>, predicate: (element: T) => TR): Array<TR> {
        const temp = Array<TR>();

        for (let index = 0; index < array.length; index++) {
            temp.push(predicate(array[index]));
        }

        return temp;
    }

    static firstOrDefault<T>(array: Array<T>, predicate?: (element: T) => boolean): T | null {
        if (!predicate) {
            if (array.length > 0) return array[0];
            return null;
        }

        for (let index = 0; index < array.length; index++) {
            if (predicate(array[index])) return array[index];
        }

        return null;
    }

    static lastOrDefault<T>(array: Array<T>, predicate?: (element: T) => boolean): T | null {
        if (!predicate) {
            if (array.length > 0) return array[array.length - 1];

            return null;
        }

        for (let index = array.length - 1; index >= 0; index--) {
            if (predicate(array[index])) return array[index];
        }

        return null;
    }

    static first<T>(array: Array<T>, predicate?: (element: T) => boolean): T {
        const element = ArrayExtensions.firstOrDefault(array, predicate);

        if (!element) throw new Error("The source sequence is empty.");

        return element;
    }

    static last<T>(array: Array<T>, predicate?: (element: T) => boolean): T {
        const element = ArrayExtensions.lastOrDefault(array, predicate);

        if (!element) throw new Error("The source sequence is empty.");

        return element;
    }

    static any<T>(array: Array<T>, predicate?: (element: T) => boolean): boolean {
        if (!predicate) return array.length > 0;

        for (let index = 0; index < array.length; index++) {
            if (predicate(array[index])) return true;
        }

        return false;
    }

    static count<T>(array: Array<T>, predicate?: (element: T) => boolean): number {
        if (!predicate) return array.length;

        let count = 0;

        for (let index = 0; index < array.length; index++) {
            if (predicate(array[index])) count++;
        }

        return count;
    }

    static sum<T, TI = any>(array: Array<T>, predicate?: (element: T) => TI): TI | null {
        let sum: any = undefined;

        for (let index = 0; index < array.length; index++) {
            const value = !predicate ? array[index] : predicate(array[index]);

            if (!sum) sum = value;
            else sum += value;
        }

        if (sum === undefined) return null;

        return sum;
    }

    static contains<T>(array: Array<T>, value: any): boolean {
        for (let index = 0; index < array.length; index++) {
            if (array[index] === value) return true;
        }

        return false;
    }

    static orderBy<T, TR>(array: Array<T>, predicate?: (element: T) => TR): Array<T> {
        const onlyValues = !predicate;
        const newArray = array.slice();

        return newArray.sort((a, b) => {
            const valueA = onlyValues ? a : predicate(a);
            const valueB = onlyValues ? b : predicate(b);

            return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
        });
    }

    static orderByDesc<T, TR>(array: Array<T>, predicate?: (element: T) => TR): Array<T> {
        const onlyValues = !predicate;
        const newArray = array.slice();

        return newArray.sort((a, b) => {
            const valueA = onlyValues ? a : predicate(a);
            const valueB = onlyValues ? b : predicate(b);

            return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
        });
    }

    static remove<T>(array: Array<T>, element: T): boolean {
        try {
            ArrayExtensions.removeAt(array, array.indexOf(element));
            return true;
        } catch (e) {
            return false;
        }
    }

    static removeAt<T>(array: Array<T>, index: number): void {
        if (index < 0) throw new Error("index is less than 0.");

        if (index >= array.length) throw new Error("index is equal to or greater than length.");

        delete array[index];
        array.splice(index, 1);
    }

    static removeAll<T>(array: Array<T>, predicate?: (element: T) => boolean): number {
        const elements = !predicate ? array.slice() : ArrayExtensions.where(array, predicate);
        let count = 0;

        for (let i = 0; i < elements.length; i++) {
            ArrayExtensions.remove(array, elements[i]);
            count++;
        }

        return count;
    }
}
