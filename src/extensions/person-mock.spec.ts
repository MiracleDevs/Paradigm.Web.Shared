/*!
 * Paradigm Framework - Web Shared
 * Copyright (c) 2017 Miracle Devs, Inc
 * Licensed under MIT (https://github.com/MiracleDevs/Paradigm.Web.Shared/blob/master/LICENSE)
 */

export class PersonMock
{
    public name: string;

    public lastName: string;

    public age: number;

    public isAlive: boolean;

    public children: Array<PersonMock>;

    constructor()
    {
        this.children = [];
    }
}