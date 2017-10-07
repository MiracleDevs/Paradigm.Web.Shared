﻿module.exports = function (config)
{
    config.set({
        frameworks: ["jasmine", "karma-typescript"],
        files: ["src/**/*.ts"],
        preprocessors: {
            "src/**/*.ts": ["karma-typescript"]
        },
        karmaTypescriptConfig: {
            compilerOptions: {
                noImplicitAny: false,
                target: "ES5",
                moduleResolution: "node",
                module: "commonjs",
                sourceMap: true,
                removeComments: true,
                declaration: true,
                experimentalDecorators: true,
            },
            include: ["src/**/*.ts"],
            reports: {
                "html": "./coverage/"
            }
        },
        singleRun: true,
        port: 9876,
        colors: true,
        reporters: ["dots", "karma-typescript"],
        browsers: ["ChromeHeadless"],
        logLevel: config.LOG_INFO,
        autoWatch: false,
        concurrency: Infinity
    });
};