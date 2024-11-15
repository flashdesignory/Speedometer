/*
    Note: This will eventually come from a separate package and should be minified.
*/

import { TEST_INVOKER_LOOKUP } from "./test-invoker.mjs";

/**
 * BenchmarkTestStep
 *
 * A single test step, with a common interface to interact with.
 */
export class BenchmarkTestStep {
    constructor(name, fn) {
        this.name = name;
        this.fn = fn;
    }

    run() {
        this.fn();
    }

    async runAndRecord({ params, suitename, callback }) {
        // Prepare all mark labels outside the measuring loop.
        const startLabel = `${suitename}.${this.name}-start`;
        const syncEndLabel = `${suitename}.${this.name}-sync-end`;
        const asyncStartLabel = `${suitename}.${this.name}-async-start`;
        const asyncEndLabel = `${suitename}.${this.name}-async-end`;

        let syncTime;
        let asyncStartTime;
        let asyncTime;
        const runSync = () => {
            if (params.warmupBeforeSync) {
                performance.mark("warmup-start");
                const startTime = performance.now();
                // Infinite loop for the specified ms.
                while (performance.now() - startTime < params.warmupBeforeSync)
                    continue;
                performance.mark("warmup-end");
            }
            performance.mark(startLabel);
            const syncStartTime = performance.now();
            this.run();
            const syncEndTime = performance.now();
            performance.mark(syncEndLabel);

            syncTime = syncEndTime - syncStartTime;

            performance.mark(asyncStartLabel);
            asyncStartTime = performance.now();
        };
        const measureAsync = () => {
            // Some browsers don't immediately update the layout for paint.
            // Force the layout here to ensure we're measuring the layout time.
            const height = document.body.getBoundingClientRect().height;
            const asyncEndTime = performance.now();
            asyncTime = asyncEndTime - asyncStartTime;
            window._unusedHeightValue = height; // Prevent dead code elimination.
            performance.mark(asyncEndLabel);
            if (params.warmupBeforeSync)
                performance.measure("warmup", "warmup-start", "warmup-end");
            performance.measure(`${suitename}.${this.name}-sync`, startLabel, syncEndLabel);
            performance.measure(`${suitename}.${this.name}-async`, asyncStartLabel, asyncEndLabel);
        };

        const report = () => callback({ syncTime, asyncTime });
        const invokerClass = TEST_INVOKER_LOOKUP[params.measurementMethod];
        const invoker = new invokerClass(runSync, measureAsync, report, params);

        return invoker.start();
    }
}

/**
 * BenchmarkTestSuite
 *
 * A single test suite that contains one or more test steps.
 */
export class BenchmarkTestSuite {
    constructor(name, tests) {
        this.name = name;
        this.tests = tests;
    }

    getTestByName(name) {
        return this.tests.find((test) => test.name === name);
    }

    run() {
        for (const test of this.tests)
            test.run();
    }

    record({ syncTime, asyncTime }) {
        const total = syncTime + asyncTime;
        const results = {
            tests: { Sync: syncTime, Async: asyncTime },
            total: total,
        };
        return results;
    }

    async runAndRecord({ params, onProgress }) {
        const measuredValues = {
            tests: {},
            total: 0,
        };
        const suiteStartLabel = `suite-${this.name}-start`;
        const suiteEndLabel = `suite-${this.name}-end`;

        performance.mark(suiteStartLabel);

        for (const test of this.tests) {
            const result = await test.runAndRecord({
                params,
                suitename: this.name,
                callback: this.record,
            });
            measuredValues.tests[test.name] = result;
            measuredValues.total += result.total;
            onProgress?.(test.name);
        }

        performance.mark(suiteEndLabel);
        performance.measure(`suite-${this.name}`, suiteStartLabel, suiteEndLabel);

        return {
            type: "suite-tests-complete",
            status: "success",
            result: measuredValues,
            suitename: this.name,
        };
    }
}

/**
 * BenchmarkSuitesManager
 *
 * A collection of test suites for a single workload.
 */
export class BenchmarkSuitesManager {
    constructor(name, suites) {
        this.name = name;
        this.suites = suites;
    }

    getSuiteByName(name) {
        return this.suites.find((suite) => suite.name === name);
    }

    run(suitesToRun) {
        const selectedSuites = !suitesToRun ? [...this.suites] : this.suites.filter((suite) => suitesToRun.includes(suite.name));

        for (const suite of selectedSuites)
            suite.run();
    }
}

/**
 * Helper Methods
 *
 * Various methods that are extracted from the Page class.
 */
export function getParent(lookupStartNode, path) {
    lookupStartNode = lookupStartNode.shadowRoot ?? lookupStartNode;
    const parent = path.reduce((root, selector) => {
        const node = root.querySelector(selector);
        return node.shadowRoot ?? node;
    }, lookupStartNode);

    return parent;
}

export function getElement(selector, path = [], lookupStartNode = document) {
    const element = getParent(lookupStartNode, path).querySelector(selector);
    return element;
}

export function getAllElements(selector, path = [], lookupStartNode = document) {
    const elements = Array.from(getParent(lookupStartNode, path).querySelectorAll(selector));
    return elements;
}

export function forceLayout() {
    const rect = document.body.getBoundingClientRect();
    const e = document.elementFromPoint((rect.width / 2) | 0, (rect.height / 2) | 0);
    return e;
}