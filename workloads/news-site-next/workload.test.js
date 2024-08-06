import { BenchmarkTestStep, BenchmarkTestSuite, BenchmarkTestManager, Page } from "./workload-testing-utils.min.js";

window.benchmarkTestManager = new BenchmarkTestManager(window.name, [
    new BenchmarkTestSuite("Navigation", [
        new BenchmarkTestStep("NavigateToUS", () => {
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
        new BenchmarkTestStep("NavigateToWorld", () => {
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
        new BenchmarkTestStep("NavigateToPolitics", () => {
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
]);
