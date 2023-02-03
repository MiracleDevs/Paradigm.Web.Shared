/* eslint-disable @typescript-eslint/no-explicit-any */
/*!
 * Paradigm.UI.Shared v1.0.0
 * Copyright (c) 2017 Miracle Devs, Inc
 * Licensed under MIT (https://github.com/MiracleDevs/MiracleDevs.Angular/blob/master/LICENSE)
 */

import { IEnumerable } from "./ienumerable";
import { ArrayExtensions } from "../extensions/array-extensions";
import { ObjectExtensions } from "../extensions/object-extensions";

export class ArrayList<T> implements IEnumerable<T> {
    protected innerArray: Array<T>;

    constructor(array?: Array<T>) {
        this.innerArray = array || new Array<T>();
    }

    forEach(action: (element: T) => void): void {
        ArrayExtensions.forEach(this.innerArray, action);
    }

    where(predicate: (element: T) => boolean): ArrayList<T> {
        return new ArrayList(ArrayExtensions.where(this.innerArray, predicate));
    }

    select<TR>(predicate: (element: T) => TR): ArrayList<TR> {
        return new ArrayList(ArrayExtensions.select(this.innerArray, predicate));
    }

    firstOrDefault(predicate?: (element: T) => boolean): T | null {
        return ArrayExtensions.firstOrDefault(this.innerArray, predicate);
    }

    lastOrDefault(predicate?: (element: T) => boolean): T | null {
        return ArrayExtensions.lastOrDefault(this.innerArray, predicate);
    }

    first(predicate?: (element: T) => boolean): T {
        return ArrayExtensions.first(this.innerArray, predicate);
    }

    last(predicate?: (element: T) => boolean): T {
        return ArrayExtensions.last(this.innerArray, predicate);
    }

    any(predicate?: (element: T) => boolean): boolean {
        return ArrayExtensions.any(this.innerArray, predicate);
    }

    count(predicate?: (element: T) => boolean): number {
        return ArrayExtensions.count(this.innerArray, predicate);
    }

    sum<TI>(predicate?: (element: T) => TI): TI | null {
        return ArrayExtensions.sum(this.innerArray, predicate);
    }

    contains(value: T): boolean {
        return ArrayExtensions.contains(this.innerArray, value);
    }

    orderBy<TR>(predicate?: (element: T) => TR): ArrayList<T> {
        if (!predicate && this.innerArray && this.innerArray.length > 0 && !ObjectExtensions.isNativeValueType(this.innerArray[0]))
            throw new Error("Can not order complex objects without a predicate.");

        return new ArrayList(ArrayExtensions.orderBy(this.innerArray, predicate));
    }

    orderByDesc<TR>(predicate?: (element: T) => TR): ArrayList<T> {
        if (!predicate && this.innerArray && this.innerArray.length > 0 && !ObjectExtensions.isNativeValueType(this.innerArray[0]))
            throw new Error("Can not order complex objects without a predicate.");

        return new ArrayList(ArrayExtensions.orderByDesc(this.innerArray, predicate));
    }

    getInnerArray(): Array<T> {
        return this.innerArray;
    }

    get(index: number): T {
        if (index < 0) throw new Error("index is less than 0.");

        if (index >= this.innerArray.length) throw new Error("index is equal to or greater than length.");

        return this.innerArray[index];
    }

    add(value: T): void {
        this.innerArray.push(value);
    }

    addRange(value: Array<T>): void;
    addRange(value: ArrayList<T>): void;
    addRange(value: any): void {
        let i: number;

        if (value && value.getInnerArray) value = value.getInnerArray();

        if (!(value instanceof Array)) throw new Error("Value should be an array or an IEnumerable class.");

        for (i = 0; i < value.length; i++) this.add(value[i]);
    }

    pop(): T | undefined {
        return this.innerArray.pop();
    }

    indexOf(element: T): number {
        return this.innerArray.indexOf(element);
    }

    remove(element: T): boolean {
        return ArrayExtensions.remove(this.innerArray, element);
    }

    removeAt(index: number): void {
        ArrayExtensions.removeAt(this.innerArray, index);
    }

    removeAll(predicate?: (element: T) => boolean): number {
        return ArrayExtensions.removeAll(this.innerArray, predicate);
    }

    clear(): void {
        // we prefer to execute remove all and not create a new array, to
        // preserve the reference to the original array, if someone used the
        // getInnerArray method.
        this.removeAll();
    }
}
