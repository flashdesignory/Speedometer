import { BenchmarkTestStep, BenchmarkTestSuite, BenchmarkTestManager, Page } from "./workload-testing-utils.min.js";

window.benchmarkTestManager = new BenchmarkTestManager(window.name, [
    new BenchmarkTestSuite("Navigation", [
        new BenchmarkTestStep("Navigate to US page", () => {
            const page = new Page(document);
            for (let i = 0; i < 25; i++) {
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
            }
            page.querySelector("#navbar-navlist-us-link").click();
            page.layout();
        }),
        new BenchmarkTestStep("Navigate to World page", () => {
            const page = new Page(document);
            for (let i = 0; i < 25; i++) {
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
            }
            page.querySelector("#navbar-navlist-world-link").click();
            page.layout();
        }),
        new BenchmarkTestStep("Navigate to Politics page", () => {
            const page = new Page(document);
            for (let i = 0; i < 25; i++) {
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
                page.querySelector("#navbar-dropdown-toggle").click();
                page.layout();
            }
            page.querySelector("#navbar-navlist-politics-link").click();
            page.layout();
        }),
    ]),
    new BenchmarkTestSuite("Dropdown", [
        new BenchmarkTestStep("Toggle More Dropdown", () => {
            const page = new Page(document);
            page.querySelector("#navbar-dropdown-toggle").click();
            page.forceLayout();
        }),
        new BenchmarkTestStep("Toggle More Dropdown", () => {
            const page = new Page(document);
            page.querySelector("#navbar-dropdown-toggle").click();
            page.forceLayout();
        }),
    ]),
]);
